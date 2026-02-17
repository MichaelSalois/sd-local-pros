'use client';

import { useState } from 'react';
import { Breadcrumbs } from '@/components/ui';
import { CheckCircle2, Shield, BarChart3, Edit3 } from 'lucide-react';

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
      <section className="bg-gradient-to-b from-apple-blue-bg/30 to-white pt-12 pb-12">
        <div className="container-tight">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Claim Your Listing' }]} />
          <h1 className="text-headline-mobile lg:text-headline text-apple-black mb-4">Claim Your Listing</h1>
          <p className="text-body-lg text-apple-gray-dark max-w-2xl">
            Already see your business on San Diego Local Pros? Claim it to update your info, respond to reviews, and unlock premium features.
          </p>
        </div>
      </section>

      {/* Benefits */}
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
    </>
  );
}
