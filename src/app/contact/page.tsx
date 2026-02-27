'use client';

import { useState } from 'react';
import { Mail, MessageSquare, CheckCircle2 } from 'lucide-react';
import { Breadcrumbs } from '@/components/ui';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const body = Object.fromEntries(data.entries());

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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
          <h1 className="text-headline-mobile text-apple-black mb-4">Message Sent!</h1>
          <p className="text-body-lg text-apple-gray-dark max-w-lg mx-auto">
            Thanks for reaching out. We&apos;ll get back to you within 24 hours.
          </p>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="bg-gradient-to-b from-apple-blue-bg/30 to-white pt-12 pb-16">
        <div className="container-tight">
          <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]} />
          <h1 className="text-headline-mobile lg:text-headline text-apple-black mb-4">Contact Us</h1>
          <p className="text-body-lg text-apple-gray-dark max-w-2xl">
            Have a question about a listing, want to partner with us, or interested in premium placement? We&apos;d love to hear from you.
          </p>
        </div>
      </section>

      <section className="section-white">
        <div className="container-tight">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-title text-apple-black mb-6">Send us a message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-body-sm font-medium text-apple-black mb-1.5">Name</label>
                  <input id="name" name="name" type="text" required className="input-field" placeholder="Your name" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-body-sm font-medium text-apple-black mb-1.5">Email</label>
                  <input id="email" name="email" type="email" required className="input-field" placeholder="you@example.com" />
                </div>
                <div>
                  <label htmlFor="subject" className="block text-body-sm font-medium text-apple-black mb-1.5">Subject</label>
                  <select id="subject" name="subject" className="input-field">
                    <option value="general">General Question</option>
                    <option value="listing">Listing Issue</option>
                    <option value="partnership">Partnership / Advertising</option>
                    <option value="claim">Claim a Listing</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label htmlFor="message" className="block text-body-sm font-medium text-apple-black mb-1.5">Message</label>
                  <textarea id="message" name="message" required rows={5} className="input-field" placeholder="How can we help?" />
                </div>
                <button type="submit" disabled={loading} className="btn-primary w-full sm:w-auto disabled:opacity-50">
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-title text-apple-black mb-6">Other ways to reach us</h2>
              <div className="space-y-6">
                <div className="card p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-apple-blue-bg flex items-center justify-center text-apple-blue shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-apple-black mb-1">Email</h3>
                    <p className="text-body text-apple-gray-dark">hello@sdlocalpros.com</p>
                    <p className="text-body-sm text-apple-gray-mid mt-1">We respond within 24 hours</p>
                  </div>
                </div>
                <div className="card p-6 flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-apple-blue-bg flex items-center justify-center text-apple-blue shrink-0">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-body font-semibold text-apple-black mb-1">For Businesses</h3>
                    <p className="text-body text-apple-gray-dark">Interested in featured placement or partnership?</p>
                    <p className="text-body-sm text-apple-gray-mid mt-1">Email us at partners@sdlocalpros.com</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}