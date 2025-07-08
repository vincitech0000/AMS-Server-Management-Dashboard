
import { ViciboxDialerPage } from '@/components/vicibox-dialer-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'VICIBOX Dialers',
    description: 'Access all your VICIBOX servers.',
};

export default function ViciboxPage() {
  return <ViciboxDialerPage />;
}
