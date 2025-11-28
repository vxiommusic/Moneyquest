"use client";

import React, { useState, useEffect } from 'react';
import type { Task } from '@/lib/types';
import { TaskList } from './TaskList';
import { Skeleton } from './ui/skeleton';

interface ClientTaskListProps {
  tasks: Task[];
  onCompleteTask: (taskId: string) => void;
  onAddTask: (task: Omit<Task, 'id' | 'completed'>) => void;
}

export function ClientTaskList({ tasks, onCompleteTask, onAddTask }: ClientTaskListProps) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return (
        <Skeleton className="h-[600px] w-full rounded-lg" />
    );
  }

  return <TaskList tasks={tasks} onCompleteTask={onCompleteTask} onAddTask={onAddTask} />;
}
