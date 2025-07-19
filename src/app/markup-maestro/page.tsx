
import { MarkupMaestro } from '@/components/markup-maestro';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Markup Maestro',
    description: 'An AI-powered HTML editor.',
};

export default function MarkupMaestroPage() {
  return <MarkupMaestro />;
}
