'use server';

/**
 * @fileOverview An AI agent for diagnosing plant pests and diseases.
 *
 * - diagnosePest - A function that diagnoses plant issues based on a description and photo.
 * - DiagnosePestInput - The input type for the diagnosePest function.
 * - DiagnosePestOutput - The return type for the diagnosePest function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DiagnosePestInputSchema = z.object({
  description: z.string().describe('A description of the symptoms observed on the plant.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the affected plant, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type DiagnosePestInput = z.infer<typeof DiagnosePestInputSchema>;

const DiagnosePestOutputSchema = z.object({
  diagnosis: z.string().describe('The identified pest or disease affecting the plant.'),
  recommendation: z.string().describe('The recommended course of action, including treatment and prevention methods.'),
});
export type DiagnosePestOutput = z.infer<typeof DiagnosePestOutputSchema>;

export async function diagnosePest(input: DiagnosePestInput): Promise<DiagnosePestOutput> {
  return diagnosePestFlow(input);
}

const prompt = ai.definePrompt({
  name: 'diagnosePestPrompt',
  input: {schema: DiagnosePestInputSchema},
  output: {schema: DiagnosePestOutputSchema},
  prompt: `You are an expert plant pathologist and entomologist. Your task is to diagnose plant health problems based on a user-provided description and photo.

Analyze the following information:
Description of symptoms: {{{description}}}
Photo of the affected plant: {{media url=photoDataUri}}

Based on the visual evidence in the photo and the user's description, identify the most likely pest or disease. Provide a clear diagnosis and a practical, actionable recommendation for treatment. The recommendation should be suitable for a farmer and may include organic and chemical treatment options, as well as preventative measures.
`,
});

const diagnosePestFlow = ai.defineFlow(
  {
    name: 'diagnosePestFlow',
    inputSchema: DiagnosePestInputSchema,
    outputSchema: DiagnosePestOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
