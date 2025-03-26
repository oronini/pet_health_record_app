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
import { useSettingContext } from '@/context/settingContext';
import { usePetsContext } from '@/context/petsContext';
import { useEffect } from 'react';

const formSchema = z.object({
  petName1: z
    .string()
    .min(1, { message: 'ペット1は必須です。' })
    .max(20, { message: '20文字以内で入力してください' }),
  petName2: z
    .string()
    .max(20, { message: '20文字以内で入力してください' })
    .optional(),
  petName3: z
    .string()
    .max(20, { message: '20文字以内で入力してください' })
    .optional(),
});

const SettingForm = () => {
  const { settingData, setSettingData } = useSettingContext();
  const { petsData, setPetsData } = usePetsContext();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      petName1: '',
      petName2: '',
      petName3: '',
    },
  });
  const settingDataKeys = Object.keys(settingData);

  useEffect(() => {
    if (petsData.length > 0) {
      form.reset({
        petName1: petsData[0]?.petName ?? '',
        petName2: petsData[1]?.petName ?? '',
        petName3: petsData[2]?.petName ?? '',
      });
    }
  }, [petsData, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    const newPetsData = [
      {
        petId: 1,
        petName: values.petName1,
      },
      {
        petId: 2,
        petName: values.petName2 ?? '',
      },
      {
        petId: 3,
        petName: values.petName3 ?? '',
      },
    ];
    setPetsData(newPetsData);
    // setSettingData()
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
          <Tabs defaultValue="actions" className="w-full gap-6">
            {/* 設定項目タブ */}
            <TabsList className="w-full">
              {settingDataKeys.map((key) => (
                <TabsTrigger key={key} value={key} className="group">
                  <Image
                    src="/images/icons/pawprint_icon_2_active.svg"
                    alt="アイコン"
                    width={18}
                    height={18}
                    className="group-aria-[selected=false]:hidden w-[18px] h-[18px]"
                  />
                  <Image
                    src="/images/icons/pawprint_icon_2_noactive.svg"
                    alt="アイコン"
                    width={18}
                    height={18}
                    className="group-aria-[selected=true]:hidden w-[18px] h-[18px]"
                  />
                  {key === 'actions'
                    ? '行動'
                    : key === 'statuses'
                    ? '状態'
                    : '量'}
                </TabsTrigger>
              ))}
            </TabsList>
            {/* 行動設定 */}
            <TabsContent value="actions">
              <p>行動</p>
              <div className="flex items-center gap-1 mt-2">
                <Input placeholder="新しい行動を追加" />
                <Button type="button">
                  <Image
                    src="/images/icons/add_icon.svg"
                    alt="アイコン"
                    width={20}
                    height={20}
                    className="w-[20px] h-[20px]"
                  />
                  追加
                </Button>
              </div>
              <ul className="mt-2 flex flex-col gap-2">
                {settingData.actions.map((action) => (
                  <li
                    key={action.actionId}
                    className="flex justify-between items-center bg-gray-200 px-3 py-2"
                  >
                    <p>{action.actionName}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      type="button"
                    >
                      <XIcon />
                    </Button>
                  </li>
                ))}
              </ul>
            </TabsContent>
            {/* 状態設定 */}
            <TabsContent value="statuses">
              <p>状態</p>
              <div className="flex items-center gap-1 mt-2">
                <Input placeholder="新しい行動を追加" />
                <Button type="button">
                  <Image
                    src="/images/icons/add_icon.svg"
                    alt="アイコン"
                    width={20}
                    height={20}
                    className="w-[20px] h-[20px]"
                  />
                  追加
                </Button>
              </div>
              {/* 状態設定リスト */}
              <ul className="mt-2 flex flex-col gap-2">
                {settingData.statuses.map((status) => (
                  <li key={status.statusId} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center bg-gray-200 px-3 py-2">
                      <p>{status.statusName}</p>
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
                        {status.relatedActionsId.map((actionId) => (
                          <li
                            key={actionId}
                            className="flex items-center gap-1"
                          >
                            <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                              <Checkbox
                                id={`status${status.statusId}-action${actionId}`}
                              />
                              <label
                                htmlFor={`status${status.statusId}-action${actionId}`}
                                className="text-xs leading-none cursor-pointer "
                              >
                                {
                                  settingData.actions.find(
                                    (action) => action.actionId === actionId
                                  )?.actionName
                                }
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
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
            <TabsContent value="amounts">
              <p>量</p>
              <div className="flex items-center gap-1 mt-2">
                <Input placeholder="新しい行動を追加" />
                <Button type="button">
                  <Image
                    src="/images/icons/add_icon.svg"
                    alt="アイコン"
                    width={20}
                    height={20}
                    className="w-[20px] h-[20px]"
                  />
                  追加
                </Button>
              </div>
              <ul className="mt-2 flex flex-col gap-2">
                {settingData.amounts.map((amount) => (
                  <li
                    key={amount.amountId}
                    className="flex justify-between items-center bg-gray-200 px-3 py-2"
                  >
                    <p>{amount.amountName}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="size-6"
                      type="button"
                    >
                      <XIcon />
                    </Button>
                  </li>
                ))}
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
