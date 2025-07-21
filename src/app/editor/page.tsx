
import { Editor } from '@/components/editor';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'HTML Editor',
    description: 'An AI-powered HTML editor.',
};

export default function EditorPage() {
  return <Editor />;
}
