export type User = {
  name: string;
  avatar: string;
  level: number;
  hp: number;
  maxHp: number;
  xp: number;
  xpToNextLevel: number;
};

export type Task = {
  id: string;
  title: string;
  description: string;
  xp: number;
  hpDamage: number; 
  dueDate: string;
  completed: boolean;
  type: 'daily' | 'weekly' | 'monthly' | 'one-time';
};

export type Reward = {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  xp: number;
  claimed: boolean;
  claimable: boolean;
};

export type FloatingText = {
  id: number;
  value: string;
  color: string;
  left: number;
  top: number;
};

export type Trade = {
  id: string;
  date: Date;
  instrument: string;
  positionType: "long" | "short";
  volume: number;
  entryPoint: number;
  exitPoint: number;
  result: number;
  screenshot?: string;
  comment?: string;
};
