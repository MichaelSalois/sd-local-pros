import Link from 'next/link';

const serviceLinks = [
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

const neighborhoodLinks = [
  { name: 'La Jolla', href: '/neighborhoods/la-jolla' },
  { name: 'North Park', href: '/neighborhoods/north-park' },
  { name: 'Pacific Beach', href: '/neighborhoods/pacific-beach' },
  { name: 'Hillcrest', href: '/neighborhoods/hillcrest' },
  { name: 'Point Loma', href: '/neighborhoods/point-loma' },
  { name: 'Carmel Valley', href: '/neighborhoods/carmel-valley' },
  { name: 'Scripps Ranch', href: '/neighborhoods/scripps-ranch' },
  { name: 'Coronado', href: '/neighborhoods/coronado' },
  { name: 'Del Mar', href: '/neighborhoods/del-mar' },
  { name: 'Encinitas', href: '/neighborhoods/encinitas' },
];

const companyLinks = [
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Contact', href: '/contact' },
  { name: 'Add a Business', href: '/add-business' },
  { name: 'Claim Your Listing', href: '/claim' },
  { name: 'Privacy Policy', href: '/privacy' },
  { name: 'Terms of Service', href: '/terms' },
];

export default function Footer() {
  return (
    <footer className="bg-apple-gray-bg border-t border-black/5">
      {/* Main Footer */}
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div>
            <h3 className="text-subtitle text-apple-black mb-3">
              San Diego <span className="text-apple-blue">Local Pros</span>
            </h3>
            <p className="text-body-sm text-apple-gray-dark leading-relaxed mb-6">
              Find trusted, licensed home service professionals across every San
              Diego neighborhood. Free quotes, real reviews, verified pros.
            </p>
          </div>

          {/* Services Column */}
          <div>
            <h4 className="text-body font-semibold text-apple-black mb-4">
              Services
            </h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-apple-gray-dark hover:text-apple-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Neighborhoods Column */}
          <div>
            <h4 className="text-body font-semibold text-apple-black mb-4">
              Neighborhoods
            </h4>
            <ul className="space-y-2.5">
              {neighborhoodLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-apple-gray-dark hover:text-apple-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="text-body font-semibold text-apple-black mb-4">
              Company
            </h4>
            <ul className="space-y-2.5">
              {companyLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-body-sm text-apple-gray-dark hover:text-apple-blue transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-black/5">
        <div className="container-wide py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-caption text-apple-gray-mid">
            © {new Date().getFullYear()} San Diego Local Pros. All rights
            reserved.
          </p>
          <p className="text-caption text-apple-gray-mid">
            Serving San Diego County — La Jolla to Chula Vista and everywhere in
            between.
          </p>
        </div>
      </div>
    </footer>
  );
}
