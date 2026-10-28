import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: '/admin/',
      },
      {
        userAgent: ['CCBot', 'GPTBot', 'Bytespider'],
        disallow: '/',
      },
      {
        userAgent: 'Google-Extended',
        allow: '/',
      }
    ],
    sitemap: 'https://amsserver.com/sitemap.xml',
  }
}
