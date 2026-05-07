import type { MetadataRoute } from 'next';
export default function robots(): MetadataRoute.Robots { return { rules: [{ userAgent: '*', allow: '/', disallow: ['/r/'] }], sitemap: 'https://67speed.com/sitemap.xml' }; }
