import { Metadata } from 'next';
import { neighborhoods } from '@/data/neighborhoods';
import { Breadcrumbs, NeighborhoodCard, SectionHeader } from '@/components/ui';

export const metadata: Metadata = {
  title: 'San Diego Neighborhoods | Find Home Service Pros Near You',
  description:
    'Browse home service professionals across 50+ San Diego neighborhoods. From La Jolla to Chula Vista, find trusted pros who know your area.',
  alternates: { canonical: 'https://sdlocalpros.com/neighborhoods' },
};

export default function NeighborhoodsPage() {
  const tier1 = neighborhoods.filter((n) => n.tier === 1);

  return (
    <>
      <section className="bg-gradient-to-b from-apple-blue-bg/30 to-white pt-12 pb-16">
        <div className="container-wide">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Neighborhoods' }]} />
          <h1 className="text-headline-mobile lg:text-headline text-apple-black mb-4">
            San Diego Neighborhoods
          </h1>
          <p className="text-body-lg text-apple-gray-dark max-w-3xl">
            Find home service professionals in your San Diego neighborhood. We cover {neighborhoods.length}+ communities across the county.
          </p>
        </div>
      </section>

      <section className="section-white">
        <div className="container-wide">
          <SectionHeader title="All Neighborhoods" centered={false} />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {tier1.map((n) => (
              <NeighborhoodCard key={n.slug} name={n.name} slug={n.slug} shortDescription={n.shortDescription} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
