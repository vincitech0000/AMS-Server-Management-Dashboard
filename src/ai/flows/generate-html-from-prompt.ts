'use server';
/**
 * @fileOverview Generates a basic HTML structure from a user prompt.
 *
 * - generateHtml - A function that generates HTML code based on a text prompt.
 * - GenerateHtmlInput - The input type for the generateHtml function.
 * - GenerateHtmlOutput - The return type for the generateHtml function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateHtmlInputSchema = z.object({
  prompt: z.string().describe('A text prompt describing the desired HTML page.'),
});
export type GenerateHtmlInput = z.infer<typeof GenerateHtmlInputSchema>;

const GenerateHtmlOutputSchema = z.object({
  html: z.string().describe('The generated HTML code.'),
});
export type GenerateHtmlOutput = z.infer<typeof GenerateHtmlOutputSchema>;

export async function generateHtml(input: GenerateHtmlInput): Promise<GenerateHtmlOutput> {
  return generateHtmlFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateHtmlPrompt',
  input: {schema: GenerateHtmlInputSchema},
  output: {schema: GenerateHtmlOutputSchema},
  prompt: `You are an HTML expert. Please generate a basic HTML structure based on the following description: {{{prompt}}}. Include <!DOCTYPE html>, <html>, <head>, and <body> tags. Use appropriate HTML5 semantic tags where possible. Do not include any CSS styling. Add a title to the head section.
`,
});

const generateHtmlFlow = ai.defineFlow(
  {
    name: 'generateHtmlFlow',
    inputSchema: GenerateHtmlInputSchema,
    outputSchema: GenerateHtmlOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
