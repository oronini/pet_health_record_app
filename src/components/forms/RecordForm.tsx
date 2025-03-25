'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '../ui/textarea';
import { Input } from '@/components/ui/input';
import { pets } from '@/lib/data/recored';
import * as React from 'react';
import { CalendarIcon } from '@radix-ui/react-icons';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { Calendar } from '@/components/ui/calendar';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';

const formSchema = z.object({
  petId: z
    .string({
      required_error: 'ペットを選択してください。',
    })
    .min(1, {
      message: 'ペットを選択してください。',
    }),
  datetime: z
    .string({
      required_error: '日時を選択してください。',
    })
    .min(1, {
      message: '日時を選択してください。',
    }),
  action: z
    .string({
      required_error: '行動を選択してください。',
    })
    .min(1, {
      message: '行動を選択してください。',
    }),
  status: z.string().optional().or(z.literal('')),
  amount: z.string().optional().or(z.literal('')),
  comment: z.string().optional().or(z.literal('')),
});

const RecordForm = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      petId: '',
      datetime: '',
      action: '',
      status: '',
      amount: '',
      comment: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    onSubmit(values);
    console.log(values);
    onClose();
  };

  const onClickNow = () => {
    const now = new Date();
    const formattedDate = now
      .toLocaleString('sv', { timeZone: 'Asia/Tokyo' })
      .replace(' ', 'T')
      .slice(0, 16);
    form.setValue('datetime', formattedDate);
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      form.setValue('datetime', selectedDate.toISOString());
    }
  };

  const handleTimeChange = (type: 'hour' | 'minute', value: string) => {
    const currentDate = form.getValues('datetime')
      ? new Date(form.getValues('datetime'))
      : new Date();

    const newDate = new Date(currentDate);
    if (type === 'hour') {
      newDate.setHours(parseInt(value));
    } else if (type === 'minute') {
      newDate.setMinutes(parseInt(value));
    }
    form.setValue('datetime', newDate.toISOString());
  };

  const [isOpen, setIsOpen] = React.useState(false);
  const hours = Array.from({ length: 24 }, (_, i) => i);
  const selectedDate = form.getValues('datetime')
    ? new Date(form.getValues('datetime'))
    : undefined;

  const petsData = pets;
  const settingsData = {
    actions: [
      {
        actionId: 1,
        actionName: '行動テキスト1',
      },
      {
        actionId: 2,
        actionName: '行動テキスト2',
      },
      {
        actionId: 3,
        actionName: '行動テキスト3',
      },
    ],
    statuses: [
      { statusId: 1, statusName: '状態テキスト1', relatedActionsId: [1, 2] },
      { statusId: 2, statusName: '状態テキスト2', relatedActionsId: [3] },
      { statusId: 3, statusName: '状態テキスト3', relatedActionsId: [1, 2, 3] },
    ],
    amounts: [
      { amountId: 1, amountName: '量テキスト1' },
      { amountId: 2, amountName: '量テキスト2' },
      { amountId: 3, amountName: '量テキスト3' },
    ],
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
        {/* ペット選択 */}
        <FormField
          control={form.control}
          name="petId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                ペット選択
                <span className="text-red-500 text-[12px]">※ 必須</span>
              </FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="ペットを選択してください。" />
                  </SelectTrigger>
                  <SelectContent>
                    {petsData.map((pet) => (
                      <SelectItem key={pet.petId} value={pet.petName}>
                        {pet.petName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 日時選択 */}
        <FormField
          control={form.control}
          name="datetime"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                日時選択
                <span className="text-red-500 text-[12px]">※ 必須</span>
              </FormLabel>
              <FormControl>
                <div className="flex items-center gap-2 w-full">
                  <Input
                    type="datetime-local"
                    className="w-full block"
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                  <Button variant="outline" type="button" onClick={onClickNow}>
                    Now
                  </Button>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 行動選択 */}
        <FormField
          control={form.control}
          name="action"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                行動選択
                <span className="text-red-500 text-[12px]">※ 必須</span>
              </FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                    form.setValue('status', ''); // 行動変更時に状態をリセット
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="行動を選択してください。" />
                  </SelectTrigger>
                  <SelectContent>
                    {settingsData.actions.map((action) => (
                      <SelectItem
                        key={action.actionId}
                        value={action.actionName}
                      >
                        {action.actionName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 状態選択 */}
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem>
              <FormLabel>状態選択</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="状態を選択してください。" />
                  </SelectTrigger>
                  <SelectContent>
                    {settingsData.statuses
                      .filter((status) => {
                        const actionValue = form.getValues('action');
                        if (actionValue === '') return true;
                        const selectedAction = settingsData.actions.find(
                          (action) => action.actionName === actionValue
                        );
                        return (
                          selectedAction &&
                          status.relatedActionsId.includes(
                            selectedAction.actionId
                          )
                        );
                      })
                      .map((status) => (
                        <SelectItem
                          key={status.statusId}
                          value={status.statusName}
                        >
                          {status.statusName}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* 量選択 */}
        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>量選択</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="量を選択してください。" />
                  </SelectTrigger>
                  <SelectContent>
                    {settingsData.amounts.map((amount) => (
                      <SelectItem
                        key={amount.amountId}
                        value={amount.amountName}
                      >
                        {amount.amountName}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* コメント */}
        <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem>
              <FormLabel>コメント</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="その他の詳細情報を入力してください"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* ボタン */}
        <div className="flex flex-col gap-2">
          <Button className="w-full hover:opacity-70" type="submit">
            記録を保存
          </Button>
          <Button
            className="w-full hover:opacity-70 hover:bg-gray-300 bg-gray-300 text-black"
            type="button"
            onClick={onClose}
          >
            キャンセル
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default RecordForm;
