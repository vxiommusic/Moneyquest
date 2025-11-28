"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ShieldCheck, Star, Heart } from 'lucide-react';
import { cn } from '@/lib/utils';

type ChecklistItem = {
  id: number;
  icon: string;
  title: string;
  question: string;
  xp: number;
  hp: number;
};

const checklistItems: ChecklistItem[] = [
  { id: 1, icon: '⚖️', title: 'Щит Разума — Проверка Риска', question: 'Мой риск в сделке 2%?', xp: 10, hp: -40 },
  { id: 2, icon: '📜', title: 'Свиток Знаний — Основания Для Входа', question: 'Есть ли минимум все подтверждения сетапа?', xp: 10, hp: -25 },
  { id: 3, icon: '🎯', title: 'Выстрел Снайпера — Качество Входа', question: 'Стоп расположен логично и близко?', xp: 5, hp: -15 },
  { id: 4, icon: '⛔', title: 'Печать Безопасности — Стоп-Лосс', question: 'Стоп-лосс установлен?', xp: 5, hp: -50 },
  { id: 5, icon: '📔', title: 'Книга Судьбы — Дневник', question: 'Заполню ли дневник после сделки?', xp: 15, hp: -20 },
];

interface BattleChecklistProps {
  onResult: (xp: number, hp: number) => void;
}

export function BattleChecklist({ onResult }: BattleChecklistProps) {
  const [answered, setAnswered] = useState<Record<number, 'yes' | 'no' | null>>({});

  const handleAnswer = (item: ChecklistItem, answer: 'yes' | 'no') => {
    if (answered[item.id]) return;

    setAnswered(prev => ({ ...prev, [item.id]: answer }));

    if (answer === 'yes') {
      onResult(item.xp, 0);
    } else {
      onResult(0, item.hp);
    }
  };

  const handleReset = () => {
    setAnswered({});
  };

  const allAnswered = Object.keys(answered).length === checklistItems.length;

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <ShieldCheck size={24} className="text-primary" />
          Боевой Чек-лист
        </CardTitle>
        <CardDescription>Проверьте готовность к сделке перед входом.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {checklistItems.map(item => {
          const answer = answered[item.id];
          return (
            <div key={item.id} className="p-4 rounded-lg bg-card border">
              <div className="flex items-start gap-4">
                <div className="text-2xl pt-1">{item.icon}</div>
                <div className="flex-1">
                  <h4 className="font-semibold">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.question}</p>
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-3">
                <Button
                  size="sm"
                  variant={answer === 'yes' ? 'default' : 'outline'}
                  className={cn(
                    "w-20",
                    answer && answer !== 'yes' && "opacity-50"
                  )}
                  onClick={() => handleAnswer(item, 'yes')}
                  disabled={!!answer}
                >
                  <Star className="mr-1 h-4 w-4 text-accent" />
                  ДА
                </Button>
                <Button
                  size="sm"
                  variant={answer === 'no' ? 'destructive' : 'outline'}
                  className={cn(
                    "w-20",
                    answer && answer !== 'no' && "opacity-50"
                  )}
                  onClick={() => handleAnswer(item, 'no')}
                  disabled={!!answer}
                >
                  <Heart className="mr-1 h-4 w-4" />
                  НЕТ
                </Button>
              </div>
            </div>
          );
        })}
        {allAnswered && (
          <Button onClick={handleReset} variant="secondary" className="w-full mt-4">
            Следующая сделка
          </Button>
        )}
      </CardContent>
    </Card>
  );
}
