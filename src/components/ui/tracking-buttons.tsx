'use client';

import { Phone, Globe } from 'lucide-react';

// ============================================================
// GA4 + Meta Pixel Event Helper
// ============================================================
function trackEvent(eventName: string, params: Record<string, string>) {
  if (typeof window === 'undefined') return;

  // GA4
  if (typeof (window as any).gtag === 'function') {
    (window as any).gtag('event', eventName, params);
  }

  // Meta Pixel
  if (typeof (window as any).fbq === 'function') {
    if (eventName === 'call_now_click') {
      (window as any).fbq('track', 'Contact', {
        content_name: params.business_name,
        content_category: params.category,
      });
    } else if (eventName === 'website_click') {
      (window as any).fbq('trackCustom', 'WebsiteClick', {
        content_name: params.business_name,
        content_category: params.category,
      });
    }
  }
}

// ============================================================
// Tracked Call Now Button
// ============================================================
export function TrackedCallButton({
  phone,
  businessName,
  businessId,
  category,
  neighborhood,
  isFeatured,
}: {
  phone: string;
  businessName: string;
  businessId: string;
  category: string;
  neighborhood: string;
  isFeatured: boolean;
}) {
  return (
    <a
      href={`tel:${phone.replace(/\D/g, '')}`}
      className="btn-primary text-body-sm !py-2 !px-5"
      onClick={() => trackEvent('call_now_click', {
        business_name: businessName,
        business_id: businessId,
        category,
        neighborhood,
        phone,
        is_featured: isFeatured ? 'true' : 'false',
      })}
    >
      <Phone className="w-4 h-4 mr-1.5" />
      Call Now
    </a>
  );
}

// ============================================================
// Tracked Website Button
// ============================================================
export function TrackedWebsiteButton({
  website,
  businessName,
  businessId,
  category,
  neighborhood,
  isFeatured,
}: {
  website: string;
  businessName: string;
  businessId: string;
  category: string;
  neighborhood: string;
  isFeatured: boolean;
}) {
  return (
    <a
      href={website}
      target="_blank"
      rel="noopener noreferrer"
      className="btn-secondary text-body-sm !py-2 !px-5"
      onClick={() => trackEvent('website_click', {
        business_name: businessName,
        business_id: businessId,
        category,
        neighborhood,
        website,
        is_featured: isFeatured ? 'true' : 'false',
      })}
    >
      <Globe className="w-4 h-4 mr-1.5" />
      Website
    </a>
  );
}