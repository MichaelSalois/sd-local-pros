'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/ui';
import {
  CheckCircle2,
  Shield,
  BarChart3,
  Edit3,
  Star,
  TrendingUp,
  BadgeCheck,
  Globe,
  Megaphone,
  ArrowRight,
  Sparkles,
  Crown,
} from 'lucide-react';

export default function ClaimPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const body = Object.fromEntries(data.entries());

    try {
      const res = await fetch('/api/claim-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, type: 'claim' }),
      });
      if (res.ok) setSubmitted(true);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  if (submitted) {
    return (
      <section className="section-white">
        <div className="container-tight text-center py-20">
          <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />
          <h1 className="text-headline-mobile text-apple-black mb-4">Claim Request Submitted!</h1>
          <p className="text-body-lg text-apple-gray-dark max-w-lg mx-auto">
            We&apos;ll verify your ownership and send you access to manage your listing within 24–48 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-apple-blue-bg/30 to-white pt-12 pb-12">
        <div className="container-tight">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Claim Your Listing' }]} />
          <h1 className="text-headline-mobile lg:text-headline text-apple-black mb-4">Claim Your Listing</h1>
          <p className="text-body-lg text-apple-gray-dark max-w-2xl">
            Already see your business on San Diego Local Pros? Claim it to update your info, respond to reviews, and unlock premium features.
          </p>
        </div>
      </section>

      {/* Free Claim Benefits */}
      <section className="section-gray !py-12">
        <div className="container-tight">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Edit3, title: 'Update Your Info', desc: 'Edit your business details, add photos, and write a custom description.' },
              { icon: Shield, title: 'Verified Badge', desc: 'Claimed listings get a verified badge that builds trust with homeowners.' },
              { icon: BarChart3, title: 'See Your Stats', desc: 'Track how many people view and contact you through your listing.' },
            ].map((b) => (
              <div key={b.title} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-apple-blue-bg flex items-center justify-center text-apple-blue shrink-0">
                  <b.icon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-body font-semibold text-apple-black mb-1">{b.title}</h3>
                  <p className="text-body-sm text-apple-gray-dark">{b.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Claim Form */}
      <section className="section-white">
        <div className="container-tight max-w-2xl">
          <h2 className="text-title text-apple-black mb-6">Verify Your Business</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-body-sm font-medium text-apple-black mb-1.5">Business Name *</label>
              <input id="businessName" name="businessName" type="text" required className="input-field" placeholder="Exact name as shown on your listing" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contactName" className="block text-body-sm font-medium text-apple-black mb-1.5">Your Name *</label>
                <input id="contactName" name="contactName" type="text" required className="input-field" placeholder="Full name" />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-body-sm font-medium text-apple-black mb-1.5">Business Email *</label>
                <input id="contactEmail" name="contactEmail" type="email" required className="input-field" placeholder="you@business.com" />
              </div>
            </div>
            <div>
              <label htmlFor="contactPhone" className="block text-body-sm font-medium text-apple-black mb-1.5">Business Phone *</label>
              <input id="contactPhone" name="contactPhone" type="tel" required className="input-field" placeholder="(619) 555-0100" />
            </div>
            <div>
              <label htmlFor="message" className="block text-body-sm font-medium text-apple-black mb-1.5">Additional Info</label>
              <textarea id="message" name="message" rows={3} className="input-field" placeholder="Anything else that helps us verify your ownership (license number, etc.)" />
            </div>
            <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto disabled:opacity-50">
              {loading ? 'Submitting...' : 'Submit Claim Request'}
            </button>
          </form>
        </div>
      </section>

      {/* ── Why Go Featured? ── */}
      <section className="section-gray !py-16">
        <div className="container-tight">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-apple-blue/10 text-apple-blue text-body-sm font-semibold px-4 py-1.5 rounded-full mb-4">
              <Crown className="w-4 h-4" />
              Featured Pro
            </div>
            <h2 className="text-title lg:text-headline-mobile text-apple-black mb-3">
              Go Further with Featured Pro
            </h2>
            <p className="text-body-lg text-apple-gray-dark max-w-xl mx-auto">
              Claiming is free. But Featured Pros get seen first, build trust faster, and win more jobs. Here&apos;s what the upgrade includes.
            </p>
          </div>

          {/* Free vs Featured Comparison */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
            {/* Free Tier */}
            <div className="bg-white rounded-2xl p-6 border border-gray-200">
              <h3 className="text-body-lg font-semibold text-apple-black mb-1">Free Listing</h3>
              <p className="text-body-sm text-apple-gray-mid mb-5">What you get today</p>
              <ul className="space-y-3">
                {[
                  'Business name & contact info',
                  'Category & neighborhood placement',
                  'Star rating displayed',
                  'Basic listing card',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body-sm text-apple-gray-dark">
                    <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <span className="text-2xl font-bold text-apple-black">Free</span>
                <span className="text-body-sm text-apple-gray-mid ml-1">forever</span>
              </div>
            </div>

            {/* Featured Tier */}
            <div className="bg-white rounded-2xl p-6 border-2 border-apple-blue relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-apple-blue text-white text-body-sm font-semibold px-3 py-1 rounded-bl-xl">
                Most Popular
              </div>
              <h3 className="text-body-lg font-semibold text-apple-black mb-1">Featured Pro</h3>
              <p className="text-body-sm text-apple-gray-mid mb-5">Everything in Free, plus:</p>
              <ul className="space-y-3">
                {[
                  'Listed FIRST on every page you serve',
                  'Blue "Featured Pro" banner',
                  'Verified & Claimed trust badges',
                  'Custom promo/special offer banner',
                  'Website link button on your card',
                  'Premium card design with blue border',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2.5 text-body-sm text-apple-black font-medium">
                    <Star className="w-4 h-4 text-apple-blue shrink-0 mt-0.5" />
                    {item}
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-apple-black">$25</span>
                  <span className="text-body-sm text-apple-gray-mid">/month</span>
                </div>
                <p className="text-body-sm text-apple-gray-mid mt-0.5">
                  Founding rate — locked in forever
                </p>
              </div>
            </div>
          </div>

          {/* Featured Listing Preview Card */}
          <div className="max-w-lg mx-auto mb-12">
            <p className="text-body-sm font-medium text-apple-gray-mid text-center mb-3 uppercase tracking-wide">
              What a Featured Listing Looks Like
            </p>
            <div className="rounded-2xl border-2 border-apple-blue bg-white shadow-md overflow-hidden">
              {/* Featured Banner */}
              <div className="bg-apple-blue text-white text-center text-body-sm font-semibold py-1.5 tracking-wide">
                ⭐ FEATURED PRO
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="text-body font-semibold text-apple-black">Your Business Name</h4>
                      <BadgeCheck className="w-4 h-4 text-apple-blue" />
                    </div>
                    <p className="text-body-sm text-apple-gray-dark">Your Neighborhood, San Diego</p>
                  </div>
                  <div className="flex items-center gap-1 text-amber-500">
                    <Star className="w-4 h-4 fill-current" />
                    <span className="text-body-sm font-medium text-apple-black">4.9</span>
                    <span className="text-body-sm text-apple-gray-mid">(127)</span>
                  </div>
                </div>
                {/* Promo Banner */}
                <div className="bg-apple-blue-bg rounded-lg px-3 py-2 mb-3">
                  <p className="text-body-sm font-semibold text-apple-blue">🎉 $50 Off First Service</p>
                  <p className="text-body-sm text-apple-gray-dark">New customers — mention SD Local Pros</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="btn-primary !py-1.5 !px-4 !text-body-sm pointer-events-none">Visit Website</span>
                  <span className="text-body-sm text-apple-gray-dark">(619) 555-0100</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <p className="text-body text-apple-gray-dark mb-4">
              Interested in becoming a Featured Pro? Mention it in your claim request above, or reach out directly.
            </p>
            <a
              href="/contact"
              className="btn-primary inline-flex items-center gap-2"
            >
              Contact Us About Featured
              <ArrowRight className="w-4 h-4" />
            </a>
            <p className="text-body-sm text-apple-gray-mid mt-3">
              Limited founding spots at $25/mo. Price increases to $50–$200/mo.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}