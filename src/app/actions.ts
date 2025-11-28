'use server';

import { getMotivationalMessage as getMotivationalMessageFlow } from '@/ai/flows/motivational-task-messages';

export async function getMotivationalMessage(taskName: string, userName: string) {
  // We fake the progress to get more varied messages
  const taskProgress = Math.floor(Math.random() * 81) + 10; // Random progress between 10 and 90

  try {
    const result = await getMotivationalMessageFlow({
      taskName,
      userName,
      taskProgress,
    });
    return result.message;
  } catch (error) {
    console.error('Error getting motivational message:', error);
    // Return a default encouraging message on error
    return "Отличная работа! Продолжайте в том же духе!";
  }
}
