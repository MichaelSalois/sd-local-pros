// ============================================================
// SD Local Pros — Core Type Definitions
// ============================================================

/** A service category (plumbers, electricians, etc.) */
export interface Category {
  slug: string;
  name: string;
  namePlural: string;
  icon: string; // Lucide icon name
  description: string;
  shortDescription: string;
  metaTitle: string;
  metaDescription: string;
  averageCostLow: number;
  averageCostHigh: number;
  costUnit: string; // "per hour", "per project", etc.
  hiringTips: string[];
  faqs: FAQ[];
  tier: 1 | 2 | 3;
}

/** A San Diego neighborhood */
export interface Neighborhood {
  slug: string;
  name: string;
  zipCodes: string[];
  description: string;
  shortDescription: string;
  population?: number;
  medianHomeValue?: number;
  characteristics: string[]; // e.g. "Historic homes", "Coastal", "Family-friendly"
  adjacentNeighborhoods: string[]; // slugs
  tier: 1 | 2 | 3;
  lat: number;
  lng: number;
}

/** A business listing */
export interface Business {
  id: string;
  name: string;
  slug: string;
  categorySlug: string;
  neighborhoodSlug: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  website?: string;
  rating: number;
  reviewCount: number;
  lat?: number;
  lng?: number;
  hours?: BusinessHours;
  description?: string;
  services?: string[];
  yearEstablished?: number;
  license?: string;
  isClaimed: boolean;
  isFeatured: boolean;
  isVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface BusinessHours {
  monday?: string;
  tuesday?: string;
  wednesday?: string;
  thursday?: string;
  friday?: string;
  saturday?: string;
  sunday?: string;
}

/** FAQ entry for schema markup */
export interface FAQ {
  question: string;
  answer: string;
}

/** Blog post */
export interface BlogPost {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  content: string; // HTML string
  author: string;
  publishedAt: string;
  updatedAt: string;
  coverImage?: string;
  tags: string[];
  relatedCategories: string[];
  relatedNeighborhoods: string[];
}

/** Listing submission (from Add Business or Claim forms) */
export interface ListingSubmission {
  type: 'add' | 'claim';
  businessName: string;
  categorySlug: string;
  neighborhoodSlug: string;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  address?: string;
  website?: string;
  message?: string;
  existingListingId?: string; // for claims
  submittedAt: string;
  status: 'pending' | 'approved' | 'rejected';
}
