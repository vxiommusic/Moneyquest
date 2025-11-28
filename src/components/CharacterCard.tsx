"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import type { User, FloatingText } from '@/lib/types';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';
import { Heart, Star, Shield } from 'lucide-react';

interface CharacterCardProps {
  user: User;
  floatingTexts: FloatingText[];
  setFloatingTexts: React.Dispatch<React.SetStateAction<FloatingText[]>>;
}

export function CharacterCard({ user, floatingTexts, setFloatingTexts }: CharacterCardProps) {
  
  useEffect(() => {
    const timers = floatingTexts.map(ft => 
      setTimeout(() => {
        setFloatingTexts(prev => prev.filter(p => p.id !== ft.id));
      }, 2000)
    );
    return () => timers.forEach(clearTimeout);
  }, [floatingTexts, setFloatingTexts]);

  const xpPercentage = (user.xp / user.xpToNextLevel) * 100;
  const hpPercentage = (user.hp / user.maxHp) * 100;

  return (
    <Card className="overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300">
      <CardHeader className="p-0">
         <div className="bg-primary/20 p-6 flex flex-col items-center text-center relative">
          <div className="absolute top-4 right-4 flex items-center gap-2 bg-primary/80 text-primary-foreground px-3 py-1 rounded-full text-sm font-bold">
            <Shield size={16} />
            <span>Уровень {user.level}</span>
          </div>
          <Avatar className="w-24 h-24 border-4 border-background shadow-md mb-3">
            <AvatarImage src={user.avatar} alt={user.name} data-ai-hint="fantasy character" />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <CardTitle className="text-2xl font-bold text-primary-foreground">{user.name}</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-6 space-y-4 relative">
        {floatingTexts.map(ft => (
          <div
            key={ft.id}
            className={`absolute font-bold text-lg animate-fade-out-up ${ft.color}`}
            style={{ left: `${ft.left}%`, top: `${ft.top}%` }}
          >
            {ft.value}
          </div>
        ))}

        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <div className="flex items-center gap-2 text-red-500">
              <Heart size={16} />
              <span>ОЗ</span>
            </div>
            <span>{user.hp} / {user.maxHp}</span>
          </div>
          <Progress value={hpPercentage} className="h-3 [&>div]:bg-red-500" />
        </div>
        
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm font-medium">
            <div className="flex items-center gap-2 text-accent">
              <Star size={16} />
              <span>ОП</span>
            </div>
            <span>{user.xp} / {user.xpToNextLevel}</span>
          </div>
          <Progress value={xpPercentage} className="h-3 [&>div]:bg-accent" />
        </div>
      </CardContent>
    </Card>
  );
}

// Add animation keyframes to a global CSS or tailwind.config.js
// For now, adding a style tag for simplicity.
// In globals.css:
/*
@keyframes fade-out-up {
  from {
    opacity: 1;
    transform: translateY(0);
  }
  to {
    opacity: 0;
    transform: translateY(-20px);
  }
}
.animate-fade-out-up {
  animation: fade-out-up 2s ease-out forwards;
}
*/
// We'll add this to tailwind config instead
