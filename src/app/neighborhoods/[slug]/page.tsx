import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { neighborhoods, getNeighborhood } from '@/data/neighborhoods';
import { categories } from '@/data/categories';
import { getBusinessesByNeighborhood } from '@/lib/supabase';
import { iconMap } from '@/lib/utils';
import { Breadcrumbs, BusinessCard, CategoryCard, CTABanner } from '@/components/ui';

// Revalidate every 60 minutes
export const revalidate = 3600;

export async function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const n = getNeighborhood(params.slug);
  if (!n) return {};
  const title = `Home Service Professionals in ${n.name}, San Diego`;
  const desc = `Find top-rated plumbers, electricians, HVAC contractors, and more in ${n.name}. ${n.shortDescription}`;
  return {
    title, description: desc,
    openGraph: { title, description: desc, url: `https://sdlocalpros.com/neighborhoods/${n.slug}` },
    alternates: { canonical: `https://sdlocalpros.com/neighborhoods/${n.slug}` },
  };
}

export default async function NeighborhoodPage({ params }: { params: { slug: string } }) {
  const neighborhood = getNeighborhood(params.slug);
  if (!neighborhood) notFound();

  const allBusinesses = await getBusinessesByNeighborhood(neighborhood.slug);
  const tier1Categories = categories.filter((c) => c.tier === 1);

  // Count businesses per category for this neighborhood
  const categoryCounts: Record<string, number> = {};
  for (const biz of allBusinesses) {
    categoryCounts[biz.categorySlug] = (categoryCounts[biz.categorySlug] || 0) + 1;
  }

  return (
    <>
      <section className="bg-gradient-to-b from-apple-blue-bg/30 to-white pt-12 pb-12">
        <div className="container-wide">
          <Breadcrumbs items={[
            { label: 'Home', href: '/' },
            { label: 'Neighborhoods', href: '/neighborhoods' },
            { label: neighborhood.name },
          ]} />
          <h1 className="text-headline-mobile lg:text-headline text-apple-black mb-4">
            Home Services in <span className="text-apple-blue">{neighborhood.name}</span>
          </h1>
          <p className="text-body-lg text-apple-gray-dark max-w-3xl mb-6">{neighborhood.description}</p>
          <div className="flex flex-wrap gap-2">
            {neighborhood.characteristics.map((c) => (
              <span key={c} className="px-3 py-1.5 bg-white rounded-full border border-black/5 text-body-sm text-apple-gray-dark">{c}</span>
            ))}
            {neighborhood.zipCodes.map((z) => (
              <span key={z} className="px-3 py-1.5 bg-white rounded-full border border-black/5 text-body-sm text-apple-gray-mid">{z}</span>
            ))}
          </div>
        </div>
      </section>

      {/* Browse by Category */}
      <section className="section-white">
        <div className="container-wide">
          <h2 className="text-title text-apple-black mb-6">Find a Pro in {neighborhood.name}</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tier1Categories.map((cat) => {
              const Icon = iconMap[cat.icon];
              const count = categoryCounts[cat.slug] || 0;
              return (
                <Link key={cat.slug} href={`/${cat.slug}/${neighborhood.slug}`} className="card p-5 group flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-apple-blue-bg flex items-center justify-center text-apple-blue shrink-0 group-hover:bg-apple-blue group-hover:text-white transition-colors">
                    {Icon && <Icon className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="text-body font-semibold text-apple-black group-hover:text-apple-blue transition-colors">{cat.namePlural}</p>
                    <p className="text-body-sm text-apple-gray-mid">
                      {count > 0 ? `${count} pros in ${neighborhood.name}` : `in ${neighborhood.name}`}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Listings */}
      {allBusinesses.length > 0 && (
        <section className="section-gray">
          <div className="container-wide">
            <h2 className="text-title text-apple-black mb-6">Top Rated Pros in {neighborhood.name}</h2>
            <div className="space-y-4">
              {allBusinesses.map((biz, i) => (
                <BusinessCard key={biz.id} business={biz} rank={i + 1} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Nearby Neighborhoods */}
      {neighborhood.adjacentNeighborhoods.length > 0 && (
        <section className="section-white">
          <div className="container-tight">
            <h2 className="text-title text-apple-black mb-6">Nearby Neighborhoods</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {neighborhood.adjacentNeighborhoods.map((slug) => {
                const adj = neighborhoods.find((n) => n.slug === slug);
                if (!adj) return null;
                return (
                  <Link key={slug} href={`/neighborhoods/${slug}`} className="card p-4 group text-center">
                    <p className="text-body font-medium text-apple-black group-hover:text-apple-blue transition-colors">{adj.name}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      <CTABanner
        title={`Are you a service professional in ${neighborhood.name}?`}
        description={`Get listed and connect with homeowners in ${neighborhood.name} who need your services.`}
        primaryAction={{ label: 'Add Your Business', href: '/add-business' }}
        secondaryAction={{ label: 'Claim Existing Listing', href: '/claim' }}
      />
    </>
  );
}