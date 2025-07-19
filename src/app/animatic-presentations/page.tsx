
import { AnimaticPresentations } from '@/components/animatic-presentations';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Animatic Presentations',
    description: 'Generate animatic presentations with AI.',
};

export default function AnimaticPresentationsPage() {
  return <AnimaticPresentations />;
}
