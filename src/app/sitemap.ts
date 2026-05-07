import type { MetadataRoute } from 'next';
const routes = ['', '/start/', '/daily/', '/what-is-6-7/', '/parents/', '/teachers/', '/about/', '/privacy/'];
export default function sitemap(): MetadataRoute.Sitemap { return routes.map((route) => ({ url: `https://67speed.com${route}`, lastModified: new Date() })); }
