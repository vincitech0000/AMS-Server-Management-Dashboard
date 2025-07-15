
import { ServerStatusPage } from '@/components/server-status-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Server Status',
    description: 'Monitor the status of all your servers.',
};

export default function StatusPage() {
  return <ServerStatusPage />;
}
