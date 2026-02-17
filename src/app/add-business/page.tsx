'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/ui';
import { categories } from '@/data/categories';
import { neighborhoods } from '@/data/neighborhoods';
import { CheckCircle2 } from 'lucide-react';

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
      <section className="bg-gradient-to-b from-apple-blue-bg/30 to-white pt-12 pb-12">
        <div className="container-tight">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Add a Business' }]} />
          <h1 className="text-headline-mobile lg:text-headline text-apple-black mb-4">Add Your Business</h1>
          <p className="text-body-lg text-apple-gray-dark max-w-2xl">
            Get listed for free and connect with San Diego homeowners looking for your services. It only takes 2 minutes.
          </p>
        </div>
      </section>

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
    </>
  );
}
