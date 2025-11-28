"use client"

import React, { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { format, formatISO } from "date-fns"
import { Calendar as CalendarIcon, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import type { Task } from "@/lib/types"

const formSchema = z.object({
  title: z.string().min(3, "Название должно содержать не менее 3 символов"),
  description: z.string().optional(),
  xp: z.coerce.number().min(0, "ОП должен быть неотрицательным"),
  hpDamage: z.coerce.number().min(0, "Урон ОЗ должен быть неотрицательным"),
  dueDate: z.date({ required_error: "Требуется указать срок выполнения." }),
  type: z.enum(["one-time", "daily", "weekly", "monthly"]),
})

type AddTaskFormValues = z.infer<typeof formSchema>

interface AddTaskDialogProps {
  children: React.ReactNode;
  onAddTask: (task: Omit<Task, "id" | "completed">) => void;
}

export function AddTaskDialog({ children, onAddTask }: AddTaskDialogProps) {
  const [open, setOpen] = useState(false)
  const form = useForm<AddTaskFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      xp: 10,
      hpDamage: 5,
      type: "one-time",
      dueDate: new Date(),
    },
  })

  function onSubmit(values: AddTaskFormValues) {
    onAddTask({ ...values, dueDate: formatISO(values.dueDate) })
    form.reset()
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[480px]">
        <DialogHeader>
          <DialogTitle>Создать новый квест</DialogTitle>
          <DialogDescription>
            Добавьте новую задачу в свой журнал квестов. Заполните детали ниже.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Название квеста</FormLabel>
                  <FormControl>
                    <Input placeholder="например, Победить Дракона Прокрастинации" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Описание</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Краткое описание вашего квеста." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="xp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Награда ОП</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="hpDamage"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Урон ОЗ (в случае провала)</FormLabel>
                    <FormControl>
                      <Input type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Срок выполнения</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Выберите дату</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) => date < new Date(new Date().setHours(0,0,0,0))}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
               <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Тип квеста</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип квеста" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="one-time">Разовый</SelectItem>
                        <SelectItem value="daily">Ежедневный</SelectItem>
                        <SelectItem value="weekly">Еженедельный</SelectItem>
                        <SelectItem value="monthly">Ежемесячный</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">
                <PlusCircle size={18} className="mr-2" />
                Добавить квест
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
