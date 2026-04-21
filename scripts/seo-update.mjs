import fs from 'fs';
import path from 'path';

const root = path.resolve(path.dirname(new URL(import.meta.url).pathname.replace(/^\//, '')), '..');
const dir = path.join(root, 'services');
const SITE = 'https://abesjunksolutions.com';
const PHONE = '+1-727-810-4816';
const PHONE_DISP = '(727) 810-4816';

// Per-service metadata
const data = {
  'junk-removal': {
    name: 'Junk Removal',
    breadcrumb: 'Junk Removal',
    title: "Junk Removal in Pasco County, FL | Abe's Junk Solutions",
    desc: "Same-day junk removal in Pasco County, FL. Household clutter, garage, attic, electronics & more. Free on-site quote. Call (727) 810-4816.",
    ogDesc: "From one awkward item to full property cleanouts in Pasco County, FL. Same-day service, free quote. Call (727) 810-4816.",
    serviceType: 'Service',
    serviceDesc: "Full-service junk removal across Pasco County, FL. We haul household clutter, garage overflow, attic & basement junk, electronics, and mixed debris.",
    faqs: [
      ['How much does junk removal cost in Pasco County?', "Pricing is based on volume (how much space your items take in our truck). We give a firm, no-obligation quote on-site before we lift a thing."],
      ['Do you offer same-day junk removal?', "Yes — same-day and next-day appointments are usually available across Pasco County. Call (727) 810-4816 for current availability."],
      ['What can\u2019t you take?', "We can\u2019t haul hazardous materials such as paint, motor oil, chemicals, asbestos, medical waste, or propane tanks. If you\u2019re unsure, give us a call."],
      ['Do I need to move the junk to the curb?', "No. We do all the lifting and loading from wherever the items sit — house, garage, attic, yard, or shed."],
    ],
  },
  'estate-cleanouts': {
    name: 'Estate Cleanouts',
    breadcrumb: 'Estate Cleanouts',
    title: "Estate Cleanouts in Pasco County, FL | Abe's Junk Solutions",
    desc: "Compassionate estate cleanouts in Pasco County, FL. Full home clearing, furniture, personal belongings — handled with care. Call (727) 810-4816.",
    ogDesc: "Respectful, thorough estate cleanouts across Pasco County, FL. Full home clearing handled with care. Call (727) 810-4816.",
    serviceType: 'Service',
    serviceDesc: "Compassionate estate and full-property cleanouts in Pasco County, FL. We handle furniture, clothing, personal belongings, and complete home clearing.",
    faqs: [
      ['How quickly can you complete an estate cleanout?', "Most single-family estate cleanouts are done in 1\u20132 days. Larger properties may take longer — we\u2019ll give you a realistic timeline during the on-site quote."],
      ['Do you sort items for donation?', "Yes. Usable items are set aside for donation to local Pasco County charities whenever possible, and we handle recycling where we can."],
      ['Can you work with estate attorneys or realtors?', "Absolutely. We regularly coordinate with attorneys, realtors, and out-of-state family to clear a property on a schedule that works for everyone."],
      ['Is the quote free?', "Yes. On-site estate cleanout quotes are always free and no-obligation."],
    ],
  },
  'commercial-cleanouts': {
    name: 'Commercial Cleanouts',
    breadcrumb: 'Commercial Cleanouts',
    title: "Commercial Cleanouts in Pasco County, FL | Abe's Junk Solutions",
    desc: "Commercial cleanouts in Pasco County, FL. Office liquidations, retail cleanouts, foreclosures. Off-hours work available. Call (727) 810-4816.",
    ogDesc: "Office liquidations, retail cleanouts, and foreclosure cleanouts across Pasco County, FL. Off-hours available. Call (727) 810-4816.",
    serviceType: 'Service',
    serviceDesc: "Commercial cleanout service in Pasco County, FL for offices, retail spaces, warehouses, and foreclosed properties — with off-hours scheduling available.",
    faqs: [
      ['Can you work after business hours?', "Yes. We regularly work evenings and weekends so cleanouts don\u2019t interrupt your business."],
      ['Do you handle office furniture and electronics?', "We haul desks, chairs, cubicles, file cabinets, printers, monitors, and other office equipment — and recycle e-waste responsibly."],
      ['Can you clear a foreclosed or abandoned property?', "Yes. We coordinate with property managers, banks, and realtors to fully clear foreclosed or abandoned spaces."],
      ['Do you provide a certificate of disposal?', "On request, we can provide documentation of items hauled and how they were disposed of or recycled."],
    ],
  },
  'appliance-removal': {
    name: 'Appliance Removal',
    breadcrumb: 'Appliance Removal',
    title: "Appliance Removal in Pasco County, FL | Abe's Junk Solutions",
    desc: "Appliance removal in Pasco County, FL. Refrigerators, washers, dryers, water heaters, ovens — properly disposed. Call (727) 810-4816.",
    ogDesc: "Fridges, washers, dryers, water heaters, ovens hauled away across Pasco County, FL. Properly disposed. Call (727) 810-4816.",
    serviceType: 'Service',
    serviceDesc: "Appliance removal and disposal in Pasco County, FL. Refrigerators, washers, dryers, ovens, dishwashers, water heaters — hauled, recycled, and disposed properly.",
    faqs: [
      ['Do you disconnect the appliance?', "We can disconnect most standard appliances (washers, dryers, fridges) at pickup. For hardwired or gas connections, a licensed tech must disconnect first."],
      ['Do you recycle old appliances?', "Yes. Metal and working parts are recycled whenever possible, and refrigerants are handled according to EPA guidelines."],
      ['Is there an extra fee for fridges or freezers?', "Refrigerators and freezers involve refrigerant handling, so pricing reflects that — but there are no hidden fees. You\u2019ll know the total before we load."],
      ['Can you take just one appliance?', "Absolutely. Single-item pickups are welcome."],
    ],
  },
  'furniture-removal': {
    name: 'Furniture Removal',
    breadcrumb: 'Furniture Removal',
    title: "Furniture Removal in Pasco County, FL | Abe's Junk Solutions",
    desc: "Furniture removal in Pasco County, FL. Sofas, mattresses, bed frames, dressers, desks — we haul it all. No heavy lifting. Call (727) 810-4816.",
    ogDesc: "Sofas, mattresses, dressers, desks hauled away across Pasco County, FL. No heavy lifting on your end. Call (727) 810-4816.",
    serviceType: 'Service',
    serviceDesc: "Furniture removal in Pasco County, FL. Sofas, mattresses, box springs, bed frames, dressers, desks, and heavy items hauled away.",
    faqs: [
      ['Do you take mattresses and box springs?', "Yes — mattresses and box springs of all sizes. Many are recycled through regional mattress recycling programs."],
      ['Can you remove furniture from upstairs or tight spaces?', "Yes. Our crews handle stairs, narrow hallways, and awkward access regularly."],
      ['Will you donate furniture that\u2019s still usable?', "Whenever possible we route good-condition furniture to local Pasco County charities instead of the landfill."],
      ['Do I need to disassemble anything?', "No. We handle disassembly of beds, desks, and sectionals at pickup."],
    ],
  },
  'construction-debris': {
    name: 'Construction Debris Removal',
    breadcrumb: 'Construction Debris',
    title: "Construction Debris Removal in Pasco County, FL | Abe's Junk Solutions",
    desc: "Construction debris removal in Pasco County, FL. Drywall, lumber, concrete, tile, roofing. Job sites cleared fast. Call (727) 810-4816.",
    ogDesc: "Drywall, lumber, concrete, tile, roofing cleared from Pasco County job sites. Fast turnaround. Call (727) 810-4816.",
    serviceType: 'Service',
    serviceDesc: "Construction and renovation debris removal in Pasco County, FL. Drywall, lumber, concrete, tile, roofing, and post-reno waste cleared quickly.",
    faqs: [
      ['Can you handle post-renovation cleanup?', "Yes. We clear drywall, lumber, flooring scraps, tile, fixtures, and packaging so your project wraps clean."],
      ['Do you work with contractors?', "Absolutely. We offer repeat-contractor pricing and can schedule recurring pickups for active job sites in Pasco County."],
      ['Do you haul concrete and heavy debris?', "Yes — broken concrete, brick, and tile within truck weight limits. Larger volumes may need a dedicated dump run."],
      ['How fast can you be on-site?', "Same-day or next-day pickups are usually available. Call (727) 810-4816 to check current scheduling."],
    ],
  },
  'yard-waste': {
    name: 'Yard Waste Removal',
    breadcrumb: 'Yard & Outdoor Waste',
    title: "Yard Waste Removal in Pasco County, FL | Abe's Junk Solutions",
    desc: "Yard and outdoor waste removal in Pasco County, FL. Brush, old fences, swing sets, hot tubs, sheds — hauled away. Call (727) 810-4816.",
    ogDesc: "Brush piles, fences, swing sets, hot tubs, sheds cleared across Pasco County, FL. Call (727) 810-4816.",
    serviceType: 'Service',
    serviceDesc: "Yard waste and outdoor junk removal in Pasco County, FL. Brush piles, old fences, swing sets, hot tubs, sheds, and other exterior debris hauled away.",
    faqs: [
      ['Do you take storm debris?', "Yes. We haul downed branches, fallen fences, and storm-displaced outdoor items across Pasco County."],
      ['Can you remove a hot tub or shed?', "Yes. Hot tubs, sheds, and swing sets are common pickups — we disassemble on-site when needed."],
      ['Do you cut down trees?', "No — we haul already-cut brush, branches, and yard debris but we\u2019re not a tree service."],
      ['Will you take bagged yard waste?', "Yes, bagged leaves, grass clippings, and brush are all welcome."],
    ],
  },
  'donation-recycling': {
    name: 'Donation & Recycling',
    breadcrumb: 'Donation & Recycling',
    title: "Donation & Recycling Junk Removal in Pasco County, FL | Abe's Junk Solutions",
    desc: "Eco-friendly junk removal in Pasco County, FL. We donate usable items to local charities and recycle to keep waste out of landfills. Call (727) 810-4816.",
    ogDesc: "Donation-first, recycling-second junk removal in Pasco County, FL. Keeping waste out of landfills. Call (727) 810-4816.",
    serviceType: 'Service',
    serviceDesc: "Eco-conscious junk removal in Pasco County, FL. Usable items are routed to local charities and as much as possible is recycled rather than landfilled.",
    faqs: [
      ['Which charities do you donate to?', "We route usable goods to local Pasco County thrift stores, shelters, and reuse programs that accept household items and furniture."],
      ['How much of my junk gets recycled?', "We aim to divert as much as possible — metals, appliances, e-waste, mattresses, and cardboard all have dedicated recycling streams."],
      ['Can I get a donation receipt?', "For items routed to partner charities, we can provide contact info so you can request a donation receipt."],
      ['Is eco-friendly removal more expensive?', "No. Donation and recycling are built into our standard service at no extra charge."],
    ],
  },
  'demolition-services': {
    name: 'Demolition & Removal Services',
    breadcrumb: 'Demolition Services',
    title: "Demolition & Removal Services in Pasco County, FL | Abe's Junk Solutions",
    desc: "Shed, deck, drywall & hot tub demolition in Pasco County, FL. We demo it and haul it away in one visit. Free quote. Call (727) 810-4816.",
    ogDesc: "Sheds, decks, drywall, hot tubs torn down and hauled away in Pasco County, FL. One crew, one visit. Call (727) 810-4816.",
    serviceType: 'Service',
    serviceDesc: "Shed, deck, drywall, and hot tub demolition with full haul-away in Pasco County, FL. One crew handles demo and removal in a single visit.",
    faqs: [
      ['Do you demo and haul away in one visit?', "Yes — we handle the full job from tear-down to haul-away in a single visit. No pile of debris left behind."],
      ['How long does shed demolition take?', "Most standard sheds take 1–3 hours depending on size and material. We\u2019ll give you a realistic time estimate along with your price quote."],
      ['Can you demolish a deck attached to the house?', "Yes. Attached decks are a common job. We work carefully to avoid damaging your home\u2019s siding or foundation."],
      ['Do you drain and remove hot tubs?', "Yes. You can drain it ahead of time, or we can coordinate draining before arrival. We then break it down and haul everything away completely."],
    ],
  },
  'emergency-storm-cleanup': {
    name: 'Emergency & Storm Debris Cleanup',
    breadcrumb: 'Emergency & Storm Cleanup',
    title: "Emergency & Storm Debris Cleanup in Pasco County, FL | Abe's Junk Solutions",
    desc: "Emergency junk removal and storm debris cleanup in Pasco County, FL. Same-day response. Branches, fences, flood debris cleared fast. Call (727) 810-4816.",
    ogDesc: "Storm hit your property? We respond fast to clear debris across Pasco County, FL. Same-day service available. Call (727) 810-4816.",
    serviceType: 'Service',
    serviceDesc: "Emergency junk removal and storm debris cleanup across Pasco County, FL. Same-day response for storm debris, flood-damaged items, downed fences, and urgent property clearance.",
    faqs: [
      ['How fast can you respond after a storm?', "We prioritize storm cleanup jobs and can often schedule same-day or next-day depending on storm volume. Call (727) 810-4816 immediately for fastest response."],
      ['Do you haul flood-damaged furniture and belongings?', "Yes \u2014 waterlogged furniture, ruined flooring, drywall, and other flood-damaged items are all taken in our truck."],
      ['Can you help after a hurricane or major storm event?', "Yes. Post-hurricane debris cleanup across Pasco County is something we handle regularly. Call for current availability after major events."],
      ['Is there an emergency rate or surcharge?', "No emergency markup. We price storm cleanup jobs the same way as standard jobs \u2014 by volume. You\u2019ll know the cost before we lift anything."],
    ],
  },
  'hoa-violation-cleanup': {
    name: 'HOA Violation Cleanup',
    breadcrumb: 'HOA Violation Cleanup',
    title: "HOA Violation Cleanup in Pasco County, FL | Abe's Junk Solutions",
    desc: "HOA violation cleanup in Pasco County, FL. Got a notice? We clear what the HOA flagged before your deadline — no judgment, free quote. Call (727) 810-4816.",
    ogDesc: "Got an HOA violation notice? We clear your property fast before the deadline across Pasco County, FL. No judgment. Call (727) 810-4816.",
    serviceType: 'Service',
    serviceDesc: "HOA violation cleanup across Pasco County, FL. We clear yard junk, outdoor appliances, visible clutter, and debris flagged by HOA notices — fast, before your deadline.",
    faqs: [
      ['Can you come before my HOA deadline?', "Yes \u2014 we prioritize HOA jobs because deadlines are real. Call us with your deadline date and we\u2019ll schedule accordingly, including same-day when available."],
      ['What if I don\u2019t know exactly what the HOA wants removed?', "Tell us what the violation notice says and we\u2019ll advise. We work with you to make sure the right items are cleared so the violation gets resolved properly."],
      ['Do I need to be home during the cleanup?', "Not necessarily. With your permission and clear instructions on what to remove, we can clear designated exterior areas without you present."],
      ['Is there a charge just to get a quote?', "No \u2014 quotes are always free. We\u2019ll tell you upfront what we can take and what we can\u2019t, with no obligation."],
    ],
  },
  'agent-investor-program': {
    name: 'Agent & Investor Partner Program',
    breadcrumb: 'Agent & Investor Program',
    title: "Agent & Investor Partner Program | Abe's Junk Solutions Pasco County, FL",
    desc: "Junk removal partner program for real estate agents, investors & property managers in Pasco County, FL. Priority scheduling, first-time discount. Call (727) 810-4816.",
    ogDesc: "Priority scheduling and volume pricing for agents, investors & property managers in Pasco County, FL. First-time partner discount. Call (727) 810-4816.",
    serviceType: 'Service',
    serviceDesc: "Priority scheduling, volume pricing, and a direct line for real estate agents, fix-and-flip investors, property managers, and contractors in Pasco County, FL.",
    faqs: [
      ['Is there a sign-up fee or contract?', "No sign-up fee. We work on a simple per-job basis by default \u2014 but recurring contracts are available for contractors and property managers who prefer them. Just mention it when you call."],
      ['Do I have to send a minimum number of jobs?', "No minimum. We offer priority scheduling and better pricing for professionals who send us regular work \u2014 no threshold to hit first."],
      ['Can I give your number directly to my clients?', "Yes \u2014 give clients our number and let them know you\u2019re a partner. We\u2019ll handle the job professionally and keep you in the loop if you\u2019d like a status update."],
      ['What areas do you cover for partner jobs?', "All of Pasco County including New Port Richey, Wesley Chapel, Zephyrhills, Land O\u2019 Lakes, Hudson, Trinity, Holiday, Dade City, and surrounding areas."],
    ],
  },
};

const escapeAttr = s => s.replace(/"/g, '&quot;').replace(/&(?!amp;|quot;|lt;|gt;)/g, '&amp;');

function buildHeadExtras(slug, d) {
  const pageUrl = `${SITE}/services/${slug}`;
  const ogImage = `${SITE}/brand_assets/abes-logo.jpg`;
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": d.serviceType,
    "name": d.name,
    "serviceType": d.name,
    "url": pageUrl,
    "description": d.serviceDesc,
    "provider": { "@id": `${SITE}/#business` },
    "areaServed": [
      { "@type": "City", "name": "New Port Richey" },
      { "@type": "City", "name": "Wesley Chapel" },
      { "@type": "City", "name": "Zephyrhills" },
      { "@type": "City", "name": "Land O' Lakes" },
      { "@type": "City", "name": "Port Richey" },
      { "@type": "City", "name": "Hudson" },
      { "@type": "City", "name": "Trinity" },
      { "@type": "City", "name": "Holiday" },
      { "@type": "AdministrativeArea", "name": "Pasco County, FL" }
    ]
  };
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home",     "item": `${SITE}/` },
      { "@type": "ListItem", "position": 2, "name": "Services", "item": `${SITE}/#services` },
      { "@type": "ListItem", "position": 3, "name": d.breadcrumb, "item": pageUrl }
    ]
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": d.faqs.map(([q, a]) => ({
      "@type": "Question",
      "name": q,
      "acceptedAnswer": { "@type": "Answer", "text": a }
    }))
  };

  return `  <link rel="canonical" href="${pageUrl}" />
  <meta name="robots" content="index, follow, max-image-preview:large" />
  <meta name="theme-color" content="#07090A" />

  <meta property="og:type" content="website" />
  <meta property="og:site_name" content="Abe's Junk Solutions" />
  <meta property="og:title" content="${escapeAttr(d.title)}" />
  <meta property="og:description" content="${escapeAttr(d.ogDesc)}" />
  <meta property="og:url" content="${pageUrl}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:locale" content="en_US" />

  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${escapeAttr(d.title)}" />
  <meta name="twitter:description" content="${escapeAttr(d.ogDesc)}" />
  <meta name="twitter:image" content="${ogImage}" />

  <script type="application/ld+json">
${JSON.stringify(serviceLd, null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify(breadcrumbLd, null, 2)}
  </script>
  <script type="application/ld+json">
${JSON.stringify(faqLd, null, 2)}
  </script>
`;
}

const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));
for (const f of files) {
  const slug = f.replace(/\.html$/, '');
  const d = data[slug];
  if (!d) { console.log('SKIP (no data for)', slug); continue; }

  const p = path.join(dir, f);
  let s = fs.readFileSync(p, 'utf8');

  // Skip if already updated
  if (s.includes('<link rel="canonical"')) {
    console.log('already has canonical, skipping', f);
    continue;
  }

  // Replace <title>
  s = s.replace(/<title>[^<]+<\/title>/, `<title>${d.title}</title>`);
  // Replace meta description
  s = s.replace(/<meta name="description" content="[^"]+"\s*\/?>/, `<meta name="description" content="${escapeAttr(d.desc)}" />`);
  // Insert head extras just before the tailwind CDN line
  const extras = buildHeadExtras(slug, d);
  s = s.replace(/(\s*)<script src="https:\/\/cdn\.tailwindcss\.com"><\/script>/,
    `\n${extras}$1<script src="https://cdn.tailwindcss.com"></script>`);

  fs.writeFileSync(p, s);
  console.log('updated', f, '(desc =', d.desc.length, 'chars)');
}
