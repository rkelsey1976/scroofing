export interface Service {
  slug: string;
  name: string;
  shortDesc: string;
  longDesc: string;
  metaTitle: string;
  metaDescription: string;
  icon: string;
  heroImage: string;
}

export const services: Service[] = [
  {
    slug: "roof-repairs",
    name: "Roof Repairs",
    shortDesc: "Fast, reliable repairs for slipped tiles, cracked slates, ridge failures, and storm damage across Bath & Somerset.",
    longDesc: `A damaged roof needs attention quickly — water ingress causes structural damage fast. S.C Roofing provides prompt roof repair services across Bath and the surrounding area. Whether it's a single slipped tile, a cracked ridge, failed flashing or widespread storm damage, our team carries out a thorough inspection first, identifies every issue, and gives you a clear written quote before any work starts.\n\nWe repair all roof types: plain clay and concrete tiles, natural and synthetic slate, flat felt, GRP, and EPDM. All repairs are carried out with materials matched to your existing roof wherever possible, and we tidy up fully before we leave. Call us for a free inspection.`,
    metaTitle: "Roof Repairs Bath & Somerset | SC Roofing Ltd",
    metaDescription: "Expert roof repairs in Bath, Radstock, Frome & surrounding Somerset. Tiles, slates, flat roofs, storm damage. Free inspection. Call 07881 903 188.",
    icon: "🔧",
    heroImage: "/images/unnamed (1).webp",
  },
  {
    slug: "new-roofs",
    name: "New Roofs",
    shortDesc: "Full roof replacements in slate, clay and concrete tile — for domestic properties, extensions and new builds.",
    longDesc: `When a roof is beyond repair or simply past its lifespan, a full replacement is the most cost-effective long-term solution. S.C Roofing has been fitting new roofs across Bath and Somerset for over 20 years, working on everything from Victorian terraces to modern new builds.\n\nWe work with the UK's leading manufacturers — Redland, Marley, Sandtoft and Cupa Pizarras — and can source natural Welsh slate, Spanish slate, clay plain tiles, concrete plain and profiled tiles, and handmade clay for heritage properties. Every new roof includes new battens, breather membrane, insulation (where applicable), lead valley and flashing work, and a full ridge, hip and verge finish. We liaise with building control where required.`,
    metaTitle: "New Roofs Bath & Somerset | SC Roofing Ltd",
    metaDescription: "New roof installations across Bath, Keynsham, Frome & Somerset. Slate, clay, concrete tile. Domestic & commercial. Free quote. SC Roofing 07881 903 188.",
    icon: "🏠",
    heroImage: "/images/unnamed.webp",
  },
  {
    slug: "flat-roofs",
    name: "Flat Roofs",
    shortDesc: "EPDM rubber, GRP fibreglass and torch-on felt flat roofing — long-lasting, fully guaranteed systems.",
    longDesc: `Flat roofs get a bad reputation, but a properly installed modern flat roof system can last 25–50 years with minimal maintenance. S.C Roofing installs three flat roofing systems to suit different budgets and roof configurations.\n\n**EPDM Rubber** — a single-ply membrane bonded to the deck. Extremely durable, lightweight and ideal for extensions and garage roofs. 20-year guarantee available.\n\n**GRP Fibreglass** — seamless, rigid surface with excellent UV resistance. Ideal for complex shapes, parapets and walkable surfaces. 25-year guarantee available.\n\n**Torch-on Felt** — traditional SBS modified bitumen system. Cost-effective for larger flat areas. All systems include a full build-up to current U-value requirements.`,
    metaTitle: "Flat Roofs Bath & Somerset | EPDM GRP Felt | SC Roofing",
    metaDescription: "Flat roof specialists in Bath & Somerset. EPDM rubber, GRP fibreglass and felt systems. Extensions, garages, commercial. Free survey. 07881 903 188.",
    icon: "📐",
    heroImage: "/images/486603524_9803734869658733_1301359858312601123_n.jpg",
  },
  {
    slug: "chimney-repairs",
    name: "Chimney Repairs",
    shortDesc: "Repointing, cap and flaunching repairs, lead flashing replacement — keeping chimneys weathertight.",
    longDesc: `Chimneys are one of the most exposed parts of any building and one of the most common sources of water ingress. S.C Roofing carries out the full range of chimney repairs: repointing deteriorated mortar joints, replacing cracked or fallen chimney pots, repairing or replacing the cement flaunching around pots, renewing lead step and back flashings, and rebuilding chimney stacks where the structure has failed.\n\nWe carry out drone surveys where access is difficult, giving you a photographic record of any defects. We work on listed and period properties where lime mortar and heritage materials are required.`,
    metaTitle: "Chimney Repairs Bath & Somerset | SC Roofing Ltd",
    metaDescription: "Chimney repointing, flashing, pot and stack repairs in Bath & Somerset. 20+ years experience. Free inspection. SC Roofing 07881 903 188.",
    icon: "🏚️",
    heroImage: "/images/69305585_2639619822736976_1040299988862631936_n.jpg",
  },
  {
    slug: "leadwork",
    name: "Leadwork",
    shortDesc: "Hand-dressed lead valleys, flashings, parapet details and soakers — traditional craft, guaranteed watertight.",
    longDesc: `Lead is the material of choice for valleys, abutment flashings, soakers, parapet cappings and flat roof details. Properly installed lead will outlast the building itself. S.C Roofing's leadwork is carried out to Lead Sheet Association (LSA) standards, using Code 4, 5 and 6 lead sheet as required by location and exposure.\n\nWe fit stepped flashings, cover flashings, secret gutters, box gutters, parapet cappings, soakers and saddle flashings. All lead is fixed with copper nails and clipped correctly to allow for thermal movement — a detail that lesser contractors omit, leading to splits and leaks within a few years.`,
    metaTitle: "Leadwork Bath & Somerset | Lead Flashings & Valleys | SC Roofing",
    metaDescription: "Expert leadwork in Bath & Somerset. Flashings, valleys, soakers, parapet details. LSA standards. SC Roofing Ltd 07881 903 188.",
    icon: "⚒️",
    heroImage: "/images/unnamed (9).webp",
  },
  {
    slug: "guttering",
    name: "Guttering & Fascias",
    shortDesc: "UPVC and cast iron guttering, fascias, soffits and bargeboards — fully replaced or repaired.",
    longDesc: `Failed guttering and fascias let water track down your walls and into your roof structure. S.C Roofing replaces and repairs all types of guttering and roofline products. We install cast iron guttering for period properties and UPVC half-round, ogee and deep-flow systems for modern homes.\n\nFascia and soffit replacements are carried out using cellular PVC boards or real wood where required. We also fit ventilated soffits to provide the roof ventilation required under current Building Regulations. Downpipes are replaced to match, and all work is fitted with correct falls and brackets to prevent ponding and overflows.`,
    metaTitle: "Guttering & Fascias Bath & Somerset | SC Roofing Ltd",
    metaDescription: "Guttering, fascias and soffits replaced or repaired in Bath & Somerset. UPVC and cast iron. Free quote. SC Roofing 07881 903 188.",
    icon: "🌧️",
    heroImage: "/images/guttering.jpg",
  },
];
