"use client";

import React, { useState, useEffect } from 'react';
import type { User, FloatingText } from '@/lib/types';
import { CharacterCard } from './CharacterCard';
import { Skeleton } from './ui/skeleton';

interface ClientCharacterCardProps {
  user: User;
  floatingTexts: FloatingText[];
  setFloatingTexts: React.Dispatch<React.SetStateAction<FloatingText[]>>;
}

export function ClientCharacterCard({ user, floatingTexts, setFloatingTexts }: ClientCharacterCardProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-[280px] w-full rounded-lg" />
      </div>
    );
  }

  return <CharacterCard user={user} floatingTexts={floatingTexts} setFloatingTexts={setFloatingTexts} />;
}
