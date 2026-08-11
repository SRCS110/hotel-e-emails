// ─────────────────────────────────────────────────────────────────────────────
// Supabase client + all DB helpers used by the platform UI
// ─────────────────────────────────────────────────────────────────────────────
import { createClient } from "@supabase/supabase-js";
import { SUPABASE_URL, SUPABASE_ANON, FUNCTIONS_URL } from "./config.js";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

// ── Lists ─────────────────────────────────────────────────────────────────────
export async function getLists() {
  const { data, error } = await supabase.from("lists").select("*").order("name");
  if (error) throw error;
  return data;
}

export async function createList(name, description = "") {
  const { data, error } = await supabase.from("lists").insert({ name, description }).select().single();
  if (error) throw error;
  return data;
}

// ── Subscribers ───────────────────────────────────────────────────────────────
export async function getSubscribers(listId = null) {
  let q = supabase.from("subscribers").select("*, list_members(list_id)").order("created_at", { ascending: false });
  if (listId) {
    const { data: members } = await supabase.from("list_members").select("subscriber_id").eq("list_id", listId);
    const ids = (members ?? []).map(m => m.subscriber_id);
    if (ids.length === 0) return [];
    q = supabase.from("subscribers").select("*").in("id", ids).order("created_at", { ascending: false });
  }
  const { data, error } = await q;
  if (error) throw error;
  return data;
}

export async function getSubscriberStats(listId = null) {
  const subs = await getSubscribers(listId);
  return {
    total:        subs.length,
    active:       subs.filter(s => s.status === "active").length,
    unsubscribed: subs.filter(s => s.status === "unsubscribed").length,
    bounced:      subs.filter(s => s.status === "bounced").length,
  };
}

export async function addSubscriber(email, firstName, lastName, listId) {
  // Upsert subscriber
  const { data: sub, error: sErr } = await supabase
    .from("subscribers")
    .upsert({ email, first_name: firstName, last_name: lastName, source: "manual" }, { onConflict: "email" })
    .select().single();
  if (sErr) throw sErr;
  // Add to list
  if (listId) {
    await supabase.from("list_members").upsert({ list_id: listId, subscriber_id: sub.id }, { onConflict: "list_id,subscriber_id" });
  }
  return sub;
}

export async function importSubscribers(rows, listId) {
  // rows = [{email, first_name, last_name}]
  const { data: subs, error } = await supabase
    .from("subscribers")
    .upsert(rows.map(r => ({ ...r, source: "import" })), { onConflict: "email" })
    .select("id");
  if (error) throw error;
  if (listId && subs?.length) {
    const members = subs.map(s => ({ list_id: listId, subscriber_id: s.id }));
    await supabase.from("list_members").upsert(members, { onConflict: "list_id,subscriber_id" });
  }
  return subs?.length ?? 0;
}

export async function removeSubscriber(id) {
  const { error } = await supabase.from("subscribers").update({ status: "unsubscribed", unsubscribed_at: new Date().toISOString() }).eq("id", id);
  if (error) throw error;
}

// ── Campaigns ─────────────────────────────────────────────────────────────────
export async function getCampaigns() {
  const { data, error } = await supabase
    .from("campaigns")
    .select("*, lists(name)")
    .order("created_at", { ascending: false });
  if (error) throw error;
  return data;
}

export async function saveCampaign({ name, type, subject, preheader, htmlBody, listId }) {
  const { data, error } = await supabase
    .from("campaigns")
    .insert({ name, type, subject, preheader, html_body: htmlBody, list_id: listId, status: "draft" })
    .select().single();
  if (error) throw error;
  return data;
}

export async function sendCampaign(campaignId, previewEmail = null) {
  const body = previewEmail
    ? { campaign_id: campaignId, preview_email: previewEmail }
    : { campaign_id: campaignId };

  const res = await fetch(`${FUNCTIONS_URL}/send-campaign`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.error ?? "Send failed");
  return json;
}

export async function getCampaignStats() {
  const { data, error } = await supabase.from("campaign_stats").select("*");
  if (error) throw error;
  return data;
}
