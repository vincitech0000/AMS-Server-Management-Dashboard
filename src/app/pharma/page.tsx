
import { PharmaPage } from '@/components/pharma-page';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Pharma Medication | Global Med Supply',
    description: 'Secure and reliable pharmaceutical supply portal.',
};

export default function PharmaMedicationPage() {
  return <PharmaPage />;
}
