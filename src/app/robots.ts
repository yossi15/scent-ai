import type { MetadataRoute } from 'next';

const SITE = 'https://scentory.co.il';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/', '/dashboard', '/account', '/sign-in', '/sign-up'] },
    ],
    sitemap: `${SITE}/sitemap.xml`,
    host: SITE,
  };
}
