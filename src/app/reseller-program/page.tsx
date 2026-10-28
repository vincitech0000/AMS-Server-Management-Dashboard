import { ResellerProgramPage } from '@/components/reseller-program-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'VoIP Reseller Program | Launch Your Brand',
    description: 'Partner with us to launch your own VoIP business. White-label platforms, 24/7 support, and scalable infrastructure.',
    alternates: {
      canonical: '/reseller-program',
    },
};

export default function ResellerPage() {
  return <ResellerProgramPage />;
}
