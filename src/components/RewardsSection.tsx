"use client";

import React from 'react';
import type { Reward } from '@/lib/types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Gift, Trophy, CheckCircle2 } from 'lucide-react';
import { Badge } from './ui/badge';
import { Star } from 'lucide-react';

interface RewardsSectionProps {
  rewards: Reward[];
  onClaimReward: (rewardId: string) => void;
}

const RewardCard = ({ reward, onClaimReward }: { reward: Reward, onClaimReward: (id: string) => void }) => {
  const isClaimable = reward.claimable && !reward.claimed;

  return (
    <div className="group relative">
       <div className={`absolute -inset-1 rounded-lg bg-gradient-to-r from-amber-500 to-orange-600 opacity-0 blur transition duration-500 group-hover:opacity-75 ${isClaimable ? 'opacity-75 animate-pulse' : ''}`}></div>
      <Card className="relative flex flex-col sm:flex-row items-center justify-between p-4 transition-all transform group-hover:scale-[1.03]">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg ${isClaimable ? 'bg-accent/20' : 'bg-muted'}`}>
            <Trophy size={24} className={isClaimable ? 'text-accent' : 'text-muted-foreground'} />
          </div>
          <div>
            <h3 className="font-semibold">{reward.title}</h3>
            <p className="text-sm text-muted-foreground">{reward.description}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 mt-4 sm:mt-0">
          <Badge variant="secondary" className="bg-accent/20 text-accent-foreground border-accent/30">
            <Star size={12} className="mr-1 text-accent" />
            {reward.xp} XP
          </Badge>
          <Button
            onClick={() => onClaimReward(reward.id)}
            disabled={!isClaimable}
            size="sm"
            className="w-28"
          >
            {reward.claimed ? (
              <>
                <CheckCircle2 size={16} className="mr-2" /> Claimed
              </>
            ) : "Claim"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export function RewardsSection({ rewards, onClaimReward }: RewardsSectionProps) {
  const dailyRewards = rewards.filter(r => r.type === 'daily');
  const weeklyRewards = rewards.filter(r => r.type === 'weekly');
  const monthlyRewards = rewards.filter(r => r.type === 'monthly');

  const renderRewardList = (rewardList: Reward[]) => (
    <div className="space-y-3">
      {rewardList.map(reward => (
        <RewardCard key={reward.id} reward={reward} onClaimReward={onClaimReward} />
      ))}
    </div>
  );

  return (
    <Card className="shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl font-bold flex items-center gap-2">
          <Gift size={24} className="text-primary" />
          Rewards
        </CardTitle>
        <CardDescription>Claim rewards for your hard work and dedication.</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="daily">
          <TabsList className="grid w-full grid-cols-3 mb-4">
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
          </TabsList>
          <TabsContent value="daily">{renderRewardList(dailyRewards)}</TabsContent>
          <TabsContent value="weekly">{renderRewardList(weeklyRewards)}</TabsContent>
          <TabsContent value="monthly">{renderRewardList(monthlyRewards)}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
