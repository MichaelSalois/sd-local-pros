import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MapPin, DollarSign, ArrowRight } from 'lucide-react';
import { categories, getCategory } from '@/data/categories';
import { neighborhoods, getNeighborhood } from '@/data/neighborhoods';
import { getBusinessesByCategoryAndNeighborhood } from '@/lib/supabase';
import {
  Breadcrumbs,
  BusinessCard,
  FAQSection,
  CTABanner,
} from '@/components/ui';

// Revalidate every 60 minutes
export const revalidate = 3600;

// Generate ALL category+neighborhood combos at build time = programmatic SEO
export async function generateStaticParams() {
  const params: { category: string; neighborhood: string }[] = [];
  for (const cat of categories) {
    for (const n of neighborhoods) {
      params.push({ category: cat.slug, neighborhood: n.slug });
    }
  }
  return params;
}

// Dynamic metadata — each page gets unique title + description
export async function generateMetadata({
  params,
}: {
  params: { category: string; neighborhood: string };
}): Promise<Metadata> {
  const category = getCategory(params.category);
  const neighborhood = getNeighborhood(params.neighborhood);
  if (!category || !neighborhood) return {};

  const title = `Best ${category.namePlural} in ${neighborhood.name}, San Diego (${new Date().getFullYear()})`;
  const description = `Find top-rated ${category.namePlural.toLowerCase()} in ${neighborhood.name}, San Diego. Compare reviews, ratings, and get free quotes from licensed ${category.namePlural.toLowerCase()} serving ${neighborhood.name} and nearby areas.`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      url: `https://sdlocalpros.com/${category.slug}/${neighborhood.slug}`,
    },
    alternates: {
      canonical: `https://sdlocalpros.com/${category.slug}/${neighborhood.slug}`,
    },
  };
}

export default async function ServiceNeighborhoodPage({
  params,
}: {
  params: { category: string; neighborhood: string };
}) {
  const category = getCategory(params.category);
  const neighborhood = getNeighborhood(params.neighborhood);
  if (!category || !neighborhood) notFound();

  // Get businesses for this exact combo
  const exactBusinesses = await getBusinessesByCategoryAndNeighborhood(
    category.slug,
    neighborhood.slug
  );

  // Get nearby businesses (same category, adjacent neighborhoods)
  const nearbyResults = await Promise.all(
    neighborhood.adjacentNeighborhoods.map((adjSlug) =>
      getBusinessesByCategoryAndNeighborhood(category.slug, adjSlug)
    )
  );
  const nearbyBusinesses = nearbyResults.flat().slice(0, 5);

  const allBusinesses = [...exactBusinesses, ...nearbyBusinesses];

  // Customize FAQs for this neighborhood
  const localizedFaqs = category.faqs.map((faq) => ({
    question: faq.question
      .replace('San Diego', neighborhood.name)
      .replace('san diego', neighborhood.name.toLowerCase()),
    answer: faq.answer,
  }));

  // Add neighborhood-specific FAQ
  localizedFaqs.push({
    question: `What should I know about hiring a ${category.name.toLowerCase()} in ${neighborhood.name}?`,
    answer: `${neighborhood.name} has unique characteristics that affect home service needs. ${neighborhood.description.split('.').slice(0, 2).join('.')}. When hiring a ${category.name.toLowerCase()} in ${neighborhood.name}, make sure they're familiar with the specific challenges of homes in this area, including ${neighborhood.characteristics.slice(0, 2).join(' and ').toLowerCase()}.`,
  });

  // Related neighborhood links
  const relatedLinks = neighborhood.adjacentNeighborhoods
    .map((slug) => neighborhoods.find((n) => n.slug === slug))
    .filter(Boolean);

  // Schema.org structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `Best ${category.namePlural} in ${neighborhood.name}, San Diego`,
    description: `Find top-rated ${category.namePlural.toLowerCase()} in ${neighborhood.name}, San Diego.`,
    url: `https://sdlocalpros.com/${category.slug}/${neighborhood.slug}`,
    about: {
      '@type': 'Service',
      name: category.namePlural,
      areaServed: {
        '@type': 'Place',
        name: `${neighborhood.name}, San Diego, CA`,
        geo: {
          '@type': 'GeoCoordinates',
          latitude: neighborhood.lat,
          longitude: neighborhood.lng,
        },
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ============================================ */}
      {/* PAGE HEADER */}
      {/* ============================================ */}
      <section className="bg-gradient-to-b from-apple-blue-bg/30 to-white pt-12 pb-12">
        <div className="container-wide">
          <Breadcrumbs
            items={[
              { label: 'Home', href: '/' },
              { label: category.namePlural, href: `/${category.slug}` },
              { label: neighborhood.name },
            ]}
          />

          <h1 className="text-headline-mobile lg:text-headline text-apple-black mb-4 text-balance">
            Best {category.namePlural} in{' '}
            <span className="text-apple-blue">{neighborhood.name}</span>
          </h1>

          <p className="text-body-lg text-apple-gray-dark max-w-3xl mb-6">
            Find licensed, top-rated {category.namePlural.toLowerCase()} serving{' '}
            {neighborhood.name} and surrounding San Diego neighborhoods. Compare
            ratings, read real reviews, and get free quotes.
          </p>

          {/* Quick Stats */}
          <div className="flex flex-wrap items-center gap-4 text-body-sm">
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-black/5">
              <MapPin className="w-3.5 h-3.5 text-apple-blue" />
              {neighborhood.name}, San Diego
              {neighborhood.zipCodes.length > 0 && ` (${neighborhood.zipCodes[0]})`}
            </span>
            <span className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded-full border border-black/5">
              <DollarSign className="w-3.5 h-3.5 text-green-600" />
              Avg. ${category.averageCostLow}–${category.averageCostHigh} {category.costUnit}
            </span>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* BUSINESS LISTINGS */}
      {/* ============================================ */}
      <section className="section-white !pt-8">
        <div className="container-wide">
          {allBusinesses.length > 0 ? (
            <>
              <h2 className="text-title text-apple-black mb-6">
                Top {category.namePlural} in {neighborhood.name}
              </h2>
              <div className="space-y-4">
                {allBusinesses.map((biz, i) => (
                  <BusinessCard key={biz.id} business={biz} rank={i + 1} />
                ))}
              </div>
            </>
          ) : (
            <div className="card p-10 text-center">
              <h2 className="text-title text-apple-black mb-3">
                No {category.namePlural.toLowerCase()} listed in {neighborhood.name} yet
              </h2>
              <p className="text-body text-apple-gray-dark mb-6 max-w-lg mx-auto">
                We&apos;re building our directory of {category.namePlural.toLowerCase()}{' '}
                in {neighborhood.name}. Know a great {category.name.toLowerCase()}?
                Help your community by adding them.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <Link href="/add-business" className="btn-primary">
                  Add a {category.name}
                </Link>
                <Link href={`/${category.slug}`} className="btn-ghost">
                  Browse all San Diego {category.namePlural}
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================================ */}
      {/* NEIGHBORHOOD CONTEXT */}
      {/* ============================================ */}
      <section className="section-gray">
        <div className="container-tight">
          <h2 className="text-title text-apple-black mb-4">
            About {category.namePlural} in {neighborhood.name}
          </h2>
          <div className="prose prose-lg max-w-none text-apple-gray-dark">
            <p>{neighborhood.description}</p>
            <p>
              When looking for a {category.name.toLowerCase()} in{' '}
              {neighborhood.name}, consider the area&apos;s{' '}
              {neighborhood.characteristics
                .map((c) => c.toLowerCase())
                .join(', ')}
              . These local factors affect the type of work commonly needed and
              the expertise you should look for in a{' '}
              {category.name.toLowerCase()}.
            </p>
            {neighborhood.medianHomeValue && (
              <p>
                With a median home value of $
                {neighborhood.medianHomeValue.toLocaleString()} in{' '}
                {neighborhood.name}, investing in quality{' '}
                {category.name.toLowerCase()} services helps protect and
                increase your property value.
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* COST GUIDE */}
      {/* ============================================ */}
      <section className="section-white">
        <div className="container-tight">
          <h2 className="text-title text-apple-black mb-6">
            {category.name} Costs in {neighborhood.name}
          </h2>
          <div className="card overflow-hidden">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-apple-gray-bg">
                  <th className="px-6 py-3 text-body-sm font-semibold text-apple-black">
                    Service
                  </th>
                  <th className="px-6 py-3 text-body-sm font-semibold text-apple-black text-right">
                    Estimated Cost
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-apple-gray-light/50">
                <tr>
                  <td className="px-6 py-3 text-body text-apple-gray-dark">
                    Standard service call
                  </td>
                  <td className="px-6 py-3 text-body text-apple-black text-right font-medium">
                    ${category.averageCostLow}–${category.averageCostHigh}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-body text-apple-gray-dark">
                    Emergency / after-hours
                  </td>
                  <td className="px-6 py-3 text-body text-apple-black text-right font-medium">
                    ${category.averageCostLow + 100}–${category.averageCostHigh + 200}
                  </td>
                </tr>
                <tr>
                  <td className="px-6 py-3 text-body text-apple-gray-dark">
                    Major project
                  </td>
                  <td className="px-6 py-3 text-body text-apple-black text-right font-medium">
                    ${category.averageCostHigh * 3}–${category.averageCostHigh * 10}+
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p className="text-body-sm text-apple-gray-mid mt-4">
            * Costs are estimates based on San Diego averages. Actual prices vary
            by provider, scope, and specific conditions in {neighborhood.name}.
          </p>
        </div>
      </section>

      {/* ============================================ */}
      {/* FAQs */}
      {/* ============================================ */}
      <section className="section-gray">
        <div className="container-tight">
          <FAQSection
            faqs={localizedFaqs}
            title={`${category.name} FAQs for ${neighborhood.name}`}
          />
        </div>
      </section>

      {/* ============================================ */}
      {/* RELATED NEIGHBORHOODS */}
      {/* ============================================ */}
      {relatedLinks.length > 0 && (
        <section className="section-white">
          <div className="container-tight">
            <h2 className="text-title text-apple-black mb-6">
              {category.namePlural} in Nearby Neighborhoods
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {relatedLinks.map(
                (n) =>
                  n && (
                    <Link
                      key={n.slug}
                      href={`/${category.slug}/${n.slug}`}
                      className="card p-4 group text-center"
                    >
                      <p className="text-body font-medium text-apple-black group-hover:text-apple-blue transition-colors">
                        {category.namePlural} in {n.name}
                      </p>
                    </Link>
                  )
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================ */}
      {/* CTA */}
      {/* ============================================ */}
      <CTABanner
        title={`Are you a ${category.name.toLowerCase()} in ${neighborhood.name}?`}
        description={`Get listed on San Diego Local Pros and connect with homeowners in ${neighborhood.name} looking for ${category.namePlural.toLowerCase()}.`}
        primaryAction={{ label: 'Add Your Business', href: '/add-business' }}
        secondaryAction={{ label: 'Claim Existing Listing', href: '/claim' }}
      />
    </>
  );
}