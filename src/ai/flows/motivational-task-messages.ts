'use server';

/**
 * @fileOverview A motivational task message generator.
 *
 * - getMotivationalMessage - A function that returns a motivational message.
 * - MotivationalMessageInput - The input type for the getMotivationalMessage function.
 * - MotivationalMessageOutput - The return type for the getMotivationalMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const MotivationalMessageInputSchema = z.object({
  taskProgress: z
    .number()
    .describe(
      'The current progress of the task represented as a number between 0 and 100.'
    ),
  taskName: z.string().describe('The name of the task.'),
  userName: z.string().describe('The name of the user.'),
});

export type MotivationalMessageInput = z.infer<
  typeof MotivationalMessageInputSchema
>;

const MotivationalMessageOutputSchema = z.object({
  message: z.string().describe('The motivational message for the user.'),
});

export type MotivationalMessageOutput = z.infer<
  typeof MotivationalMessageOutputSchema
>;

export async function getMotivationalMessage(
  input: MotivationalMessageInput
): Promise<MotivationalMessageOutput> {
  return motivationalMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'motivationalMessagePrompt',
  input: {schema: MotivationalMessageInputSchema},
  output: {schema: MotivationalMessageOutputSchema},
  prompt: `You are a motivational assistant that provides encouraging messages to users based on their task progress.

  Craft a short, dynamic motivational message (under 50 words) to encourage the user {{userName}} to complete the task "{{taskName}}".
  The user's current progress is {{taskProgress}}%.

  Here are some example prompts:
  - Task Progress: 25%, Task Name: "Write first chapter", User Name: "Alice" -> "Keep the momentum going, Alice! You've already written 25% of the first chapter. Imagine the satisfaction of completing it!"
  - Task Progress: 75%, Task Name: "Design character card", User Name: "Bob" -> "You're almost there, Bob! 75% of the character card is designed. A few more tweaks and your Questify adventure can begin!"
  - Task Progress: 50%, Task Name: "Implement reward system", User Name: "Charlie" -> "Halfway there, Charlie! You're halfway through implementing the reward system. Rewards are just around the corner!"
  `,
});

const motivationalMessageFlow = ai.defineFlow(
  {
    name: 'motivationalMessageFlow',
    inputSchema: MotivationalMessageInputSchema,
    outputSchema: MotivationalMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

