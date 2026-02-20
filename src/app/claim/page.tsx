'use client';

import { useState, useEffect, useRef } from 'react';
import { Breadcrumbs } from '@/components/ui';
import {
  CheckCircle2,
  Shield,
  BarChart3,
  Edit3,
  Star,
  BadgeCheck,
  ArrowRight,
  Crown,
  Search,
  X,
} from 'lucide-react';

interface BusinessResult {
  id: string;
  name: string;
  category_slug: string;
  neighborhood_slug: string;
  phone: string;
  address: string;
}

export default function ClaimPage() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Business search state
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<BusinessResult[]>([]);
  const [selectedBusiness, setSelectedBusiness] = useState<BusinessResult | null>(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searching, setSearching] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounced search
  useEffect(() => {
    if (searchQuery.length < 2 || selectedBusiness) {
      setSearchResults([]);
      setShowDropdown(false);
      return;
    }

    const timer = setTimeout(async () => {
      setSearching(true);
      try {
        const res = await fetch(`/api/search-businesses?q=${encodeURIComponent(searchQuery)}`);
        const data = await res.json();
        setSearchResults(data.businesses || []);
        setShowDropdown(true);
      } catch {
        setSearchResults([]);
      } finally {
        setSearching(false);
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [searchQuery, selectedBusiness]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShowDropdown(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function handleSelectBusiness(biz: BusinessResult) {
    setSelectedBusiness(biz);
    setSearchQuery(biz.name);
    setShowDropdown(false);
  }

  function handleClearSelection() {
    setSelectedBusiness(null);
    setSearchQuery('');
    setSearchResults([]);
    inputRef.current?.focus();
  }

  function formatSlug(slug: string): string {
    return slug
      .split('-')
      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ');
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const body: Record<string, string> = {};
    data.forEach((val, key) => {
      body[key] = val.toString();
    });

    // Attach selected business ID and name
    if (selectedBusiness) {
      body.businessId = selectedBusiness.id;
      body.businessName = selectedBusiness.name;
    } else {
      body.businessName = searchQuery;
    }

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
            {/* Business Search */}
            <div ref={dropdownRef} className="relative">
              <label htmlFor="businessSearch" className="block text-body-sm font-medium text-apple-black mb-1.5">
                Find Your Business *
              </label>
              {selectedBusiness ? (
                <div className="flex items-center gap-3 p-3 bg-apple-blue-bg/50 border border-apple-blue/20 rounded-xl">
                  <CheckCircle2 className="w-5 h-5 text-apple-blue shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-body font-semibold text-apple-black truncate">{selectedBusiness.name}</p>
                    <p className="text-body-sm text-apple-gray-dark">
                      {formatSlug(selectedBusiness.category_slug)} · {formatSlug(selectedBusiness.neighborhood_slug)}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={handleClearSelection}
                    className="p-1 hover:bg-white/60 rounded-lg transition-colors"
                  >
                    <X className="w-4 h-4 text-apple-gray-mid" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-apple-gray-mid" />
                    <input
                      ref={inputRef}
                      id="businessSearch"
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="input-field !pl-10"
                      placeholder="Start typing your business name..."
                      autoComplete="off"
                    />
                    {searching && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <div className="w-4 h-4 border-2 border-apple-blue/30 border-t-apple-blue rounded-full animate-spin" />
                      </div>
                    )}
                  </div>
                  {/* Dropdown Results */}
                  {showDropdown && searchResults.length > 0 && (
                    <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-64 overflow-y-auto">
                      {searchResults.map((biz) => (
                        <button
                          key={biz.id}
                          type="button"
                          onClick={() => handleSelectBusiness(biz)}
                          className="w-full text-left px-4 py-3 hover:bg-apple-blue-bg/30 transition-colors border-b border-gray-50 last:border-0"
                        >
                          <p className="text-body font-medium text-apple-black">{biz.name}</p>
                          <p className="text-body-sm text-apple-gray-dark">
                            {formatSlug(biz.category_slug)} · {formatSlug(biz.neighborhood_slug)}
                            {biz.phone ? ` · ${biz.phone}` : ''}
                          </p>
                        </button>
                      ))}
                    </div>
                  )}
                  {showDropdown && searchResults.length === 0 && searchQuery.length >= 2 && !searching && (
                    <div className="absolute z-50 left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3">
                      <p className="text-body-sm text-apple-gray-dark">
                        No businesses found matching &ldquo;{searchQuery}&rdquo;.
                      </p>
                      <p className="text-body-sm text-apple-gray-mid mt-1">
                        Not listed yet? <a href="/add-business" className="text-apple-blue hover:underline">Add your business</a> instead.
                      </p>
                    </div>
                  )}
                </>
              )}
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto mb-12">
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

          <div className="max-w-lg mx-auto mb-12">
            <p className="text-body-sm font-medium text-apple-gray-mid text-center mb-3 uppercase tracking-wide">
              What a Featured Listing Looks Like
            </p>
            <div className="rounded-2xl border-2 border-apple-blue bg-white shadow-md overflow-hidden">
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