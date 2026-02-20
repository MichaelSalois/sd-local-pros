'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const services = [
  { name: 'Plumbers', href: '/plumbers' },
  { name: 'Electricians', href: '/electricians' },
  { name: 'HVAC', href: '/hvac' },
  { name: 'Roofers', href: '/roofers' },
  { name: 'Landscapers', href: '/landscapers' },
  { name: 'House Cleaning', href: '/house-cleaning' },
  { name: 'Painters', href: '/painters' },
  { name: 'Pest Control', href: '/pest-control' },
  { name: 'Handyman', href: '/handyman' },
  { name: 'Garage Door Repair', href: '/garage-door-repair' },
];

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <nav className="nav-glass sticky top-0 z-50">
      <div className="container-wide">
        <div className="flex items-center justify-between h-[52px]">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <span className="text-subtitle text-apple-black tracking-tight">
              San Diego <span className="text-apple-blue">Local Pros</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className="flex items-center gap-1 text-body-sm text-apple-black hover:text-apple-blue transition-colors">
                Services
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              {servicesOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2">
                  <div className="bg-white rounded-card shadow-card-hover border border-black/5 p-2 min-w-[200px] animate-fade-in">
                    {services.map((s) => (
                      <Link
                        key={s.href}
                        href={s.href}
                        className="block px-4 py-2 text-body-sm text-apple-black rounded-lg hover:bg-apple-gray-bg transition-colors"
                      >
                        {s.name}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/neighborhoods"
              className="text-body-sm text-apple-black hover:text-apple-blue transition-colors"
            >
              Neighborhoods
            </Link>
            <Link
              href="/blog"
              className="text-body-sm text-apple-black hover:text-apple-blue transition-colors"
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="text-body-sm text-apple-black hover:text-apple-blue transition-colors"
            >
              About
            </Link>
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center gap-4">
            <Link href="/claim" className="btn-ghost text-body-sm">
              Claim Your Business
            </Link>
            <Link href="/add-business" className="btn-primary text-body-sm !py-2 !px-5">
              Add a Business
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 -mr-2 text-apple-black"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden border-t border-black/5 bg-white/95 backdrop-blur-nav animate-fade-in">
          <div className="container-wide py-4 space-y-1">
            <p className="px-4 py-2 text-caption text-apple-gray-mid uppercase tracking-wider font-medium">
              Services
            </p>
            {services.map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="block px-4 py-2.5 text-body text-apple-black rounded-lg hover:bg-apple-gray-bg"
                onClick={() => setMobileOpen(false)}
              >
                {s.name}
              </Link>
            ))}
            <div className="h-px bg-black/5 my-3" />
            <Link
              href="/neighborhoods"
              className="block px-4 py-2.5 text-body text-apple-black rounded-lg hover:bg-apple-gray-bg"
              onClick={() => setMobileOpen(false)}
            >
              Neighborhoods
            </Link>
            <Link
              href="/blog"
              className="block px-4 py-2.5 text-body text-apple-black rounded-lg hover:bg-apple-gray-bg"
              onClick={() => setMobileOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/about"
              className="block px-4 py-2.5 text-body text-apple-black rounded-lg hover:bg-apple-gray-bg"
              onClick={() => setMobileOpen(false)}
            >
              About
            </Link>
            <div className="h-px bg-black/5 my-3" />
            <div className="px-4 space-y-3 pt-2 pb-4">
              <Link
                href="/claim"
                className="btn-secondary w-full text-center text-body-sm"
                onClick={() => setMobileOpen(false)}
              >
                Claim Your Business
              </Link>
              <Link
                href="/add-business"
                className="btn-primary w-full text-center text-body-sm"
                onClick={() => setMobileOpen(false)}
              >
                Add a Business
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}