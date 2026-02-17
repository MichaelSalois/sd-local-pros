import { Business } from '@/lib/types';

/**
 * SAMPLE BUSINESS DATA
 * 
 * This file contains seed data to demonstrate the site's functionality.
 * Replace this with real data from Outscraper once you run your scrapes.
 * 
 * To import Outscraper data:
 * 1. Run your Outscraper queries (see README for exact queries)
 * 2. Export as CSV
 * 3. Run the import script: npm run import-data (see /scripts/import-outscraper.ts)
 * 4. The script will generate this file automatically
 * 
 * IMPORTANT: These are EXAMPLE listings for development only.
 * Do NOT launch with this sample data — replace with real Outscraper data.
 */

export const businesses: Business[] = [
  // === PLUMBERS ===
  {
    id: 'plb-001',
    name: 'Pacific Plumbing & Drain',
    slug: 'pacific-plumbing-drain',
    categorySlug: 'plumbers',
    neighborhoodSlug: 'la-jolla',
    address: '7734 Herschel Ave, Suite 100',
    city: 'La Jolla',
    state: 'CA',
    zipCode: '92037',
    phone: '(858) 555-0101',
    website: 'https://example.com',
    rating: 4.8,
    reviewCount: 247,
    description: 'Family-owned plumbing company serving La Jolla and surrounding areas since 1998. Specializing in repiping, water heater installation, and drain cleaning.',
    services: ['Drain Cleaning', 'Water Heater Repair', 'Repiping', 'Slab Leak Detection', 'Gas Line Repair'],
    yearEstablished: 1998,
    license: 'CSLB #784521',
    isClaimed: false,
    isFeatured: false,
    isVerified: false,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 'plb-002',
    name: 'North Park Plumbing Co.',
    slug: 'north-park-plumbing-co',
    categorySlug: 'plumbers',
    neighborhoodSlug: 'north-park',
    address: '3939 Iowa St',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92104',
    phone: '(619) 555-0102',
    website: 'https://example.com',
    rating: 4.6,
    reviewCount: 183,
    description: 'Experts in older home plumbing. We specialize in repiping galvanized systems and working with historic Craftsman homes throughout North Park and Hillcrest.',
    services: ['Repiping', 'Drain Cleaning', 'Fixture Installation', 'Sewer Line Repair', 'Water Heater Replacement'],
    yearEstablished: 2005,
    license: 'CSLB #891234',
    isClaimed: false,
    isFeatured: false,
    isVerified: false,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 'plb-003',
    name: 'Coastal Drain Solutions',
    slug: 'coastal-drain-solutions',
    categorySlug: 'plumbers',
    neighborhoodSlug: 'pacific-beach',
    address: '1225 Garnet Ave',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92109',
    phone: '(858) 555-0103',
    rating: 4.5,
    reviewCount: 92,
    description: '24/7 emergency plumbing and drain cleaning. Fast response times for Pacific Beach, La Jolla, and Mission Beach.',
    services: ['Emergency Plumbing', 'Drain Cleaning', 'Hydro Jetting', 'Camera Inspection', 'Trenchless Repair'],
    yearEstablished: 2012,
    isClaimed: false,
    isFeatured: false,
    isVerified: false,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  // === ELECTRICIANS ===
  {
    id: 'elc-001',
    name: 'Hillcrest Electric',
    slug: 'hillcrest-electric',
    categorySlug: 'electricians',
    neighborhoodSlug: 'hillcrest',
    address: '3610 5th Ave',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92103',
    phone: '(619) 555-0201',
    website: 'https://example.com',
    rating: 4.9,
    reviewCount: 312,
    description: 'Hillcrest\'s go-to electrician for over 20 years. Panel upgrades, rewiring, EV charger installation, and smart home wiring. Experienced with pre-war buildings.',
    services: ['Panel Upgrade', 'Rewiring', 'EV Charger Install', 'Smart Home Wiring', 'Lighting Design'],
    yearEstablished: 2003,
    license: 'CSLB #856712',
    isClaimed: false,
    isFeatured: false,
    isVerified: false,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  {
    id: 'elc-002',
    name: 'SoCal Wiring Pros',
    slug: 'socal-wiring-pros',
    categorySlug: 'electricians',
    neighborhoodSlug: 'carmel-valley',
    address: '12925 El Camino Real',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92130',
    phone: '(858) 555-0202',
    rating: 4.7,
    reviewCount: 156,
    description: 'Full-service electrical contractor serving North County. Specializing in new construction, remodels, and whole-home surge protection.',
    services: ['New Construction', 'Remodel Wiring', 'Surge Protection', 'Landscape Lighting', 'Generator Install'],
    yearEstablished: 2010,
    license: 'CSLB #923456',
    isClaimed: false,
    isFeatured: false,
    isVerified: false,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  // === HVAC ===
  {
    id: 'hvc-001',
    name: 'Rancho Cooling & Heating',
    slug: 'rancho-cooling-heating',
    categorySlug: 'hvac',
    neighborhoodSlug: 'rancho-bernardo',
    address: '16486 Bernardo Center Dr',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92128',
    phone: '(858) 555-0301',
    website: 'https://example.com',
    rating: 4.8,
    reviewCount: 278,
    description: 'Keeping inland San Diego cool for over 15 years. We specialize in high-efficiency AC systems, mini-splits, and smart thermostats. Senior discounts available.',
    services: ['AC Repair', 'AC Installation', 'Mini-Split Systems', 'Furnace Repair', 'Smart Thermostat Install'],
    yearEstablished: 2008,
    license: 'CSLB #867234',
    isClaimed: false,
    isFeatured: false,
    isVerified: false,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  // === ROOFERS ===
  {
    id: 'rof-001',
    name: 'SD Tile Roofing Experts',
    slug: 'sd-tile-roofing-experts',
    categorySlug: 'roofers',
    neighborhoodSlug: 'point-loma',
    address: '2907 Shelter Island Dr',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92106',
    phone: '(619) 555-0401',
    rating: 4.7,
    reviewCount: 165,
    description: 'San Diego\'s tile roof specialists. Expert installation and repair of clay and concrete tile roofs. Licensed, bonded, insured. Free inspections.',
    services: ['Tile Roof Repair', 'Roof Replacement', 'Roof Inspection', 'Leak Repair', 'Gutter Installation'],
    yearEstablished: 1995,
    license: 'CSLB #745623',
    isClaimed: false,
    isFeatured: false,
    isVerified: false,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  // === LANDSCAPERS ===
  {
    id: 'lnd-001',
    name: 'Native Roots Landscaping',
    slug: 'native-roots-landscaping',
    categorySlug: 'landscapers',
    neighborhoodSlug: 'encinitas',
    address: '510 N Coast Hwy 101',
    city: 'Encinitas',
    state: 'CA',
    zipCode: '92024',
    phone: '(760) 555-0501',
    website: 'https://example.com',
    rating: 4.9,
    reviewCount: 198,
    description: 'Drought-tolerant landscape design and installation using California native plants. We help homeowners save water and create beautiful, low-maintenance yards.',
    services: ['Landscape Design', 'Native Plant Installation', 'Turf Removal', 'Irrigation Design', 'Hardscaping'],
    yearEstablished: 2015,
    license: 'CSLB #978341',
    isClaimed: false,
    isFeatured: false,
    isVerified: false,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  // === HOUSE CLEANING ===
  {
    id: 'cln-001',
    name: 'Sparkle Clean SD',
    slug: 'sparkle-clean-sd',
    categorySlug: 'house-cleaning',
    neighborhoodSlug: 'coronado',
    address: '1100 Orange Ave',
    city: 'Coronado',
    state: 'CA',
    zipCode: '92118',
    phone: '(619) 555-0601',
    rating: 4.8,
    reviewCount: 234,
    description: 'Premium residential cleaning serving Coronado and Downtown. Eco-friendly products, consistent teams, and detailed checklists. Bonded and insured.',
    services: ['Regular Cleaning', 'Deep Cleaning', 'Move-Out Cleaning', 'Airbnb Turnover', 'Post-Construction'],
    isClaimed: false,
    isFeatured: false,
    isVerified: false,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  // === PAINTERS ===
  {
    id: 'pnt-001',
    name: 'Coastal Colors Painting',
    slug: 'coastal-colors-painting',
    categorySlug: 'painters',
    neighborhoodSlug: 'del-mar',
    address: '1555 Camino Del Mar',
    city: 'Del Mar',
    state: 'CA',
    zipCode: '92014',
    phone: '(858) 555-0701',
    rating: 4.7,
    reviewCount: 142,
    description: 'Interior and exterior painting specialists for coastal homes. We use premium UV-resistant and salt-air-rated paints to ensure your paint job lasts.',
    services: ['Interior Painting', 'Exterior Painting', 'Stucco Repair', 'Cabinet Refinishing', 'Color Consultation'],
    yearEstablished: 2007,
    license: 'CSLB #834567',
    isClaimed: false,
    isFeatured: false,
    isVerified: false,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  // === PEST CONTROL ===
  {
    id: 'pst-001',
    name: 'SD Termite & Pest Defense',
    slug: 'sd-termite-pest-defense',
    categorySlug: 'pest-control',
    neighborhoodSlug: 'scripps-ranch',
    address: '10025 Scripps Ranch Blvd',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92131',
    phone: '(858) 555-0801',
    website: 'https://example.com',
    rating: 4.6,
    reviewCount: 312,
    description: 'San Diego\'s termite experts. Free termite inspections, localized and full fumigation treatments. Quarterly pest control plans for year-round protection.',
    services: ['Termite Inspection', 'Fumigation', 'Localized Treatment', 'Ant Control', 'Rodent Control'],
    yearEstablished: 2001,
    license: 'SPCB #12345',
    isClaimed: false,
    isFeatured: false,
    isVerified: false,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  // === HANDYMAN ===
  {
    id: 'hnd-001',
    name: 'Mr. Fix-It San Diego',
    slug: 'mr-fix-it-san-diego',
    categorySlug: 'handyman',
    neighborhoodSlug: 'mira-mesa',
    address: '8350 Mira Mesa Blvd',
    city: 'San Diego',
    state: 'CA',
    zipCode: '92126',
    phone: '(858) 555-0901',
    rating: 4.7,
    reviewCount: 189,
    description: 'Your all-around home repair specialist. Drywall, painting, faucets, doors, shelving, TV mounting, furniture assembly — no job too small.',
    services: ['Drywall Repair', 'TV Mounting', 'Furniture Assembly', 'Door Repair', 'Faucet Replacement'],
    yearEstablished: 2018,
    isClaimed: false,
    isFeatured: false,
    isVerified: false,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
  // === GARAGE DOOR ===
  {
    id: 'gdr-001',
    name: 'Precision Garage Door SD',
    slug: 'precision-garage-door-sd',
    categorySlug: 'garage-door-repair',
    neighborhoodSlug: 'chula-vista',
    address: '390 E St',
    city: 'Chula Vista',
    state: 'CA',
    zipCode: '91910',
    phone: '(619) 555-1001',
    website: 'https://example.com',
    rating: 4.8,
    reviewCount: 267,
    description: 'Same-day garage door repair and installation. Spring replacement, opener repair, new door installation. Serving all of South Bay and central San Diego.',
    services: ['Spring Replacement', 'Opener Repair', 'New Door Install', 'Cable Repair', 'Smart Garage Setup'],
    yearEstablished: 2009,
    isClaimed: false,
    isFeatured: false,
    isVerified: false,
    createdAt: '2025-01-01',
    updatedAt: '2025-01-01',
  },
];

/** Get businesses by category */
export function getBusinessesByCategory(categorySlug: string): Business[] {
  return businesses.filter((b) => b.categorySlug === categorySlug);
}

/** Get businesses by neighborhood */
export function getBusinessesByNeighborhood(neighborhoodSlug: string): Business[] {
  return businesses.filter((b) => b.neighborhoodSlug === neighborhoodSlug);
}

/** Get businesses by category + neighborhood */
export function getBusinessesByCategoryAndNeighborhood(
  categorySlug: string,
  neighborhoodSlug: string
): Business[] {
  return businesses.filter(
    (b) => b.categorySlug === categorySlug && b.neighborhoodSlug === neighborhoodSlug
  );
}

/** Get a single business by slug */
export function getBusiness(slug: string): Business | undefined {
  return businesses.find((b) => b.slug === slug);
}

/** Get featured businesses */
export function getFeaturedBusinesses(): Business[] {
  return businesses.filter((b) => b.isFeatured);
}
