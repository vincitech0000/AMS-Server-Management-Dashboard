
'use server';
/**
 * @fileOverview A flow for generating animatic presentations.
 *
 * - generatePresentation - Generates a presentation with script and images.
 * - PresentationInput - The input type for the presentation generation.
 * - PresentationOutput - The return type for the presentation generation.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const SlideSchema = z.object({
  speaker: z.string().describe('The speaker for this slide (e.g., "Narrator").'),
  text: z.string().describe('The text to be displayed on the slide.'),
  image_prompt: z.string().describe('A detailed prompt for generating an image for this slide.'),
});

const PresentationOutputSchema = z.object({
  title: z.string().describe('The title of the presentation.'),
  slides: z.array(SlideSchema).describe('An array of presentation slides.'),
});
type PresentationOutput = z.infer<typeof PresentationOutputSchema>;

const PresentationInputSchema = z.object({
  topic: z.string().describe('The topic for the presentation.'),
});
export type PresentationInput = z.infer<typeof PresentationInputSchema>;

export type SlideWithImage = z.infer<typeof SlideSchema> & { imageUrl: string };
export type PresentationWithImages = {
    title: string;
    slides: SlideWithImage[];
};

const scriptPrompt = ai.definePrompt({
    name: 'generatePresentationScriptPrompt',
    input: { schema: PresentationInputSchema },
    output: { schema: PresentationOutputSchema },
    prompt: `You are a creative writer who specializes in creating compelling presentations.
    Generate a short presentation script based on the topic: {{{topic}}}.
    The presentation should have a title and at least 3 slides.
    For each slide, provide the speaker's name, the text for the slide, and a detailed image prompt that visually represents the slide's content.
    The image prompt should be suitable for an AI image generation model.
    `,
});

const generatePresentationFlow = ai.defineFlow(
    {
        name: 'generatePresentationFlow',
        inputSchema: PresentationInputSchema,
        outputSchema: PresentationOutputSchema,
    },
    async (input) => {
        const { output } = await scriptPrompt(input);
        return output!;
    }
);


export async function generatePresentation(input: PresentationInput): Promise<PresentationWithImages> {
    const presentationResult = await generatePresentationFlow(input);

    if (!presentationResult) {
        throw new Error('Failed to generate presentation script.');
    }

    const imageGenerationPromises = presentationResult.slides.map(async (slide) => {
        const { media } = await ai.generate({
            model: 'googleai/gemini-2.0-flash-preview-image-generation',
            prompt: slide.image_prompt,
            config: {
                responseModalities: ['IMAGE'],
            },
        });
        return {
            ...slide,
            imageUrl: media.url,
        };
    });

    const slidesWithImages = await Promise.all(imageGenerationPromises);

    return {
        title: presentationResult.title,
        slides: slidesWithImages,
    };
}
