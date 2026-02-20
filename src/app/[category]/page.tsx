import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { categories, getCategory } from '@/data/categories';
import { neighborhoods } from '@/data/neighborhoods';
import { getBusinessesByCategory, getAllBusinesses } from '@/lib/supabase';
import { iconMap } from '@/lib/utils';
import {
  Breadcrumbs,
  BusinessCard,
  SectionHeader,
  FAQSection,
  CTABanner,
} from '@/components/ui';

// Revalidate every 60 minutes
export const revalidate = 3600;

export async function generateStaticParams() {
  return categories.map((cat) => ({ category: cat.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { category: string };
}): Promise<Metadata> {
  const category = getCategory(params.category);
  if (!category) return {};

  return {
    title: category.metaTitle,
    description: category.metaDescription,
    openGraph: {
      title: category.metaTitle,
      description: category.metaDescription,
      url: `https://sdlocalpros.com/${category.slug}`,
    },
    alternates: {
      canonical: `https://sdlocalpros.com/${category.slug}`,
    },
  };
}

export default async function CategoryPage({
  params,
}: {
  params: { category: string };
}) {
  const category = getCategory(params.category);
  if (!category) notFound();

  const allBusinesses = await getBusinessesByCategory(category.slug);
  const tier1Neighborhoods = neighborhoods.filter((n) => n.tier === 1);
  const Icon = iconMap[category.icon];

  // Count businesses per neighborhood for this category (from all businesses, not deduplicated)
  // We need the full list including duplicates across neighborhoods for accurate per-neighborhood counts
  const { data: categoryRows } = await (await import('@/lib/supabase')).supabase
    .from('businesses')
    .select('neighborhood_slug')
    .eq('status', 'approved')
    .eq('category_slug', category.slug);

  const neighborhoodCounts: Record<string, number> = {};
  if (categoryRows) {
    for (const row of categoryRows) {
      neighborhoodCounts[row.neighborhood_slug] = (neighborhoodCounts[row.neighborhood_slug] || 0) + 1;
    }
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: category.metaTitle,
    description: category.metaDescription,
    url: `https://sdlocalpros.com/${category.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero */}
      <section className="bg-gradient-to-b from-apple-blue-bg/30 to-white pt-12 pb-16">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: category.namePlural },
            ]}
          />

          <div className="flex items-start gap-5 mb-8">
            {Icon && (
              <div className="w-14 h-14 rounded-2xl bg-apple-blue-bg flex items-center justify-center text-apple-blue shrink-0">
                <Icon className="w-7 h-7" />
              </div>
            )}
            <div>
              <h1 className="text-headline-mobile lg:text-headline text-apple-black mb-3">
                Best {category.namePlural} in San Diego
              </h1>
              <p className="text-body-lg text-apple-gray-dark max-w-3xl">
                {category.description}
              </p>
            </div>
          </div>

          {/* Cost Preview */}
          <div className="card p-5 inline-flex items-center gap-6">
            <div>
              <p className="text-caption text-apple-gray-mid uppercase tracking-wider font-medium mb-1">
                Average Cost
              </p>
              <p className="text-title text-apple-black">
                ${category.averageCostLow}–${category.averageCostHigh}
              </p>
              <p className="text-body-sm text-apple-gray-mid">{category.costUnit}</p>
            </div>
            <div className="w-px h-12 bg-apple-gray-light" />
            <div>
              <p className="text-caption text-apple-gray-mid uppercase tracking-wider font-medium mb-1">
                Available Pros
              </p>
              <p className="text-title text-apple-black">{allBusinesses.length}+</p>
              <p className="text-body-sm text-apple-gray-mid">across San Diego</p>
            </div>
          </div>
        </div>
      </section>

      {/* Browse by Neighborhood */}
      <section className="section-white">
        <div className="container-wide">
          <SectionHeader
            title={`Find ${category.namePlural} by Neighborhood`}
            description={`Browse top-rated ${category.namePlural.toLowerCase()} in your San Diego neighborhood.`}
            centered={false}
          />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
            {tier1Neighborhoods.map((n) => {
              const count = neighborhoodCounts[n.slug] || 0;
              return (
                <Link
                  key={n.slug}
                  href={`/${category.slug}/${n.slug}`}
                  className="card p-4 group text-center hover:border-apple-blue/20"
                >
                  <p className="text-body font-medium text-apple-black group-hover:text-apple-blue transition-colors">
                    {n.name}
                  </p>
                  <p className="text-caption text-apple-gray-mid mt-1">
                    {count > 0 ? `${count} ${category.namePlural}` : category.namePlural}
                  </p>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* All Rated Businesses */}
      {allBusinesses.length > 0 && (
        <section className="section-gray">
          <div className="container-wide">
            <SectionHeader
              title={`Top Rated ${category.namePlural} in San Diego`}
              centered={false}
            />
            <div className="space-y-4">
              {allBusinesses.map((biz, i) => (
                <BusinessCard key={biz.id} business={biz} rank={i + 1} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Hiring Tips */}
      {category.hiringTips.length > 0 && (
        <section className="section-white">
          <div className="container-tight">
            <h2 className="text-title text-apple-black mb-6">
              Tips for Hiring a {category.name} in San Diego
            </h2>
            <div className="space-y-4">
              {category.hiringTips.map((tip, i) => (
                <div key={i} className="flex gap-4">
                  <span className="w-8 h-8 rounded-full bg-apple-blue-bg text-apple-blue text-body-sm font-semibold flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  <p className="text-body text-apple-gray-dark pt-1">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQs */}
      {category.faqs.length > 0 && (
        <section className="section-gray">
          <div className="container-tight">
            <FAQSection
              faqs={category.faqs}
              title={`Frequently Asked Questions About ${category.namePlural} in San Diego`}
            />
          </div>
        </section>
      )}

      {/* CTA */}
      <CTABanner
        title={`Are you a ${category.name.toLowerCase()} in San Diego?`}
        description={`Join San Diego Local Pros and get found by homeowners searching for ${category.namePlural.toLowerCase()} in their neighborhood.`}
        primaryAction={{ label: 'Add Your Business', href: '/add-business' }}
        secondaryAction={{ label: 'Claim Existing Listing', href: '/claim' }}
      />
    </>
  );
}