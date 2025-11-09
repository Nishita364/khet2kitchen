'use server';

/**
 * @fileOverview A crop price suggestion AI agent.
 *
 * - suggestCropPrice - A function that suggests a price for a crop.
 * - SuggestCropPriceInput - The input type for the suggestCropPrice function.
 * - SuggestCropPriceOutput - The return type for the suggestCropPrice function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCropPriceInputSchema = z.object({
  cropType: z.string().describe('The type of crop.'),
  plantingDate: z.string().describe('The date the crop was planted.'),
  expectedYield: z.number().describe('The expected yield of the crop in kilograms.'),
  location: z.string().describe('The location where the crop is grown.'),
});
export type SuggestCropPriceInput = z.infer<typeof SuggestCropPriceInputSchema>;

const SuggestCropPriceOutputSchema = z.object({
  suggestedPricePerKilogram: z.number().describe('The suggested price per kilogram for the crop in USD.'),
  reasoning: z.string().describe('The reasoning behind the suggested price.'),
});
export type SuggestCropPriceOutput = z.infer<typeof SuggestCropPriceOutputSchema>;

export async function suggestCropPrice(input: SuggestCropPriceInput): Promise<SuggestCropPriceOutput> {
  return suggestCropPriceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCropPricePrompt',
  input: {schema: SuggestCropPriceInputSchema},
  output: {schema: SuggestCropPriceOutputSchema},
  prompt: `You are an expert agricultural economist specializing in pricing crops.

You will use the provided information about the crop, its planting date, expected yield, and location, combined with current market trends, to suggest an optimal price per kilogram for the crop in USD.

Crop Type: {{{cropType}}}
Planting Date: {{{plantingDate}}}
Expected Yield: {{{expectedYield}}} kg
Location: {{{location}}}

Consider current market prices for similar crops, seasonal variations, and transportation costs to the nearest major market.

Provide a suggested price per kilogram in USD and a brief explanation of your reasoning.
`,
});

const suggestCropPriceFlow = ai.defineFlow(
  {
    name: 'suggestCropPriceFlow',
    inputSchema: SuggestCropPriceInputSchema,
    outputSchema: SuggestCropPriceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
