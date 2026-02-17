import { MetadataRoute } from 'next';
import { categories } from '@/data/categories';
import { neighborhoods } from '@/data/neighborhoods';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://sdlocalpros.com';
  const now = new Date().toISOString();

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: now, changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/neighborhoods`, lastModified: now, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/blog`, lastModified: now, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: now, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/contact`, lastModified: now, changeFrequency: 'monthly', priority: 0.4 },
    { url: `${baseUrl}/add-business`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/claim`, lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
  ];

  // Category pages (e.g. /plumbers)
  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${baseUrl}/${cat.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  // Neighborhood pages (e.g. /neighborhoods/north-park)
  const neighborhoodPages: MetadataRoute.Sitemap = neighborhoods.map((n) => ({
    url: `${baseUrl}/neighborhoods/${n.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Service + Neighborhood pages (THE MONEY PAGES)
  // e.g. /plumbers/north-park — this generates 200+ URLs at launch
  const serviceNeighborhoodPages: MetadataRoute.Sitemap = [];
  for (const cat of categories) {
    for (const n of neighborhoods) {
      serviceNeighborhoodPages.push({
        url: `${baseUrl}/${cat.slug}/${n.slug}`,
        lastModified: now,
        changeFrequency: 'weekly' as const,
        priority: 0.85,
      });
    }
  }

  return [
    ...staticPages,
    ...categoryPages,
    ...neighborhoodPages,
    ...serviceNeighborhoodPages,
  ];
}
