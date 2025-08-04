
import { DigitalMediaMarketingPage } from '@/components/digital-media-marketing-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Digital Media Marketing',
    description: 'Explore our digital media marketing services.',
};

export default function DigitalMarketingServicesPage() {
  return <DigitalMediaMarketingPage />;
}
