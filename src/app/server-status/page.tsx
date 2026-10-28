import { ServerStatusPage } from '@/components/server-status-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Server Status | Real-time NOC Monitor',
    description: 'Live monitoring of global infrastructure nodes. Check latency and availability for VOS3000, VICIBOX, and wholesale clusters.',
    alternates: {
      canonical: '/server-status',
    },
};

export default function StatusPage() {
  return <ServerStatusPage />;
}
