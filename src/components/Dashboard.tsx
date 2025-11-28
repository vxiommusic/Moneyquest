"use client";

import React, { useState, useEffect, useCallback } from 'react';
import type { User, Task, Reward, FloatingText } from '@/lib/types';
import { initialUser, initialTasks, initialRewards } from '@/lib/data';
import useLocalStorage from '@/hooks/use-local-storage';
import { CharacterCard } from './CharacterCard';
import { TaskList } from './TaskList';
import { RewardsSection } from './RewardsSection';
import { MotivationalPopup } from './MotivationalPopup';
import { getMotivationalMessage } from '@/app/actions';
import { isToday, isThisWeek, isThisMonth, parseISO } from 'date-fns';
import { ClientCharacterCard } from './ClientCharacterCard';

export function Dashboard() {
  const [user, setUser] = useLocalStorage<User>('questify-user', initialUser);
  const [tasks, setTasks] = useLocalStorage<Task[]>('questify-tasks', initialTasks);
  const [rewards, setRewards] = useLocalStorage<Reward[]>('questify-rewards', initialRewards);
  const [lastReset, setLastReset] = useLocalStorage<{ daily: string, weekly: string, monthly: string }>('questify-last-reset', { daily: '', weekly: '', monthly: '' });

  const [motivationalMessage, setMotivationalMessage] = useState('');
  const [floatingTexts, setFloatingTexts] = useState<FloatingText[]>([]);

  const addFloatingText = (value: string, color: string) => {
    setFloatingTexts(prev => [...prev, { id: Date.now(), value, color, left: 50, top: 50 }]);
  };

  const resetTasks = useCallback(() => {
    const today = new Date();
    let madeChanges = false;
    const newTasks = tasks.map(task => {
      const taskDate = parseISO(task.dueDate);
      if (task.type === 'daily' && lastReset.daily !== today.toDateString()) {
        task.completed = false;
        madeChanges = true;
      }
      if (task.type === 'weekly' && (!lastReset.weekly || !isThisWeek(parseISO(lastReset.weekly)))) {
         task.completed = false;
         madeChanges = true;
      }
      if (task.type === 'monthly' && (!lastReset.monthly || !isThisMonth(parseISO(lastReset.monthly)))) {
        task.completed = false;
        madeChanges = true;
      }
      return task;
    });

    if(madeChanges) {
      setTasks(newTasks);
      setLastReset({
        daily: today.toDateString(),
        weekly: today.toISOString(),
        monthly: today.toISOString(),
      });
    }

  }, [tasks, lastReset, setTasks, setLastReset]);

  useEffect(() => {
    resetTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const checkRewardAvailability = () => {
      const activeTasks = tasks.filter(t => !t.completed);
      const weeklyTasks = activeTasks.filter(t => t.type === 'weekly');
      const monthlyTasks = activeTasks.filter(t => t.type === 'monthly');

      setRewards(prev => prev.map(r => {
        if (r.type === 'weekly') {
          return { ...r, claimable: weeklyTasks.length === 0 };
        }
        if (r.type === 'monthly') {
          return { ...r, claimable: monthlyTasks.length === 0 };
        }
        return r;
      }));
    };
    checkRewardAvailability();
  }, [tasks, setRewards]);

  const handleLevelUp = (currentUser: User, currentXp: number): User => {
    const newLevel = currentUser.level + 1;
    addFloatingText('Новый уровень!', 'text-yellow-400');
    return {
      ...currentUser,
      level: newLevel,
      xp: currentXp - currentUser.xpToNextLevel,
      xpToNextLevel: Math.floor(currentUser.xpToNextLevel * 1.5),
      hp: currentUser.maxHp, // Full heal on level up
    };
  };

  const handleCompleteTask = async (taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;

    setTasks(tasks.map(t => (t.id === taskId ? { ...t, completed: true } : t)));

    let newXp = user.xp + task.xp;
    addFloatingText(`+${task.xp} ОП`, 'text-accent');
    
    let updatedUser = { ...user };

    if (newXp >= user.xpToNextLevel) {
      updatedUser = handleLevelUp(user, newXp);
    } else {
      updatedUser.xp = newXp;
    }
    setUser(updatedUser);

    const message = await getMotivationalMessage(task.title, user.name);
    setMotivationalMessage(message);
    setTimeout(() => setMotivationalMessage(''), 5000);
  };

  const handleAddTask = (newTask: Omit<Task, 'id' | 'completed'>) => {
    const taskToAdd: Task = {
      ...newTask,
      id: Date.now().toString(),
      completed: false,
    };
    setTasks([...tasks, taskToAdd]);
  };

  const handleClaimReward = (rewardId: string) => {
    const reward = rewards.find(r => r.id === rewardId);
    if (!reward || reward.claimed || !reward.claimable) return;

    setRewards(rewards.map(r => r.id === rewardId ? {...r, claimed: true} : r));
    
    let newXp = user.xp + reward.xp;
    addFloatingText(`+${reward.xp} ОП`, 'text-accent');
    
    let updatedUser = { ...user };
    if (newXp >= user.xpToNextLevel) {
      updatedUser = handleLevelUp(user, newXp);
    } else {
      updatedUser.xp = newXp;
    }
    setUser(updatedUser);
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-primary tracking-tighter">Квестифай</h1>
        <p className="text-muted-foreground">Ваше эпическое путешествие к продуктивности начинается сейчас!</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <aside className="lg:col-span-1 space-y-6">
          <ClientCharacterCard user={user} floatingTexts={floatingTexts} setFloatingTexts={setFloatingTexts} />
          <RewardsSection rewards={rewards} onClaimReward={handleClaimReward} />
        </aside>

        <section className="lg:col-span-2">
          <TaskList
            tasks={tasks}
            onCompleteTask={handleCompleteTask}
            onAddTask={handleAddTask}
          />
        </section>
      </div>
      
      <MotivationalPopup message={motivationalMessage} />
    </div>
  );
}