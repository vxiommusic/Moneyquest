import type { User, Task, Reward } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { addDays, addWeeks, formatISO } from 'date-fns';

const today = new Date();

export const initialUser: User = {
  name: 'Valerius',
  avatar: PlaceHolderImages.find(img => img.id === 'user-avatar')?.imageUrl || '',
  level: 1,
  hp: 85,
  maxHp: 100,
  xp: 30,
  xpToNextLevel: 100,
};

export const initialTasks: Task[] = [
  {
    id: '1',
    title: 'Morning Run',
    description: 'Complete a 30-minute run to start the day.',
    xp: 20,
    hpDamage: 5,
    dueDate: formatISO(today),
    completed: false,
    type: 'daily',
  },
  {
    id: '2',
    title: 'Read a Chapter',
    description: 'Read one chapter of a book.',
    xp: 10,
    hpDamage: 5,
    dueDate: formatISO(today),
    completed: true,
    type: 'daily',
  },
  {
    id: '3',
    title: 'Weekly Project Sync',
    description: 'Sync up with the team on the weekly project.',
    xp: 30,
    hpDamage: 10,
    dueDate: formatISO(addDays(today, 2)),
    completed: false,
    type: 'weekly',
  },
    {
    id: '4',
    title: 'Grocery Shopping',
    description: 'Buy groceries for the week.',
    xp: 25,
    hpDamage: 0,
    dueDate: formatISO(addWeeks(today, 1)),
    completed: false,
    type: 'weekly',
  },
  {
    id: '5',
    title: 'Design New Character',
    description: 'Sketch and finalize the new game character design.',
    xp: 150,
    hpDamage: 0,
    dueDate: formatISO(addDays(today, 10)),
    completed: false,
    type: 'one-time',
  },
   {
    id: '6',
    title: 'Monthly Report',
    description: 'Prepare and submit the monthly performance report.',
    xp: 100,
    hpDamage: 15,
    dueDate: formatISO(addDays(today, 20)),
    completed: false,
    type: 'monthly',
  },
];

export const initialRewards: Reward[] = [
  {
    id: 'reward-daily-1',
    title: 'Daily Check-in',
    description: 'Log in and claim your daily reward.',
    type: 'daily',
    xp: 10,
    claimed: false,
    claimable: true
  },
  {
    id: 'reward-weekly-1',
    title: 'Weekly Warrior',
    description: 'Complete all weekly quests.',
    type: 'weekly',
    xp: 100,
    claimed: false,
    claimable: false
  },
  {
    id: 'reward-monthly-1',
    title: 'Month of Mastery',
    description: 'Complete all monthly quests.',
    type: 'monthly',
    xp: 500,
    claimed: false,
    claimable: false
  },
];
