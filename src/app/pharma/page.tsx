import { PharmaPage } from '@/components/pharma-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pharma Medication Portal | Global Med Supply',
    description: 'Secure and reliable pharmaceutical supply portal. USA to USA domestic node guaranteed. Bulk and retail fulfillment via secure USDT payment.',
    alternates: {
      canonical: '/pharma',
    },
};

export default function PharmaMedicationPage() {
  return <PharmaPage />;
}
