'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
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
import { useSettingContext } from '@/context/settingContext';

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
  actionId: z
    .string({
      required_error: '行動を選択してください。',
    })
    .min(1, {
      message: '行動を選択してください。',
    }),
  statusId: z.string().optional().or(z.literal('')),
  amountId: z.string().optional().or(z.literal('')),
  note: z.string().optional().or(z.literal('')),
  petName: z.string(),
  actionName: z.string(),
  statusName: z.string().optional(),
  amountName: z.string().optional(),
});

const RecordForm = ({
  onClose,
  onSubmit,
}: {
  onClose: () => void;
  onSubmit: (values: z.infer<typeof formSchema>) => void;
}) => {
  const { settingData } = useSettingContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      petId: '',
      datetime: '',
      actionId: '',
      statusId: '',
      amountId: '',
      note: '',
    },
  });

  const handleSubmit = (values: z.infer<typeof formSchema>) => {
    // IDから表示テキストを取得
    const selectedPet = pets.find(
      (pet) => pet.petId.toString() === values.petId
    );
    const selectedAction = settingData.actions.find(
      (action) => action.actionId.toString() === values.actionId
    );
    const selectedStatus = settingData.statuses.find(
      (status) => status.statusId.toString() === values.statusId
    );
    const selectedAmount = settingData.amounts.find(
      (amount) => amount.amountId.toString() === values.amountId
    );

    onSubmit({
      ...values,
      petName: selectedPet?.petName || '',
      actionName: selectedAction?.actionName || '',
      statusName: selectedStatus?.statusName || '',
      amountName: selectedAmount?.amountName || '',
    });
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

  const petsData = pets;

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
                    {petsData
                      .filter((pet) => pet.petName !== '')
                      .map((pet) => (
                        <SelectItem
                          key={pet.petId}
                          value={pet.petId.toString()}
                        >
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
          name="actionId"
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
                    form.setValue('statusId', ''); // 行動変更時に状態をリセット
                  }}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="行動を選択してください。" />
                  </SelectTrigger>
                  <SelectContent>
                    {settingData.actions
                      .filter((action) => action.actionName !== '')
                      .map((action) => (
                        <SelectItem
                          key={action.actionId}
                          value={action.actionId.toString()}
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
          name="statusId"
          render={({ field }) => {
            const selectedActionId = form.watch('actionId');
            const availableStatuses = !selectedActionId
              ? settingData.statuses
              : settingData.statuses.filter((status) =>
                  status.relatedActionsId.includes(parseInt(selectedActionId))
                );

            return (
              <FormItem>
                <FormLabel>状態選択</FormLabel>
                <FormControl>
                  <Select value={field.value} onValueChange={field.onChange}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="状態を選択してください。" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStatuses
                        .filter((status) => status.statusName !== '')
                        .map((status) => (
                          <SelectItem
                            key={status.statusId}
                            value={status.statusId.toString()}
                          >
                            {status.statusName}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />

        {/* 量選択 */}
        <FormField
          control={form.control}
          name="amountId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>量選択</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="量を選択してください。" />
                  </SelectTrigger>
                  <SelectContent>
                    {settingData.amounts
                      .filter((amount) => amount.amountName !== '')
                      .map((amount) => (
                        <SelectItem
                          key={amount.amountId}
                          value={amount.amountId.toString()}
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
          name="note"
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
