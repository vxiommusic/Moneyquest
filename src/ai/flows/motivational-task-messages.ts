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
  prompt: `Вы — помощник-мотиватор, который отправляет пользователям ободряющие сообщения в зависимости от их прогресса в выполнении задач.

  Создайте короткое, динамичное мотивационное сообщение (до 50 слов), чтобы побудить пользователя {{userName}} выполнить задачу «{{taskName}}».
  Текущий прогресс пользователя составляет {{taskProgress}}%.

  Сообщения должны быть на русском языке.

  Вот несколько примеров:
  - Task Progress: 25%, Task Name: "Написать первую главу", User Name: "Алиса" -> "Так держать, Алиса! Ты уже написала 25% первой главы. Представь, какое удовлетворение ты получишь, когда закончишь!"
  - Task Progress: 75%, Task Name: "Разработать карточку персонажа", User Name: "Боб" -> "Ты почти у цели, Боб! 75% карточки персонажа уже готово. Еще несколько штрихов, и твое приключение в Квестифай начнется!"
  - Task Progress: 50%, Task Name: "Реализовать систему наград", User Name: "Чарли" -> "Полпути позади, Чарли! Ты на полпути к реализации системы наград. Награды уже не за горами!"
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
