
import { DigitalMarketingPage } from '@/components/digital-marketing-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Digital Marketing Services',
    description: 'Grow your business with our expert digital marketing services.',
};

export default function DigitalMarketing() {
  return <DigitalMarketingPage />;
}

    