"use client";

import React from 'react';
import { Card, CardContent } from './ui/card';
import { Sparkles } from 'lucide-react';

interface MotivationalPopupProps {
  message: string;
}

export function MotivationalPopup({ message }: MotivationalPopupProps) {
  if (!message) {
    return null;
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 animate-in fade-in slide-in-from-bottom-10 duration-500">
      <Card className="bg-primary text-primary-foreground border-accent shadow-2xl">
        <CardContent className="p-4 flex items-start gap-3">
          <Sparkles className="h-6 w-6 text-accent mt-1" />
          <div>
            <h4 className="font-bold">A word of encouragement!</h4>
            <p className="text-sm opacity-90">{message}</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
