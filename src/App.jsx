import { useState, useCallback, useEffect } from "react";
import * as db from "./db.js";

// ─── CONSTANTS ────────────────────────────────────────────────────────────────
const PROP = {
  name: "Hotel E Santa Rosa", shortName: "Hotel E",
  address: "37 Old Courthouse Square · Santa Rosa, CA 95404",
  phone: "(707) 481-3750", email: "reservations@hotelesantarosa.com",
  website: "https://hotelesantarosa.com", bookingUrl: "https://hotelesantarosa.com/rooms/",
  heroImage: "https://hotelesantarosa.com/wp-content/uploads/2025/11/a015b315-1515-4d24-83c9-75083d9c10ec.jpeg",
  accent: "#2C4A6B", accentLight: "#E8F0F8", accentMuted: "#9B8A6E",
  tagline: "Historic Boutique Luxury in Downtown Santa Rosa",
  amenities: [
    { icon: "☕", label: "Free Breakfast", sub: "Daily 6:30–10AM" },
    { icon: "🍷", label: "Enology Wine Bar", sub: "Happy Hour 5–7PM" },
    { icon: "🚗", label: "Valet Parking", sub: "$25/night" },
    { icon: "🐾", label: "Pet Friendly", sub: "Dogs welcome" },
  ],
};

const MONTHS = [
  { id:1,name:"January",tagline:"Start the Year in Wine Country",heroSubject:"Escape to Hotel E — Your January Wine Country Reset",preheader:"New year, new adventures. Downtown Santa Rosa awaits.",heroCaption:"Historic Boutique Luxury in the Heart of Santa Rosa",introCopy:"Welcome to Hotel E — Santa Rosa's #1 rated boutique hotel, housed in a beautifully restored 1906 Beaux-Arts landmark. This January, Sonoma Wine Country is yours to explore. Our concierge team is ready to help you make the most of it.",ctaTagline:"Book direct for our best rates. Stash Rewards members save even more.",thingsToDo:[{icon:"🍷",title:"Wine Tasting Season Begins",desc:"January is the ideal time to explore Sonoma's 400+ wineries without the summer crowds. Visit St. Francis or Paradise Ridge for intimate barrel tastings."},{icon:"🌲",title:"Armstrong Redwoods",desc:"Hike through ancient redwood groves just 30 minutes away. Winter rains bring the forest to life with lush greenery and peaceful trails."},{icon:"🎨",title:"Museum of Sonoma County",desc:"Explore rotating art exhibitions and local history at this beloved downtown Santa Rosa museum, just steps from Hotel E."}],events:[{name:"Sonoma County Restaurant Week",date:"Mid-January",detail:"Celebrate local chefs with special prix-fixe menus at restaurants throughout the county."},{name:"Luther Burbank Center Performances",date:"Throughout January",detail:"Catch live shows at the iconic Luther Burbank Performing Arts Center — check their winter lineup."},{name:"New Year Wine Road Passport",date:"January Weekends",detail:"Sip your way through Dry Creek Valley and Alexander Valley wineries with the Wine Road weekend tasting passport."}],cta:"Book Your January Escape",accentColor:"#2C4A6B",accentLight:"#E8F0F8",season:"Winter"},
  { id:2,name:"February",tagline:"Romance is in the Air — and the Wine",heroSubject:"Valentine's in Wine Country — Book Hotel E",preheader:"Treat your Valentine to an unforgettable Sonoma getaway.",heroCaption:"Celebrate Love in Santa Rosa's Most Romantic Hotel",introCopy:"Welcome to Hotel E — Santa Rosa's #1 rated boutique hotel, housed in a beautifully restored 1906 Beaux-Arts landmark. This February, Sonoma Wine Country is yours to explore.",ctaTagline:"Book direct for our best rates. Stash Rewards members save even more.",thingsToDo:[{icon:"🍾",title:"Enology Wine Bar Date Night",desc:"Start your evening at our on-site Enology Lounge with award-winning Sonoma County wines and daily happy hour 5–7pm."},{icon:"🌹",title:"Romantic Bodega Bay Drive",desc:"Take a scenic 30-minute drive to the Pacific coast. Cliffside views, fresh seafood, and the salty ocean air are the perfect Valentine's backdrop."},{icon:"🧀",title:"California Artisan Cheese",desc:"Wine and cheese pair perfectly — explore the finest local creameries and makers ahead of this beloved annual event."}],events:[{name:"Cloverdale Citrus Fair",date:"Feb 13–16, 2026",detail:"Live music, carnival rides, 4-H shows, and a parade on Feb 13 — a beloved regional fair just north of Santa Rosa."},{name:"Wine Road Barrel Tasting",date:"February Weekends",detail:"Taste wines straight from the barrel before they're bottled — a rare insider experience across dozens of Sonoma wineries."},{name:"Valentine's Dinners Downtown",date:"Feb 14",detail:"Downtown Santa Rosa's 18+ restaurants offer special Valentine's prix-fixe menus steps from Hotel E's front door."}],cta:"Reserve Your Valentine's Weekend",accentColor:"#8B2635",accentLight:"#FAEBED",season:"Winter"},
  { id:3,name:"March",tagline:"Spring Blooms & Barrel Weekends",heroSubject:"Spring is Here — Explore Wine Country from Hotel E",preheader:"Rolling green hills, blooming mustard fields, and open tasting rooms.",heroCaption:"Hotel E: Your Spring Wine Country Basecamp",introCopy:"Welcome to Hotel E — Santa Rosa's #1 rated boutique hotel. This March, Sonoma Wine Country is yours to explore.",ctaTagline:"Book direct for our best rates. Stash Rewards members save even more.",thingsToDo:[{icon:"🌸",title:"Mustard Fields & Vineyards",desc:"March brings brilliant yellow mustard blooms between the vine rows of Sonoma's valleys — drive Highway 12 for a scenic wine country experience."},{icon:"🎭",title:"The California Theatre",desc:"Catch a show at downtown Santa Rosa's beautifully restored California Theatre, just a short stroll from the hotel."},{icon:"🚴",title:"Wine Country Cycling",desc:"The rolling hills around Santa Rosa are perfect for cycling. Rent bikes and explore the Laguna de Santa Rosa trail system."}],events:[{name:"Sonoma County Restaurant Week",date:"Mid-March",detail:"Savor curated multi-course menus celebrating the county's diverse culinary scene at special value pricing."},{name:"Wine Road Barrel Tasting",date:"March Weekends",detail:"Experience Sonoma's Alexander Valley and Dry Creek Valley wineries during the annual barrel tasting weekends."},{name:"Luther Burbank Center Spring Series",date:"Throughout March",detail:"World-class performances at Santa Rosa's premier performing arts venue, just minutes from Hotel E."}],cta:"Book Your Spring Getaway",accentColor:"#3D6B35",accentLight:"#EAF3E8",season:"Spring"},
  { id:4,name:"April",tagline:"Festivals, Fools & Apple Blossoms",heroSubject:"April in Sonoma — Festivals Await at Hotel E",preheader:"Spring festivals, artisan fairs, and wine country adventures.",heroCaption:"Boutique Comfort Steps from Courthouse Square",introCopy:"Welcome to Hotel E. This April, Sonoma Wine Country is yours to explore.",ctaTagline:"Book direct for our best rates. Stash Rewards members save even more.",thingsToDo:[{icon:"🌊",title:"Bodega Bay Coastal Walk",desc:"30 minutes west of Hotel E, the Sonoma Coast offers dramatic cliffs, tide pools, and whale watching through late spring."},{icon:"🍺",title:"Downtown Craft Breweries",desc:"Santa Rosa is home to 3 downtown microbreweries. Explore Russian River Brewing, known worldwide for Pliny the Elder."},{icon:"🎨",title:"Sonoma County Museum",desc:"April exhibitions at the Museum of Sonoma County celebrate local history, art, and the region's rich agricultural heritage."}],events:[{name:"Fool's Day Parade",date:"April 4, 2026",detail:"Join locals for a playful parade through Occidental with live entertainment and the crowning of the King and Queen of Fools."},{name:"Butter & Egg Days Parade",date:"April 18, 2026",detail:"Petaluma's beloved family festival spans four city blocks with food, crafts, arts, and kid activities."},{name:"Sebastopol Apple Blossom Festival",date:"April 25–26, 2026",detail:"A colorful weekend with live music, arts and crafts, food and drink — just 20 minutes from Hotel E."}],cta:"Plan Your April Visit",accentColor:"#6B4A8B",accentLight:"#F2EDFA",season:"Spring"},
  { id:5,name:"May",tagline:"Wine Itineraries & Outdoor Season Opens",heroSubject:"May in Wine Country — Book Hotel E & Explore Sonoma",preheader:"The weather is perfect. The wines are flowing. Your room awaits.",heroCaption:"Hotel E: The Heart of Sonoma Wine Country",introCopy:"Welcome to Hotel E. This May, Sonoma Wine Country is yours to explore.",ctaTagline:"Book direct for our best rates. Stash Rewards members save even more.",thingsToDo:[{icon:"🍷",title:"Wine Itinerary Packages",desc:"Book our curated wine packages: choose from A Day in Dry Creek Valley, Taste Highway 12, or Sip & Savor Santa Rosa."},{icon:"⚾",title:"Sonoma Stompers Baseball",desc:"The season opens in May! Catch a Sonoma Stompers game — a fun, affordable local baseball experience for all ages."},{icon:"🎵",title:"Acoustic Sunsets",desc:"Weekly live music at Sonoma Botanical Garden, Wednesdays May–September. Wine, picnics, and Bay Area musicians."}],events:[{name:"Bodega Bay Fisherman's Festival",date:"May 2–3, 2026",detail:"Since 1973, this beloved coastal festival features craft booths, live music, great food, and maritime entertainment."},{name:"Salute to American Graffiti Car Show",date:"May 14–16, 2026",detail:"Over 400 classic cars and trucks fill Petaluma's streets."},{name:"Sonoma County Matsuri Festival",date:"May 17, 2026",detail:"Free festival of Japanese arts, culture, and food right in Santa Rosa."}],cta:"Book May — Wine Season is Open",accentColor:"#2B6B5A",accentLight:"#E6F5F1",season:"Spring"},
  { id:6,name:"June",tagline:"Country Music, Pride & Broadway Under the Stars",heroSubject:"June is Event Season — Stay at Hotel E in Santa Rosa",preheader:"Country music, pride celebrations, Broadway shows — June has it all.",heroCaption:"Steps from Downtown Santa Rosa's Best Summer Events",introCopy:"Welcome to Hotel E. This June, Sonoma Wine Country is yours to explore.",ctaTagline:"Book direct for our best rates. Stash Rewards members save even more.",thingsToDo:[{icon:"🎤",title:"Luther Burbank Concerts",desc:"Summer concerts at the Luther Burbank Performing Arts Center are a Santa Rosa tradition."},{icon:"🏖️",title:"Sonoma Coast Beaches",desc:"June brings warm, clear days perfect for exploring Doran Beach, Goat Rock, and the wild Sonoma coastline 30 minutes away."},{icon:"🚁",title:"Hot Air Balloon Rides",desc:"Float over the vineyards at sunrise — hot air balloon tours depart from the Santa Rosa area throughout summer."}],events:[{name:"Country Summer Music Festival",date:"June 12–14, 2026",detail:"Northern California's biggest country music festival returns to Santa Rosa."},{name:"Sonoma County Pride",date:"June 5–7, 2026",detail:"A parade and festival featuring live performances celebrating Sonoma County's vibrant LGBT+ community."},{name:"Broadway Under the Stars",date:"June 12–28, 2026",detail:"Award-winning Broadway-inspired concerts and musicals in a stunning Wine Country outdoor setting."}],cta:"Grab Your June Reservation",accentColor:"#8B6B35",accentLight:"#FAF3E6",season:"Summer"},
  { id:7,name:"July",tagline:"Summer Fireworks & Balloon Classics",heroSubject:"July 4th & Beyond — Celebrate in Wine Country at Hotel E",preheader:"Fireworks, hot air balloons, and summer in Sonoma County.",heroCaption:"Hotel E — Celebrating Summer in Downtown Santa Rosa",introCopy:"Welcome to Hotel E. This July, Sonoma Wine Country is yours to explore.",ctaTagline:"Book direct for our best rates. Stash Rewards members save even more.",thingsToDo:[{icon:"🎆",title:"4th of July in Sonoma",desc:"Multiple fireworks shows across Sonoma County — Hotel E puts you steps from Courthouse Square celebrations."},{icon:"🏄",title:"Russian River Adventures",desc:"Float, kayak, or swim the Russian River. Guerneville is 30 minutes from Hotel E and a beloved summer escape."},{icon:"🍦",title:"Downtown Santa Rosa Dining",desc:"18 restaurants within walking distance of the hotel — enjoy summer patio dining and cold local craft brews."}],events:[{name:"4th of July Fireworks",date:"July 4, 2026",detail:"Multiple Sonoma County fireworks celebrations — steps from Hotel E."},{name:"Sonoma County Hot Air Balloon Classic",date:"July 18–19, 2026",detail:"Get up close with balloons, watch launches, and take tethered rides at this beloved annual Santa Rosa festival."},{name:"Fort Ross Festival",date:"July 25, 2026",detail:"Kashia Pomo ceremonial dancing, Alaska Native crafts, and Russian performances on the stunning Sonoma coast."}],cta:"Book Your July Stay",accentColor:"#1A5276",accentLight:"#E8F4F8",season:"Summer"},
  { id:8,name:"August",tagline:"County Fair Season & Apple Country",heroSubject:"August in Sonoma — Fair Season, Apples & More at Hotel E",preheader:"The Sonoma County Fair is here. Book your stay now.",heroCaption:"The County's #1 Rated Hotel During Fair Season",introCopy:"Welcome to Hotel E. This August, Sonoma Wine Country is yours to explore.",ctaTagline:"Book direct for our best rates. Stash Rewards members save even more.",thingsToDo:[{icon:"🎡",title:"Sonoma County Fairgrounds",desc:"The iconic Sonoma County Fair runs August 7–16 with rides, the Hall of Flowers, arts, wine country horse racing, and endless food."},{icon:"🍎",title:"Apple Orchards & Farm Stands",desc:"Gravenstein apple season peaks in August. Visit local farm stands in Sebastopol just 20 minutes away."},{icon:"🎸",title:"Summer Music Everywhere",desc:"August brings back-to-back music festivals and outdoor concerts across Sonoma County."}],events:[{name:"Sonoma County Fair",date:"August 7–16, 2026",detail:"The county's biggest annual event — carnival rides, the famous Hall of Flowers, ag exhibits, and great food."},{name:"Gravenstein Apple Fair",date:"August 8–9, 2026",detail:"Celebrate the iconic Gravenstein apple with local food, live music, and farm-to-table experiences."},{name:"Cotati Accordion Festival",date:"August 15–16, 2026",detail:"A beloved multi-generational, multi-cultural musical celebration in La Plaza Park."}],cta:"Reserve During Fair Season",accentColor:"#6B5A2B",accentLight:"#FAF5E6",season:"Summer"},
  { id:9,name:"September",tagline:"Harvest Season in Wine Country",heroSubject:"Harvest Season is Here — Experience Sonoma from Hotel E",preheader:"The grapes are in. The wines are flowing. The harvest awaits.",heroCaption:"Boutique Luxury During Sonoma's Most Beautiful Season",introCopy:"Welcome to Hotel E. This September, Sonoma Wine Country is yours to explore.",ctaTagline:"Book direct for our best rates. Stash Rewards members save even more.",thingsToDo:[{icon:"🍇",title:"Harvest at the Wineries",desc:"September is crush season — many Sonoma wineries offer harvest experiences and barrel tastings."},{icon:"🚶",title:"Annadel State Park",desc:"Hike through golden oak woodlands at Annadel — Santa Rosa's own state park with 40+ miles of trails."},{icon:"🍜",title:"Farm-to-Table Dining",desc:"Downtown Santa Rosa's restaurant scene shines in fall with seasonal harvest menus."}],events:[{name:"Railroad Square Music Festival",date:"September 20, 2026",detail:"A free day of music on 4 stages, local food, wine, craft beer, and 20+ artisans in Railroad Square."},{name:"Acoustic Sunsets Final Weeks",date:"Through Sept 16",detail:"The final evenings of the Sonoma Botanical Garden's beloved Wednesday night music series."},{name:"Harvest Season Winery Events",date:"All September",detail:"Wineries throughout Sonoma host special harvest dinners, crush parties, and barrel tastings."}],cta:"Book Your Harvest Escape",accentColor:"#7B3B1A",accentLight:"#FAF0EA",season:"Fall"},
  { id:10,name:"October",tagline:"Harvest Fair, Dia de los Muertos & Fall Colors",heroSubject:"October in Wine Country — Fall Magic at Hotel E",preheader:"Harvest fairs, spooky fun, and the most beautiful season in Sonoma.",heroCaption:"Fall at Hotel E — Santa Rosa's Historic Beaux-Arts Gem",introCopy:"Welcome to Hotel E. This October, Sonoma Wine Country is yours to explore.",ctaTagline:"Book direct for our best rates. Stash Rewards members save even more.",thingsToDo:[{icon:"🎃",title:"Halloween on Courthouse Square",desc:"Downtown Santa Rosa celebrates Halloween with community events right outside Hotel E's door."},{icon:"🍂",title:"Fall Foliage Drives",desc:"October brings stunning fall color — drive Highway 128 through Alexander Valley for a leafy, golden canopy."},{icon:"🍷",title:"Sonoma County Harvest Fair",desc:"The Grand Tasting Pavilion and the KZST World Championship Grape Stomp make this a must-attend event."}],events:[{name:"Sonoma County Harvest Fair",date:"October 10, 2026",detail:"The Grand Tasting Pavilion and the KZST World Championship Grape Stomp at the Sonoma County Fairgrounds."},{name:"Halloween & Dia de los Muertos",date:"Late October",detail:"Special events across Sonoma County — downtown Santa Rosa, Petaluma, and Healdsburg."},{name:"Winery Fall Releases",date:"Throughout October",detail:"Fall is new release season across Sonoma's wine regions."}],cta:"Book Your October Getaway",accentColor:"#8B4513",accentLight:"#FAF0E6",season:"Fall"},
  { id:11,name:"November",tagline:"Quiet Wine Country & Holiday Warmth",heroSubject:"Thanksgiving Wine Country — Escape to Hotel E",preheader:"A quieter, more intimate Sonoma. Perfect for the holidays.",heroCaption:"Hotel E Welcomes You This Holiday Season",introCopy:"Welcome to Hotel E. This November, Sonoma Wine Country is yours to explore.",ctaTagline:"Book direct for our best rates. Stash Rewards members save even more.",thingsToDo:[{icon:"🦃",title:"Thanksgiving in Wine Country",desc:"Many Sonoma County wineries offer special Thanksgiving weekend tastings — a beloved annual tradition."},{icon:"🌊",title:"Storm Season Coast",desc:"November waves and wild skies make Bodega Bay dramatic and beautiful."},{icon:"🎭",title:"Holiday Shows Begin",desc:"The Luther Burbank Center's holiday performance season kicks off in November."}],events:[{name:"Thanksgiving Weekend Wine Road",date:"Thanksgiving Weekend",detail:"Wineries across Sonoma open their doors for special Thanksgiving weekend tastings."},{name:"Luther Burbank Holiday Season",date:"November Onward",detail:"The performing arts calendar fills with holiday concerts, dance performances, and seasonal specials."},{name:"Shop Small Downtown Santa Rosa",date:"Late November",detail:"Downtown's boutique shops, galleries, and restaurants celebrate Small Business Saturday."}],cta:"Book Your Holiday Retreat",accentColor:"#4A3728",accentLight:"#F5EDE8",season:"Fall"},
  { id:12,name:"December",tagline:"Holiday Magic in Downtown Santa Rosa",heroSubject:"Holiday Season at Hotel E — A Wine Country Christmas",preheader:"Festive lights, holiday markets, and boutique luxury await.",heroCaption:"Celebrate the Season at Hotel E on Courthouse Square",introCopy:"Welcome to Hotel E. This December, Sonoma Wine Country is yours to explore.",ctaTagline:"Book direct for our best rates. Stash Rewards members save even more.",thingsToDo:[{icon:"🎄",title:"Holiday Lights Downtown",desc:"Courthouse Square transforms into a festive wonderland in December."},{icon:"🎸",title:"Holiday Performances",desc:"The Luther Burbank Center and The California Theatre both present packed holiday entertainment calendars."},{icon:"🛍️",title:"Boutique Holiday Shopping",desc:"Downtown Santa Rosa's unique shops, galleries, and local boutiques offer a curated holiday shopping experience."}],events:[{name:"Lighted Boat Parade",date:"December 2026 (TBD)",detail:"Festive lighted boats travel from Petaluma Marina to the Downtown Turning Basin."},{name:"New Year's Eve in Wine Country",date:"December 31",detail:"Ring in the New Year in downtown Santa Rosa with special event dinners and Courthouse Square festivities."},{name:"Charles M. Schulz Museum Holiday",date:"December",detail:"The Snoopy-themed museum hosts special holiday exhibits and programming just minutes from Hotel E."}],cta:"Book Your Holiday Stay",accentColor:"#1C4B2E",accentLight:"#E6F5EC",season:"Winter"},
];

const SEASON_ICONS = { Winter:"❄️", Spring:"🌸", Summer:"☀️", Fall:"🍂" };
const MONTH_NAMES  = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const DAY_LABELS   = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const FLOOR_PRICE  = 109;
const AC = PROP.accent;
const AL = PROP.accentLight;
const AM = PROP.accentMuted;

function getDaysInMonth(y,m){return new Date(y,m+1,0).getDate();}
function getFirstDayOfWeek(y,m){return new Date(y,m,1).getDay();}

// ─── SHARED UI HELPERS ────────────────────────────────────────────────────────
function EditableField({value,onChange,multiline,style}){
  const [editing,setEditing]=useState(false);
  const [draft,setDraft]=useState(value);
  const commit=()=>{onChange(draft);setEditing(false);};
  const cancel=()=>{setDraft(value);setEditing(false);};
  if(editing) return multiline
    ?<textarea autoFocus value={draft} rows={Math.max(3,Math.ceil(draft.length/60))} onChange={e=>setDraft(e.target.value)} onBlur={commit} onKeyDown={e=>{if(e.key==="Escape")cancel();}} style={{...style,width:"100%",boxSizing:"border-box",border:"2px solid #9B8A6E",borderRadius:"4px",padding:"6px 8px",resize:"vertical",fontFamily:"inherit",fontSize:"inherit",lineHeight:"inherit",background:"#FFFDF8",outline:"none",color:"inherit"}}/>
    :<input autoFocus type="text" value={draft} onChange={e=>setDraft(e.target.value)} onBlur={commit} onKeyDown={e=>{if(e.key==="Enter")commit();if(e.key==="Escape")cancel();}} style={{...style,width:"100%",boxSizing:"border-box",border:"2px solid #9B8A6E",borderRadius:"4px",padding:"4px 8px",fontFamily:"inherit",fontSize:"inherit",background:"#FFFDF8",outline:"none",color:"inherit"}}/>;
  return <span title="✏️ Click to edit" onClick={()=>{setDraft(value);setEditing(true);}} style={{...style,cursor:"text",display:"block",borderRadius:"3px",padding:"2px 4px",margin:"-2px -4px",border:"1px dashed transparent",transition:"border-color .15s,background .15s"}} onMouseEnter={e=>{e.currentTarget.style.borderColor="#9B8A6E";e.currentTarget.style.background="#FDFAF5";}} onMouseLeave={e=>{e.currentTarget.style.borderColor="transparent";e.currentTarget.style.background="transparent";}}>{value}</span>;
}

function Tag({color,bg,children}){return <span style={{fontSize:"11px",fontFamily:"sans-serif",fontWeight:"600",color,background:bg,padding:"2px 9px",borderRadius:"12px"}}>{children}</span>;}
function Btn({onClick,color="#fff",bg,border,disabled,children,style={}}){return <button onClick={onClick} disabled={disabled} style={{padding:"8px 16px",borderRadius:"4px",border:border??`1px solid ${bg}`,background:disabled?"#ccc":bg,color:disabled?"#888":color,cursor:disabled?"not-allowed":"pointer",fontSize:"13px",fontFamily:"sans-serif",fontWeight:"600",whiteSpace:"nowrap",...style}}>{children}</button>;}
function Input({value,onChange,placeholder,type="text",style={}}){return <input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} style={{width:"100%",boxSizing:"border-box",padding:"8px 10px",border:"1px solid #D0D8E0",borderRadius:"6px",fontSize:"13px",fontFamily:"sans-serif",outline:"none",...style}}/>;}
function Textarea({value,onChange,placeholder,rows=3}){return <textarea value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} rows={rows} style={{width:"100%",boxSizing:"border-box",padding:"8px 10px",border:"1px solid #D0D8E0",borderRadius:"6px",fontSize:"13px",fontFamily:"sans-serif",outline:"none",resize:"vertical"}}/>;}
function SectionLabel({children}){return <div style={{fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",color:"#888",fontFamily:"sans-serif",marginBottom:"10px"}}>{children}</div>;}
function Modal({open,onClose,title,children}){if(!open)return null;return <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.45)",zIndex:1000,display:"flex",alignItems:"center",justifyContent:"center",padding:"20px"}} onClick={e=>{if(e.target===e.currentTarget)onClose();}}><div style={{background:"#fff",borderRadius:"10px",padding:"28px",width:"100%",maxWidth:"520px",maxHeight:"85vh",overflowY:"auto"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"20px"}}><div style={{fontSize:"16px",fontWeight:"600",color:"#1A1A1A",fontFamily:"sans-serif"}}>{title}</div><button onClick={onClose} style={{background:"none",border:"none",fontSize:"20px",cursor:"pointer",color:"#888",lineHeight:1}}>✕</button></div>{children}</div></div>;}

// ─── HTML GENERATORS ──────────────────────────────────────────────────────────
function generateMonthlyHTML(month,edits={}){
  const ac=month.accentColor,al=month.accentLight;
  const g=(k)=>edits[k]!==undefined?edits[k]:month[k];
  const gt=(s,i,k)=>{const key=`${s}_${i}_${k}`;return edits[key]!==undefined?edits[key]:month[s][i][k];};
  const todoRows=month.thingsToDo.map((item,i)=>`<tr><td style="padding:0 0 12px 0;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${al};border-left:3px solid ${ac};border-radius:6px;"><tr><td width="52" valign="top" style="padding:16px 0 16px 16px;font-size:22px;">${item.icon}</td><td style="padding:16px;"><div style="font-family:Georgia,serif;font-size:15px;font-weight:600;color:#1A1A1A;margin-bottom:4px;">${gt("thingsToDo",i,"title")}</div><div style="font-family:Arial,sans-serif;font-size:13px;color:#666;line-height:1.6;">${gt("thingsToDo",i,"desc")}</div></td></tr></table></td></tr>`).join("");
  const icons=["🗓️","🎉","🎵","🌟"];
  const eventRows=month.events.map((ev,i)=>`<tr><td style="padding:0 0 12px 0;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FAFAF8;border:1px solid #E8E0D6;border-radius:6px;"><tr><td width="52" valign="top" style="padding:16px 0 16px 16px;"><div style="width:36px;height:36px;background:${ac};border-radius:50%;text-align:center;line-height:36px;font-size:16px;">${icons[i%4]}</div></td><td style="padding:16px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="font-family:Georgia,serif;font-size:15px;font-weight:600;color:#1A1A1A;padding-bottom:4px;">${gt("events",i,"name")}</td><td align="right"><span style="font-family:Arial,sans-serif;font-size:11px;color:${ac};background:${al};padding:2px 10px;border-radius:12px;font-weight:600;">${gt("events",i,"date")}</span></td></tr><tr><td colspan="2" style="font-family:Arial,sans-serif;font-size:13px;color:#666;line-height:1.6;">${gt("events",i,"detail")}</td></tr></table></td></tr></table></td></tr>`).join("");
  return`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${g("heroSubject")}</title></head><body style="margin:0;padding:0;background:#F9F7F4;"><div style="display:none;max-height:0;overflow:hidden;">${g("preheader")}</div><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F9F7F4;"><tr><td align="center" style="padding:24px 16px;"><table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#fff;border:1px solid #E8E0D6;border-radius:8px;overflow:hidden;"><tr><td style="background:#1A1A1A;padding:12px 24px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9B8A6E;">Hotel E Santa Rosa</td><td align="right" style="font-family:Arial,sans-serif;font-size:11px;color:#666;">${PROP.email}</td></tr></table></td></tr><tr><td style="padding:0;"><img src="${PROP.heroImage}" alt="Hotel E" width="620" style="display:block;width:100%;max-width:620px;height:300px;object-fit:cover;"/><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${ac};"><tr><td style="padding:20px 32px 24px;"><div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.75);margin-bottom:8px;">${SEASON_ICONS[month.season]} ${month.season} &middot; ${month.name} 2026</div><div style="font-family:Georgia,serif;font-size:28px;color:#fff;line-height:1.25;margin-bottom:6px;">${g("tagline")}</div><div style="font-family:Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.8);font-style:italic;">${g("heroCaption")}</div></td></tr></table></td></tr><tr><td style="padding:36px 32px 8px;text-align:center;"><div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${ac};margin-bottom:12px;">${PROP.address}</div><p style="font-family:Georgia,serif;font-size:15px;color:#555;line-height:1.7;margin:0 0 24px;">${g("introCopy")}</p><a href="${PROP.bookingUrl}" style="display:inline-block;background:${ac};color:#fff;padding:13px 32px;border-radius:2px;text-decoration:none;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">${g("cta")}</a></td></tr><tr><td style="padding:28px 32px 0;"><hr style="border:none;border-top:1px solid #E8E0D6;margin:0;"/></td></tr><tr><td style="padding:32px 32px 8px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding-bottom:24px;"><div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#9B8A6E;margin-bottom:8px;">Things To Do</div><div style="font-family:Georgia,serif;font-size:24px;color:#1A1A1A;">Explore Sonoma in ${month.name}</div></td></tr>${todoRows}</table></td></tr><tr><td style="padding:16px 32px 0;"><hr style="border:none;border-top:1px solid #E8E0D6;margin:0;"/></td></tr><tr><td style="padding:32px 32px 8px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td align="center" style="padding-bottom:24px;"><div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#9B8A6E;margin-bottom:8px;">Area Events</div><div style="font-family:Georgia,serif;font-size:24px;color:#1A1A1A;">Don't Miss in ${month.name}</div></td></tr>${eventRows}</table></td></tr><tr><td style="padding:16px 32px 24px;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FAFAF8;border:1px solid #E8E0D6;border-radius:6px;"><tr><td align="center" style="padding:20px 12px;"><table cellpadding="0" cellspacing="0" border="0"><tr>${PROP.amenities.map(a=>`<td align="center" style="padding:0 14px;font-family:Arial,sans-serif;"><div style="font-size:20px;margin-bottom:4px;">${a.icon}</div><div style="font-size:12px;font-weight:600;color:#1A1A1A;">${a.label}</div><div style="font-size:11px;color:#999;">${a.sub}</div></td>`).join("")}</tr></table></td></tr></table></td></tr><tr><td style="background:${ac};padding:40px 32px;text-align:center;"><div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-bottom:12px;">${month.name} 2026</div><div style="font-family:Georgia,serif;font-size:28px;color:#fff;margin-bottom:12px;">Your Sonoma Adventure Awaits</div><p style="font-family:Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.85);margin:0 0 24px;line-height:1.6;">${g("ctaTagline")}</p><a href="${PROP.bookingUrl}" style="display:inline-block;background:#fff;color:${ac};padding:13px 36px;border-radius:2px;text-decoration:none;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">${g("cta")}</a></td></tr><tr><td style="background:#1A1A1A;padding:24px 32px;text-align:center;font-family:Arial,sans-serif;"><div style="color:#9B8A6E;font-size:13px;letter-spacing:1px;margin-bottom:8px;">Hotel E Santa Rosa</div><div style="color:#666;font-size:12px;line-height:1.8;">${PROP.address}<br/>${PROP.phone} &middot; ${PROP.email}</div><div style="margin-top:14px;font-size:11px;color:#555;"><a href="#" style="color:#9B8A6E;">Unsubscribe</a> &middot; <a href="${PROP.website}" style="color:#9B8A6E;">Visit Website</a></div></td></tr></table></td></tr></table></body></html>`;
}

function generateHotDatesHTML(year,month,hotDates,subject,preheader,introCopy,ctaCopy,urgencyCopy){
  const ac=AC,al=AL;const dIM=getDaysInMonth(year,month);const fD=getFirstDayOfWeek(year,month);
  const mn=MONTH_NAMES[month];const tC=Math.ceil((fD+dIM)/7)*7;
  let rows="";let rO=false;
  for(let c=0;c<tC;c++){const d=c-fD+1;const v=d>=1&&d<=dIM;const k=v?`${year}-${month}-${d}`:null;const h=k?hotDates[k]:null;if(c%7===0){if(rO)rows+=`</tr>`;rows+=`<tr>`;rO=true;}if(!v){rows+=`<td style="padding:4px;width:40px;height:44px;"></td>`;}else if(h){rows+=`<td align="center" style="padding:3px;width:40px;height:44px;"><div style="background:${ac};border-radius:8px;padding:4px 2px;width:36px;box-sizing:border-box;"><div style="font-family:Arial,sans-serif;font-size:13px;font-weight:700;color:#fff;line-height:1;">${d}</div><div style="font-family:Arial,sans-serif;font-size:10px;color:rgba(255,255,255,0.9);margin-top:2px;font-weight:600;">$${h.price}</div></div></td>`;}else{rows+=`<td align="center" style="padding:3px;width:40px;height:44px;"><div style="font-family:Arial,sans-serif;font-size:13px;color:#999;text-align:center;">${d}</div></td>`;}}if(rO)rows+=`</tr>`;
  const dH=DAY_LABELS.map(d=>`<td align="center" style="padding:4px 2px;font-family:Arial,sans-serif;font-size:11px;font-weight:700;color:#999;width:40px;">${d}</td>`).join("");
  const hL=Object.entries(hotDates).sort(([a],[b])=>Number(a.split("-")[2])-Number(b.split("-")[2])).map(([k,info])=>{const d=Number(k.split("-")[2]);const dow=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date(year,month,d).getDay()];return`<tr><td style="padding:0 0 10px 0;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${al};border-left:3px solid ${ac};border-radius:6px;"><tr><td style="padding:12px 16px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="font-family:Arial,sans-serif;font-size:14px;font-weight:600;color:#1A1A1A;">${dow}, ${mn} ${d}</td><td align="right"><span style="font-family:Arial,sans-serif;font-size:18px;font-weight:700;color:${ac};">$${info.price}</span><span style="font-family:Arial,sans-serif;font-size:11px;color:#888;"> / night</span></td></tr>${info.note?`<tr><td colspan="2" style="font-family:Arial,sans-serif;font-size:12px;color:#666;padding-top:3px;">${info.note}</td></tr>`:""}</table></td></tr></table></td></tr>`;}).join("");
  return`<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"/><meta name="viewport" content="width=device-width,initial-scale=1.0"/><title>${subject}</title></head><body style="margin:0;padding:0;background:#F9F7F4;"><div style="display:none;max-height:0;overflow:hidden;">${preheader}</div><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F9F7F4;"><tr><td align="center" style="padding:24px 16px;"><table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#fff;border:1px solid #E8E0D6;border-radius:8px;overflow:hidden;"><tr><td style="background:#1A1A1A;padding:12px 24px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr><td style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9B8A6E;">Hotel E Santa Rosa</td><td align="right" style="font-family:Arial,sans-serif;font-size:11px;color:#666;">${PROP.email}</td></tr></table></td></tr><tr><td style="padding:0;"><img src="${PROP.heroImage}" alt="Hotel E" width="620" style="display:block;width:100%;height:280px;object-fit:cover;"/><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${ac};"><tr><td style="padding:20px 32px 22px;"><div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.65);margin-bottom:6px;">🔥 Limited Time Offer &middot; ${mn} ${year}</div><div style="font-family:Georgia,serif;font-size:30px;color:#fff;line-height:1.2;margin-bottom:6px;">Hot Dates — Starting at $${FLOOR_PRICE}</div><div style="font-family:Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.8);font-style:italic;">${PROP.tagline}</div></td></tr></table></td></tr><tr><td style="padding:32px 32px 8px;text-align:center;"><div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${ac};margin-bottom:12px;">${PROP.address}</div><p style="font-family:Georgia,serif;font-size:15px;color:#444;line-height:1.7;margin:0 0 8px;text-align:left;">${introCopy}</p><p style="font-family:Arial,sans-serif;font-size:13px;color:#E05A00;font-weight:700;text-align:left;margin:0 0 20px;">⚠️ ${urgencyCopy}</p><a href="${PROP.bookingUrl}" style="display:inline-block;background:${ac};color:#fff;padding:14px 36px;border-radius:2px;text-decoration:none;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">${ctaCopy}</a></td></tr><tr><td style="padding:28px 32px 0;"><hr style="border:none;border-top:1px solid #E8E0D6;margin:0;"/></td></tr><tr><td style="padding:32px 32px 8px;"><div style="text-align:center;margin-bottom:20px;"><div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#9B8A6E;margin-bottom:8px;">Hot Dates Calendar</div><div style="font-family:Georgia,serif;font-size:22px;color:#1A1A1A;">${mn} ${year}</div></div><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FAFAF8;border:1px solid #E8E0D6;border-radius:8px;"><tr><td style="padding:16px 12px;"><table width="100%" cellpadding="0" cellspacing="0" border="0"><tr>${dH}</tr>${rows}</table></td></tr></table></td></tr><tr><td style="padding:16px 32px 0;"><hr style="border:none;border-top:1px solid #E8E0D6;margin:0;"/></td></tr><tr><td style="padding:28px 32px 8px;"><div style="text-align:center;margin-bottom:20px;"><div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#9B8A6E;margin-bottom:8px;">🔥 Hot Dates</div><div style="font-family:Georgia,serif;font-size:22px;color:#1A1A1A;">Available at a Discount</div></div><table width="100%" cellpadding="0" cellspacing="0" border="0">${hL}</table><div style="text-align:center;margin-top:12px;"><a href="${PROP.bookingUrl}" style="display:inline-block;background:${ac};color:#fff;padding:13px 32px;border-radius:2px;text-decoration:none;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">${ctaCopy}</a></div></td></tr><tr><td style="padding:16px 32px 24px;"><table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FAFAF8;border:1px solid #E8E0D6;border-radius:6px;"><tr><td align="center" style="padding:18px 8px;"><table cellpadding="0" cellspacing="0" border="0"><tr>${PROP.amenities.map(a=>`<td align="center" style="padding:0 14px;font-family:Arial,sans-serif;"><div style="font-size:20px;margin-bottom:4px;">${a.icon}</div><div style="font-size:11px;font-weight:600;color:#1A1A1A;">${a.label}</div><div style="font-size:10px;color:#999;">${a.sub}</div></td>`).join("")}</tr></table></td></tr></table></td></tr><tr><td style="padding:0 32px 24px;"><p style="font-family:Arial,sans-serif;font-size:11px;color:#aaa;line-height:1.6;margin:0;">Hot Date pricing reflects a limited-time discount. Rates from $${FLOOR_PRICE}/night. Offer valid while availability lasts.</p></td></tr><tr><td style="background:#1A1A1A;padding:24px 32px;text-align:center;font-family:Arial,sans-serif;"><div style="color:#9B8A6E;font-size:13px;letter-spacing:1px;margin-bottom:8px;">Hotel E Santa Rosa</div><div style="color:#666;font-size:12px;line-height:1.8;">${PROP.address}<br/>${PROP.phone} &middot; ${PROP.email}</div><div style="margin-top:14px;font-size:11px;color:#555;"><a href="#" style="color:#9B8A6E;">Unsubscribe</a> &middot; <a href="${PROP.website}" style="color:#9B8A6E;">Visit Website</a></div></td></tr></table></td></tr></table></body></html>`;
}

// ─── SEND MODAL ───────────────────────────────────────────────────────────────
function SendModal({open,onClose,subject,htmlBody,type,monthName}){
  const [lists,setLists]   = useState([]);
  const [listId,setListId] = useState("");
  const [stats,setStats]   = useState(null);
  const [campaignName,setCampaignName] = useState(`${monthName ?? type} — ${new Date().toLocaleDateString()}`);
  const [previewEmail,setPreviewEmail] = useState("");
  const [status,setStatus] = useState("idle"); // idle | saving | sending | previewing | done | error
  const [result,setResult] = useState(null);

  useEffect(()=>{
    if(!open) return;
    db.getLists().then(l=>{ setLists(l); if(l.length) setListId(l[0].id); }).catch(console.error);
  },[open]);

  useEffect(()=>{
    if(!listId) return;
    db.getSubscriberStats(listId).then(setStats).catch(console.error);
  },[listId]);

  async function handleSendPreview(){
    if(!previewEmail) return;
    setStatus("previewing");
    try {
      const camp = await db.saveCampaign({ name:`[PREVIEW] ${campaignName}`, type, subject, preheader:"", htmlBody, listId });
      await db.sendCampaign(camp.id, previewEmail);
      setStatus("done"); setResult({ preview:true, email: previewEmail });
    } catch(e){ setStatus("error"); setResult({ error: e.message }); }
  }

  async function handleSend(){
    if(!listId){ alert("Select a list first."); return; }
    setStatus("sending");
    try {
      const camp = await db.saveCampaign({ name:campaignName, type, subject, preheader:"", htmlBody, listId });
      const res  = await db.sendCampaign(camp.id);
      setStatus("done"); setResult(res);
    } catch(e){ setStatus("error"); setResult({ error: e.message }); }
  }

  const busy = status === "sending" || status === "previewing" || status === "saving";

  return <Modal open={open} onClose={()=>{if(!busy){setStatus("idle");setResult(null);onClose();}}} title="Send Campaign">
    {status === "done" ? (
      <div style={{textAlign:"center",padding:"20px 0"}}>
        {result?.preview
          ? <><div style={{fontSize:"36px",marginBottom:"12px"}}>📬</div><div style={{fontSize:"16px",fontWeight:"600",color:"#1A1A1A",marginBottom:"8px"}}>Preview sent!</div><div style={{fontSize:"13px",color:"#666"}}>Check {result.email} for your preview email.</div></>
          : <><div style={{fontSize:"36px",marginBottom:"12px"}}>✅</div><div style={{fontSize:"16px",fontWeight:"600",color:"#1A1A1A",marginBottom:"8px"}}>Campaign sent!</div><div style={{fontSize:"13px",color:"#666"}}>{result?.sent ?? 0} sent · {result?.failed ?? 0} failed</div></>
        }
        <Btn onClick={()=>{setStatus("idle");setResult(null);onClose();}} bg={AC} style={{marginTop:"20px"}}>Close</Btn>
      </div>
    ) : status === "error" ? (
      <div style={{textAlign:"center",padding:"20px 0"}}>
        <div style={{fontSize:"36px",marginBottom:"12px"}}>⚠️</div>
        <div style={{fontSize:"14px",color:"#E05A00",marginBottom:"16px"}}>{result?.error ?? "Something went wrong."}</div>
        <Btn onClick={()=>setStatus("idle")} bg="#555">Try Again</Btn>
      </div>
    ) : (
      <>
        <div style={{marginBottom:"16px"}}>
          <SectionLabel>Campaign Name (internal)</SectionLabel>
          <Input value={campaignName} onChange={setCampaignName}/>
        </div>
        <div style={{marginBottom:"16px"}}>
          <SectionLabel>Subject Line</SectionLabel>
          <div style={{padding:"9px 12px",background:"#F8FAFC",border:"1px solid #E0E4E8",borderRadius:"6px",fontSize:"13px",color:"#444",fontFamily:"sans-serif"}}>{subject}</div>
        </div>
        <div style={{marginBottom:"16px"}}>
          <SectionLabel>Send to List</SectionLabel>
          <select value={listId} onChange={e=>setListId(e.target.value)} style={{width:"100%",padding:"8px 10px",border:"1px solid #D0D8E0",borderRadius:"6px",fontSize:"13px",fontFamily:"sans-serif",outline:"none"}}>
            {lists.map(l=><option key={l.id} value={l.id}>{l.name}</option>)}
          </select>
          {stats && <div style={{marginTop:"6px",fontSize:"12px",color:"#888",fontFamily:"sans-serif"}}>
            {stats.active} active · {stats.unsubscribed} unsubscribed · {stats.total} total
          </div>}
        </div>
        <div style={{background:"#FFF8F0",border:"1px solid #F0C080",borderRadius:"8px",padding:"14px",marginBottom:"20px"}}>
          <div style={{fontSize:"12px",fontWeight:"600",color:"#7A4A00",fontFamily:"sans-serif",marginBottom:"8px"}}>Send a preview first</div>
          <div style={{display:"flex",gap:"8px"}}>
            <Input value={previewEmail} onChange={setPreviewEmail} placeholder="your@email.com" style={{flex:1}}/>
            <Btn onClick={handleSendPreview} disabled={!previewEmail||busy} bg="#E05A00" style={{whiteSpace:"nowrap"}}>{status==="previewing"?"Sending…":"Send Preview"}</Btn>
          </div>
        </div>
        <div style={{display:"flex",gap:"10px",justifyContent:"flex-end"}}>
          <Btn onClick={onClose} bg="#fff" border="1px solid #D0D8E0" color="#444">Cancel</Btn>
          <Btn onClick={handleSend} disabled={!listId||busy} bg={AC}>{status==="sending"?`Sending to ${stats?.active??"…"}…`:`Send to ${stats?.active??"…"} subscribers`}</Btn>
        </div>
      </>
    )}
  </Modal>;
}

// ─── SUBSCRIBERS PANEL ────────────────────────────────────────────────────────
function SubscribersPanel(){
  const [lists,setLists]         = useState([]);
  const [activeList,setActiveList]= useState(null);
  const [subscribers,setSubscribers]=useState([]);
  const [stats,setStats]         = useState(null);
  const [loading,setLoading]     = useState(true);
  const [addModal,setAddModal]   = useState(false);
  const [newListModal,setNewListModal]=useState(false);
  const [csvModal,setCsvModal]   = useState(false);
  const [newEmail,setNewEmail]   = useState("");
  const [newFirst,setNewFirst]   = useState("");
  const [newLast,setNewLast]     = useState("");
  const [newListName,setNewListName]=useState("");
  const [csvText,setCsvText]     = useState("");
  const [saving,setSaving]       = useState(false);
  const [msg,setMsg]             = useState(null);

  async function load(){
    setLoading(true);
    try {
      const l = await db.getLists(); setLists(l);
      const lid = activeList ?? l[0]?.id ?? null;
      if(!activeList && l[0]) setActiveList(l[0].id);
      const [subs,st] = await Promise.all([db.getSubscribers(lid),db.getSubscriberStats(lid)]);
      setSubscribers(subs); setStats(st);
    } catch(e){ console.error(e); }
    setLoading(false);
  }
  useEffect(()=>{ load(); },[activeList]);

  async function handleAdd(){
    if(!newEmail){ return; }
    setSaving(true);
    try { await db.addSubscriber(newEmail,newFirst,newLast,activeList); setMsg("Subscriber added."); setAddModal(false); setNewEmail("");setNewFirst("");setNewLast(""); load(); }
    catch(e){ setMsg("Error: "+e.message); }
    setSaving(false);
  }

  async function handleCreateList(){
    if(!newListName) return;
    setSaving(true);
    try { const l=await db.createList(newListName); setActiveList(l.id); setNewListName(""); setNewListModal(false); load(); }
    catch(e){ setMsg("Error: "+e.message); }
    setSaving(false);
  }

  async function handleCSVImport(){
    const lines = csvText.trim().split("\n").filter(Boolean);
    const rows = lines.map(line=>{
      const [email,first_name,last_name] = line.split(",").map(s=>s.trim().replace(/^"|"$/g,""));
      return { email, first_name:first_name??null, last_name:last_name??null };
    }).filter(r=>r.email);
    setSaving(true);
    try { const n=await db.importSubscribers(rows,activeList); setMsg(`${n} subscribers imported.`); setCsvModal(false); setCsvText(""); load(); }
    catch(e){ setMsg("Error: "+e.message); }
    setSaving(false);
  }

  async function handleRemove(id){
    if(!confirm("Unsubscribe this contact?")) return;
    await db.removeSubscriber(id); load();
  }

  const statusColor = {active:"#2E6B3A", unsubscribed:"#888", bounced:"#E05A00"};
  const statusBg    = {active:"#E8F5EC", unsubscribed:"#F0F0F0", bounced:"#FFF0E6"};

  return(
    <div style={{maxWidth:"1100px",margin:"0 auto",padding:"24px"}}>
      {msg&&<div style={{background:"#E8F5EC",border:"1px solid #2E6B3A",borderRadius:"6px",padding:"10px 14px",marginBottom:"16px",fontFamily:"sans-serif",fontSize:"13px",color:"#2E6B3A",display:"flex",justifyContent:"space-between"}}>{msg}<button onClick={()=>setMsg(null)} style={{background:"none",border:"none",cursor:"pointer",color:"#2E6B3A",fontSize:"16px",lineHeight:1}}>✕</button></div>}

      {/* Stats row */}
      {stats && <div style={{display:"flex",gap:"12px",marginBottom:"20px",flexWrap:"wrap"}}>
        {[{label:"Total",val:stats.total,color:AC},{label:"Active",val:stats.active,color:"#2E6B3A"},{label:"Unsubscribed",val:stats.unsubscribed,color:"#888"},{label:"Bounced",val:stats.bounced,color:"#E05A00"}].map(s=>(
          <div key={s.label} style={{background:"#fff",border:"1px solid #E8E0D6",borderRadius:"8px",padding:"14px 20px",minWidth:"100px",flex:1}}>
            <div style={{fontSize:"24px",fontWeight:"700",color:s.color,fontFamily:"sans-serif"}}>{s.val}</div>
            <div style={{fontSize:"11px",color:"#888",fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"1px",marginTop:"2px"}}>{s.label}</div>
          </div>
        ))}
      </div>}

      <div style={{display:"flex",gap:"16px",alignItems:"flex-start"}}>
        {/* List sidebar */}
        <div style={{width:"180px",flexShrink:0}}>
          <SectionLabel>Lists</SectionLabel>
          {lists.map(l=>(
            <button key={l.id} onClick={()=>setActiveList(l.id)} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 12px",marginBottom:"4px",borderRadius:"6px",border:"none",background:activeList===l.id?AL:"transparent",color:activeList===l.id?AC:"#555",fontWeight:activeList===l.id?"600":"400",cursor:"pointer",fontSize:"13px",fontFamily:"sans-serif"}}>{l.name}</button>
          ))}
          <button onClick={()=>setNewListModal(true)} style={{display:"block",width:"100%",textAlign:"left",padding:"8px 12px",borderRadius:"6px",border:"1px dashed #D0D8E0",background:"transparent",color:"#888",cursor:"pointer",fontSize:"12px",fontFamily:"sans-serif",marginTop:"8px"}}>+ New List</button>
        </div>

        {/* Subscribers table */}
        <div style={{flex:1}}>
          <div style={{display:"flex",gap:"8px",marginBottom:"16px",justifyContent:"flex-end"}}>
            <Btn onClick={()=>setCsvModal(true)} bg="#fff" border="1px solid #D0D8E0" color="#444">⬆ Import CSV</Btn>
            <Btn onClick={()=>setAddModal(true)} bg={AC}>+ Add Subscriber</Btn>
          </div>
          <div style={{background:"#fff",border:"1px solid #E8E0D6",borderRadius:"8px",overflow:"hidden"}}>
            <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"sans-serif",fontSize:"13px"}}>
              <thead><tr style={{background:"#FAFAF8",borderBottom:"1px solid #E8E0D6"}}>
                <th style={{padding:"10px 14px",textAlign:"left",fontWeight:"600",color:"#555",fontSize:"11px",textTransform:"uppercase",letterSpacing:"1px"}}>Email</th>
                <th style={{padding:"10px 14px",textAlign:"left",fontWeight:"600",color:"#555",fontSize:"11px",textTransform:"uppercase",letterSpacing:"1px"}}>Name</th>
                <th style={{padding:"10px 14px",textAlign:"left",fontWeight:"600",color:"#555",fontSize:"11px",textTransform:"uppercase",letterSpacing:"1px"}}>Status</th>
                <th style={{padding:"10px 14px",textAlign:"left",fontWeight:"600",color:"#555",fontSize:"11px",textTransform:"uppercase",letterSpacing:"1px"}}>Added</th>
                <th style={{padding:"10px 14px"}}></th>
              </tr></thead>
              <tbody>
                {loading ? <tr><td colSpan={5} style={{padding:"32px",textAlign:"center",color:"#aaa"}}>Loading…</td></tr>
                : subscribers.length === 0 ? <tr><td colSpan={5} style={{padding:"32px",textAlign:"center",color:"#aaa"}}>No subscribers yet. Import a CSV or add manually.</td></tr>
                : subscribers.map(s=>(
                  <tr key={s.id} style={{borderBottom:"1px solid #F0EDE8"}}>
                    <td style={{padding:"10px 14px",color:"#1A1A1A"}}>{s.email}</td>
                    <td style={{padding:"10px 14px",color:"#555"}}>{[s.first_name,s.last_name].filter(Boolean).join(" ")||"—"}</td>
                    <td style={{padding:"10px 14px"}}><Tag color={statusColor[s.status]??""} bg={statusBg[s.status]??"#eee"}>{s.status}</Tag></td>
                    <td style={{padding:"10px 14px",color:"#888",fontSize:"12px"}}>{new Date(s.created_at).toLocaleDateString()}</td>
                    <td style={{padding:"10px 14px",textAlign:"right"}}><button onClick={()=>handleRemove(s.id)} style={{background:"none",border:"none",cursor:"pointer",color:"#ccc",fontSize:"16px",lineHeight:1}} title="Unsubscribe">✕</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add subscriber modal */}
      <Modal open={addModal} onClose={()=>setAddModal(false)} title="Add Subscriber">
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          <div><SectionLabel>Email *</SectionLabel><Input value={newEmail} onChange={setNewEmail} placeholder="guest@example.com"/></div>
          <div style={{display:"flex",gap:"10px"}}><div style={{flex:1}}><SectionLabel>First Name</SectionLabel><Input value={newFirst} onChange={setNewFirst} placeholder="Jane"/></div><div style={{flex:1}}><SectionLabel>Last Name</SectionLabel><Input value={newLast} onChange={setNewLast} placeholder="Smith"/></div></div>
          <div style={{display:"flex",gap:"8px",justifyContent:"flex-end",marginTop:"8px"}}>
            <Btn onClick={()=>setAddModal(false)} bg="#fff" border="1px solid #D0D8E0" color="#444">Cancel</Btn>
            <Btn onClick={handleAdd} disabled={!newEmail||saving} bg={AC}>{saving?"Saving…":"Add Subscriber"}</Btn>
          </div>
        </div>
      </Modal>

      {/* New list modal */}
      <Modal open={newListModal} onClose={()=>setNewListModal(false)} title="Create New List">
        <div style={{display:"flex",flexDirection:"column",gap:"12px"}}>
          <div><SectionLabel>List Name</SectionLabel><Input value={newListName} onChange={setNewListName} placeholder="e.g. Past Guests, VIP, Summer 2026"/></div>
          <div style={{display:"flex",gap:"8px",justifyContent:"flex-end",marginTop:"8px"}}>
            <Btn onClick={()=>setNewListModal(false)} bg="#fff" border="1px solid #D0D8E0" color="#444">Cancel</Btn>
            <Btn onClick={handleCreateList} disabled={!newListName||saving} bg={AC}>{saving?"Creating…":"Create List"}</Btn>
          </div>
        </div>
      </Modal>

      {/* CSV import modal */}
      <Modal open={csvModal} onClose={()=>setCsvModal(false)} title="Import CSV">
        <div style={{fontFamily:"sans-serif",fontSize:"13px",color:"#666",marginBottom:"12px",lineHeight:"1.6"}}>
          Paste CSV rows: <code style={{background:"#F4F6F8",padding:"2px 6px",borderRadius:"4px"}}>email, first_name, last_name</code><br/>Header row optional — one contact per line.
        </div>
        <Textarea value={csvText} onChange={setCsvText} placeholder={"guest@example.com, Jane, Smith\nanother@email.com, John, Doe"} rows={8}/>
        <div style={{display:"flex",gap:"8px",justifyContent:"flex-end",marginTop:"12px"}}>
          <Btn onClick={()=>setCsvModal(false)} bg="#fff" border="1px solid #D0D8E0" color="#444">Cancel</Btn>
          <Btn onClick={handleCSVImport} disabled={!csvText.trim()||saving} bg={AC}>{saving?"Importing…":"Import"}</Btn>
        </div>
      </Modal>
    </div>
  );
}

// ─── CAMPAIGN HISTORY PANEL ───────────────────────────────────────────────────
function HistoryPanel(){
  const [campaigns,setCampaigns]=useState([]);
  const [loading,setLoading]=useState(true);

  useEffect(()=>{
    db.getCampaigns().then(c=>{setCampaigns(c);setLoading(false);}).catch(console.error);
  },[]);

  const statusColor={draft:"#888",scheduled:AC,sending:"#E05A00",sent:"#2E6B3A",failed:"#E05A00"};
  const statusBg   ={draft:"#F0F0F0",scheduled:AL,sending:"#FFF0E6",sent:"#E8F5EC",failed:"#FFF0E6"};

  return(
    <div style={{maxWidth:"1100px",margin:"0 auto",padding:"24px"}}>
      <div style={{background:"#fff",border:"1px solid #E8E0D6",borderRadius:"8px",overflow:"hidden"}}>
        <table style={{width:"100%",borderCollapse:"collapse",fontFamily:"sans-serif",fontSize:"13px"}}>
          <thead><tr style={{background:"#FAFAF8",borderBottom:"1px solid #E8E0D6"}}>
            {["Campaign","Type","Subject","List","Status","Sent","Recipients"].map(h=>(
              <th key={h} style={{padding:"10px 14px",textAlign:"left",fontWeight:"600",color:"#555",fontSize:"11px",textTransform:"uppercase",letterSpacing:"1px"}}>{h}</th>
            ))}
          </tr></thead>
          <tbody>
            {loading ? <tr><td colSpan={7} style={{padding:"32px",textAlign:"center",color:"#aaa"}}>Loading…</td></tr>
            : campaigns.length===0 ? <tr><td colSpan={7} style={{padding:"32px",textAlign:"center",color:"#aaa"}}>No campaigns sent yet.</td></tr>
            : campaigns.map(c=>(
              <tr key={c.id} style={{borderBottom:"1px solid #F0EDE8"}}>
                <td style={{padding:"10px 14px",color:"#1A1A1A",fontWeight:"500"}}>{c.name}</td>
                <td style={{padding:"10px 14px"}}><Tag color={AC} bg={AL}>{c.type}</Tag></td>
                <td style={{padding:"10px 14px",color:"#555",maxWidth:"200px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{c.subject}</td>
                <td style={{padding:"10px 14px",color:"#666"}}>{c.lists?.name??"—"}</td>
                <td style={{padding:"10px 14px"}}><Tag color={statusColor[c.status]??""} bg={statusBg[c.status]??"#eee"}>{c.status}</Tag></td>
                <td style={{padding:"10px 14px",color:"#888",fontSize:"12px"}}>{c.sent_at?new Date(c.sent_at).toLocaleDateString():"—"}</td>
                <td style={{padding:"10px 14px",color:"#888",fontSize:"12px"}}>{c.status==="sent"?"✓":"—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── MONTHLY CAMPAIGN ─────────────────────────────────────────────────────────
function MonthlyCampaign(){
  const [sel,setSel]         = useState(0);
  const [view,setView]       = useState("preview");
  const [downloaded,setDL]   = useState(null);
  const [editMode,setEdit]   = useState(false);
  const [allEdits,setAllEdits]= useState(()=>MONTHS.map(()=>({})));
  const [sendOpen,setSendOpen]= useState(false);

  const month=MONTHS[sel];
  const accent=month.accentColor, accentLight=month.accentLight;
  const edits=allEdits[sel];
  const setE =useCallback((k,v)=>{setAllEdits(p=>{const n=[...p];n[sel]={...n[sel],[k]:v};return n;});},[sel]);
  const setNE=useCallback((s,i,k,v)=>{setE(`${s}_${i}_${k}`,v);},[setE]);
  const g=(k)=>edits[k]!==undefined?edits[k]:month[k];
  const gt=(s,i,k)=>{const key=`${s}_${i}_${k}`;return edits[key]!==undefined?edits[key]:month[s][i][key];};
  const hasEdits=Object.keys(edits).length>0;
  function dlCurrent(){const html=generateMonthlyHTML(month,edits);const blob=new Blob([html],{type:"text/html"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`hotel-e-${month.name.toLowerCase()}-2026.html`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);setDL(month.name);setTimeout(()=>setDL(null),2500);}
  function dlAll(){MONTHS.forEach((m,i)=>setTimeout(()=>{const html=generateMonthlyHTML(m,allEdits[i]||{});const blob=new Blob([html],{type:"text/html"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`hotel-e-${m.name.toLowerCase()}-2026.html`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);},i*200));setDL("all");setTimeout(()=>setDL(null),3000);}
  const E=({fk,ml,style})=>editMode?<EditableField value={g(fk)} onChange={v=>setE(fk,v)} multiline={ml} style={style}/>:<span style={style}>{g(fk)}</span>;
  const EN=({s,i,fk,ml,style})=>editMode?<EditableField value={gt(s,i,fk)} onChange={v=>setNE(s,i,fk,v)} multiline={ml} style={style}/>:<span style={style}>{gt(s,i,fk)}</span>;
  const iSt={padding:"6px 12px",borderRadius:"4px",border:"1px solid #444",background:"transparent",color:"#fff",cursor:"pointer",fontSize:"12px"};

  return(<div>
    <div style={{background:"#111",padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
      <span style={{fontFamily:"sans-serif",fontSize:"12px",color:"#777"}}>Monthly Campaign</span>
      <div style={{display:"flex",gap:"8px",flexWrap:"wrap"}}>
        <button onClick={()=>setView("list")} style={{...iSt,background:view==="list"?"#9B8A6E":"transparent"}}>All Months</button>
        <button onClick={()=>setView("preview")} style={{...iSt,background:view==="preview"?"#9B8A6E":"transparent"}}>Preview</button>
        <button onClick={()=>setEdit(m=>!m)} style={{...iSt,border:`1px solid ${editMode?"#F0B429":"#666"}`,background:editMode?"#F0B429":"transparent",color:editMode?"#1A1A1A":"#F0B429",fontWeight:editMode?"700":"400"}}>{editMode?"✏️ Editing On":"✏️ Edit Text"}</button>
        <button onClick={dlAll} style={{...iSt,border:"1px solid #9B8A6E",color:downloaded==="all"?"#fff":"#9B8A6E",background:downloaded==="all"?"#9B8A6E":"transparent"}}>{downloaded==="all"?"⬇ Downloading…":"⬇ All 12"}</button>
      </div>
    </div>
    {editMode&&<div style={{background:"#FFFBEA",borderBottom:"1px solid #F0B429",padding:"8px 24px",fontFamily:"sans-serif",fontSize:"13px",color:"#7A5700",display:"flex",gap:"16px",alignItems:"center",flexWrap:"wrap"}}><span>✏️ <strong>Edit mode on</strong> — click any text to edit.</span>{hasEdits&&<button onClick={()=>setAllEdits(p=>{const n=[...p];n[sel]={};return n;})} style={{padding:"3px 10px",fontSize:"12px",background:"#fff",border:"1px solid #F0B429",borderRadius:"4px",color:"#7A5700",cursor:"pointer"}}>Reset {month.name}</button>}</div>}

    {view==="list"?(
      <div style={{padding:"24px",maxWidth:"1100px",margin:"0 auto"}}><div style={{display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(210px,1fr))",gap:"12px"}}>{MONTHS.map((m,i)=>(<div key={m.id} style={{background:"#fff",border:`2px solid ${sel===i?m.accentColor:"#E8E0D6"}`,borderRadius:"8px",padding:"14px"}}><div style={{fontSize:"11px",color:m.accentColor,fontFamily:"sans-serif",textTransform:"uppercase",marginBottom:"5px"}}>{m.name}</div><div style={{fontSize:"12px",color:"#666",fontStyle:"italic",marginBottom:"10px"}}>"{m.tagline}"</div><div style={{display:"flex",gap:"6px"}}><button onClick={()=>{setSel(i);setView("preview");}} style={{flex:1,padding:"6px 0",background:m.accentLight,color:m.accentColor,border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"12px",fontFamily:"sans-serif",fontWeight:"600"}}>Preview</button><button onClick={()=>{const html=generateMonthlyHTML(m,allEdits[i]||{});const blob=new Blob([html],{type:"text/html"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`hotel-e-${m.name.toLowerCase()}-2026.html`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);}} style={{flex:1,padding:"6px 0",background:m.accentColor,color:"#fff",border:"none",borderRadius:"4px",cursor:"pointer",fontSize:"12px",fontFamily:"sans-serif",fontWeight:"600"}}>⬇ HTML</button></div></div>))}</div></div>
    ):(
      <div style={{display:"flex",maxWidth:"1200px",margin:"0 auto"}}>
        <div style={{width:"140px",flexShrink:0,background:"#fff",borderRight:"1px solid #E8E0D6",minHeight:"calc(100vh - 120px)"}}>{MONTHS.map((m,i)=>(<button key={m.id} onClick={()=>setSel(i)} style={{display:"block",width:"100%",padding:"9px 12px",textAlign:"left",background:sel===i?m.accentLight:"transparent",border:"none",borderLeft:`3px solid ${sel===i?m.accentColor:"transparent"}`,cursor:"pointer",fontSize:"13px",color:sel===i?m.accentColor:"#555",fontWeight:sel===i?"600":"400",fontFamily:"sans-serif",position:"relative"}}>{m.name}{Object.keys(allEdits[i]).length>0&&<span style={{position:"absolute",right:"7px",top:"50%",transform:"translateY(-50%)",width:"5px",height:"5px",borderRadius:"50%",background:"#F0B429"}}/>}</button>))}</div>
        <div style={{flex:1,padding:"16px 20px",overflowY:"auto"}}>
          <div style={{background:"#fff",border:"1px solid #E8E0D6",borderRadius:"8px",padding:"12px 16px",marginBottom:"14px",display:"flex",flexWrap:"wrap",gap:"12px",alignItems:"center",justifyContent:"space-between",fontFamily:"sans-serif"}}>
            <div style={{flex:1,minWidth:"180px"}}>
              <div style={{fontSize:"10px",color:"#999",textTransform:"uppercase",letterSpacing:"1px",marginBottom:"2px"}}>Subject</div>
              {editMode?<EditableField value={g("heroSubject")} onChange={v=>setE("heroSubject",v)} style={{fontSize:"13px",fontWeight:"500",color:"#1A1A1A"}}/>:<div style={{fontSize:"13px",fontWeight:"500",color:"#1A1A1A"}}>{g("heroSubject")}</div>}
              <div style={{fontSize:"10px",color:"#999",marginTop:"4px"}}>Preview: {g("preheader")}</div>
            </div>
            <div style={{display:"flex",gap:"8px"}}>
              <Btn onClick={dlCurrent} bg={downloaded===month.name?"#3D6B35":accent}>{downloaded===month.name?"✓ Downloaded!":`⬇ ${month.name} HTML`}</Btn>
              <Btn onClick={()=>setSendOpen(true)} bg="#E05A00">✉ Send Campaign</Btn>
            </div>
          </div>

          {/* Email preview (condensed) */}
          <div style={{maxWidth:"620px",margin:"0 auto",background:"#fff",border:"1px solid #E8E0D6",borderRadius:"8px",overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>
            <div style={{background:"#1A1A1A",padding:"12px 24px",display:"flex",justifyContent:"space-between"}}><span style={{color:"#9B8A6E",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase"}}>Hotel E Santa Rosa</span><span style={{color:"#666",fontSize:"11px"}}>{PROP.email}</span></div>
            <div style={{position:"relative"}}><img src={PROP.heroImage} alt="" style={{width:"100%",height:"240px",objectFit:"cover",display:"block"}}/><div style={{position:"absolute",inset:0,background:`linear-gradient(to bottom,${accent}11,${accent}CC)`}}/><div style={{position:"absolute",bottom:0,left:0,right:0,padding:"18px 28px",background:accent}}><div style={{fontSize:"11px",letterSpacing:"3px",textTransform:"uppercase",color:"rgba(255,255,255,0.75)",fontFamily:"sans-serif",marginBottom:"5px"}}>{SEASON_ICONS[month.season]} {month.season} · {month.name} 2026</div><div style={{fontSize:"24px",color:"#fff",lineHeight:1.2,marginBottom:"4px"}}><E fk="tagline" style={{color:"#fff",fontSize:"24px"}}/></div><div style={{fontSize:"12px",color:"rgba(255,255,255,0.85)",fontStyle:"italic"}}><E fk="heroCaption" style={{fontSize:"12px"}}/></div></div></div>
            <div style={{padding:"22px 28px 8px",textAlign:"center"}}><div style={{fontSize:"11px",letterSpacing:"3px",textTransform:"uppercase",color:accent,fontFamily:"sans-serif",marginBottom:"8px"}}>{PROP.address}</div><div style={{color:"#555",lineHeight:1.7,fontSize:"14px",margin:"0 0 14px",textAlign:"left"}}><E fk="introCopy" ml style={{fontSize:"14px",color:"#555",lineHeight:1.7}}/></div><div style={{display:"inline-block",background:accent,color:"#fff",padding:"10px 22px",borderRadius:"2px",fontSize:"12px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"sans-serif",fontWeight:"700"}}><E fk="cta" style={{color:"#fff",fontSize:"12px"}}/></div></div>
            <div style={{margin:"18px 28px 0",borderTop:"1px solid #E8E0D6"}}/>
            <div style={{padding:"18px 28px 8px"}}><div style={{textAlign:"center",marginBottom:"14px"}}><div style={{fontSize:"10px",letterSpacing:"3px",textTransform:"uppercase",color:"#9B8A6E",fontFamily:"sans-serif",marginBottom:"5px"}}>Things To Do</div><div style={{fontSize:"18px",color:"#1A1A1A"}}>Explore Sonoma in {month.name}</div></div>{month.thingsToDo.map((item,i)=>(<div key={i} style={{display:"flex",gap:"10px",marginBottom:"10px",padding:"11px",background:accentLight,borderRadius:"6px",borderLeft:`3px solid ${accent}`}}><span style={{fontSize:"18px",flexShrink:0}}>{item.icon}</span><div style={{flex:1}}><div style={{fontSize:"13px",fontWeight:"600",color:"#1A1A1A",marginBottom:"2px"}}><EN s="thingsToDo" i={i} fk="title" style={{fontSize:"13px",fontWeight:"600",color:"#1A1A1A"}}/></div><div style={{fontSize:"12px",color:"#666",lineHeight:1.5}}><EN s="thingsToDo" i={i} fk="desc" ml style={{fontSize:"12px",color:"#666"}}/></div></div></div>))}</div>
            <div style={{margin:"10px 28px 0",borderTop:"1px solid #E8E0D6"}}/>
            <div style={{padding:"18px 28px 8px"}}><div style={{textAlign:"center",marginBottom:"14px"}}><div style={{fontSize:"10px",letterSpacing:"3px",textTransform:"uppercase",color:"#9B8A6E",fontFamily:"sans-serif",marginBottom:"5px"}}>Area Events</div><div style={{fontSize:"18px",color:"#1A1A1A"}}>Don't Miss in {month.name}</div></div>{month.events.map((ev,i)=>(<div key={i} style={{marginBottom:"8px",padding:"11px",background:"#FAFAF8",border:"1px solid #E8E0D6",borderRadius:"6px",display:"flex",gap:"10px",alignItems:"flex-start"}}><div style={{background:accent,color:"#fff",width:"28px",height:"28px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:"12px",flexShrink:0}}>{["🗓️","🎉","🎵","🌟"][i%4]}</div><div style={{flex:1}}><div style={{display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:"3px",marginBottom:"2px"}}><span style={{fontSize:"13px",fontWeight:"600",color:"#1A1A1A"}}><EN s="events" i={i} fk="name" style={{fontSize:"13px",fontWeight:"600",color:"#1A1A1A"}}/></span><span style={{fontSize:"10px",color:accent,background:accentLight,padding:"2px 8px",borderRadius:"10px",fontFamily:"sans-serif",fontWeight:"600"}}><EN s="events" i={i} fk="date" style={{fontSize:"10px",color:accent}}/></span></div><div style={{fontSize:"12px",color:"#666",lineHeight:1.5}}><EN s="events" i={i} fk="detail" ml style={{fontSize:"12px",color:"#666"}}/></div></div></div>))}</div>
            <div style={{margin:"10px 28px 14px",background:"#FAFAL8",border:"1px solid #E8E0D6",borderRadius:"6px",padding:"12px",display:"flex",flexWrap:"wrap",gap:"8px",justifyContent:"space-around",fontFamily:"sans-serif"}}>{PROP.amenities.map((a,i)=>(<div key={i} style={{textAlign:"center"}}><div style={{fontSize:"17px",marginBottom:"2px"}}>{a.icon}</div><div style={{fontSize:"11px",fontWeight:"600",color:"#1A1A1A"}}>{a.label}</div><div style={{fontSize:"10px",color:"#999"}}>{a.sub}</div></div>))}</div>
            <div style={{background:accent,padding:"26px",textAlign:"center"}}><div style={{color:"rgba(255,255,255,0.7)",fontSize:"11px",letterSpacing:"3px",textTransform:"uppercase",fontFamily:"sans-serif",marginBottom:"8px"}}>{month.name} 2026</div><div style={{color:"#fff",fontSize:"20px",marginBottom:"8px"}}>Your Sonoma Adventure Awaits</div><div style={{color:"rgba(255,255,255,0.85)",fontSize:"13px",margin:"0 0 16px",lineHeight:1.6}}><E fk="ctaTagline" ml style={{fontSize:"13px"}}/></div><div style={{display:"inline-block",background:"#fff",color:accent,padding:"10px 26px",borderRadius:"2px",fontSize:"12px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"sans-serif",fontWeight:"700"}}><E fk="cta" style={{color:accent,fontSize:"12px"}}/></div></div>
            <div style={{background:"#1A1A1A",padding:"16px 28px",textAlign:"center",fontFamily:"sans-serif"}}><div style={{color:"#9B8A6E",fontSize:"12px",letterSpacing:"1px",marginBottom:"5px"}}>Hotel E Santa Rosa</div><div style={{color:"#666",fontSize:"11px",lineHeight:1.8}}>{PROP.address}<br/>{PROP.phone}</div><div style={{marginTop:"8px",color:"#555",fontSize:"11px"}}><a href="#" style={{color:"#9B8A6E"}}>Unsubscribe</a> · <a href={PROP.website} style={{color:"#9B8A6E"}}>Visit Website</a></div></div>
          </div>
        </div>
      </div>
    )}

    <SendModal open={sendOpen} onClose={()=>setSendOpen(false)} subject={g("heroSubject")} htmlBody={generateMonthlyHTML(month,edits)} type="monthly" monthName={month.name}/>
  </div>);
}

// ─── HOT DATES ────────────────────────────────────────────────────────────────
function HotDates(){
  const now=new Date();
  const [year,setYear]=useState(now.getFullYear());
  const [month,setMonth]=useState(now.getMonth());
  const [hotDates,setHotDates]=useState({});
  const [priceInput,setPriceInput]=useState({});
  const [noteInput,setNoteInput]=useState({});
  const [subjectLine,setSubjectLine]=useState("🔥 Hot Dates Alert — Special Rates from $109");
  const [preheader,setPreheader]=useState("Limited nights at a steep discount — book before they're gone.");
  const [introCopy,setIntroCopy]=useState("We're releasing a limited number of nights at a special discounted rate. These are real deals on real dates — low occupancy means your gain. Book one of our Hot Dates and stay in Wine Country for less.");
  const [urgencyCopy,setUrgencyCopy]=useState("These dates won't last. Book direct for the best rate.");
  const [ctaCopy,setCtaCopy]=useState("Book a Hot Date");
  const [downloaded,setDL]=useState(false);
  const [tab,setTab]=useState("builder");
  const [sendOpen,setSendOpen]=useState(false);
  const dIM=getDaysInMonth(year,month);const fD=getFirstDayOfWeek(year,month);
  const tC=Math.ceil((fD+dIM)/7)*7;
  function dKey(d){return`${year}-${month}-${d}`;}
  function toggle(d){const k=dKey(d);setHotDates(p=>{if(p[k]){const n={...p};delete n[k];return n;}return{...p,[k]:{price:FLOOR_PRICE,note:""}};});if(!hotDates[dKey(d)])setPriceInput(p=>({...p,[dKey(d)]:String(FLOOR_PRICE)}));}
  function commitPrice(k){const r=Number(priceInput[k]);const c=isNaN(r)?FLOOR_PRICE:Math.max(FLOOR_PRICE,Math.round(r));setPriceInput(p=>({...p,[k]:String(c)}));setHotDates(p=>({...p,[k]:{...p[k],price:c}}));}
  function setNote(k,v){setNoteInput(p=>({...p,[k]:v}));setHotDates(p=>({...p,[k]:{...p[k],note:v}}));}
  function dlHtml(){const html=generateHotDatesHTML(year,month,hotDates,subjectLine,preheader,introCopy,ctaCopy,urgencyCopy);const blob=new Blob([html],{type:"text/html"});const url=URL.createObjectURL(blob);const a=document.createElement("a");a.href=url;a.download=`hotel-e-hot-dates-${MONTH_NAMES[month].toLowerCase()}-${year}.html`;document.body.appendChild(a);a.click();document.body.removeChild(a);URL.revokeObjectURL(url);setDL(true);setTimeout(()=>setDL(false),2500);}
  const cells=[];for(let c=0;c<tC;c++){const d=c-fD+1;const v=d>=1&&d<=dIM;const k=v?dKey(d):null;cells.push({d,v,k,hot:k&&!!hotDates[k]});}
  const weeks=[];for(let i=0;i<cells.length;i+=7)weeks.push(cells.slice(i,i+7));
  const sorted=Object.entries(hotDates).sort(([a],[b])=>Number(a.split("-")[2])-Number(b.split("-")[2]));
  const hotCount=Object.keys(hotDates).length;
  const inp={width:"100%",boxSizing:"border-box",padding:"7px 9px",border:"1px solid #D0D8E0",borderRadius:"6px",fontSize:"13px",fontFamily:"sans-serif",outline:"none",background:"#fff"};
  const iSt={padding:"6px 12px",borderRadius:"4px",border:"1px solid #444",background:"transparent",color:"#fff",cursor:"pointer",fontSize:"12px"};

  return(<div>
    <div style={{background:"#111",padding:"10px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"8px"}}>
      <span style={{fontFamily:"sans-serif",fontSize:"12px",color:"#777"}}>🔥 Hot Dates Eblast</span>
      <div style={{display:"flex",gap:"8px"}}>
        <button onClick={()=>setTab("builder")} style={{...iSt,background:tab==="builder"?"#E05A00":"transparent",borderColor:tab==="builder"?"#E05A00":"#444"}}>Builder</button>
        <button onClick={()=>setTab("preview")} style={{...iSt,background:tab==="preview"?"#E05A00":"transparent",borderColor:tab==="preview"?"#E05A00":"#444"}}>Preview{hotCount>0?` (${hotCount})`:""}</button>
        <button onClick={dlHtml} disabled={hotCount===0} style={{...iSt,border:`1px solid ${hotCount===0?"#444":"#E05A00"}`,background:downloaded?"#2E6B3A":hotCount===0?"transparent":"#E05A00",color:hotCount===0?"#555":"#fff",fontWeight:"600"}}>{downloaded?"✓ Downloaded!":"⬇ HTML"}</button>
        <button onClick={()=>setSendOpen(true)} disabled={hotCount===0} style={{...iSt,border:`1px solid ${hotCount===0?"#444":"#E05A00"}`,background:hotCount===0?"transparent":"transparent",color:hotCount===0?"#555":"#E05A00",borderColor:"#E05A00"}}>✉ Send</button>
      </div>
    </div>

    {tab==="builder"?(
      <div style={{display:"flex",maxWidth:"1200px",margin:"0 auto",minHeight:"calc(100vh - 120px)"}}>
        <div style={{width:"290px",flexShrink:0,background:"#fff",borderRight:"1px solid #E0E4E8",padding:"16px",overflowY:"auto"}}>
          <SectionLabel>Month & Year</SectionLabel>
          <div style={{display:"flex",gap:"8px",marginBottom:"14px"}}><div style={{flex:1}}><label style={{fontSize:"10px",fontWeight:"600",color:"#444",display:"block",marginBottom:"4px",fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"1px"}}>Month</label><select value={month} onChange={e=>{setMonth(Number(e.target.value));setHotDates({});}} style={{...inp}}>{MONTH_NAMES.map((m,i)=><option key={i} value={i}>{m}</option>)}</select></div><div style={{width:"75px"}}><label style={{fontSize:"10px",fontWeight:"600",color:"#444",display:"block",marginBottom:"4px",fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"1px"}}>Year</label><select value={year} onChange={e=>{setYear(Number(e.target.value));setHotDates({});}} style={{...inp}}>{[2026,2027,2028].map(y=><option key={y} value={y}>{y}</option>)}</select></div></div>
          <hr style={{border:"none",borderTop:"1px solid #E0E4E8",margin:"12px 0"}}/>
          <SectionLabel>Email Copy</SectionLabel>
          {[{l:"Subject Line",v:subjectLine,s:setSubjectLine,m:false},{l:"Preview Text",v:preheader,s:setPreheader,m:false},{l:"Intro",v:introCopy,s:setIntroCopy,m:true},{l:"Urgency Line",v:urgencyCopy,s:setUrgencyCopy,m:false},{l:"CTA Button",v:ctaCopy,s:setCtaCopy,m:false}].map(({l,v,s,m})=>(
            <div key={l} style={{marginBottom:"10px"}}><label style={{fontSize:"10px",fontWeight:"600",color:"#444",display:"block",marginBottom:"3px",fontFamily:"sans-serif",textTransform:"uppercase",letterSpacing:"1px"}}>{l}</label>{m?<textarea value={v} rows={3} onChange={e=>s(e.target.value)} style={{...inp,resize:"vertical"}}/>:<input type="text" value={v} onChange={e=>s(e.target.value)} style={inp}/>}</div>
          ))}
        </div>
        <div style={{flex:1,padding:"16px 20px",overflowY:"auto"}}>
          <div style={{background:"#FFF8F0",border:"1px solid #F0C080",borderRadius:"8px",padding:"10px 14px",marginBottom:"14px",fontSize:"13px",color:"#7A4A00",fontFamily:"sans-serif"}}>🔥 Click any date to mark as Hot Date. Set price (min $109) and optional note. Then send directly or download HTML.</div>
          <div style={{background:"#fff",border:"1px solid #E0E4E8",borderRadius:"10px",padding:"16px",marginBottom:"14px"}}>
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:"12px"}}><div style={{fontSize:"16px",fontWeight:"600",color:"#1A1A1A",fontFamily:"sans-serif"}}>{MONTH_NAMES[month]} {year}</div><div style={{display:"flex",gap:"5px"}}><button onClick={()=>{const d=new Date(year,month-1);setYear(d.getFullYear());setMonth(d.getMonth());setHotDates({});}} style={{padding:"4px 9px",border:"1px solid #E0E4E8",borderRadius:"4px",background:"#fff",cursor:"pointer",fontSize:"13px"}}>‹</button><button onClick={()=>{const d=new Date(year,month+1);setYear(d.getFullYear());setMonth(d.getMonth());setHotDates({});}} style={{padding:"4px 9px",border:"1px solid #E0E4E8",borderRadius:"4px",background:"#fff",cursor:"pointer",fontSize:"13px"}}>›</button></div></div>
            <div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"3px",marginBottom:"3px"}}>{DAY_LABELS.map(d=><div key={d} style={{textAlign:"center",fontSize:"10px",fontWeight:"700",color:"#999",padding:"3px 0",fontFamily:"sans-serif"}}>{d}</div>)}</div>
            {weeks.map((week,wi)=>(<div key={wi} style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"3px",marginBottom:"3px"}}>{week.map(({d,v,k,hot},di)=>(<div key={di} onClick={()=>v&&toggle(d)} style={{height:"44px",borderRadius:"7px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",cursor:v?"pointer":"default",background:!v?"transparent":hot?AC:"#F8FAFC",border:!v?"none":hot?`2px solid ${AC}`:"1px solid #E0E4E8",transition:"all .12s",position:"relative"}} onMouseEnter={e=>{if(v&&!hot)e.currentTarget.style.background=AL;}} onMouseLeave={e=>{if(v&&!hot)e.currentTarget.style.background="#F8FAFC";}}>{v&&<><span style={{fontSize:"13px",fontWeight:hot?"700":"400",color:hot?"#fff":"#333",lineHeight:1,fontFamily:"sans-serif"}}>{d}</span>{hot&&<span style={{fontSize:"9px",color:"rgba(255,255,255,0.9)",fontWeight:"600",marginTop:"1px",fontFamily:"sans-serif"}}>${hotDates[k].price}</span>}{hot&&<span style={{position:"absolute",top:"2px",right:"3px",fontSize:"9px"}}>🔥</span>}</>}</div>))}</div>))}
            <div style={{marginTop:"10px",paddingTop:"8px",borderTop:"1px solid #E0E4E8",display:"flex",gap:"14px",fontSize:"11px",color:"#666",fontFamily:"sans-serif"}}><span style={{display:"flex",alignItems:"center",gap:"5px"}}><span style={{display:"inline-block",width:"11px",height:"11px",background:AC,borderRadius:"2px"}}></span>Hot Date</span><span style={{display:"flex",alignItems:"center",gap:"5px"}}><span style={{display:"inline-block",width:"11px",height:"11px",background:"#F8FAFC",border:"1px solid #E0E4E8",borderRadius:"2px"}}></span>Regular rate</span><span style={{color:"#aaa"}}>Min ${FLOOR_PRICE}/night</span></div>
          </div>
          {sorted.length>0&&(<div style={{background:"#fff",border:"1px solid #E0E4E8",borderRadius:"10px",padding:"16px"}}><div style={{fontSize:"13px",fontWeight:"600",color:"#1A1A1A",marginBottom:"10px",fontFamily:"sans-serif"}}>🔥 {sorted.length} Hot Date{sorted.length>1?"s":""}</div>{sorted.map(([k,info])=>{const d=Number(k.split("-")[2]);const dow=["Sun","Mon","Tue","Wed","Thu","Fri","Sat"][new Date(year,month,d).getDay()];return(<div key={k} style={{display:"flex",gap:"8px",alignItems:"flex-start",marginBottom:"8px",padding:"9px 11px",background:AL,borderRadius:"7px",borderLeft:`3px solid ${AC}`}}><div style={{minWidth:"80px"}}><div style={{fontSize:"12px",fontWeight:"700",color:"#1A1A1A",fontFamily:"sans-serif"}}>{dow} {MONTH_NAMES[month].slice(0,3)} {d}</div><button onClick={()=>toggle(d)} style={{fontSize:"10px",color:"#E05A00",background:"none",border:"none",cursor:"pointer",padding:"1px 0",fontFamily:"sans-serif"}}>✕ Remove</button></div><div><label style={{fontSize:"9px",fontWeight:"600",color:"#444",display:"block",marginBottom:"2px",fontFamily:"sans-serif"}}>$/night</label><div style={{display:"flex",alignItems:"center",gap:"5px"}}><span style={{fontSize:"14px",fontWeight:"700",color:"#888",fontFamily:"sans-serif"}}>$</span><input type="number" min={FLOOR_PRICE} step={1} value={priceInput[k]??info.price} onChange={e=>setPriceInput(p=>({...p,[k]:e.target.value}))} onBlur={()=>commitPrice(k)} onKeyDown={e=>{if(e.key==="Enter")commitPrice(k);}} style={{...inp,width:"65px"}}/>{info.price===FLOOR_PRICE&&<span style={{fontSize:"9px",color:"#E05A00",fontWeight:"600",fontFamily:"sans-serif"}}>Floor</span>}</div></div><div style={{flex:1}}><label style={{fontSize:"9px",fontWeight:"600",color:"#444",display:"block",marginBottom:"2px",fontFamily:"sans-serif"}}>Note</label><input type="text" placeholder="e.g. Midweek special" value={noteInput[k]??info.note} onChange={e=>setNote(k,e.target.value)} style={{...inp}}/></div></div>);})}</div>)}
          {sorted.length===0&&<div style={{textAlign:"center",padding:"32px",color:"#bbb",fontSize:"13px",fontFamily:"sans-serif"}}><div style={{fontSize:"32px",marginBottom:"8px"}}>📅</div>Click dates above to mark them as Hot Dates.</div>}
        </div>
      </div>
    ):(
      <div style={{padding:"16px 20px",maxWidth:"660px",margin:"0 auto"}}>
        <div style={{background:"#fff",border:"1px solid #E0E4E8",borderRadius:"8px",padding:"12px 16px",marginBottom:"14px",display:"flex",flexWrap:"wrap",gap:"10px",alignItems:"center",justifyContent:"space-between",fontFamily:"sans-serif"}}><div><div style={{fontSize:"10px",color:"#999",textTransform:"uppercase",marginBottom:"2px"}}>Subject</div><div style={{fontSize:"13px",fontWeight:"500",color:"#1A1A1A"}}>{subjectLine}</div></div><div style={{display:"flex",gap:"8px"}}><Btn onClick={dlHtml} disabled={hotCount===0} bg={downloaded?"#2E6B3A":"#2C4A6B"}>{downloaded?"✓ Downloaded!":"⬇ HTML"}</Btn><Btn onClick={()=>setSendOpen(true)} disabled={hotCount===0} bg="#E05A00">✉ Send</Btn></div></div>
        <div style={{background:"#fff",border:"1px solid #E8E0D6",borderRadius:"8px",overflow:"hidden",boxShadow:"0 4px 24px rgba(0,0,0,0.08)"}}>
          <div style={{background:"#1A1A1A",padding:"12px 24px",display:"flex",justifyContent:"space-between"}}><span style={{color:"#9B8A6E",fontSize:"11px",letterSpacing:"2px",textTransform:"uppercase"}}>Hotel E Santa Rosa</span><span style={{color:"#666",fontSize:"11px"}}>{PROP.email}</span></div>
          <div style={{position:"relative"}}><img src={PROP.heroImage} alt="" style={{width:"100%",height:"210px",objectFit:"cover",display:"block"}}/><div style={{position:"absolute",inset:0,background:`linear-gradient(to bottom,${AC}22,${AC}DD)`}}/><div style={{position:"absolute",bottom:0,left:0,right:0,padding:"14px 22px",background:AC}}><div style={{fontSize:"9px",letterSpacing:"3px",textTransform:"uppercase",color:"rgba(255,255,255,0.65)",fontFamily:"sans-serif",marginBottom:"4px"}}>🔥 Limited Time · {MONTH_NAMES[month]} {year}</div><div style={{fontFamily:"Georgia,serif",fontSize:"22px",color:"#fff",lineHeight:1.2,marginBottom:"3px"}}>Hot Dates — Starting at ${FLOOR_PRICE}</div><div style={{fontSize:"11px",color:"rgba(255,255,255,0.8)",fontStyle:"italic"}}>{PROP.tagline}</div></div></div>
          <div style={{padding:"18px 22px 8px"}}><div style={{fontSize:"10px",letterSpacing:"3px",textTransform:"uppercase",color:AC,fontFamily:"sans-serif",marginBottom:"7px",textAlign:"center"}}>{PROP.address}</div><p style={{fontFamily:"Georgia,serif",fontSize:"13px",color:"#444",lineHeight:1.7,margin:"0 0 5px"}}>{introCopy}</p><p style={{fontSize:"11px",color:"#E05A00",fontWeight:"700",margin:"0 0 12px"}}>⚠️ {urgencyCopy}</p><div style={{textAlign:"center"}}><div style={{display:"inline-block",background:AC,color:"#fff",padding:"10px 22px",borderRadius:"2px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"sans-serif",fontWeight:"700"}}>{ctaCopy}</div></div></div>
          <div style={{margin:"14px 22px 0",borderTop:"1px solid #E8E0D6"}}/>
          <div style={{padding:"14px 22px 8px"}}><div style={{textAlign:"center",marginBottom:"10px"}}><div style={{fontSize:"9px",letterSpacing:"3px",textTransform:"uppercase",color:"#9B8A6E",fontFamily:"sans-serif",marginBottom:"4px"}}>Hot Dates Calendar</div><div style={{fontFamily:"Georgia,serif",fontSize:"16px",color:"#1A1A1A"}}>{MONTH_NAMES[month]} {year}</div></div><div style={{background:"#FAFAF8",border:"1px solid #E8E0D6",borderRadius:"7px",padding:"10px 8px"}}><div style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"2px",marginBottom:"2px"}}>{DAY_LABELS.map(d=><div key={d} style={{textAlign:"center",fontSize:"8px",fontWeight:"700",color:"#999",padding:"2px 0",fontFamily:"sans-serif"}}>{d}</div>)}</div>{weeks.map((week,wi)=>(<div key={wi} style={{display:"grid",gridTemplateColumns:"repeat(7,1fr)",gap:"2px",marginBottom:"2px"}}>{week.map(({d,v,k,hot},di)=>(<div key={di} style={{height:"32px",borderRadius:"5px",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",background:!v?"transparent":hot?AC:"#F0F4F8",border:!v?"none":hot?`2px solid ${AC}`:"1px solid #E8ECF0"}}>{v&&<><span style={{fontSize:"10px",fontWeight:hot?"700":"400",color:hot?"#fff":"#666",lineHeight:1,fontFamily:"sans-serif"}}>{d}</span>{hot&&<span style={{fontSize:"8px",color:"rgba(255,255,255,0.9)",fontWeight:"600",fontFamily:"sans-serif"}}>${hotDates[k].price}</span>}</>}</div>))}</div>))}</div></div>
          <div style={{margin:"10px 22px 0",borderTop:"1px solid #E8E0D6"}}/>
          <div style={{padding:"14px 22px 8px"}}><div style={{textAlign:"center",marginBottom:"10px"}}><div style={{fontSize:"9px",letterSpacing:"3px",textTransform:"uppercase",color:"#9B8A6E",fontFamily:"sans-serif",marginBottom:"4px"}}>🔥 Hot Dates</div><div style={{fontFamily:"Georgia,serif",fontSize:"16px",color:"#1A1A1A"}}>Available at a Discount</div></div>{sorted.length===0?<div style={{textAlign:"center",color:"#bbb",fontSize:"12px",padding:"12px",fontFamily:"sans-serif"}}>No hot dates selected.</div>:sorted.map(([k,info])=>{const d=Number(k.split("-")[2]);const dow=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][new Date(year,month,d).getDay()];return(<div key={k} style={{display:"flex",justifyContent:"space-between",alignItems:"flex-start",padding:"9px 11px",background:AL,borderRadius:"5px",borderLeft:`3px solid ${AC}`,marginBottom:"5px"}}><div><div style={{fontSize:"12px",fontWeight:"600",color:"#1A1A1A",fontFamily:"sans-serif"}}>{dow}, {MONTH_NAMES[month]} {d}</div>{info.note&&<div style={{fontSize:"10px",color:"#666",marginTop:"1px",fontFamily:"sans-serif"}}>{info.note}</div>}</div><div style={{textAlign:"right"}}><span style={{fontSize:"16px",fontWeight:"700",color:AC,fontFamily:"sans-serif"}}>${info.price}</span><div style={{fontSize:"9px",color:"#888",fontFamily:"sans-serif"}}>/night</div></div></div>);})}<div style={{textAlign:"center",margin:"10px 0"}}><div style={{display:"inline-block",background:AC,color:"#fff",padding:"9px 22px",borderRadius:"2px",fontSize:"10px",letterSpacing:"2px",textTransform:"uppercase",fontFamily:"sans-serif",fontWeight:"700"}}>{ctaCopy}</div></div></div>
          <div style={{background:"#1A1A1A",padding:"14px 22px",textAlign:"center",fontFamily:"sans-serif"}}><div style={{color:"#9B8A6E",fontSize:"11px",letterSpacing:"1px",marginBottom:"4px"}}>Hotel E Santa Rosa</div><div style={{color:"#666",fontSize:"10px",lineHeight:1.7}}>{PROP.address}<br/>{PROP.phone}</div><div style={{marginTop:"7px",fontSize:"10px",color:"#555"}}><a href="#" style={{color:"#9B8A6E"}}>Unsubscribe</a> · <a href={PROP.website} style={{color:"#9B8A6E"}}>Visit Website</a></div></div>
        </div>
      </div>
    )}
    <SendModal open={sendOpen} onClose={()=>setSendOpen(false)} subject={subjectLine} htmlBody={generateHotDatesHTML(year,month,hotDates,subjectLine,preheader,introCopy,ctaCopy,urgencyCopy)} type="hot_dates" monthName={`Hot Dates — ${MONTH_NAMES[month]}`}/>
  </div>);
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App(){
  const [tool,setTool]=useState("campaign");
  const nav=[{id:"campaign",label:"📅 Monthly Campaign"},{id:"hotdates",label:"🔥 Hot Dates"},{id:"subscribers",label:"👥 Subscribers"},{id:"history",label:"📊 History"}];
  return(
    <div style={{fontFamily:"'Georgia',serif",background:"#F9F7F4",minHeight:"100vh"}}>
      <div style={{background:"#1A1A1A",color:"#fff",padding:"14px 24px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:"10px"}}>
        <div><div style={{fontSize:"11px",letterSpacing:"2px",color:"#9B8A6E",textTransform:"uppercase",marginBottom:"2px",fontFamily:"sans-serif"}}>Hotel E Santa Rosa</div><div style={{fontSize:"17px",fontWeight:"300",letterSpacing:"1px"}}>Email Marketing Platform</div></div>
        <div style={{display:"flex",gap:"6px",flexWrap:"wrap"}}>
          {nav.map(n=><button key={n.id} onClick={()=>setTool(n.id)} style={{padding:"8px 16px",borderRadius:"4px",border:`2px solid ${tool===n.id?"#9B8A6E":"#444"}`,background:tool===n.id?"#9B8A6E":"transparent",color:"#fff",cursor:"pointer",fontSize:"12px",fontFamily:"sans-serif",fontWeight:tool===n.id?"600":"400"}}>{n.label}</button>)}
        </div>
      </div>
      {tool==="campaign"    && <MonthlyCampaign/>}
      {tool==="hotdates"    && <HotDates/>}
      {tool==="subscribers" && <SubscribersPanel/>}
      {tool==="history"     && <HistoryPanel/>}
    </div>
  );
}
