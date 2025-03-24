'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Checkbox } from '@/components/ui/checkbox';
import { XIcon } from 'lucide-react';

const formSchema = z.object({
  petName1: z.string().min(1, {
    message: 'ペット1は必須です',
  }),
  petName2: z.string().optional(),
  petName3: z.string().optional(),
});

const SettingForm = () => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petName1: '',
      petName2: '',
      petName3: '',
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        {/* ペットの設定 */}
        <div className="flex flex-col gap-5 rounded-md border border-gray-300 p-6 shadow-md">
          <p className="text-base font-bold">ペットの設定</p>
          <FormField
            control={form.control}
            name="petName1"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ペット1</FormLabel>
                <FormControl>
                  <Input placeholder="名前を入力してください" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="petName2"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ペット2</FormLabel>
                <FormControl>
                  <Input placeholder="名前を入力してください" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="petName3"
            render={({ field }) => (
              <FormItem>
                <FormLabel>ペット3</FormLabel>
                <FormControl>
                  <Input placeholder="名前を入力してください" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        {/* 記録の設定 */}
        <div className="flex flex-col gap-5 rounded-md border border-gray-200 p-6 shadow-md mt-6">
          <p className="text-base font-bold">記録の設定</p>
          <Tabs defaultValue="action" className="w-full gap-6">
            {/* 設定項目タブ */}
            <TabsList className="w-full">
              <TabsTrigger value="action">
                <Image
                  src="/images/icons/pawprint_icon_2_noactive.svg"
                  alt="アイコン"
                  width={18}
                  height={18}
                />
                行動
              </TabsTrigger>
              <TabsTrigger value="status">
                <Image
                  src="/images/icons/pawprint_icon_2_noactive.svg"
                  alt="アイコン"
                  width={18}
                  height={18}
                />
                状態
              </TabsTrigger>
              <TabsTrigger value="amount">
                <Image
                  src="/images/icons/pawprint_icon_2_noactive.svg"
                  alt="アイコン"
                  width={18}
                  height={18}
                />
                量
              </TabsTrigger>
            </TabsList>
            {/* 行動設定 */}
            <TabsContent value="action">
              <p>行動</p>
              <div className="flex items-center gap-1 mt-2">
                <Input placeholder="新しい行動を追加" />
                <Button type="button">
                  <Image
                    src="/images/icons/add_icon.svg"
                    alt="アイコン"
                    width={19}
                    height={19}
                  />
                  追加
                </Button>
              </div>
              <ul className="mt-2 flex flex-col gap-2">
                <li className="flex justify-between items-center bg-gray-200 px-3 py-2">
                  <p>行動1</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6"
                    type="button"
                  >
                    <XIcon />
                  </Button>
                </li>
                <li className="flex justify-between items-center bg-gray-200 px-3 py-2">
                  <p>行動2</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6"
                    type="button"
                  >
                    <XIcon />
                  </Button>
                </li>
                <li className="flex justify-between items-center bg-gray-200 px-3 py-2">
                  <p>行動3</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6"
                    type="button"
                  >
                    <XIcon />
                  </Button>
                </li>
              </ul>
            </TabsContent>
            {/* 状態設定 */}
            <TabsContent value="status">
              <p>状態</p>
              <div className="flex items-center gap-1 mt-2">
                <Input placeholder="新しい行動を追加" />
                <Button type="button">
                  <Image
                    src="/images/icons/add_icon.svg"
                    alt="アイコン"
                    width={19}
                    height={19}
                  />
                  追加
                </Button>
              </div>
              {/* 状態設定リスト */}
              <ul className="mt-2 flex flex-col gap-2">
                <li className="flex flex-col gap-1">
                  <div className="flex justify-between items-center bg-gray-200 px-3 py-2">
                    <p>状態1</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      type="button"
                    >
                      <XIcon />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1">
                    <ul className="flex flex-wrap gap-2">
                      <li className="flex items-center gap-1">
                        <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                          <Checkbox id="status1-action1" />
                          <label
                            htmlFor="status1-action1"
                            className="text-xs leading-none cursor-pointer "
                          >
                            行動1
                          </label>
                        </div>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                          <Checkbox id="status1-action2" />
                          <label
                            htmlFor="status1-action2"
                            className="text-xs leading-none cursor-pointer "
                          >
                            行動2
                          </label>
                        </div>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                          <Checkbox id="status1-action3" />
                          <label
                            htmlFor="status1-action3"
                            className="text-xs leading-none cursor-pointer "
                          >
                            行動3
                          </label>
                        </div>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                          <Checkbox id="status1-action4" />
                          <label
                            htmlFor="status1-action4"
                            className="text-xs leading-none cursor-pointer "
                          >
                            行動4
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="flex flex-col gap-1">
                  <div className="flex justify-between items-center bg-gray-200 px-3 py-2">
                    <p>状態2</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      type="button"
                    >
                      <XIcon />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1">
                    <ul className="flex flex-wrap gap-2">
                      <li className="flex items-center gap-1">
                        <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                          <Checkbox id="status2-action1" />
                          <label
                            htmlFor="status2-action1"
                            className="text-xs leading-none cursor-pointer "
                          >
                            行動1
                          </label>
                        </div>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                          <Checkbox id="status2-action2" />
                          <label
                            htmlFor="status2-action2"
                            className="text-xs leading-none cursor-pointer "
                          >
                            行動2
                          </label>
                        </div>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                          <Checkbox id="status2-action3" />
                          <label
                            htmlFor="status2-action3"
                            className="text-xs leading-none cursor-pointer "
                          >
                            行動3
                          </label>
                        </div>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                          <Checkbox id="status2-action4" />
                          <label
                            htmlFor="status2-action4"
                            className="text-xs leading-none cursor-pointer "
                          >
                            行動4
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="flex flex-col gap-1">
                  <div className="flex justify-between items-center bg-gray-200 px-3 py-2">
                    <p>状態3</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      type="button"
                    >
                      <XIcon />
                    </Button>
                  </div>
                  <div className="flex items-center gap-1">
                    <ul className="flex flex-wrap gap-2">
                      <li className="flex items-center gap-1">
                        <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                          <Checkbox id="status3-action1" />
                          <label
                            htmlFor="status3-action1"
                            className="text-xs leading-none cursor-pointer "
                          >
                            行動1
                          </label>
                        </div>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                          <Checkbox id="status3-action2" />
                          <label
                            htmlFor="status3-action2"
                            className="text-xs leading-none cursor-pointer "
                          >
                            行動2
                          </label>
                        </div>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                          <Checkbox id="status3-action3" />
                          <label
                            htmlFor="status3-action3"
                            className="text-xs leading-none cursor-pointer "
                          >
                            行動3
                          </label>
                        </div>
                      </li>
                      <li className="flex items-center gap-1">
                        <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                          <Checkbox id="terms4" />
                          <label
                            htmlFor="terms4"
                            className="text-xs leading-none cursor-pointer "
                          >
                            行動4
                          </label>
                        </div>
                      </li>
                    </ul>
                  </div>
                </li>
              </ul>
            </TabsContent>
            {/* 量設定 */}
            <TabsContent value="amount">
              <p>量</p>
              <div className="flex items-center gap-1 mt-2">
                <Input placeholder="新しい行動を追加" />
                <Button type="button">
                  <Image
                    src="/images/icons/add_icon.svg"
                    alt="アイコン"
                    width={19}
                    height={19}
                  />
                  追加
                </Button>
              </div>
              <ul className="mt-2 flex flex-col gap-2">
                <li className="flex justify-between items-center bg-gray-200 px-3 py-2">
                  <p>量1</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6"
                    type="button"
                  >
                    <XIcon />
                  </Button>
                </li>
                <li className="flex justify-between items-center bg-gray-200 px-3 py-2">
                  <p>量2</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6"
                    type="button"
                  >
                    <XIcon />
                  </Button>
                </li>
                <li className="flex justify-between items-center bg-gray-200 px-3 py-2">
                  <p>量3</p>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="size-6"
                    type="button"
                  >
                    <XIcon />
                  </Button>
                </li>
              </ul>
            </TabsContent>
          </Tabs>
        </div>
        {/* 保存ボタン */}
        <Button type="submit" className="w-full mt-4">
          保存
        </Button>
      </form>
    </Form>
  );
};

export default SettingForm;
