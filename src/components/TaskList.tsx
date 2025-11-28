"use client";

import React, from 'react';
import type { Task } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { PlusCircle, Star, Heart, Calendar } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { AddTaskDialog } from './AddTaskDialog';

interface TaskListProps {
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

const TaskCard = ({ task, onCompleteTask }: { task: Task, onCompleteTask: (id: string) => void }) => (
  <Card className={`transition-all duration-300 ${task.completed ? 'bg-muted/50 border-dashed' : 'bg-card'}`}>
    <CardHeader className="flex flex-row items-start gap-4 space-y-0 p-4">
      <Checkbox
        id={`task-${task.id}`}
        checked={task.completed}
        onCheckedChange={() => !task.completed && onCompleteTask(task.id)}
        className="mt-1"
        aria-label={`Mark ${task.title} as complete`}
      />
      <div className="flex-1 grid gap-1.5">
        <CardTitle className={`text-lg ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
          {task.title}
        </CardTitle>
        <CardDescription className={`${task.completed ? 'line-through text-muted-foreground' : ''}`}>
          {task.description}
        </CardDescription>
      </div>
    </CardHeader>
    <CardFooter className="flex justify-between items-center p-4 pt-0">
      <div className="flex items-center gap-1 text-xs text-muted-foreground">
        <Calendar size={14} />
        <span>Due: {format(parseISO(task.dueDate), 'MMM d, yyyy')}</span>
      </div>
      <div className="flex gap-2">
        <Badge variant="secondary" className="bg-accent/20 text-accent-foreground border-accent/30">
          <Star size={12} className="mr-1 text-accent" />
          {task.xp} XP
        </Badge>
        {task.hpDamage > 0 && (
          <Badge variant="destructive" className="bg-red-500/10 text-red-700 border-red-500/20 dark:text-red-400">
            <Heart size={12} className="mr-1 text-red-500" />
            -{task.hpDamage} HP
          </Badge>
        )}
      </div>
    </CardFooter>
  </Card>
);

export function TaskList({ tasks, onCompleteTask, onAddTask }: TaskListProps) {
  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const oneTimeQuests = activeTasks.filter(t => t.type === 'one-time');
  const dailyQuests = activeTasks.filter(t => t.type === 'daily');
  const weeklyQuests = activeTasks.filter(t => t.type === 'weekly');
  const monthlyQuests = activeTasks.filter(t => t.type === 'monthly');

  const renderTaskList = (taskList: Task[], emptyMessage: string) => (
    taskList.length > 0 ? (
      <div className="space-y-4">
        {taskList.map(task => (
          <TaskCard key={task.id} task={task} onCompleteTask={onCompleteTask} />
        ))}
      </div>
    ) : (
      <div className="text-center py-10 border-2 border-dashed rounded-lg">
        <p className="text-muted-foreground">{emptyMessage}</p>
      </div>
    )
  );

  return (
    <Card className="shadow-lg h-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-2xl font-bold">Your Quests</CardTitle>
          <AddTaskDialog onAddTask={onAddTask}>
            <Button>
              <PlusCircle size={18} className="mr-2" />
              Add Quest
            </Button>
          </AddTaskDialog>
        </div>
        <CardDescription>Complete quests to earn XP and level up!</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="one-time">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5 mb-4">
            <TabsTrigger value="one-time">Main</TabsTrigger>
            <TabsTrigger value="daily">Daily</TabsTrigger>
            <TabsTrigger value="weekly">Weekly</TabsTrigger>
            <TabsTrigger value="monthly">Monthly</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
          </TabsList>
          <TabsContent value="one-time">{renderTaskList(oneTimeQuests, "No main quests. Time to create an adventure!")}</TabsContent>
          <TabsContent value="daily">{renderTaskList(dailyQuests, "No daily quests. Add some to build your streak!")}</TabsContent>
          <TabsContent value="weekly">{renderTaskList(weeklyQuests, "No weekly quests. Plan your week for great rewards!")}</TabsContent>
          <TabsContent value="monthly">{renderTaskList(monthlyQuests, "No monthly quests. Set a big goal for the month!")}</TabsContent>
          <TabsContent value="completed">{renderTaskList(completedTasks, "No quests completed yet. Finish a task to see it here!")}</TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
