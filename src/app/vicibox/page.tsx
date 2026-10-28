import { ViciboxDialerPage } from '@/components/vicibox-dialer-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'VICIBOX Dialers | Predictive Dialing Nodes',
    description: 'Access and manage high-performance VICIBOX predictive dialers and press-one campaign servers.',
    alternates: {
      canonical: '/vicibox',
    },
};

export default function ViciboxPage() {
  return <ViciboxDialerPage />;
}
