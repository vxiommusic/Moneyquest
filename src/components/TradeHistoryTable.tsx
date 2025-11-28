"use client";

import React from 'react';
import type { Trade } from '@/lib/types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import Image from 'next/image';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight, Image as ImageIcon, Trash2 } from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";


interface TradeHistoryTableProps {
  trades: Trade[];
  onDeleteTrade: (tradeId: string) => void;
}

export function TradeHistoryTable({ trades, onDeleteTrade }: TradeHistoryTableProps) {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Дата</TableHead>
            <TableHead>Инструмент</TableHead>
            <TableHead>Тип</TableHead>
            <TableHead>Объём</TableHead>
            <TableHead>Вход</TableHead>
            <TableHead>Выход</TableHead>
            <TableHead>Итог</TableHead>
            <TableHead className="text-right">Действия</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trades.map((trade) => (
            <TableRow key={trade.id}>
              <TableCell>{format(new Date(trade.date), 'dd.MM.yyyy')}</TableCell>
              <TableCell className="font-medium">{trade.instrument}</TableCell>
              <TableCell>
                <Badge variant={trade.positionType === 'long' ? 'secondary' : 'destructive'} className={cn(
                  trade.positionType === 'long' ? 'bg-green-500/10 text-green-700 dark:text-green-400 border-green-500/20' : 'bg-red-500/10 text-red-700 dark:text-red-400 border-red-500/20'
                )}>
                  {trade.positionType === 'long' ? <ArrowUpRight className="mr-1 h-3 w-3" /> : <ArrowDownRight className="mr-1 h-3 w-3" />}
                  {trade.positionType === 'long' ? 'Лонг' : 'Шорт'}
                </Badge>
              </TableCell>
              <TableCell>{trade.volume}</TableCell>
              <TableCell>{trade.entryPoint.toFixed(2)}</TableCell>
              <TableCell>{trade.exitPoint.toFixed(2)}</TableCell>
              <TableCell
                className={cn(
                  'font-semibold',
                  trade.result >= 0 ? 'text-green-600' : 'text-red-600'
                )}
              >
                {trade.result.toFixed(2)}
              </TableCell>
              <TableCell className="text-right">
                <div className="flex items-center justify-end gap-2">
                    {trade.screenshot && (
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button variant="ghost" size="icon">
                                            <ImageIcon className="h-4 w-4" />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent className="max-w-4xl">
                                        <AlertDialogHeader>
                                        <AlertDialogTitle>Скриншот сделки</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            {trade.instrument} - {format(new Date(trade.date), 'PPP', { locale: ru })}
                                        </AlertDialogDescription>
                                        </AlertDialogHeader>
                                        <div className="max-h-[70vh] overflow-auto rounded-md">
                                            <Image src={trade.screenshot} alt={`Скриншот для ${trade.instrument}`} width={1200} height={800} style={{width: '100%', height: 'auto'}} />
                                        </div>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Закрыть</AlertDialogCancel>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                                </TooltipTrigger>
                                <TooltipContent>
                                    <p>Посмотреть скриншот</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    )}
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                            <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon" className="text-red-500 hover:text-red-500 hover:bg-red-500/10">
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                    <AlertDialogTitle>Вы уверены?</AlertDialogTitle>
                                    <AlertDialogDescription>
                                        Это действие нельзя отменить. Это навсегда удалит запись о сделке.
                                    </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                    <AlertDialogCancel>Отмена</AlertDialogCancel>
                                    <AlertDialogAction onClick={() => onDeleteTrade(trade.id)} className="bg-destructive hover:bg-destructive/90">Удалить</AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                            </TooltipTrigger>
                            <TooltipContent>
                                <p>Удалить сделку</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
