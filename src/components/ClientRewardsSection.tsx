"use client";

import React, { useState, useEffect } from 'react';
import type { Reward } from '@/lib/types';
import { RewardsSection } from './RewardsSection';
import { Skeleton } from './ui/skeleton';

interface ClientRewardsSectionProps {
  rewards: Reward[];
  onClaimReward: (rewardId: string) => void;
}

export function ClientRewardsSection({ rewards, onClaimReward }: ClientRewardsSectionProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
        <Skeleton className="h-[400px] w-full rounded-lg" />
    );
  }

  return <RewardsSection rewards={rewards} onClaimReward={onClaimReward} />;
}
