import { Metadata } from 'next';
import { Breadcrumbs } from '@/components/ui';

export const metadata: Metadata = {
  title: 'About San Diego Local Pros',
  description: 'San Diego Local Pros is a free directory helping homeowners find trusted, licensed home service professionals across every San Diego neighborhood.',
  alternates: { canonical: 'https://sdlocalpros.com/about' },
};

export default function AboutPage() {
  return (
    <>
      <section className="bg-gradient-to-b from-apple-blue-bg/30 to-white pt-12 pb-16">
        <div className="container-tight">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
          <h1 className="text-headline-mobile lg:text-headline text-apple-black mb-6">
            About San Diego Local Pros
          </h1>
        </div>
      </section>

      <section className="section-white">
        <div className="container-tight prose prose-lg max-w-none">
          <p className="text-body-lg text-apple-gray-dark">
            San Diego Local Pros was built with one goal: make it easier for San Diego homeowners to find trustworthy, licensed home service professionals in their neighborhood.
          </p>

          <h2 className="text-title text-apple-black mt-10 mb-4">Why We Built This</h2>
          <p className="text-body text-apple-gray-dark">
            We noticed that when San Diego homeowners search for a plumber in North Park or an electrician in La Jolla, they get the same generic national results from Yelp, Angi, and HomeAdvisor. These platforms are useful, but they don&apos;t understand the unique needs of San Diego&apos;s diverse neighborhoods — the aging pipes in Craftsman bungalows, the salt air damage on coastal homes, the fire-resistant landscaping needs in Scripps Ranch.
          </p>
          <p className="text-body text-apple-gray-dark">
            San Diego Local Pros is different. Every page on this site is built with neighborhood-specific context, local cost data, and advice tailored to the actual homes and conditions in each community. We&apos;re not a national directory with a San Diego filter — we&apos;re a San Diego directory, period.
          </p>

          <h2 className="text-title text-apple-black mt-10 mb-4">How It Works</h2>
          <p className="text-body text-apple-gray-dark">
            Our directory is free for homeowners to browse. We verify business information, display real ratings and reviews, and make it easy to compare professionals side by side. Businesses can claim and enhance their listings to stand out, and featured placement is available for pros who want maximum visibility.
          </p>
          <p className="text-body text-apple-gray-dark">
            We never charge homeowners to use the directory, get quotes, or contact businesses. Our revenue comes from premium business listings and partnerships — not from your wallet.
          </p>

          <h2 className="text-title text-apple-black mt-10 mb-4">For Service Professionals</h2>
          <p className="text-body text-apple-gray-dark">
            If you&apos;re a home service professional in San Diego, getting listed is free. Claim your existing listing or add your business to start connecting with homeowners in your service area. We offer enhanced profiles, featured placement, and marketing tools to help you grow your business.
          </p>

          <h2 className="text-title text-apple-black mt-10 mb-4">Built by Salois Digital</h2>
          <p className="text-body text-apple-gray-dark">
            San Diego Local Pros is built and maintained by{' '}
            <a href="https://saloisdigital.com" target="_blank" rel="noopener noreferrer" className="text-apple-blue hover:underline">
              Salois Digital
            </a>
            , a digital marketing company that helps small businesses grow with AI-powered tools, advertising management, website development, and SEO optimization. We built this directory because we believe in supporting the local San Diego business community — and because great service professionals deserve to be found.
          </p>
        </div>
      </section>
    </>
  );
}
