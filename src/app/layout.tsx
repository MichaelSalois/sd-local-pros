import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export const metadata: Metadata = {
  metadataBase: new URL('https://sdlocalpros.com'),
  title: {
    default: 'San Diego Local Pros | Find Trusted Home Service Professionals',
    template: '%s | San Diego Local Pros',
  },
  description:
    'Find top-rated, licensed home service professionals in San Diego. Compare plumbers, electricians, HVAC contractors, roofers, and more across every neighborhood.',
  keywords: [
    'san diego home services',
    'plumber san diego',
    'electrician san diego',
    'hvac san diego',
    'san diego contractors',
    'local pros san diego',
  ],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://sdlocalpros.com',
    siteName: 'San Diego Local Pros',
    title: 'San Diego Local Pros | Find Trusted Home Service Professionals',
    description:
      'Find top-rated, licensed home service professionals in San Diego. Compare ratings, read reviews, and get free quotes.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'San Diego Local Pros',
    description: 'Find trusted home service professionals in San Diego.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
      </head>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
