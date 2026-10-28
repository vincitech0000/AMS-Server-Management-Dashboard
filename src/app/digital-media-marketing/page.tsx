import { DigitalMediaMarketingPage } from '@/components/digital-media-marketing-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Digital Media Marketing | SEO, GMB & Ads',
    description: 'Elevate your brand with professional SEO, Google My Business optimization, and Search Engine Marketing services.',
    alternates: {
      canonical: '/digital-media-marketing',
    },
};

export default function DigitalMarketingServicesPage() {
  return <DigitalMediaMarketingPage />;
}
