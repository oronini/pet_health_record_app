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

const formSchema = z.object({
  petId: z
    .string({
      required_error: 'ペットを選択してください。',
    })
    .min(1, {
      message: 'ペットを選択してください。',
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

const RecordForm = ({ onClose }: { onClose: () => void }) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: 'onBlur',
    defaultValues: {
      petId: '',
      action: '',
      status: '',
      amount: '',
      comment: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    onClose();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
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
                    <SelectItem value="pet1">ペット1</SelectItem>
                    <SelectItem value="pet2">ペット2</SelectItem>
                    <SelectItem value="pet3">ペット3</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="行動を選択してください。" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="food">食事</SelectItem>
                    <SelectItem value="water">水</SelectItem>
                    <SelectItem value="toilet">トイレ</SelectItem>
                    <SelectItem value="medicine">投薬</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    <SelectItem value="good">良好</SelectItem>
                    <SelectItem value="normal">普通</SelectItem>
                    <SelectItem value="bad">悪い</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
                    <SelectItem value="much">多い</SelectItem>
                    <SelectItem value="normal">普通</SelectItem>
                    <SelectItem value="little">少ない</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

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
