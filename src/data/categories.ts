import { Category } from '@/lib/types';

export const categories: Category[] = [
  {
    slug: 'plumbers',
    name: 'Plumber',
    namePlural: 'Plumbers',
    icon: 'Wrench',
    description:
      'Whether you have a leaking faucet, a clogged drain, or need a complete repipe, finding a licensed plumber in San Diego you can trust is essential. San Diego\'s older neighborhoods have galvanized steel and cast iron pipes that corrode over time, while newer homes may face issues with polybutylene piping. Our directory helps you find top-rated, licensed plumbers who specialize in the exact type of work your home needs.',
    shortDescription: 'Licensed plumbers for repairs, repiping, and installations.',
    metaTitle: 'Best Plumbers in San Diego',
    metaDescription:
      'Find top-rated, licensed plumbers in San Diego. Compare reviews, get free quotes for drain cleaning, water heater repair, repiping, and emergency plumbing.',
    averageCostLow: 150,
    averageCostHigh: 450,
    costUnit: 'per service call',
    hiringTips: [
      'Always verify the contractor holds a valid C-36 plumbing license with the California CSLB.',
      'Get at least three written estimates before committing to major work like repiping.',
      'Ask if the plumber charges a flat rate or by the hour — flat rates protect you from surprises.',
      'For emergency calls, confirm the emergency service fee upfront before the plumber arrives.',
      'Check if the plumber offers a warranty on both parts and labor.',
    ],
    faqs: [
      {
        question: 'How much does a plumber cost in San Diego?',
        answer:
          'Most San Diego plumbers charge between $150 and $450 for a standard service call, depending on the complexity. Simple drain cleaning runs $150–$250, while water heater replacement can cost $1,200–$3,000. Emergency and after-hours calls typically add a $100–$200 surcharge.',
      },
      {
        question: 'Do I need a licensed plumber in San Diego?',
        answer:
          'Yes. California law requires a C-36 plumbing license for any work over $500. Even for smaller jobs, hiring a licensed plumber protects you — unlicensed work can void your homeowner\'s insurance and create liability issues. You can verify any license at the CSLB website (cslb.ca.gov).',
      },
      {
        question: 'How quickly can a plumber come for an emergency?',
        answer:
          'Most San Diego emergency plumbers offer same-day service, with response times of 1–4 hours. For true emergencies like burst pipes or sewage backups, many provide 24/7 service. Expect to pay a premium ($100–$200 extra) for after-hours emergency calls.',
      },
      {
        question: 'Should I repipe my San Diego home?',
        answer:
          'If your home was built before 1970 and still has original galvanized steel pipes, repiping is likely overdue. Signs include rusty water, low water pressure, frequent leaks, and visible corrosion. A full repipe for a typical San Diego home costs $4,000–$10,000 depending on size and pipe material (copper vs. PEX).',
      },
    ],
    tier: 1,
  },
  {
    slug: 'electricians',
    name: 'Electrician',
    namePlural: 'Electricians',
    icon: 'Zap',
    description:
      'From upgrading a 100-amp panel to handle modern electrical demands to installing EV chargers and smart home systems, San Diego electricians handle projects big and small. Many homes in neighborhoods like North Park, Hillcrest, and Normal Heights still have original knob-and-tube wiring that poses safety risks. Our directory connects you with licensed C-10 electricians who know San Diego\'s building codes and can handle everything from simple outlet repairs to complete rewiring.',
    shortDescription: 'Licensed electricians for repairs, upgrades, and installations.',
    metaTitle: 'Best Electricians in San Diego',
    metaDescription:
      'Find licensed electricians in San Diego. Compare ratings for panel upgrades, rewiring, EV charger installation, and emergency electrical repairs.',
    averageCostLow: 175,
    averageCostHigh: 500,
    costUnit: 'per service call',
    hiringTips: [
      'Verify the contractor holds a valid C-10 electrical license with the California CSLB.',
      'Ask about experience with your home\'s specific wiring type (knob-and-tube, aluminum, copper).',
      'For panel upgrades, confirm the electrician handles the SDG&E coordination and city permits.',
      'Get a detailed written estimate that separates labor from materials costs.',
      'Ask if the electrician is familiar with San Diego\'s current electrical code requirements.',
    ],
    faqs: [
      {
        question: 'How much does an electrician cost in San Diego?',
        answer:
          'San Diego electricians typically charge $175–$500 for a service call, depending on complexity. Simple outlet or switch repairs cost $150–$300. Panel upgrades range from $1,500–$4,000, and full home rewiring can cost $8,000–$20,000 for a typical San Diego home.',
      },
      {
        question: 'How do I know if my home needs rewiring?',
        answer:
          'Warning signs include frequently tripping breakers, flickering lights, warm outlets or switch plates, a burning smell near outlets, two-prong outlets throughout the home, and a fuse box instead of a breaker panel. Homes built before 1960 with original wiring should be inspected by a licensed electrician.',
      },
      {
        question: 'How much does an EV charger installation cost in San Diego?',
        answer:
          'A Level 2 EV charger installation in San Diego typically costs $500–$2,000, including the charger unit and labor. If your panel needs an upgrade to support the additional load, add another $1,500–$3,000. SDG&E offers rebates that can offset some of the cost.',
      },
    ],
    tier: 1,
  },
  {
    slug: 'hvac',
    name: 'HVAC Contractor',
    namePlural: 'HVAC Contractors',
    icon: 'Thermometer',
    description:
      'San Diego\'s climate is mild compared to most cities, but inland neighborhoods like Scripps Ranch, Rancho Bernardo, and Chula Vista can see summer temperatures above 100°F, making reliable air conditioning essential. Coastal areas face different challenges — humidity and salt air can corrode outdoor units and reduce system efficiency. Our directory features licensed C-20 HVAC contractors who understand San Diego\'s unique climate zones and can recommend the right system for your home.',
    shortDescription: 'HVAC contractors for heating, cooling, and ventilation.',
    metaTitle: 'Best HVAC Contractors in San Diego',
    metaDescription:
      'Find top-rated HVAC contractors in San Diego. Compare reviews for AC repair, furnace installation, ductwork, and 24/7 emergency HVAC service.',
    averageCostLow: 150,
    averageCostHigh: 500,
    costUnit: 'per service call',
    hiringTips: [
      'Verify the contractor holds a valid C-20 HVAC license with the California CSLB.',
      'Ask for a Manual J load calculation before sizing a new system — oversized units waste energy.',
      'Get quotes from at least three contractors for any system replacement over $5,000.',
      'Check if the contractor offers maintenance plans that include annual tune-ups.',
      'Ask about SEER2 ratings and energy efficiency rebates available from SDG&E.',
    ],
    faqs: [
      {
        question: 'How much does AC repair cost in San Diego?',
        answer:
          'Basic AC repairs in San Diego cost $150–$500, depending on the issue. Capacitor replacement runs $200–$400, refrigerant recharge is $200–$600, and compressor replacement can cost $1,500–$3,000. A complete new AC system installation runs $5,000–$12,000.',
      },
      {
        question: 'Do I need AC in San Diego?',
        answer:
          'It depends on your neighborhood. Coastal areas like La Jolla and Pacific Beach rarely need AC — ocean breezes keep things comfortable. But inland communities like Scripps Ranch, Poway, and Rancho Bernardo regularly hit 90–100°F+ in summer, making AC nearly essential. Many homes use mini-split systems for efficient zone cooling.',
      },
      {
        question: 'How often should I service my HVAC system?',
        answer:
          'The industry standard is twice per year — once in spring before cooling season and once in fall before heating season. Regular maintenance extends system life by 5–10 years and can reduce energy costs by 15–25%. Most San Diego HVAC contractors offer annual maintenance plans for $150–$300.',
      },
    ],
    tier: 1,
  },
  {
    slug: 'roofers',
    name: 'Roofer',
    namePlural: 'Roofers',
    icon: 'Home',
    description:
      'San Diego\'s sun is a blessing for residents but tough on roofs. UV exposure deteriorates roofing materials faster than in cloudier climates, and the occasional heavy rains from winter storms or El Niño events can expose weaknesses quickly. Many San Diego homes feature tile roofs (concrete or clay) which are durable but require specialized repair skills. Flat roofs on mid-century modern homes have their own maintenance needs. Our directory helps you find licensed C-39 roofers experienced with your specific roof type.',
    shortDescription: 'Licensed roofers for repair, replacement, and inspection.',
    metaTitle: 'Best Roofers in San Diego',
    metaDescription:
      'Find licensed roofers in San Diego. Compare reviews for roof repair, replacement, tile roofing, and free roof inspections across all neighborhoods.',
    averageCostLow: 300,
    averageCostHigh: 1000,
    costUnit: 'per repair',
    hiringTips: [
      'Verify the contractor holds a valid C-39 roofing license with the California CSLB.',
      'Get at least three written estimates for any roof replacement — prices vary significantly.',
      'Ask about the warranty: look for at least 10 years on labor and 25+ years on materials.',
      'Ensure the roofer carries both liability insurance and workers\' compensation coverage.',
      'Request references from recent jobs in your specific neighborhood.',
    ],
    faqs: [
      {
        question: 'How much does a new roof cost in San Diego?',
        answer:
          'A full roof replacement in San Diego costs $8,000–$25,000 for a typical home, depending on size, material, and complexity. Asphalt shingles are the most affordable ($8,000–$15,000), concrete tile runs $12,000–$22,000, and clay tile can exceed $25,000. Repairs average $300–$1,000.',
      },
      {
        question: 'How long do roofs last in San Diego?',
        answer:
          'Asphalt shingles last 20–25 years in San Diego\'s climate, concrete tile can last 40–50+ years, and clay tile can exceed 50 years with proper maintenance. The intense UV exposure in San Diego shortens asphalt shingle life compared to national averages, but tile roofs perform exceptionally well in our dry climate.',
      },
      {
        question: 'Does homeowners insurance cover roof replacement in San Diego?',
        answer:
          'Typically, insurance covers roof damage from sudden events (storms, fallen trees) but not normal wear and tear or lack of maintenance. Many San Diego insurers are tightening roof age policies — if your roof is over 20 years old, coverage may be limited. A roof inspection can help you understand your coverage.',
      },
    ],
    tier: 1,
  },
  {
    slug: 'landscapers',
    name: 'Landscaper',
    namePlural: 'Landscapers',
    icon: 'TreePine',
    description:
      'San Diego\'s year-round growing season means landscaping is a constant consideration for homeowners. With ongoing drought concerns and strict water restrictions, many homeowners are converting water-hungry lawns to drought-tolerant native plants, succulents, and hardscaping. Our directory features landscapers who specialize in both traditional maintenance and modern sustainable design, from weekly mowing services to complete yard transformations with native California plants.',
    shortDescription: 'Landscapers for maintenance, design, and drought-tolerant conversions.',
    metaTitle: 'Best Landscapers in San Diego',
    metaDescription:
      'Find top-rated landscapers in San Diego. Compare reviews for lawn care, drought-tolerant landscaping, hardscaping, and yard design across all neighborhoods.',
    averageCostLow: 100,
    averageCostHigh: 300,
    costUnit: 'per visit',
    hiringTips: [
      'For design-build projects, look for a C-27 landscaping license with the CSLB.',
      'Ask specifically about experience with drought-tolerant and native California plants.',
      'Request a portfolio of completed projects, especially in San Diego climate zones.',
      'For ongoing maintenance, get a clear scope of what\'s included (mowing, edging, weeding, blowing).',
      'Ask about the City of San Diego\'s turf replacement rebate program to offset conversion costs.',
    ],
    faqs: [
      {
        question: 'How much does landscaping cost in San Diego?',
        answer:
          'Weekly maintenance runs $100–$300 per visit depending on yard size. A drought-tolerant conversion costs $5–$15 per square foot ($5,000–$15,000 for a typical yard). Full landscape design and installation for a new yard can run $10,000–$50,000+ depending on scope. The City of San Diego offers turf replacement rebates of $2–$4 per square foot.',
      },
      {
        question: 'What are the best drought-tolerant plants for San Diego?',
        answer:
          'Popular choices include California natives like Cleveland sage, California buckwheat, and manzanita. Succulents like agave, aloe, and aeonium thrive here. Mediterranean plants such as lavender, rosemary, and bougainvillea also do well. A good San Diego landscaper will design with your specific microclimate in mind — coastal, inland, and hillside areas have different needs.',
      },
    ],
    tier: 1,
  },
  {
    slug: 'house-cleaning',
    name: 'House Cleaner',
    namePlural: 'House Cleaning Services',
    icon: 'Sparkles',
    description:
      'Whether you need a weekly cleaning crew, a deep clean before a special event, or a move-out cleaning for a rental property, San Diego has cleaning services to fit every need and budget. Our directory helps you compare house cleaning services by neighborhood, read reviews from real customers, and find cleaners who specialize in exactly what you need — from standard residential cleaning to specialized services like post-construction cleanup, Airbnb turnover cleaning, and eco-friendly green cleaning.',
    shortDescription: 'House cleaning services for residential and move-out cleans.',
    metaTitle: 'Best House Cleaning Services in San Diego',
    metaDescription:
      'Find top-rated house cleaning services in San Diego. Compare reviews for regular cleaning, deep cleaning, move-out cleans, and eco-friendly options.',
    averageCostLow: 120,
    averageCostHigh: 350,
    costUnit: 'per session',
    hiringTips: [
      'Ask if the cleaning company is insured and bonded — this protects your belongings.',
      'Get clear pricing upfront: per hour, per room, or flat rate. Know what\'s included.',
      'Ask about their cleaning products — especially important if you have pets, children, or allergies.',
      'For recurring service, ask about discounts for weekly vs. biweekly vs. monthly.',
      'Request a walkthrough or detailed quote before the first session to avoid surprises.',
    ],
    faqs: [
      {
        question: 'How much does house cleaning cost in San Diego?',
        answer:
          'Standard cleaning for a 2-bedroom home runs $120–$200 per session. Deep cleaning costs $200–$400+. Move-out cleaning ranges from $200–$500 depending on the home\'s size and condition. Most services charge by the home size or by the hour ($35–$65 per cleaner per hour).',
      },
      {
        question: 'How often should I have my house cleaned?',
        answer:
          'The most popular schedule is biweekly, which keeps most homes consistently clean without the cost of weekly service. Homes with pets, children, or high-traffic areas may benefit from weekly cleaning. Monthly deep cleans work well for people who maintain their own cleaning routine and want periodic professional attention.',
      },
    ],
    tier: 1,
  },
  {
    slug: 'painters',
    name: 'Painter',
    namePlural: 'Painters',
    icon: 'Paintbrush',
    description:
      'San Diego\'s intense sunshine and coastal conditions make exterior painting both an aesthetic and protective necessity. UV exposure fades and cracks paint faster here than in most climates, and salt air in coastal neighborhoods like La Jolla, Pacific Beach, and Coronado adds another layer of wear. Our directory features painters experienced with San Diego\'s specific challenges, from selecting UV-resistant exterior paints to preparing stucco surfaces — the most common exterior material in the region.',
    shortDescription: 'Professional painters for interior and exterior painting.',
    metaTitle: 'Best Painters in San Diego',
    metaDescription:
      'Find top-rated painters in San Diego. Compare reviews for interior painting, exterior painting, stucco repair, and cabinet refinishing.',
    averageCostLow: 200,
    averageCostHigh: 800,
    costUnit: 'per room (interior)',
    hiringTips: [
      'Look for a C-33 painting license for larger jobs (over $500) per CSLB requirements.',
      'Ask about prep work — proper surface preparation is 80% of a quality paint job.',
      'Request that the painter specify the exact paint brand, product, and number of coats in the estimate.',
      'For exterior work, ask about UV-resistant and salt-resistant paint formulations.',
      'Get a warranty in writing: most quality painters offer 2–5 years on their work.',
    ],
    faqs: [
      {
        question: 'How much does it cost to paint a house in San Diego?',
        answer:
          'Interior painting runs $200–$800 per room depending on size and prep needed. A full interior for a typical 3-bedroom home costs $3,000–$8,000. Exterior painting for an average San Diego home runs $4,000–$10,000, with stucco homes sometimes costing more due to surface preparation.',
      },
      {
        question: 'How often should I repaint my house exterior in San Diego?',
        answer:
          'In San Diego\'s climate, exterior paint typically lasts 5–7 years on the sun-facing sides and 7–10 years on shaded sides. Coastal homes may need repainting every 4–6 years due to salt air exposure. Quality UV-resistant paint and proper preparation can extend these timelines significantly.',
      },
    ],
    tier: 1,
  },
  {
    slug: 'pest-control',
    name: 'Pest Control',
    namePlural: 'Pest Control Companies',
    icon: 'Bug',
    description:
      'San Diego\'s warm climate supports a variety of pests year-round, including termites (both drywood and subterranean), ants, rodents, spiders, and cockroaches. Termites are a particular concern — the USDA places San Diego in the highest risk zone for termite damage, and virtually every home in the area will encounter them at some point. Our directory helps you find licensed pest control professionals who offer everything from routine quarterly treatments to specialized termite inspections and fumigation.',
    shortDescription: 'Pest control for termites, ants, rodents, and more.',
    metaTitle: 'Best Pest Control in San Diego',
    metaDescription:
      'Find licensed pest control companies in San Diego. Compare reviews for termite treatment, ant control, rodent removal, and routine pest management.',
    averageCostLow: 150,
    averageCostHigh: 400,
    costUnit: 'per treatment',
    hiringTips: [
      'Verify the company holds a valid Structural Pest Control Board (SPCB) license.',
      'For termite work, get a Section 1 vs. Section 2 report explaining active vs. preventive treatment.',
      'Ask about Integrated Pest Management (IPM) approaches that minimize chemical use.',
      'Get at least two termite inspection opinions — recommendations can vary significantly.',
      'For ongoing service, understand what pests are covered and what triggers additional charges.',
    ],
    faqs: [
      {
        question: 'How much does pest control cost in San Diego?',
        answer:
          'Quarterly general pest control service runs $100–$200 per treatment. Termite treatment ranges widely: localized treatment costs $500–$2,000, while full fumigation (tenting) for a typical home runs $1,500–$4,000. Initial inspections are often free or $50–$150.',
      },
      {
        question: 'How common are termites in San Diego?',
        answer:
          'Extremely common. San Diego is in the highest risk zone for both drywood and subterranean termites. Virtually every home will have termite activity at some point. Regular inspections (every 1–2 years) are strongly recommended, and most real estate transactions require a termite inspection.',
      },
    ],
    tier: 1,
  },
  {
    slug: 'handyman',
    name: 'Handyman',
    namePlural: 'Handyman Services',
    icon: 'Hammer',
    description:
      'For those smaller projects that don\'t require a specialized contractor — hanging shelves, fixing a gate, patching drywall, assembling furniture, or tackling a honey-do list — a skilled handyman is exactly what you need. San Diego handymen can legally perform a wide variety of tasks as long as individual jobs don\'t exceed $500 in combined labor and materials. Our directory helps you find reliable, reviewed handymen in your neighborhood who show up on time and get the job done right.',
    shortDescription: 'Handyman services for repairs, installations, and odd jobs.',
    metaTitle: 'Best Handyman Services in San Diego',
    metaDescription:
      'Find reliable handyman services in San Diego. Compare reviews for home repairs, furniture assembly, drywall patching, and general maintenance.',
    averageCostLow: 75,
    averageCostHigh: 200,
    costUnit: 'per hour',
    hiringTips: [
      'In California, handymen can do jobs under $500 (labor + materials) without a contractor license.',
      'For anything over $500, verify the contractor has the appropriate CSLB license.',
      'Ask for an hourly rate vs. project rate — for a defined task, a flat project rate often saves money.',
      'Check if they carry general liability insurance even though it\'s not legally required.',
      'Be specific about what you need done — a detailed task list helps you get accurate quotes.',
    ],
    faqs: [
      {
        question: 'How much does a handyman cost in San Diego?',
        answer:
          'Most San Diego handymen charge $75–$200 per hour, with a 1–2 hour minimum. Many offer flat rates for common tasks: TV mounting ($100–$200), ceiling fan installation ($150–$250), door repair ($100–$200), and furniture assembly ($100–$300). Rates are higher for specialized skills or emergency availability.',
      },
      {
        question: 'What\'s the difference between a handyman and a contractor?',
        answer:
          'In California, a handyman can perform jobs where the total cost (labor + materials) is under $500 per task, without needing a contractor\'s license. For larger projects — bathroom remodels, electrical panel upgrades, roofing — you need a licensed contractor. A good handyman will tell you when a project is beyond their legal scope.',
      },
    ],
    tier: 1,
  },
  {
    slug: 'garage-door-repair',
    name: 'Garage Door Repair',
    namePlural: 'Garage Door Repair Companies',
    icon: 'DoorOpen',
    description:
      'A malfunctioning garage door is more than an inconvenience — it\'s a security risk and can be dangerous if springs or cables are involved. San Diego\'s salt air in coastal areas corrodes springs and hardware faster than inland, and the intense heat in eastern neighborhoods can warp doors and stress openers. Our directory features garage door specialists who handle everything from spring replacement and opener repair to complete door installation and smart garage integration.',
    shortDescription: 'Garage door repair, spring replacement, and opener installation.',
    metaTitle: 'Best Garage Door Repair in San Diego',
    metaDescription:
      'Find garage door repair companies in San Diego. Compare reviews for spring replacement, opener repair, new door installation, and emergency service.',
    averageCostLow: 150,
    averageCostHigh: 400,
    costUnit: 'per repair',
    hiringTips: [
      'Never attempt to replace garage door springs yourself — they\'re under extreme tension and can be deadly.',
      'Get a written estimate before any work begins, including parts and labor breakdowns.',
      'Ask if the company offers a warranty on both parts and labor (look for at least 1 year).',
      'For new door installation, ask about insulation options — insulated doors help regulate garage temperature.',
      'Verify the company has proper insurance, especially for spring and cable work.',
    ],
    faqs: [
      {
        question: 'How much does garage door repair cost in San Diego?',
        answer:
          'Spring replacement costs $150–$350 for a single spring, $200–$500 for a pair. Opener repair runs $100–$300, and a new opener installation costs $250–$600 including the unit. A complete new garage door costs $800–$3,000+ depending on material, insulation, and style.',
      },
      {
        question: 'How long do garage door springs last?',
        answer:
          'Standard torsion springs last 7–12 years or about 10,000 cycles (one open + close = one cycle). If you use your garage door 4 times daily, springs last roughly 7 years. High-cycle springs rated for 25,000–50,000 cycles are available and worth the investment for frequently used doors.',
      },
    ],
    tier: 1,
  },
];

/** Utility: get category by slug */
export function getCategory(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}

/** Utility: get all category slugs */
export function getCategorySlugs(): string[] {
  return categories.map((c) => c.slug);
}
