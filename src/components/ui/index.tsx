import { Star, Phone, Globe, MapPin, Shield, Award, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { Business } from '@/lib/types';

// ============================================================
// Star Rating
// ============================================================
export function StarRating({ rating, size = 'md' }: { rating: number; size?: 'sm' | 'md' | 'lg' }) {
  const sizeMap = { sm: 'w-3.5 h-3.5', md: 'w-4 h-4', lg: 'w-5 h-5' };
  const iconSize = sizeMap[size];

  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`${iconSize} ${
            star <= Math.round(rating)
              ? 'text-amber-400 fill-amber-400'
              : 'text-apple-gray-light'
          }`}
        />
      ))}
    </div>
  );
}

// ============================================================
// Business Card
// ============================================================
export function BusinessCard({ business, rank }: { business: Business; rank?: number }) {
  return (
    <div className="card p-6 flex flex-col sm:flex-row gap-5">
      {/* Rank Badge */}
      {rank && (
        <div className="shrink-0 flex items-start">
          <span className="w-10 h-10 rounded-full bg-apple-gray-bg flex items-center justify-center text-body font-semibold text-apple-gray-dark">
            {rank}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-4 mb-2">
          <h3 className="text-subtitle text-apple-black truncate">{business.name}</h3>
          {business.isFeatured && (
            <span className="shrink-0 inline-flex items-center gap-1 px-2.5 py-1 bg-amber-50 text-amber-700 text-caption font-medium rounded-full">
              <Award className="w-3 h-3" /> Featured
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-3">
          <StarRating rating={business.rating} />
          <span className="text-body-sm font-medium text-apple-black">{business.rating}</span>
          <span className="text-body-sm text-apple-gray-mid">
            ({business.reviewCount} reviews)
          </span>
        </div>

        {/* Description */}
        {business.description && (
          <p className="text-body-sm text-apple-gray-dark mb-3 line-clamp-2">
            {business.description}
          </p>
        )}

        {/* Services Tags */}
        {business.services && business.services.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mb-4">
            {business.services.slice(0, 4).map((service) => (
              <span
                key={service}
                className="px-2.5 py-1 bg-apple-gray-bg text-apple-gray-dark text-caption rounded-full"
              >
                {service}
              </span>
            ))}
            {business.services.length > 4 && (
              <span className="px-2.5 py-1 text-apple-gray-mid text-caption">
                +{business.services.length - 4} more
              </span>
            )}
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 text-body-sm text-apple-gray-dark">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 text-apple-gray-mid" />
            {business.city}, {business.state} {business.zipCode}
          </span>
          <span className="flex items-center gap-1.5">
            <Phone className="w-3.5 h-3.5 text-apple-gray-mid" />
            {business.phone}
          </span>
          {business.license && (
            <span className="flex items-center gap-1.5">
              <Shield className="w-3.5 h-3.5 text-green-600" />
              Licensed
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="shrink-0 flex flex-row sm:flex-col gap-2 sm:items-end sm:justify-center">
        <a
          href={`tel:${business.phone.replace(/\D/g, '')}`}
          className="btn-primary text-body-sm !py-2 !px-5"
        >
          <Phone className="w-4 h-4 mr-1.5" />
          Call Now
        </a>
        {business.website && (
          <a
            href={business.website}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary text-body-sm !py-2 !px-5"
          >
            <Globe className="w-4 h-4 mr-1.5" />
            Website
          </a>
        )}
      </div>
    </div>
  );
}

// ============================================================
// Section Header
// ============================================================
export function SectionHeader({
  eyebrow,
  title,
  description,
  centered = true,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  centered?: boolean;
}) {
  return (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
      {eyebrow && (
        <p className="text-body-sm font-medium text-apple-blue mb-2 uppercase tracking-wider">
          {eyebrow}
        </p>
      )}
      <h2 className="text-headline-mobile lg:text-headline text-apple-black text-balance">
        {title}
      </h2>
      {description && (
        <p className="mt-4 text-body-lg text-apple-gray-dark max-w-2xl mx-auto text-balance">
          {description}
        </p>
      )}
    </div>
  );
}

// ============================================================
// Category Card (for grid displays)
// ============================================================
export function CategoryCard({
  name,
  slug,
  count,
  icon,
}: {
  name: string;
  slug: string;
  count?: number;
  icon: React.ReactNode;
}) {
  return (
    <Link href={`/${slug}`} className="card p-6 group flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-apple-blue-bg flex items-center justify-center text-apple-blue shrink-0 group-hover:bg-apple-blue group-hover:text-white transition-colors duration-200">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-body font-semibold text-apple-black group-hover:text-apple-blue transition-colors">
          {name}
        </h3>
        {count !== undefined && (
          <p className="text-body-sm text-apple-gray-mid">{count} pros available</p>
        )}
      </div>
      <ChevronRight className="w-5 h-5 text-apple-gray-light group-hover:text-apple-blue transition-colors shrink-0" />
    </Link>
  );
}

// ============================================================
// Neighborhood Card (for grid displays)
// ============================================================
export function NeighborhoodCard({
  name,
  slug,
  shortDescription,
}: {
  name: string;
  slug: string;
  shortDescription: string;
}) {
  return (
    <Link
      href={`/neighborhoods/${slug}`}
      className="card p-6 group"
    >
      <h3 className="text-body font-semibold text-apple-black group-hover:text-apple-blue transition-colors mb-1.5">
        {name}
      </h3>
      <p className="text-body-sm text-apple-gray-dark line-clamp-2">{shortDescription}</p>
    </Link>
  );
}

// ============================================================
// Breadcrumbs
// ============================================================
export function Breadcrumbs({
  items,
}: {
  items: { label: string; href?: string }[];
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.label,
      ...(item.href ? { item: `https://sdlocalpros.com${item.href}` } : {}),
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <nav aria-label="Breadcrumb" className="mb-6">
        <ol className="flex flex-wrap items-center gap-1.5 text-body-sm text-apple-gray-mid">
          {items.map((item, i) => (
            <li key={i} className="flex items-center gap-1.5">
              {i > 0 && <ChevronRight className="w-3 h-3" />}
              {item.href ? (
                <Link href={item.href} className="hover:text-apple-blue transition-colors">
                  {item.label}
                </Link>
              ) : (
                <span className="text-apple-black font-medium">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}

// ============================================================
// FAQ Accordion (with schema markup)
// ============================================================
export function FAQSection({ faqs, title }: { faqs: { question: string; answer: string }[]; title?: string }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  return (
    <section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {title && <h2 className="text-title text-apple-black mb-6">{title}</h2>}
      <div className="space-y-4">
        {faqs.map((faq, i) => (
          <details key={i} className="group card p-0 overflow-hidden">
            <summary className="flex items-center justify-between p-5 cursor-pointer text-body font-medium text-apple-black hover:text-apple-blue transition-colors list-none [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronRight className="w-5 h-5 text-apple-gray-mid group-open:rotate-90 transition-transform shrink-0 ml-4" />
            </summary>
            <div className="px-5 pb-5 pt-0 text-body text-apple-gray-dark">
              {faq.answer}
            </div>
          </details>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// CTA Banner
// ============================================================
export function CTABanner({
  title,
  description,
  primaryAction,
  secondaryAction,
}: {
  title: string;
  description: string;
  primaryAction: { label: string; href: string };
  secondaryAction?: { label: string; href: string };
}) {
  return (
    <section className="section-dark">
      <div className="container-tight text-center">
        <h2 className="text-headline-mobile lg:text-headline text-white mb-4 text-balance">
          {title}
        </h2>
        <p className="text-body-lg text-white/70 mb-8 max-w-xl mx-auto text-balance">
          {description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href={primaryAction.href} className="btn-primary bg-white text-apple-black hover:bg-white/90 hover:shadow-none">
            {primaryAction.label}
          </Link>
          {secondaryAction && (
            <Link href={secondaryAction.href} className="btn-secondary border-white/30 text-white hover:bg-white hover:text-apple-black">
              {secondaryAction.label}
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
