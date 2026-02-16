
import { ResellerProgramPage } from '@/components/reseller-program-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Reseller Program',
    description: 'Start your own VoIP business with our reseller program.',
};

export default function ResellerPage() {
  return <ResellerProgramPage />;
}
