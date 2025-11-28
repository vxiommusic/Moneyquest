"use client";

import { useMemo, useState, useEffect } from 'react';
import type { Trade } from '@/lib/types';
import useLocalStorage from '@/hooks/use-local-storage';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { format } from 'date-fns';
import { Skeleton } from '@/components/ui/skeleton';
import { TrendingUp, TrendingDown, Scale, CalendarDays } from 'lucide-react';

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border bg-background/90 p-3 shadow-lg backdrop-blur-sm">
        <p className="label font-bold text-primary">{`${format(new Date(label), 'dd MMM yyyy')}`}</p>
        <p className="intro text-green-400">{`Прибыль: ${payload[0].value.toFixed(2)}`}</p>
      </div>
    );
  }
  return null;
};

const TradingChart = ({ data }: { data: { date: string; profit: number }[] }) => {
  if (data.length === 0) {
      return (
          <div className="flex items-center justify-center h-full text-muted-foreground">
              Нет данных для отображения графика
          </div>
      )
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
        <defs>
          <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
            <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <XAxis 
            dataKey="date" 
            tickFormatter={(str) => format(new Date(str), 'dd MMM')} 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
        />
        <YAxis 
            stroke="hsl(var(--muted-foreground))"
            fontSize={12}
            tickFormatter={(value) => `$${value}`}
        />
        <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
        <Tooltip content={<CustomTooltip />} />
        <Area 
            type="monotone" 
            dataKey="profit" 
            stroke="hsl(var(--primary))"
            strokeWidth={2}
            fillOpacity={1} 
            fill="url(#colorProfit)" 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};


const StatCard = ({ title, value, icon: Icon, description }: { title: string, value: string | number, icon: React.ElementType, description: string }) => (
    <Card className="bg-card/50 backdrop-blur-sm transition-all hover:bg-card/70">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
            <Icon className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
            <div className="text-2xl font-bold">{value}</div>
            <p className="text-xs text-muted-foreground">{description}</p>
        </CardContent>
    </Card>
)

export default function DashboardPage() {
  const [trades] = useLocalStorage<Trade[]>('moneyquest-trades', []);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const { totalTrades, profitableTrades, unprofitableTrades, chartData, winRate } = useMemo(() => {
    const sortedTrades = [...trades].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
    
    let cumulativeProfit = 0;
    const dataForChart = sortedTrades.map(trade => {
        cumulativeProfit += trade.result;
        return {
            date: new Date(trade.date).toISOString(),
            profit: cumulativeProfit
        };
    });

    const profitable = sortedTrades.filter(t => t.result > 0).length;
    const unprofitable = sortedTrades.filter(t => t.result <= 0).length;
    const total = sortedTrades.length;
    const rate = total > 0 ? ((profitable / total) * 100).toFixed(0) : 0;

    return {
        totalTrades: total,
        profitableTrades: profitable,
        unprofitableTrades: unprofitable,
        chartData: dataForChart,
        winRate: `${rate}%`,
    };
  }, [trades]);

  if (!isClient) {
    return (
      <div className="w-full max-w-7xl mx-auto">
        <header className="mb-6">
            <Skeleton className="h-10 w-64" />
            <Skeleton className="h-4 w-80 mt-2" />
        </header>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Skeleton className="h-[108px]" />
            <Skeleton className="h-[108px]" />
            <Skeleton className="h-[108px]" />
            <Skeleton className="h-[108px]" />
        </div>
        <div className="mt-6">
            <Skeleton className="h-[350px]" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-7xl mx-auto">
        <header className="mb-6">
            <h1 className="text-4xl font-bold text-primary tracking-tighter">Dashboard</h1>
            <p className="text-muted-foreground">Обзор вашей производительности.</p>
        </header>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <StatCard title="Всего сделок" value={totalTrades} icon={Scale} description="Общее количество за все время" />
            <StatCard title="Прибыльные" value={profitableTrades} icon={TrendingUp} description="Сделки с положительным результатом" />
            <StatCard title="Убыточные" value={unprofitableTrades} icon={TrendingDown} description="Сделки с отрицательным результатом" />
            <StatCard title="Винрейт" value={winRate} icon={CalendarDays} description="Процент прибыльных сделок" />
        </div>
        
        <Card className="mt-6 shadow-lg bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle>График доходности</CardTitle>
            </CardHeader>
            <CardContent className="h-[350px] p-2">
                <TradingChart data={chartData} />
            </CardContent>
        </Card>
    </div>
  );
}
