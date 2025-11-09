'use server';

/**
 * @fileOverview An AI agent for grading produce.
 *
 * - gradeProduce - A function that grades produce based on various factors.
 * - GradeProduceInput - The input type for the gradeProduce function.
 * - GradeProduceOutput - The return type for the gradeProduce function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GradeProduceInputSchema = z.object({
  produceType: z.string().describe('The type of produce (e.g., Tomato, Lentil).'),
  size: z.string().describe('The size of the produce (e.g., small, medium, large).'),
  color: z.string().describe('The color of the produce.'),
  defects: z.string().describe('A description of any defects found on the produce.'),
  photoDataUri: z
    .string()
    .describe(
      "A photo of the produce, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GradeProduceInput = z.infer<typeof GradeProduceInputSchema>;

const GradeProduceOutputSchema = z.object({
  grade: z.string().describe('The final grade assigned to the produce (e.g., Grade A, Grade B, Grade C).'),
  report: z.string().describe('A detailed report explaining the reasoning for the assigned grade.'),
});
export type GradeProduceOutput = z.infer<typeof GradeProduceOutputSchema>;

export async function gradeProduce(input: GradeProduceInput): Promise<GradeProduceOutput> {
  return gradeProduceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'gradeProducePrompt',
  input: {schema: GradeProduceInputSchema},
  output: {schema: GradeProduceOutputSchema},
  prompt: `You are an expert agricultural inspector. Your task is to grade the quality of vegetables and pulses based on the provided information and image.

Produce Type: {{{produceType}}}
Size: {{{size}}}
Color: {{{color}}}
Defects: {{{defects}}}
Photo: {{media url=photoDataUri}}

Analyze the image and the details provided. Assign a grade (Grade A, Grade B, or Grade C) based on standard quality parameters like size uniformity, color consistency, and the presence of defects. Provide a detailed report explaining your assessment.

- **Grade A:** Premium quality, uniform size and color, no defects.
- **Grade B:** Good quality, minor inconsistencies in size or color, minimal defects.
- **Grade C:** Fair quality, significant variations, noticeable defects.
`,
});

const gradeProduceFlow = ai.defineFlow(
  {
    name: 'gradeProduceFlow',
    inputSchema: GradeProduceInputSchema,
    outputSchema: GradeProduceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
