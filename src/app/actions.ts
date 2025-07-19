
'use server';

import { generateHtml } from '@/ai/flows/generate-html-from-prompt';
import { generatePresentation } from '@/ai/flows/generate-presentation-flow';
import { z } from 'zod';

const promptSchema = z.string().min(1, 'Prompt cannot be empty.');

export async function generateHtmlAction(prompt: string) {
  try {
    const validatedPrompt = promptSchema.safeParse(prompt);
    if (!validatedPrompt.success) {
      return { error: 'Invalid prompt.', details: validatedPrompt.error.format() };
    }

    const result = await generateHtml({ prompt: validatedPrompt.data });
    return { html: result.html };
  } catch (error) {
    console.error('Error generating HTML:', error);
    return { error: 'Failed to generate HTML. Please try again.' };
  }
}

export async function generatePresentationAction(topic: string) {
  const presentationInputSchema = z.string().min(1, 'Topic cannot be empty.');
  try {
    const validatedTopic = presentationInputSchema.safeParse(topic);
    if (!validatedTopic.success) {
      return { error: 'Invalid topic.', details: validatedTopic.error.format() };
    }
    const result = await generatePresentation({ topic: validatedTopic.data });
    return { presentation: result };
  } catch (error) {
    console.error('Error generating presentation:', error);
    return { error: 'Failed to generate presentation. Please try again.' };
  }
}
