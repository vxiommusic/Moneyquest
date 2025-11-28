"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { Calendar as CalendarIcon, Upload } from "lucide-react";

const formSchema = z.object({
  date: z.date({
    required_error: "Пожалуйста, выберите дату.",
  }),
  instrument: z.string().min(1, "Поле обязательно для заполнения."),
  positionType: z.enum(["long", "short"], {
    required_error: "Нужно выбрать тип позиции.",
  }),
  volume: z.coerce.number().positive("Объем должен быть положительным числом."),
  entryPoint: z.coerce.number().positive("Точка входа должна быть положительным числом."),
  exitPoint: z.coerce.number().positive("Точка выхода должна быть положительным числом."),
  screenshot: z.any().optional(),
});

export function TradeForm() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      instrument: "",
      volume: NaN,
      entryPoint: NaN,
      exitPoint: NaN,
    },
  });

  const { watch } = form;
  const { positionType, entryPoint, exitPoint, volume } = watch();

  const calculateResult = () => {
    if (positionType && entryPoint > 0 && exitPoint > 0 && volume > 0) {
      if (positionType === 'long') {
        return (exitPoint - entryPoint) * volume;
      }
      if (positionType === 'short') {
        return (entryPoint - exitPoint) * volume;
      }
    }
    return 0;
  };

  const result = calculateResult();

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log({ ...values, result });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Дата</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP", { locale: ru })
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
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                      locale={ru}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="instrument"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Инструмент</FormLabel>
                <FormControl>
                  <Input placeholder="Например, BTC/USDT" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="positionType"
            render={({ field }) => (
              <FormItem className="space-y-3">
                <FormLabel>Тип позиции</FormLabel>
                <FormControl>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="flex items-center space-x-4"
                  >
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="long" />
                      </FormControl>
                      <FormLabel className="font-normal">Лонг</FormLabel>
                    </FormItem>
                    <FormItem className="flex items-center space-x-2 space-y-0">
                      <FormControl>
                        <RadioGroupItem value="short" />
                      </FormControl>
                      <FormLabel className="font-normal">Шорт</FormLabel>
                    </FormItem>
                  </RadioGroup>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="volume"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Объём Позиции</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.00" {...field} value={Number.isNaN(field.value) ? '' : field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="entryPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Точка входа</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.00" {...field} value={Number.isNaN(field.value) ? '' : field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="exitPoint"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Точка выхода</FormLabel>
                <FormControl>
                  <Input type="number" placeholder="0.00" {...field} value={Number.isNaN(field.value) ? '' : field.value} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="screenshot"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Загрузить Скриншот</FormLabel>
                <FormControl>
                    <Button asChild variant="outline" className="w-full">
                        <label className="cursor-pointer">
                            <Upload className="mr-2" />
                            <span>Выберите файл</span>
                            <Input type="file" className="sr-only" onChange={(e) => field.onChange(e.target.files)} />
                        </label>
                    </Button>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormItem>
            <FormLabel>Итог</FormLabel>
            <FormControl>
                <Input
                    type="text"
                    readOnly
                    value={`${result.toFixed(2)}`}
                    className={cn(
                        "font-bold",
                        result > 0 && "text-green-500",
                        result < 0 && "text-red-500"
                    )}
                />
            </FormControl>
            <FormDescription>
              Рассчитывается автоматически.
            </FormDescription>
          </FormItem>

        </div>
        <Button type="submit">Сохранить сделку</Button>
      </form>
    </Form>
  );
}
