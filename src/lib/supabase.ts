import { createClient } from '@supabase/supabase-js';
import type { Business } from './types';

// ============================================================
// Supabase Client
// ============================================================

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseServiceKey);

// ============================================================
// Database row type (snake_case from Postgres)
// ============================================================

interface BusinessRow {
  id: string;
  name: string;
  slug: string;
  category_slug: string;
  neighborhood_slug: string;
  address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  website: string | null;
  rating: number;
  review_count: number;
  lat: number | null;
  lng: number | null;
  hours: Record<string, string> | null;
  description: string | null;
  services: string[] | null;
  year_established: number | null;
  license: string | null;
  is_claimed: boolean;
  is_featured: boolean;
  is_verified: boolean;
  status: string;
  created_at: string;
  updated_at: string;
}

// ============================================================
// Row → Business mapper
// ============================================================

function rowToBusiness(row: BusinessRow): Business {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    categorySlug: row.category_slug,
    neighborhoodSlug: row.neighborhood_slug,
    address: row.address,
    city: row.city,
    state: row.state,
    zipCode: row.zip_code,
    phone: row.phone,
    website: row.website || undefined,
    rating: Number(row.rating),
    reviewCount: row.review_count,
    lat: row.lat || undefined,
    lng: row.lng || undefined,
    hours: row.hours as Business['hours'],
    description: row.description || undefined,
    services: row.services || undefined,
    yearEstablished: row.year_established || undefined,
    license: row.license || undefined,
    isClaimed: row.is_claimed,
    isFeatured: row.is_featured,
    isVerified: row.is_verified,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ============================================================
// Query Functions
// ============================================================

export async function getAllBusinesses(): Promise<Business[]> {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('status', 'approved')
    .order('review_count', { ascending: false });

  if (error) {
    console.error('Error fetching businesses:', error);
    return [];
  }
  return (data as BusinessRow[]).map(rowToBusiness);
}

export async function getBusinessesByCategory(categorySlug: string): Promise<Business[]> {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('status', 'approved')
    .eq('category_slug', categorySlug)
    .order('review_count', { ascending: false });

  if (error) {
    console.error('Error fetching businesses by category:', error);
    return [];
  }

  const seen = new Set<string>();
  const unique = (data as BusinessRow[]).filter((row) => {
    if (seen.has(row.name)) return false;
    seen.add(row.name);
    return true;
  });

  return unique.map(rowToBusiness);
}

export async function getBusinessesByNeighborhood(neighborhoodSlug: string): Promise<Business[]> {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('status', 'approved')
    .eq('neighborhood_slug', neighborhoodSlug)
    .order('review_count', { ascending: false });

  if (error) {
    console.error('Error fetching businesses by neighborhood:', error);
    return [];
  }
  return (data as BusinessRow[]).map(rowToBusiness);
}

export async function getBusinessesByCategoryAndNeighborhood(
  categorySlug: string,
  neighborhoodSlug: string
): Promise<Business[]> {
  const { data, error } = await supabase
    .from('businesses')
    .select('*')
    .eq('status', 'approved')
    .eq('category_slug', categorySlug)
    .eq('neighborhood_slug', neighborhoodSlug)
    .order('review_count', { ascending: false });

  if (error) {
    console.error('Error fetching businesses by category+neighborhood:', error);
    return [];
  }
  return (data as BusinessRow[]).map(rowToBusiness);
}

export async function submitBusinessListing(data: {
  name: string;
  categorySlug: string;
  categoryOther?: string;
  neighborhoodSlug: string;
  address: string;
  phone: string;
  website?: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  description?: string;
}): Promise<{ success: boolean; error?: string }> {
  const id = `${data.categorySlug}--${data.neighborhoodSlug}--${data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')}`;
  const slug = data.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

  const { error } = await supabase.from('businesses').insert({
    id,
    name: data.name,
    slug,
    category_slug: data.categorySlug,
    neighborhood_slug: data.neighborhoodSlug,
    address: data.address,
    phone: data.phone,
    website: data.website || '',
    contact_name: data.contactName,
    contact_email: data.contactEmail,
    contact_phone: data.contactPhone,
    description: data.description || '',
    category_other: data.categoryOther || '',
    rating: 0,
    review_count: 0,
    is_claimed: false,
    is_featured: false,
    is_verified: false,
    status: 'pending',
    submitted_via: 'form',
  });

  if (error) {
    console.error('Error submitting business:', error);
    return { success: false, error: error.message };
  }
  return { success: true };
}