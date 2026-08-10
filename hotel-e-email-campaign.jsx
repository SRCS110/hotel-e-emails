import { useState } from "react";

const HERO_IMAGE = "https://hotelesantarosa.com/wp-content/uploads/2025/11/a015b315-1515-4d24-83c9-75083d9c10ec.jpeg";

const MONTHS = [
  {
    id: 1, name: "January", tagline: "Start the Year in Wine Country",
    heroSubject: "Escape to Hotel E — Your January Wine Country Reset",
    preheader: "New year, new adventures. Downtown Santa Rosa awaits.",
    heroCaption: "Historic Boutique Luxury in the Heart of Santa Rosa",
    thingsToDo: [
      { icon: "🍷", title: "Wine Tasting Season Begins", desc: "January is the ideal time to explore Sonoma's 400+ wineries without the summer crowds. Visit St. Francis or Paradise Ridge for intimate barrel tastings." },
      { icon: "🌲", title: "Armstrong Redwoods", desc: "Hike through ancient redwood groves just 30 minutes away. Winter rains bring the forest to life with lush greenery and peaceful trails." },
      { icon: "🎨", title: "Museum of Sonoma County", desc: "Explore rotating art exhibitions and local history at this beloved downtown Santa Rosa museum, just steps from Hotel E." },
    ],
    events: [
      { name: "Sonoma County Restaurant Week", date: "Mid-January", detail: "Celebrate local chefs with special prix-fixe menus at restaurants throughout the county." },
      { name: "Luther Burbank Center Performances", date: "Throughout January", detail: "Catch live shows at the iconic Luther Burbank Performing Arts Center — check their winter lineup." },
      { name: "New Year Wine Road Passport", date: "January Weekends", detail: "Sip your way through Dry Creek Valley and Alexander Valley wineries with the Wine Road weekend tasting passport." },
    ],
    cta: "Book Your January Escape", accentColor: "#2C4A6B", accentLight: "#E8F0F8", season: "Winter",
  },
  {
    id: 2, name: "February", tagline: "Romance is in the Air — and the Wine",
    heroSubject: "Valentine's in Wine Country — Book Hotel E",
    preheader: "Treat your Valentine to an unforgettable Sonoma getaway.",
    heroCaption: "Celebrate Love in Santa Rosa's Most Romantic Hotel",
    thingsToDo: [
      { icon: "🍾", title: "Enology Wine Bar Date Night", desc: "Start your evening at our on-site Enology Lounge with award-winning Sonoma County wines and daily happy hour 5–7pm." },
      { icon: "🌹", title: "Romantic Bodega Bay Drive", desc: "Take a scenic 30-minute drive to the Pacific coast. Cliffside views, fresh seafood, and the salty ocean air are the perfect Valentine's backdrop." },
      { icon: "🧀", title: "California Artisan Cheese Festival", desc: "Wine and cheese pair perfectly — explore the finest local creameries and makers ahead of this beloved annual event." },
    ],
    events: [
      { name: "Cloverdale Citrus Fair", date: "Feb 13–16, 2026", detail: "Live music, carnival rides, 4-H shows, and a parade on Feb 13 — a beloved regional fair just north of Santa Rosa." },
      { name: "Wine Road Barrel Tasting", date: "February Weekends", detail: "Taste wines straight from the barrel before they're bottled — a rare insider experience across dozens of Sonoma wineries." },
      { name: "Valentine's Dinners Downtown", date: "Feb 14", detail: "Downtown Santa Rosa's 18+ restaurants offer special Valentine's prix-fixe menus steps from Hotel E's front door." },
    ],
    cta: "Reserve Your Valentine's Weekend", accentColor: "#8B2635", accentLight: "#FAEBED", season: "Winter",
  },
  {
    id: 3, name: "March", tagline: "Spring Blooms & Barrel Weekends",
    heroSubject: "Spring is Here — Explore Wine Country from Hotel E",
    preheader: "Rolling green hills, blooming mustard fields, and open tasting rooms.",
    heroCaption: "Hotel E: Your Spring Wine Country Basecamp",
    thingsToDo: [
      { icon: "🌸", title: "Mustard Fields & Vineyards", desc: "March brings brilliant yellow mustard blooms between the vine rows of Sonoma's valleys — drive Highway 12 for a scenic wine country experience." },
      { icon: "🎭", title: "The California Theatre", desc: "Catch a show at downtown Santa Rosa's beautifully restored California Theatre, just a short stroll from the hotel." },
      { icon: "🚴", title: "Wine Country Cycling", desc: "The rolling hills around Santa Rosa are perfect for cycling. Rent bikes and explore the Laguna de Santa Rosa trail system." },
    ],
    events: [
      { name: "Sonoma County Restaurant Week", date: "Mid-March", detail: "Savor curated multi-course menus celebrating the county's diverse culinary scene at special value pricing." },
      { name: "Wine Road Barrel Tasting", date: "March Weekends", detail: "Experience Sonoma's Alexander Valley and Dry Creek Valley wineries during the annual barrel tasting weekends." },
      { name: "Luther Burbank Center Spring Series", date: "Throughout March", detail: "World-class performances at Santa Rosa's premier performing arts venue, just minutes from Hotel E." },
    ],
    cta: "Book Your Spring Getaway", accentColor: "#3D6B35", accentLight: "#EAF3E8", season: "Spring",
  },
  {
    id: 4, name: "April", tagline: "Festivals, Fools & Apple Blossoms",
    heroSubject: "April in Sonoma — Festivals Await at Hotel E",
    preheader: "Spring festivals, artisan fairs, and wine country adventures.",
    heroCaption: "Boutique Comfort Steps from Courthouse Square",
    thingsToDo: [
      { icon: "🌊", title: "Bodega Bay Coastal Walk", desc: "30 minutes west of Hotel E, the Sonoma Coast offers dramatic cliffs, tide pools, and whale watching through late spring." },
      { icon: "🍺", title: "Downtown Craft Breweries", desc: "Santa Rosa is home to 3 downtown microbreweries. Explore Russian River Brewing, known worldwide for Pliny the Elder." },
      { icon: "🎨", title: "Sonoma County Museum", desc: "April exhibitions at the Museum of Sonoma County celebrate local history, art, and the region's rich agricultural heritage." },
    ],
    events: [
      { name: "Fool's Day Parade", date: "April 4, 2026", detail: "Join locals for a playful parade through Occidental, led by the Hub Bub Club, with live entertainment and the crowning of the King and Queen of Fools." },
      { name: "Butter & Egg Days Parade", date: "April 18, 2026", detail: "Petaluma's beloved family festival spans four city blocks with food, crafts, arts, and kid activities." },
      { name: "Earth Day Celebration", date: "April 25, 2026", detail: "Live performances, demos, and children's activities right in Santa Rosa celebrating the planet." },
      { name: "Sebastopol Apple Blossom Festival", date: "April 25–26, 2026", detail: "A colorful weekend with live music, arts and crafts, food and drink — just 20 minutes from Hotel E." },
    ],
    cta: "Plan Your April Visit", accentColor: "#6B4A8B", accentLight: "#F2EDFA", season: "Spring",
  },
  {
    id: 5, name: "May", tagline: "Wine Itineraries & Outdoor Season Opens",
    heroSubject: "May in Wine Country — Book Hotel E & Explore Sonoma",
    preheader: "The weather is perfect. The wines are flowing. Your room awaits.",
    heroCaption: "Hotel E: The Heart of Sonoma Wine Country",
    thingsToDo: [
      { icon: "🍷", title: "Wine Itinerary Packages", desc: "Book our curated wine packages: choose from A Day in Dry Creek Valley, Taste Highway 12, or Sip & Savor Santa Rosa." },
      { icon: "⚾", title: "Sonoma Stompers Baseball", desc: "The season opens in May! Catch a Sonoma Stompers game — a fun, affordable local baseball experience for all ages." },
      { icon: "🎵", title: "Acoustic Sunsets", desc: "Weekly live music at Sonoma Botanical Garden, Wednesdays May–September. Wine, picnics, and Bay Area musicians in a beautiful outdoor setting." },
    ],
    events: [
      { name: "Bodega Bay Fisherman's Festival", date: "May 2–3, 2026", detail: "Since 1973, this beloved coastal festival features craft booths, live music, great food, and maritime entertainment." },
      { name: "Salute to American Graffiti Car Show", date: "May 14–16, 2026", detail: "Over 400 classic cars and trucks fill Petaluma's streets, along with vendors and special happenings." },
      { name: "Sonoma County Matsuri Festival", date: "May 17, 2026", detail: "Free festival of Japanese arts, culture, and food right in Santa Rosa." },
      { name: "B.R. Cohn Summer Music Series", date: "Weekends May 23+", detail: "Live music at Olive Hill Estate Vineyards every weekend — pour a glass and soak in vineyard views with great music." },
    ],
    cta: "Book May — Wine Season is Open", accentColor: "#2B6B5A", accentLight: "#E6F5F1", season: "Spring",
  },
  {
    id: 6, name: "June", tagline: "Country Music, Pride & Broadway Under the Stars",
    heroSubject: "June is Event Season — Stay at Hotel E in Santa Rosa",
    preheader: "Country music, pride celebrations, Broadway shows — June has it all.",
    heroCaption: "Steps from Downtown Santa Rosa's Best Summer Events",
    thingsToDo: [
      { icon: "🎤", title: "Luther Burbank Concerts", desc: "Summer concerts at the Luther Burbank Performing Arts Center are a Santa Rosa tradition — check the June lineup for world-class acts." },
      { icon: "🏖️", title: "Sonoma Coast Beaches", desc: "June brings warm, clear days perfect for exploring Doran Beach, Goat Rock, and the wild Sonoma coastline 30 minutes away." },
      { icon: "🚁", title: "Hot Air Balloon Rides", desc: "Float over the vineyards at sunrise — hot air balloon tours depart from the Santa Rosa area throughout summer." },
    ],
    events: [
      { name: "Country Summer Music Festival", date: "June 12–14, 2026", detail: "Northern California's biggest country music festival returns to Santa Rosa — three days of top acts and Sonoma County party vibes." },
      { name: "Sonoma County Pride", date: "June 5–7, 2026", detail: "A parade and festival featuring live performances celebrating Sonoma County's vibrant LGBT+ community." },
      { name: "Broadway Under the Stars", date: "June 12–28, 2026", detail: "Award-winning Broadway-inspired concerts and musicals in a stunning Wine Country outdoor setting in Sonoma." },
      { name: "Peggy Sue's Car Show", date: "June 20, 2026", detail: "Hundreds of classic and custom cars on display with food, wine, beer, and live music in Santa Rosa." },
    ],
    cta: "Grab Your June Reservation", accentColor: "#8B6B35", accentLight: "#FAF3E6", season: "Summer",
  },
  {
    id: 7, name: "July", tagline: "Summer Fireworks & Balloon Classics",
    heroSubject: "July 4th & Beyond — Celebrate in Wine Country at Hotel E",
    preheader: "Fireworks, hot air balloons, and summer in Sonoma County.",
    heroCaption: "Hotel E — Celebrating Summer in Downtown Santa Rosa",
    thingsToDo: [
      { icon: "🎆", title: "4th of July in Sonoma", desc: "Multiple fireworks shows across Sonoma County — Santa Rosa, Petaluma, and beyond. Hotel E puts you steps from Courthouse Square celebrations." },
      { icon: "🏄", title: "Russian River Adventures", desc: "Float, kayak, or swim the Russian River. Guerneville is 30 minutes from Hotel E and a beloved summer escape." },
      { icon: "🍦", title: "Downtown Santa Rosa Dining", desc: "18 restaurants within walking distance of the hotel — enjoy summer patio dining, cold local craft brews, and ice cream on the Square." },
    ],
    events: [
      { name: "4th of July Fireworks", date: "July 4, 2026", detail: "Multiple Sonoma County fireworks celebrations — watch calendar for the closest show to downtown Santa Rosa." },
      { name: "Family Movies On The Green", date: "Tuesdays July 7–Aug 4", detail: "Free outdoor film screenings in Windsor — a fun family night just north of Santa Rosa." },
      { name: "Sonoma County Hot Air Balloon Classic", date: "July 18–19, 2026", detail: "Get up close with balloons, watch launches, and take tethered rides at this beloved annual Santa Rosa festival." },
      { name: "Fort Ross Festival", date: "July 25, 2026", detail: "Witness Kashia Pomo ceremonial dancing, Alaska Native crafts, and Russian performances on the stunning Sonoma coast." },
    ],
    cta: "Book Your July Stay", accentColor: "#1A5276", accentLight: "#E8F4F8", season: "Summer",
  },
  {
    id: 8, name: "August", tagline: "County Fair Season & Apple Country",
    heroSubject: "August in Sonoma — Fair Season, Apples & More at Hotel E",
    preheader: "The Sonoma County Fair is here. Book your stay now.",
    heroCaption: "The County's #1 Rated Hotel During Fair Season",
    thingsToDo: [
      { icon: "🎡", title: "Sonoma County Fairgrounds", desc: "The iconic Sonoma County Fair runs August 7–16 with rides, the Hall of Flowers, arts, wine country horse racing, and endless food." },
      { icon: "🍎", title: "Apple Orchards & Farm Stands", desc: "Gravenstein apple season peaks in August. Visit local farm stands in Sebastopol for fresh-picked fruit, pies, and cider just 20 minutes away." },
      { icon: "🎸", title: "Summer Music Everywhere", desc: "August brings back-to-back music festivals, outdoor concerts, and the B.R. Cohn winery music series running every weekend." },
    ],
    events: [
      { name: "Sonoma County Fair", date: "August 7–16, 2026", detail: "The county's biggest annual event — carnival rides, the famous Hall of Flowers, ag exhibits, wine country horse racing, and great food." },
      { name: "Gravenstein Apple Fair", date: "August 8–9, 2026", detail: "Celebrate the iconic Gravenstein apple with local food, top regional music, and farm-to-table experiences at Ragle Ranch Park in Sebastopol." },
      { name: "Cotati Accordion Festival", date: "August 15–16, 2026", detail: "A beloved multi-generational, multi-cultural musical celebration in La Plaza Park — unique, joyful, and totally Sonoma." },
    ],
    cta: "Reserve During Fair Season", accentColor: "#6B5A2B", accentLight: "#FAF5E6", season: "Summer",
  },
  {
    id: 9, name: "September", tagline: "Harvest Season in Wine Country",
    heroSubject: "Harvest Season is Here — Experience Sonoma from Hotel E",
    preheader: "The grapes are in. The wines are flowing. The harvest awaits.",
    heroCaption: "Boutique Luxury During Sonoma's Most Beautiful Season",
    thingsToDo: [
      { icon: "🍇", title: "Harvest at the Wineries", desc: "September is crush season — many Sonoma wineries offer harvest experiences and barrel tastings as the grapes come in from the vine." },
      { icon: "🚶", title: "Annadel State Park", desc: "Hike through golden oak woodlands at Annadel, Santa Rosa's own state park with 40+ miles of trails at their most beautiful in harvest light." },
      { icon: "🍜", title: "Farm-to-Table Dining", desc: "Downtown Santa Rosa's restaurant scene shines in fall with seasonal harvest menus featuring local produce, wine pairings, and outdoor patio dining." },
    ],
    events: [
      { name: "Railroad Square Music Festival", date: "September 20, 2026", detail: "A free day of music on 4 stages, local food, wine, craft beer, a family/kids area, and 20+ artisans in Santa Rosa's historic Railroad Square." },
      { name: "Acoustic Sunsets Final Weeks", date: "Through Sept 16", detail: "The final evenings of the Sonoma Botanical Garden's beloved Wednesday night music series — bring a picnic and raise a glass." },
      { name: "Harvest Season Winery Events", date: "All September", detail: "Wineries throughout Sonoma host special harvest dinners, crush parties, and barrel tastings. Check individual winery calendars." },
    ],
    cta: "Book Your Harvest Escape", accentColor: "#7B3B1A", accentLight: "#FAF0EA", season: "Fall",
  },
  {
    id: 10, name: "October", tagline: "Harvest Fair, Dia de los Muertos & Fall Colors",
    heroSubject: "October in Wine Country — Fall Magic at Hotel E",
    preheader: "Harvest fairs, spooky fun, and the most beautiful season in Sonoma.",
    heroCaption: "Fall at Hotel E — Santa Rosa's Historic Beaux-Arts Gem",
    thingsToDo: [
      { icon: "🎃", title: "Halloween on Courthouse Square", desc: "Downtown Santa Rosa celebrates Halloween with community events, costume contests, and a festive atmosphere right outside Hotel E's door." },
      { icon: "🍂", title: "Fall Foliage Drives", desc: "October brings stunning fall color to Sonoma's valleys — drive Highway 128 through Alexander Valley for a leafy, golden canopy over the road." },
      { icon: "🍷", title: "Sonoma County Harvest Fair", desc: "The Grand Tasting Pavilion and the famous KZST World Championship Grape Stomp make this one of the county's most beloved fall events." },
    ],
    events: [
      { name: "Sonoma County Harvest Fair", date: "October 10, 2026", detail: "The iconic Harvest Fair brings the Grand Tasting Pavilion and the KZST World Championship Grape Stomp to the Sonoma County Fairgrounds." },
      { name: "Halloween & Dia de los Muertos", date: "Late October", detail: "Sonoma County celebrates with special events throughout the region — watch for offerings in downtown Santa Rosa, Petaluma, and Healdsburg." },
      { name: "Winery Fall Releases", date: "Throughout October", detail: "Fall is new release season across Sonoma's wine regions. Enjoy exclusive tastings of newly bottled vintages at tasting rooms countywide." },
    ],
    cta: "Book Your October Getaway", accentColor: "#8B4513", accentLight: "#FAF0E6", season: "Fall",
  },
  {
    id: 11, name: "November", tagline: "Quiet Wine Country & Holiday Warmth",
    heroSubject: "Thanksgiving Wine Country — Escape to Hotel E",
    preheader: "A quieter, more intimate Sonoma. Perfect for the holidays.",
    heroCaption: "Hotel E Welcomes You This Holiday Season",
    thingsToDo: [
      { icon: "🦃", title: "Thanksgiving in Wine Country", desc: "Many Sonoma County wineries offer special Thanksgiving weekend tastings — a beloved tradition where tasting rooms open with seasonal offerings." },
      { icon: "🌊", title: "Storm Season Coast", desc: "November waves and wild skies make Bodega Bay dramatic and beautiful. Wrap up and walk the headlands for spectacular Pacific views." },
      { icon: "🎭", title: "Holiday Shows Begin", desc: "The Luther Burbank Center's holiday performance season kicks off in November — check for holiday concerts, ballet, and special events." },
    ],
    events: [
      { name: "Thanksgiving Weekend Wine Road", date: "Thanksgiving Weekend", detail: "Wineries across Sonoma open their doors for special Thanksgiving weekend tastings — one of the most popular wine weekends of the year." },
      { name: "Luther Burbank Holiday Season", date: "November Onward", detail: "The performing arts calendar fills with holiday concerts, dance performances, and seasonal specials." },
      { name: "Shop Small Downtown Santa Rosa", date: "Late November", detail: "Downtown's boutique shops, galleries, and restaurants make for a perfect Small Business Saturday experience steps from Hotel E." },
    ],
    cta: "Book Your Holiday Retreat", accentColor: "#4A3728", accentLight: "#F5EDE8", season: "Fall",
  },
  {
    id: 12, name: "December", tagline: "Holiday Magic in Downtown Santa Rosa",
    heroSubject: "Holiday Season at Hotel E — A Wine Country Christmas",
    preheader: "Festive lights, holiday markets, and boutique luxury await.",
    heroCaption: "Celebrate the Season at Hotel E on Courthouse Square",
    thingsToDo: [
      { icon: "🎄", title: "Holiday Lights Downtown", desc: "Courthouse Square transforms into a festive wonderland in December — enjoy the holiday lights, decorations, and seasonal energy right outside our doors." },
      { icon: "🎸", title: "Holiday Performances", desc: "The Luther Burbank Center and The California Theatre both present packed holiday entertainment calendars through the end of December." },
      { icon: "🛍️", title: "Boutique Holiday Shopping", desc: "Downtown Santa Rosa's unique shops, galleries, and local boutiques offer a curated holiday shopping experience you won't find at the mall." },
    ],
    events: [
      { name: "Lighted Boat Parade", date: "December 2026 (TBD)", detail: "Festive lighted boats, kayaks, and paddleboards travel from Petaluma Marina to the Downtown Turning Basin — a magical holiday spectacle." },
      { name: "New Year's Eve in Wine Country", date: "December 31", detail: "Ring in the New Year in downtown Santa Rosa with special event dinners, Enology Lounge celebrations, and Courthouse Square festivities." },
      { name: "Charles M. Schulz Museum Holiday", date: "December", detail: "A beloved holiday destination — the Snoopy-themed museum hosts special exhibits and seasonal programming perfect for families." },
    ],
    cta: "Book Your Holiday Stay", accentColor: "#1C4B2E", accentLight: "#E6F5EC", season: "Winter",
  },
];

const SEASON_ICONS = { Winter: "❄️", Spring: "🌸", Summer: "☀️", Fall: "🍂" };

// ─── HTML GENERATOR ────────────────────────────────────────────────────────────
function generateEmailHTML(month) {
  const { accentColor: ac, accentLight: al } = month;
  const eventRows = month.events.map((ev, i) => {
    const icons = ["🗓️", "🎉", "🎵", "🌟"];
    return `
      <tr>
        <td style="padding:0 0 12px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FAFAF8;border:1px solid #E8E0D6;border-radius:6px;">
            <tr>
              <td width="52" valign="top" style="padding:16px 0 16px 16px;">
                <div style="width:36px;height:36px;background:${ac};border-radius:50%;text-align:center;line-height:36px;font-size:16px;">${icons[i % 4]}</div>
              </td>
              <td style="padding:16px;">
                <table width="100%" cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td style="font-family:Georgia,serif;font-size:15px;font-weight:600;color:#1A1A1A;padding-bottom:4px;">${ev.name}</td>
                    <td align="right" style="white-space:nowrap;">
                      <span style="font-family:Arial,sans-serif;font-size:11px;color:${ac};background:${al};padding:2px 10px;border-radius:12px;font-weight:600;">${ev.date}</span>
                    </td>
                  </tr>
                  <tr>
                    <td colspan="2" style="font-family:Arial,sans-serif;font-size:13px;color:#666;line-height:1.6;">${ev.detail}</td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>`;
  }).join("");

  const todoRows = month.thingsToDo.map(item => `
      <tr>
        <td style="padding:0 0 12px 0;">
          <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${al};border-left:3px solid ${ac};border-radius:6px;">
            <tr>
              <td width="52" valign="top" style="padding:16px 0 16px 16px;font-size:24px;">${item.icon}</td>
              <td style="padding:16px;">
                <div style="font-family:Georgia,serif;font-size:15px;font-weight:600;color:#1A1A1A;margin-bottom:4px;">${item.title}</div>
                <div style="font-family:Arial,sans-serif;font-size:14px;color:#666;line-height:1.6;">${item.desc}</div>
              </td>
            </tr>
          </table>
        </td>
      </tr>`).join("");

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="X-UA-Compatible" content="IE=edge" />
  <title>${month.heroSubject}</title>
  <!--[if mso]><noscript><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml></noscript><![endif]-->
</head>
<body style="margin:0;padding:0;background:#F9F7F4;-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%;">

<!-- Preheader (hidden) -->
<div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${month.preheader}</div>

<!-- Wrapper -->
<table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#F9F7F4;">
  <tr>
    <td align="center" style="padding:24px 16px;">

      <!-- Email Container -->
      <table width="620" cellpadding="0" cellspacing="0" border="0" style="max-width:620px;background:#ffffff;border:1px solid #E8E0D6;border-radius:8px;overflow:hidden;">

        <!-- Top Bar -->
        <tr>
          <td style="background:#1A1A1A;padding:12px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:2px;text-transform:uppercase;color:#9B8A6E;">Hotel E Santa Rosa</td>
                <td align="right" style="font-family:Arial,sans-serif;font-size:11px;color:#666;">reservations@hotelesantarosa.com</td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Hero Image -->
        <tr>
          <td style="padding:0;position:relative;">
            <img src="${HERO_IMAGE}" alt="Hotel E Santa Rosa" width="620" style="display:block;width:100%;max-width:620px;height:300px;object-fit:cover;" />
            <!-- Overlay text (Outlook fallback: plain text below image) -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:${ac};">
              <tr>
                <td style="padding:20px 32px 24px;">
                  <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.75);margin-bottom:8px;">${SEASON_ICONS[month.season]} ${month.season} &middot; ${month.name} 2026</div>
                  <div style="font-family:Georgia,serif;font-size:28px;font-weight:400;color:#ffffff;line-height:1.25;margin-bottom:6px;">${month.tagline}</div>
                  <div style="font-family:Arial,sans-serif;font-size:13px;color:rgba(255,255,255,0.8);font-style:italic;">${month.heroCaption}</div>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Intro -->
        <tr>
          <td style="padding:36px 32px 8px;text-align:center;">
            <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:${ac};margin-bottom:12px;">37 Old Courthouse Square &middot; Downtown Santa Rosa</div>
            <p style="font-family:Georgia,serif;font-size:15px;color:#555;line-height:1.7;margin:0 0 24px;">
              Welcome to <strong>Hotel E</strong> &mdash; Santa Rosa's #1 rated boutique hotel, housed in a beautifully restored 1906 Beaux-Arts landmark. This ${month.name}, Sonoma Wine Country is yours to explore. Our concierge team is ready to help you make the most of it.
            </p>
            <a href="https://hotelesantarosa.com/rooms/" style="display:inline-block;background:${ac};color:#ffffff;padding:13px 32px;border-radius:2px;text-decoration:none;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">${month.cta}</a>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:28px 32px 0;"><hr style="border:none;border-top:1px solid #E8E0D6;margin:0;" /></td></tr>

        <!-- Things To Do -->
        <tr>
          <td style="padding:32px 32px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="padding-bottom:24px;">
                  <div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#9B8A6E;margin-bottom:8px;">Things To Do</div>
                  <div style="font-family:Georgia,serif;font-size:24px;font-weight:400;color:#1A1A1A;">Explore Sonoma in ${month.name}</div>
                </td>
              </tr>
              ${todoRows}
            </table>
          </td>
        </tr>

        <!-- Divider -->
        <tr><td style="padding:16px 32px 0;"><hr style="border:none;border-top:1px solid #E8E0D6;margin:0;" /></td></tr>

        <!-- Events -->
        <tr>
          <td style="padding:32px 32px 8px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td align="center" style="padding-bottom:24px;">
                  <div style="font-family:Arial,sans-serif;font-size:10px;letter-spacing:3px;text-transform:uppercase;color:#9B8A6E;margin-bottom:8px;">Area Events</div>
                  <div style="font-family:Georgia,serif;font-size:24px;font-weight:400;color:#1A1A1A;">Don't Miss in ${month.name}</div>
                </td>
              </tr>
              ${eventRows}
            </table>
          </td>
        </tr>

        <!-- Amenities Strip -->
        <tr>
          <td style="padding:16px 32px 24px;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background:#FAFAF8;border:1px solid #E8E0D6;border-radius:6px;">
              <tr>
                <td align="center" style="padding:20px 12px;font-family:Arial,sans-serif;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      ${[
                        { icon: "☕", label: "Free Breakfast", sub: "Daily 6:30–10AM" },
                        { icon: "🍷", label: "Enology Wine Bar", sub: "Happy Hour 5–7PM" },
                        { icon: "🚗", label: "Valet Parking", sub: "$25/night" },
                        { icon: "🐾", label: "Pet Friendly", sub: "Dogs welcome" },
                      ].map(a => `
                      <td align="center" style="padding:0 16px;">
                        <div style="font-size:20px;margin-bottom:4px;">${a.icon}</div>
                        <div style="font-size:12px;font-weight:600;color:#1A1A1A;margin-bottom:2px;">${a.label}</div>
                        <div style="font-size:11px;color:#999;">${a.sub}</div>
                      </td>`).join("")}
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- Final CTA -->
        <tr>
          <td style="background:${ac};padding:40px 32px;text-align:center;">
            <div style="font-family:Arial,sans-serif;font-size:11px;letter-spacing:3px;text-transform:uppercase;color:rgba(255,255,255,0.7);margin-bottom:12px;">${month.name} 2026</div>
            <div style="font-family:Georgia,serif;font-size:28px;font-weight:400;color:#ffffff;margin-bottom:12px;">Your Sonoma Adventure Awaits</div>
            <p style="font-family:Arial,sans-serif;font-size:14px;color:rgba(255,255,255,0.85);margin:0 0 24px;line-height:1.6;">Book direct for our best rates. Stash Rewards members save even more.</p>
            <a href="https://hotelesantarosa.com/rooms/" style="display:inline-block;background:#ffffff;color:${ac};padding:13px 36px;border-radius:2px;text-decoration:none;font-family:Arial,sans-serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;font-weight:700;">${month.cta}</a>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#1A1A1A;padding:24px 32px;text-align:center;">
            <div style="font-family:Arial,sans-serif;font-size:14px;letter-spacing:1px;color:#9B8A6E;margin-bottom:8px;">Hotel E Santa Rosa</div>
            <div style="font-family:Arial,sans-serif;font-size:12px;color:#666;line-height:1.8;">
              37 Old Courthouse Square &middot; Santa Rosa, CA 95404<br />
              (707) 481-3750 &middot; reservations@hotelesantarosa.com<br />
              <span style="color:#555;">Front Desk Open 24/7</span>
            </div>
            <div style="margin-top:16px;font-family:Arial,sans-serif;font-size:11px;color:#555;">
              You're receiving this because you subscribed to Hotel E news and offers.<br />
              <a href="#" style="color:#9B8A6E;">Unsubscribe</a> &middot; <a href="https://hotelesantarosa.com" style="color:#9B8A6E;">Visit Website</a>
            </div>
          </td>
        </tr>

      </table>
      <!-- /Email Container -->

    </td>
  </tr>
</table>
</body>
</html>`;
}

// ─── DOWNLOAD HELPER ───────────────────────────────────────────────────────────
function downloadHTML(month) {
  const html = generateEmailHTML(month);
  const blob = new Blob([html], { type: "text/html;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `hotel-e-${month.name.toLowerCase()}-2026.html`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

function downloadAllHTML() {
  MONTHS.forEach((month, i) => {
    setTimeout(() => downloadHTML(month), i * 200);
  });
}

// ─── UI ────────────────────────────────────────────────────────────────────────
export default function HotelEEmailCampaign() {
  const [selectedMonth, setSelectedMonth] = useState(0);
  const [view, setView] = useState("preview");
  const [downloaded, setDownloaded] = useState(null);

  const month = MONTHS[selectedMonth];
  const accent = month.accentColor;
  const accentLight = month.accentLight;

  function handleDownloadCurrent() {
    downloadHTML(month);
    setDownloaded(month.name);
    setTimeout(() => setDownloaded(null), 2500);
  }

  function handleDownloadAll() {
    downloadAllHTML();
    setDownloaded("all");
    setTimeout(() => setDownloaded(null), 3000);
  }

  return (
    <div style={{ fontFamily: "'Georgia', serif", background: "#F9F7F4", minHeight: "100vh" }}>

      {/* Header */}
      <div style={{
        background: "#1A1A1A", color: "#fff", padding: "14px 24px",
        display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "12px"
      }}>
        <div>
          <div style={{ fontSize: "11px", letterSpacing: "2px", color: "#9B8A6E", textTransform: "uppercase", marginBottom: "2px" }}>Hotel E Santa Rosa</div>
          <div style={{ fontSize: "18px", fontWeight: "300", letterSpacing: "1px" }}>2026 Email Campaign</div>
        </div>
        <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
          <button onClick={() => setView("list")} style={{ padding: "6px 14px", borderRadius: "4px", border: "1px solid #444", background: view === "list" ? "#9B8A6E" : "transparent", color: "#fff", cursor: "pointer", fontSize: "12px" }}>All Months</button>
          <button onClick={() => setView("preview")} style={{ padding: "6px 14px", borderRadius: "4px", border: "1px solid #444", background: view === "preview" ? "#9B8A6E" : "transparent", color: "#fff", cursor: "pointer", fontSize: "12px" }}>Preview</button>
          <button
            onClick={handleDownloadAll}
            style={{ padding: "6px 14px", borderRadius: "4px", border: "1px solid #9B8A6E", background: downloaded === "all" ? "#9B8A6E" : "transparent", color: downloaded === "all" ? "#fff" : "#9B8A6E", cursor: "pointer", fontSize: "12px", fontFamily: "sans-serif" }}
          >
            {downloaded === "all" ? "⬇ Downloading All…" : "⬇ Download All 12"}
          </button>
        </div>
      </div>

      {view === "list" ? (
        <div style={{ padding: "32px 24px", maxWidth: "1100px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "20px", fontWeight: "400", color: "#333", marginBottom: "24px", letterSpacing: "1px" }}>All 12 Campaigns</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "16px" }}>
            {MONTHS.map((m, i) => (
              <div key={m.id} style={{ background: "#fff", border: `2px solid ${selectedMonth === i ? m.accentColor : "#E8E0D6"}`, borderRadius: "8px", padding: "20px", boxShadow: selectedMonth === i ? `0 4px 16px ${m.accentColor}30` : "none" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                  <span style={{ fontSize: "11px", letterSpacing: "1px", textTransform: "uppercase", color: m.accentColor, fontFamily: "sans-serif" }}>{SEASON_ICONS[m.season]} {m.season}</span>
                  <span style={{ background: m.accentLight, color: m.accentColor, fontSize: "10px", padding: "2px 8px", borderRadius: "12px", fontFamily: "sans-serif", fontWeight: "600" }}>{m.events.length} Events</span>
                </div>
                <div style={{ fontSize: "22px", fontWeight: "700", color: "#1A1A1A", marginBottom: "4px" }}>{m.name}</div>
                <div style={{ fontSize: "12px", color: "#666", fontStyle: "italic", marginBottom: "14px" }}>"{m.tagline}"</div>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button onClick={() => { setSelectedMonth(i); setView("preview"); }} style={{ flex: 1, padding: "7px 0", background: m.accentLight, color: m.accentColor, border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontFamily: "sans-serif", fontWeight: "600" }}>Preview</button>
                  <button onClick={() => downloadHTML(m)} style={{ flex: 1, padding: "7px 0", background: m.accentColor, color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer", fontSize: "12px", fontFamily: "sans-serif", fontWeight: "600" }}>⬇ HTML</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div style={{ display: "flex", maxWidth: "1200px", margin: "0 auto" }}>

          {/* Sidebar */}
          <div style={{ width: "155px", flexShrink: 0, background: "#fff", borderRight: "1px solid #E8E0D6", minHeight: "calc(100vh - 62px)" }}>
            {MONTHS.map((m, i) => (
              <button key={m.id} onClick={() => setSelectedMonth(i)} style={{ display: "block", width: "100%", padding: "10px 14px", textAlign: "left", background: selectedMonth === i ? m.accentLight : "transparent", border: "none", borderLeft: `3px solid ${selectedMonth === i ? m.accentColor : "transparent"}`, cursor: "pointer", fontSize: "13px", color: selectedMonth === i ? m.accentColor : "#555", fontWeight: selectedMonth === i ? "600" : "400", fontFamily: "sans-serif" }}>
                {m.name}
              </button>
            ))}
          </div>

          {/* Preview Panel */}
          <div style={{ flex: 1, padding: "20px 24px", overflowY: "auto" }}>

            {/* Meta + Download Bar */}
            <div style={{ background: "#fff", border: "1px solid #E8E0D6", borderRadius: "8px", padding: "14px 20px", marginBottom: "18px", display: "flex", flexWrap: "wrap", gap: "16px", alignItems: "center", justifyContent: "space-between", fontFamily: "sans-serif" }}>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div style={{ fontSize: "10px", color: "#999", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "2px" }}>Subject</div>
                <div style={{ fontSize: "13px", color: "#1A1A1A", fontWeight: "500" }}>{month.heroSubject}</div>
                <div style={{ fontSize: "11px", color: "#888", marginTop: "4px" }}>Preview: {month.preheader}</div>
              </div>
              <button
                onClick={handleDownloadCurrent}
                style={{
                  padding: "9px 20px", background: downloaded === month.name ? "#3D6B35" : accent,
                  color: "#fff", border: "none", borderRadius: "4px", cursor: "pointer",
                  fontSize: "13px", fontFamily: "sans-serif", fontWeight: "600",
                  transition: "background 0.2s", whiteSpace: "nowrap"
                }}
              >
                {downloaded === month.name ? `✓ Downloaded!` : `⬇ Download ${month.name} HTML`}
              </button>
            </div>

            {/* Email Render */}
            <div style={{ maxWidth: "620px", margin: "0 auto", background: "#fff", border: "1px solid #E8E0D6", borderRadius: "8px", overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}>

              {/* Top Bar */}
              <div style={{ background: "#1A1A1A", padding: "12px 24px", display: "flex", justifyContent: "space-between" }}>
                <span style={{ color: "#9B8A6E", fontSize: "11px", letterSpacing: "2px", textTransform: "uppercase" }}>Hotel E Santa Rosa</span>
                <span style={{ color: "#666", fontSize: "11px" }}>reservations@hotelesantarosa.com</span>
              </div>

              {/* Hero */}
              <div style={{ position: "relative" }}>
                <img src={HERO_IMAGE} alt="Hotel E" style={{ width: "100%", height: "280px", objectFit: "cover", display: "block" }} />
                <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${accent}11, ${accent}BB)` }} />
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "24px 32px" }}>
                  <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.8)", fontFamily: "sans-serif", marginBottom: "6px" }}>{SEASON_ICONS[month.season]} {month.season} · {month.name} 2026</div>
                  <div style={{ fontSize: "30px", fontWeight: "400", color: "#fff", lineHeight: 1.2, marginBottom: "6px", textShadow: "0 2px 8px rgba(0,0,0,0.4)" }}>{month.tagline}</div>
                  <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.85)", fontStyle: "italic" }}>{month.heroCaption}</div>
                </div>
              </div>

              {/* Intro */}
              <div style={{ padding: "32px 32px 8px", textAlign: "center" }}>
                <div style={{ fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", color: accent, fontFamily: "sans-serif", marginBottom: "12px" }}>37 Old Courthouse Square · Downtown Santa Rosa</div>
                <p style={{ color: "#555", lineHeight: 1.7, fontSize: "15px", margin: "0 0 20px" }}>
                  Welcome to <strong>Hotel E</strong> — Santa Rosa's #1 rated boutique hotel, housed in a beautifully restored 1906 Beaux-Arts landmark. This {month.name}, Sonoma Wine Country is yours to explore.
                </p>
                <a href="https://hotelesantarosa.com/rooms/" style={{ display: "inline-block", background: accent, color: "#fff", padding: "13px 32px", borderRadius: "2px", textDecoration: "none", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: "700" }}>{month.cta}</a>
              </div>

              <div style={{ margin: "28px 32px 0", borderTop: "1px solid #E8E0D6" }} />

              {/* Things To Do */}
              <div style={{ padding: "28px 32px 8px" }}>
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#9B8A6E", fontFamily: "sans-serif", marginBottom: "6px" }}>Things To Do</div>
                  <div style={{ fontSize: "22px", fontWeight: "400", color: "#1A1A1A" }}>Explore Sonoma in {month.name}</div>
                </div>
                {month.thingsToDo.map((item, i) => (
                  <div key={i} style={{ display: "flex", gap: "14px", marginBottom: "14px", padding: "14px", background: accentLight, borderRadius: "6px", borderLeft: `3px solid ${accent}` }}>
                    <span style={{ fontSize: "22px", flexShrink: 0 }}>{item.icon}</span>
                    <div>
                      <div style={{ fontSize: "14px", fontWeight: "600", color: "#1A1A1A", marginBottom: "3px" }}>{item.title}</div>
                      <div style={{ fontSize: "13px", color: "#666", lineHeight: 1.6 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ margin: "16px 32px 0", borderTop: "1px solid #E8E0D6" }} />

              {/* Events */}
              <div style={{ padding: "28px 32px 8px" }}>
                <div style={{ textAlign: "center", marginBottom: "24px" }}>
                  <div style={{ fontSize: "10px", letterSpacing: "3px", textTransform: "uppercase", color: "#9B8A6E", fontFamily: "sans-serif", marginBottom: "6px" }}>Area Events</div>
                  <div style={{ fontSize: "22px", fontWeight: "400", color: "#1A1A1A" }}>Don't Miss in {month.name}</div>
                </div>
                {month.events.map((event, i) => (
                  <div key={i} style={{ marginBottom: "12px", padding: "16px", background: "#FAFAF8", border: "1px solid #E8E0D6", borderRadius: "6px", display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <div style={{ background: accent, color: "#fff", width: "34px", height: "34px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "15px", flexShrink: 0 }}>
                      {["🗓️", "🎉", "🎵", "🌟"][i % 4]}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "4px", marginBottom: "4px" }}>
                        <span style={{ fontSize: "14px", fontWeight: "600", color: "#1A1A1A" }}>{event.name}</span>
                        <span style={{ fontSize: "11px", color: accent, background: accentLight, padding: "2px 10px", borderRadius: "12px", fontFamily: "sans-serif", fontWeight: "600", whiteSpace: "nowrap" }}>{event.date}</span>
                      </div>
                      <p style={{ margin: 0, fontSize: "13px", color: "#666", lineHeight: 1.6 }}>{event.detail}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Amenities */}
              <div style={{ margin: "16px 32px 20px", background: "#FAFAF8", border: "1px solid #E8E0D6", borderRadius: "6px", padding: "18px", display: "flex", flexWrap: "wrap", gap: "12px", justifyContent: "space-around", fontFamily: "sans-serif" }}>
                {[{ icon: "☕", label: "Free Breakfast", sub: "6:30–10AM" }, { icon: "🍷", label: "Wine Bar", sub: "Happy Hour 5–7" }, { icon: "🚗", label: "Valet Parking", sub: "$25/night" }, { icon: "🐾", label: "Pet Friendly", sub: "Dogs welcome" }].map((a, i) => (
                  <div key={i} style={{ textAlign: "center", minWidth: "70px" }}>
                    <div style={{ fontSize: "20px", marginBottom: "3px" }}>{a.icon}</div>
                    <div style={{ fontSize: "11px", fontWeight: "600", color: "#1A1A1A" }}>{a.label}</div>
                    <div style={{ fontSize: "10px", color: "#999" }}>{a.sub}</div>
                  </div>
                ))}
              </div>

              {/* Final CTA */}
              <div style={{ background: accent, padding: "36px 32px", textAlign: "center" }}>
                <div style={{ color: "rgba(255,255,255,0.7)", fontSize: "11px", letterSpacing: "3px", textTransform: "uppercase", fontFamily: "sans-serif", marginBottom: "10px" }}>{month.name} 2026</div>
                <div style={{ color: "#fff", fontSize: "26px", fontWeight: "400", marginBottom: "10px" }}>Your Sonoma Adventure Awaits</div>
                <p style={{ color: "rgba(255,255,255,0.85)", fontSize: "14px", margin: "0 0 22px", lineHeight: 1.6 }}>Book direct for our best rates. Stash Rewards members save even more.</p>
                <a href="https://hotelesantarosa.com/rooms/" style={{ display: "inline-block", background: "#fff", color: accent, padding: "13px 36px", borderRadius: "2px", textDecoration: "none", fontSize: "12px", letterSpacing: "2px", textTransform: "uppercase", fontFamily: "sans-serif", fontWeight: "700" }}>{month.cta}</a>
              </div>

              {/* Footer */}
              <div style={{ background: "#1A1A1A", padding: "22px 32px", textAlign: "center", fontFamily: "sans-serif" }}>
                <div style={{ color: "#9B8A6E", fontSize: "13px", letterSpacing: "1px", marginBottom: "8px" }}>Hotel E Santa Rosa</div>
                <div style={{ color: "#666", fontSize: "12px", lineHeight: 1.8 }}>
                  37 Old Courthouse Square · Santa Rosa, CA 95404<br />
                  (707) 481-3750 · reservations@hotelesantarosa.com
                </div>
                <div style={{ marginTop: "14px", color: "#555", fontSize: "11px" }}>
                  <a href="#" style={{ color: "#9B8A6E" }}>Unsubscribe</a> · <a href="https://hotelesantarosa.com" style={{ color: "#9B8A6E" }}>Visit Website</a>
                </div>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
}
