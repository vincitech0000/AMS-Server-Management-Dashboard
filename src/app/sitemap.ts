import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://amsserver.com'
  const lastModified = new Date()

  return [
    { url: baseUrl, lastModified, changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/digital-media-marketing`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/pharma`, lastModified, changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/reseller-program`, lastModified, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/server-status`, lastModified, changeFrequency: 'always', priority: 0.7 },
    { url: `${baseUrl}/vicibox`, lastModified, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/editor`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${baseUrl}/markup-maestro`, lastModified, changeFrequency: 'monthly', priority: 0.5 },
  ]
}
