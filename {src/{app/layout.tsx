import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

const GA_MEASUREMENT_ID = 'G-P6H81F7W9Z';
const META_PIXEL_ID = '1567348854472021';

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
  verification: {
    other: {
      'msvalidate.01': '21AF46CC4A58B3B4654A1882B5475256',
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
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}');
          `}
        </Script>
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${META_PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
        <noscript>
          <img
            height="1"
            width="1"
            style={{ display: 'none' }}
            src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
            alt=""
          />
        </noscript>
	<meta name="msvalidate.01" content="21AF46CC4A58B3B4654A1882B5475256" />
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