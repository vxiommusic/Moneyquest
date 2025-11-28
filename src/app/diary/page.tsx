"use client";

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TradeForm } from '@/components/TradeForm';
import { TradeHistoryTable } from '@/components/TradeHistoryTable';
import type { Trade } from '@/lib/types';
import useLocalStorage from '@/hooks/use-local-storage';

export default function DiaryPage() {
  const [trades, setTrades] = useLocalStorage<Trade[]>('moneyquest-trades', []);

  const addTrade = (tradeData: Omit<Trade, 'id'>) => {
    const newTrade: Trade = {
      ...tradeData,
      id: Date.now().toString(),
    };
    setTrades(prevTrades => [newTrade, ...prevTrades]);
  };
    
  const deleteTrade = (tradeId: string) => {
    setTrades(prevTrades => prevTrades.filter(trade => trade.id !== tradeId));
  };

  return (
    <div className="w-full max-w-7xl mx-auto">
      <header className="mb-6">
        <h1 className="text-4xl font-bold text-primary tracking-tighter">Дневник</h1>
        <p className="text-muted-foreground">Записывайте свои мысли и анализируйте сделки.</p>
      </header>
      <div className="grid grid-cols-1 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Информация о сделке</CardTitle>
          </CardHeader>
          <CardContent>
            <TradeForm onSaveTrade={addTrade} />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>История сделок</CardTitle>
          </CardHeader>
          <CardContent>
            {trades.length > 0 ? (
                <TradeHistoryTable trades={trades} onDeleteTrade={deleteTrade} />
            ) : (
                <p>Здесь будет отображаться история ваших сделок.</p>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
