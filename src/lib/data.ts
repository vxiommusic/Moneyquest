import type { User, Task, Reward } from './types';
import { PlaceHolderImages } from './placeholder-images';
import { addDays, addWeeks, formatISO } from 'date-fns';

const today = new Date();

export const initialUser: User = {
  name: 'Валериус',
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
    title: 'Утренняя пробежка',
    description: 'Совершите 30-минутную пробежку, чтобы начать день.',
    xp: 20,
    hpDamage: 5,
    dueDate: formatISO(today),
    completed: false,
    type: 'daily',
  },
  {
    id: '2',
    title: 'Прочитать главу',
    description: 'Прочитайте одну главу книги.',
    xp: 10,
    hpDamage: 5,
    dueDate: formatISO(today),
    completed: true,
    type: 'daily',
  },
  {
    id: '3',
    title: 'Еженедельная синхронизация по проекту',
    description: 'Синхронизируйтесь с командой по еженедельному проекту.',
    xp: 30,
    hpDamage: 10,
    dueDate: formatISO(addDays(today, 2)),
    completed: false,
    type: 'weekly',
  },
    {
    id: '4',
    title: 'Поход за продуктами',
    description: 'Купите продукты на неделю.',
    xp: 25,
    hpDamage: 0,
    dueDate: formatISO(addWeeks(today, 1)),
    completed: false,
    type: 'weekly',
  },
  {
    id: '5',
    title: 'Разработать нового персонажа',
    description: 'Нарисуйте и завершите дизайн нового игрового персонажа.',
    xp: 150,
    hpDamage: 0,
    dueDate: formatISO(addDays(today, 10)),
    completed: false,
    type: 'one-time',
  },
   {
    id: '6',
    title: 'Ежемесячный отчет',
    description: 'Подготовьте и отправьте ежемесячный отчет о производительности.',
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
    title: 'Ежедневный вход',
    description: 'Войдите и получите свою ежедневную награду.',
    type: 'daily',
    xp: 10,
    claimed: false,
    claimable: true
  },
  {
    id: 'reward-weekly-1',
    title: 'Воин недели',
    description: 'Выполните все еженедельные квесты.',
    type: 'weekly',
    xp: 100,
    claimed: false,
    claimable: false
  },
  {
    id: 'reward-monthly-1',
    title: 'Мастер месяца',
    description: 'Выполните все ежемесячные квесты.',
    type: 'monthly',
    xp: 500,
    claimed: false,
    claimable: false
  },
];
