import Link from 'next/link';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { categories } from '@/data/categories';
import { neighborhoods } from '@/data/neighborhoods';
import { getAllBusinesses } from '@/lib/supabase';
import { iconMap } from '@/lib/utils';
import {
  SectionHeader,
  CategoryCard,
  NeighborhoodCard,
  CTABanner,
} from '@/components/ui';
import SearchBar from '@/components/ui/SearchBar';

// Revalidate every 60 minutes
export const revalidate = 3600;

export default async function HomePage() {
  // Top categories for display
  const topCategories = categories.filter((c) => c.tier === 1);
  // Top neighborhoods for display
  const topNeighborhoods = neighborhoods.slice(0, 12);

  // Fetch all businesses from Supabase
  const businesses = await getAllBusinesses();

  // Stats
  const totalBusinesses = businesses.length;
  const totalNeighborhoods = neighborhoods.length;
  const totalCategories = categories.length;

  // Prepare search options
  const categoryOptions = topCategories.map((c) => ({
    slug: c.slug,
    label: c.namePlural,
  }));
  const neighborhoodOptions = neighborhoods.map((n) => ({
    slug: n.slug,
    label: n.name,
  }));

  return (
    <>
      {/* ============================================ */}
      {/* HERO SECTION */}
      {/* ============================================ */}
      <section className="relative overflow-hidden bg-gradient-to-b from-apple-blue-bg/40 via-white to-white pt-20 pb-16 lg:pt-32 lg:pb-24">
        {/* Subtle background decoration */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-apple-blue/5 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-apple-blue/3 rounded-full blur-3xl" />
        </div>

        <div className="container-tight relative">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-hero-mobile lg:text-hero text-apple-black mb-6 text-balance">
              Find trusted home service pros in{' '}
              <span className="text-apple-blue">San Diego</span>
            </h1>
            <p className="text-body-lg lg:text-[21px] lg:leading-relaxed text-apple-gray-dark mb-10 max-w-2xl mx-auto text-balance">
              Compare top-rated plumbers, electricians, HVAC contractors, and
              more across every neighborhood. Real reviews, verified
              professionals, free quotes.
            </p>

            {/* Search Bar */}
            <SearchBar
              categories={categoryOptions}
              neighborhoods={neighborhoodOptions}
            />

            {/* Quick Links */}
            <div className="flex flex-wrap items-center justify-center gap-3 text-body-sm">
              <span className="text-apple-gray-mid">Popular:</span>
              {['Plumbers', 'Electricians', 'HVAC', 'Roofers', 'Landscapers'].map(
                (name) => (
                  <Link
                    key={name}
                    href={`/${name.toLowerCase()}`}
                    className="px-3.5 py-1.5 bg-white rounded-full border border-black/5 text-apple-gray-dark hover:text-apple-blue hover:border-apple-blue/20 transition-colors"
                  >
                    {name}
                  </Link>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* TRUST BADGES */}
      {/* ============================================ */}
      <section className="border-b border-black/5 py-8">
        <div className="container-wide">
          <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 text-body-sm text-apple-gray-dark">
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Licensed & verified professionals
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Real reviews from San Diego homeowners
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Free quotes — no obligation
            </span>
            <span className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-green-600" />
              Covering {totalNeighborhoods}+ neighborhoods
            </span>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* SERVICES GRID */}
      {/* ============================================ */}
      <section className="section-white">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Services"
            title="Find the right pro for every job"
            description="Browse top-rated professionals across San Diego's most in-demand home service categories."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topCategories.map((cat) => {
              const Icon = iconMap[cat.icon];
              const count = businesses.filter(
                (b) => b.categorySlug === cat.slug
              ).length;
              return (
                <CategoryCard
                  key={cat.slug}
                  name={cat.namePlural}
                  slug={cat.slug}
                  count={count}
                  icon={Icon ? <Icon className="w-6 h-6" /> : null}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* HOW IT WORKS */}
      {/* ============================================ */}
      <section className="section-gray">
        <div className="container-tight">
          <SectionHeader
            eyebrow="How it works"
            title="Your home project, handled"
            description="Finding the right pro should be the easy part."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
            {[
              {
                step: '1',
                title: 'Browse & compare',
                description:
                  'Search by service and neighborhood. Compare ratings, read reviews, and check qualifications from real San Diego homeowners.',
              },
              {
                step: '2',
                title: 'Get free quotes',
                description:
                  'Contact pros directly or request quotes. No middleman, no fees, no obligation. You choose who to work with.',
              },
              {
                step: '3',
                title: 'Hire with confidence',
                description:
                  'Every listed pro is licensed and reviewed. Know what to expect on cost, timeline, and quality before you commit.',
              },
            ].map((item) => (
              <div key={item.step} className="text-center">
                <div className="w-14 h-14 rounded-2xl bg-apple-blue text-white text-title flex items-center justify-center mx-auto mb-5">
                  {item.step}
                </div>
                <h3 className="text-subtitle text-apple-black mb-2">{item.title}</h3>
                <p className="text-body text-apple-gray-dark">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* NEIGHBORHOODS GRID */}
      {/* ============================================ */}
      <section className="section-white">
        <div className="container-wide">
          <SectionHeader
            eyebrow="Neighborhoods"
            title="Every corner of San Diego"
            description="From La Jolla to Chula Vista, find pros who know your neighborhood."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {topNeighborhoods.map((n) => (
              <NeighborhoodCard
                key={n.slug}
                name={n.name}
                slug={n.slug}
                shortDescription={n.shortDescription}
              />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link href="/neighborhoods" className="btn-ghost text-body">
              View all {totalNeighborhoods} neighborhoods
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* COST GUIDE TEASER */}
      {/* ============================================ */}
      <section className="section-gray">
        <div className="container-tight">
          <SectionHeader
            eyebrow="Cost Guides"
            title="Know what to pay before you call"
            description="San Diego-specific pricing to help you budget smart."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {topCategories.slice(0, 6).map((cat) => (
              <Link
                key={cat.slug}
                href={`/${cat.slug}`}
                className="card p-5 flex items-center justify-between group"
              >
                <div>
                  <h3 className="text-body font-semibold text-apple-black group-hover:text-apple-blue transition-colors">
                    {cat.namePlural}
                  </h3>
                  <p className="text-body-sm text-apple-gray-dark">
                    ${cat.averageCostLow}–${cat.averageCostHigh}{' '}
                    <span className="text-apple-gray-mid">{cat.costUnit}</span>
                  </p>
                </div>
                <ArrowRight className="w-5 h-5 text-apple-gray-light group-hover:text-apple-blue transition-colors shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ============================================ */}
      {/* CTA */}
      {/* ============================================ */}
      <CTABanner
        title="Are you a home service professional?"
        description="Get found by thousands of San Diego homeowners searching for services like yours. Add your business for free."
        primaryAction={{ label: 'Add Your Business', href: '/add-business' }}
        secondaryAction={{ label: 'Claim Existing Listing', href: '/claim' }}
      />
    </>
  );
}