'use server';

/**
 * @fileOverview An AI agent for processing user feedback.
 *
 * - submitFeedback - A function that processes user feedback.
 * - SubmitFeedbackInput - The input type for the submitFeedback function.
 * - SubmitFeedbackOutput - The return type for the submitFeedback function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SubmitFeedbackInputSchema = z.object({
  userType: z.string().describe("The type of user submitting the feedback (e.g., 'farmer', 'company', 'consumer')."),
  feedbackText: z.string().describe('The user-submitted feedback text.'),
});
export type SubmitFeedbackInput = z.infer<typeof SubmitFeedbackInputSchema>;

const SubmitFeedbackOutputSchema = z.object({
  status: z.string().describe('The status of the feedback submission (e.g., "Received", "Processing").'),
  referenceId: z.string().describe("A unique reference ID for the submitted feedback."),
  category: z.string().describe("The category of the feedback (e.g., 'Bug Report', 'Feature Request', 'General Comment')."),
});
export type SubmitFeedbackOutput = z.infer<typeof SubmitFeedbackOutputSchema>;

export async function submitFeedback(input: SubmitFeedbackInput): Promise<SubmitFeedbackOutput> {
  return submitFeedbackFlow(input);
}

const prompt = ai.definePrompt({
  name: 'submitFeedbackPrompt',
  input: {schema: SubmitFeedbackInputSchema},
  output: {schema: SubmitFeedbackOutputSchema},
  prompt: `You are a feedback processing agent for an agricultural app called Khet2Kitchen.

A user of type '{{{userType}}}' has submitted the following feedback:
"{{{feedbackText}}}"

Your tasks are:
1. Generate a unique reference ID for this feedback. A good format would be "K2K-FB-[Timestamp]".
2. Categorize the feedback into one of the following: 'Bug Report', 'Feature Request', 'General Comment', 'Praise'.
3. Set the status to "Received".

Return the result in the specified output format.
`,
});

const submitFeedbackFlow = ai.defineFlow(
  {
    name: 'submitFeedbackFlow',
    inputSchema: SubmitFeedbackInputSchema,
    outputSchema: SubmitFeedbackOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    // In a real app, you would save this to a database.
    return output!;
  }
);
