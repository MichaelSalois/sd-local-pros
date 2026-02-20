'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/ui';
import { categories } from '@/data/categories';
import { neighborhoods } from '@/data/neighborhoods';
import {
  CheckCircle2,
  Star,
  TrendingUp,
  BadgeCheck,
  Globe,
  Megaphone,
  ArrowRight,
  Sparkles,
  Crown,
} from 'lucide-react';

export default function AddBusinessPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const data = new FormData(form);
    const body = Object.fromEntries(data.entries());

    try {
      const res = await fetch('/api/submit-listing', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...body, type: 'add' }),
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
          <h1 className="text-headline-mobile text-apple-black mb-4">Business Submitted!</h1>
          <p className="text-body-lg text-apple-gray-dark max-w-lg mx-auto">
            Thank you for adding your business. We&apos;ll review your submission and have it live within 24–48 hours. You&apos;ll receive an email confirmation.
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
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Add a Business' }]} />
          <h1 className="text-headline-mobile lg:text-headline text-apple-black mb-4">Add Your Business</h1>
          <p className="text-body-lg text-apple-gray-dark max-w-2xl">
            Get listed for free and connect with San Diego homeowners looking for your services. It only takes 2 minutes.
          </p>
        </div>
      </section>

      {/* Form */}
      <section className="section-white">
        <div className="container-tight max-w-2xl">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="businessName" className="block text-body-sm font-medium text-apple-black mb-1.5">Business Name *</label>
              <input id="businessName" name="businessName" type="text" required className="input-field" placeholder="e.g. Pacific Plumbing & Drain" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="category" className="block text-body-sm font-medium text-apple-black mb-1.5">Service Category *</label>
                <select id="category" name="categorySlug" required className="input-field">
                  <option value="">Select a category</option>
                  {categories.map((c) => (
                    <option key={c.slug} value={c.slug}>{c.namePlural}</option>
                  ))}
                </select>
              </div>
              <div>
                <label htmlFor="neighborhood" className="block text-body-sm font-medium text-apple-black mb-1.5">Primary Neighborhood *</label>
                <select id="neighborhood" name="neighborhoodSlug" required className="input-field">
                  <option value="">Select neighborhood</option>
                  {neighborhoods.map((n) => (
                    <option key={n.slug} value={n.slug}>{n.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="address" className="block text-body-sm font-medium text-apple-black mb-1.5">Business Address</label>
              <input id="address" name="address" type="text" className="input-field" placeholder="Street address" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="phone" className="block text-body-sm font-medium text-apple-black mb-1.5">Phone *</label>
                <input id="phone" name="phone" type="tel" required className="input-field" placeholder="(619) 555-0100" />
              </div>
              <div>
                <label htmlFor="website" className="block text-body-sm font-medium text-apple-black mb-1.5">Website</label>
                <input id="website" name="website" type="url" className="input-field" placeholder="https://yourbusiness.com" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div>
                <label htmlFor="contactName" className="block text-body-sm font-medium text-apple-black mb-1.5">Your Name *</label>
                <input id="contactName" name="contactName" type="text" required className="input-field" placeholder="Full name" />
              </div>
              <div>
                <label htmlFor="contactEmail" className="block text-body-sm font-medium text-apple-black mb-1.5">Your Email *</label>
                <input id="contactEmail" name="contactEmail" type="email" required className="input-field" placeholder="you@business.com" />
              </div>
            </div>

            <div>
              <label htmlFor="description" className="block text-body-sm font-medium text-apple-black mb-1.5">Business Description</label>
              <textarea id="description" name="description" rows={4} className="input-field" placeholder="Tell homeowners about your services, experience, and what makes you different..." />
            </div>

            <div className="pt-2">
              <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto disabled:opacity-50">
                {loading ? 'Submitting...' : 'Submit Your Business'}
              </button>
              <p className="text-body-sm text-apple-gray-mid mt-3">
                Free listing. No credit card required. We&apos;ll review and publish within 24–48 hours.
              </p>
            </div>
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
              Want to Stand Out?
            </h2>
            <p className="text-body-lg text-apple-gray-dark max-w-xl mx-auto">
              Featured Pros get seen first, build trust faster, and win more jobs. Here&apos;s what you get.
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: TrendingUp,
                title: 'Listed First',
                desc: 'Your business appears at the top of every category and neighborhood page you serve — above all other listings.',
              },
              {
                icon: BadgeCheck,
                title: 'Verified & Claimed Badges',
                desc: 'Stand out with trust badges that show homeowners you\'re a legitimate, verified professional.',
              },
              {
                icon: Megaphone,
                title: 'Promo Banner',
                desc: 'Highlight a special offer, seasonal deal, or unique selling point directly on your listing card.',
              },
              {
                icon: Globe,
                title: 'Website Link Button',
                desc: 'Drive traffic straight to your website with a prominent button on your featured listing.',
              },
              {
                icon: Star,
                title: 'Blue Featured Badge',
                desc: 'An eye-catching blue "Featured Pro" banner makes your listing impossible to scroll past.',
              },
              {
                icon: Sparkles,
                title: 'Premium Visibility',
                desc: 'Featured listings are highlighted with a blue border and enhanced card design that grabs attention.',
              },
            ].map((b) => (
              <div key={b.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="w-10 h-10 rounded-xl bg-apple-blue-bg flex items-center justify-center text-apple-blue mb-4">
                  <b.icon className="w-5 h-5" />
                </div>
                <h3 className="text-body font-semibold text-apple-black mb-1.5">{b.title}</h3>
                <p className="text-body-sm text-apple-gray-dark leading-relaxed">{b.desc}</p>
              </div>
            ))}
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

          {/* Pricing CTA */}
          <div className="text-center">
            <div className="inline-block bg-white rounded-2xl shadow-sm border border-gray-100 px-8 py-6">
              <p className="text-body-sm text-apple-gray-mid mb-1">Founding Rate — Limited Spots</p>
              <div className="flex items-baseline justify-center gap-1 mb-1">
                <span className="text-4xl font-bold text-apple-black">$25</span>
                <span className="text-body-lg text-apple-gray-dark">/month</span>
              </div>
              <p className="text-body-sm text-apple-gray-mid mb-4">
                Locked in forever. Price goes up to $50–$200/mo.
              </p>
              <a
                href="/claim"
                className="btn-primary inline-flex items-center gap-2"
              >
                Become a Featured Pro
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}