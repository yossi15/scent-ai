import type { MetadataRoute } from 'next';
import { fragrances } from '@/data/fragrances';

const SITE = 'https://scentory.co.il';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: `${SITE}/`,        lastModified: now, changeFrequency: 'weekly',  priority: 1.0 },
    { url: `${SITE}/terms`,   lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
    { url: `${SITE}/privacy`, lastModified: now, changeFrequency: 'yearly',  priority: 0.3 },
  ];
  const fragranceRoutes: MetadataRoute.Sitemap = fragrances.map((f) => ({
    url: `${SITE}/fragrance/${f.id}`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));
  return [...staticRoutes, ...fragranceRoutes];
}
