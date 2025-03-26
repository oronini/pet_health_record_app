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
import { useEffect, useState } from 'react';

const formSchema = z.object({
  petName1: z.string().max(20, { message: '20文字以内で入力してください' }),
  petName2: z
    .string()
    .max(20, { message: '20文字以内で入力してください' })
    .optional(),
  petName3: z
    .string()
    .max(20, { message: '20文字以内で入力してください' })
    .optional(),
  actionName: z.string().optional(),
  statusName: z.string().optional(),
  amountName: z.string().optional(),
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
      actionName: '',
      statusName: '',
      amountName: '',
    },
  });
  const settingDataKeys = Object.keys(settingData);

  const [settings, setSettings] = useState(settingData);
  // const [relatedActions, setRelatedActions] = useState([]);
  const [addInputValidation, setAddInputValidation] = useState({
    action: false,
    status: false,
    amount: false,
  });

  useEffect(() => {
    setSettings(settingData);
  }, [settingData]);

  useEffect(() => {
    if (petsData.length > 0) {
      form.reset({
        petName1: petsData[0]?.petName ?? '',
        petName2: petsData[1]?.petName ?? '',
        petName3: petsData[2]?.petName ?? '',
      });
    }
  }, [petsData, form]);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    const newPetsData = [
      {
        petId: 1,
        petName: values.petName1 ?? '',
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
    setSettingData(settings);
  };

  const addAction = () => {
    const actionName = form.getValues('actionName');
    if (!actionName) {
      setAddInputValidation({ ...addInputValidation, action: true });
      return;
    }

    setSettings({
      ...settings,
      actions: [
        ...settings.actions,
        {
          actionId: new Date().getTime(),
          actionName,
        },
      ],
    });
    setAddInputValidation({ ...addInputValidation, action: false });
    form.setValue('actionName', '');
  };

  const addStatus = () => {
    const statusName = form.getValues('statusName');
    if (!statusName) {
      setAddInputValidation({ ...addInputValidation, status: true });
      return;
    }

    setSettings({
      ...settings,
      statuses: [
        ...settings.statuses,
        {
          statusId: new Date().getTime(),
          statusName,
          relatedActionsId: [],
        },
      ],
    });
    setAddInputValidation({ ...addInputValidation, status: false });
    form.setValue('statusName', '');
  };

  const addAmount = () => {
    const amountName = form.getValues('amountName');
    if (!amountName) {
      setAddInputValidation({ ...addInputValidation, amount: true });
      return;
    }

    setSettings({
      ...settings,
      amounts: [
        ...settings.amounts,
        {
          amountId: new Date().getTime(),
          amountName,
        },
      ],
    });
    setAddInputValidation({ ...addInputValidation, amount: false });
    form.setValue('amountName', '');
  };

  const handleStatusActionChange = (statusId: number, actionId: number) => {
    const status = settings.statuses.find((s) => s.statusId === statusId);
    if (!status) return;

    const newRelatedActionsId = status.relatedActionsId.includes(actionId)
      ? status.relatedActionsId.filter((id) => id !== actionId)
      : [...status.relatedActionsId, actionId];

    const newStatuses = settings.statuses.map((s) =>
      s.statusId === statusId
        ? {
            ...s,
            relatedActionsId: newRelatedActionsId,
          }
        : s
    );

    setSettings({
      ...settings,
      statuses: newStatuses,
    });
  };

  const handleDelete = (
    id: number,
    type: 'actions' | 'statuses' | 'amounts'
  ) => {
    setSettings({
      ...settings,
      [type]: settings[type].filter((item) => {
        if (type === 'actions' && 'actionId' in item)
          return item.actionId !== id;
        if (type === 'statuses' && 'statusId' in item)
          return item.statusId !== id;
        if (type === 'amounts' && 'amountId' in item)
          return item.amountId !== id;
        return false;
      }),
    });
  };

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
                <Input
                  placeholder={
                    addInputValidation.action
                      ? '未入力では追加できません'
                      : '新しい行動を追加'
                  }
                  {...form.register('actionName')}
                  className={
                    addInputValidation.action
                      ? 'placeholder:text-red-500 border-red-500 focus-visible:border-red-500 focus-visible:ring-red-300 '
                      : ''
                  }
                />
                <Button type="button" onClick={addAction}>
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
              {/* 行動設定リスト */}
              <ul className="mt-2 flex flex-col gap-2">
                {settings.actions.map((action) => (
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
                      onClick={() => handleDelete(action.actionId, 'actions')}
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
                <Input
                  placeholder={
                    addInputValidation.status
                      ? '未入力では追加できません'
                      : '新しい状態を追加'
                  }
                  {...form.register('statusName')}
                  className={
                    addInputValidation.status
                      ? 'placeholder:text-red-500 border-red-500 focus-visible:border-red-500 focus-visible:ring-red-300 '
                      : ''
                  }
                />
                <Button type="button" onClick={addStatus}>
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
                {settings.statuses.map((status) => (
                  <li key={status.statusId} className="flex flex-col gap-1">
                    <div className="flex justify-between items-center bg-gray-200 px-3 py-2">
                      <p>{status.statusName}</p>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="size-6"
                        type="button"
                        onClick={() =>
                          handleDelete(status.statusId, 'statuses')
                        }
                      >
                        <XIcon />
                      </Button>
                    </div>
                    <div className="flex items-center gap-1">
                      <ul className="flex flex-wrap gap-2">
                        {settings.actions.map((action) => (
                          <li
                            key={action.actionId}
                            className="flex items-center gap-1"
                          >
                            <div className="items-center flex gap-1 bg-gray-200 px-2 py-1.5 rounded-sm has-[input:checked]:bg-primary has-[input:checked]:text-primary-foreground">
                              <Checkbox
                                id={`status${status.statusId}-action${action.actionId}`}
                                checked={status.relatedActionsId.includes(
                                  action.actionId
                                )}
                                onCheckedChange={() =>
                                  handleStatusActionChange(
                                    status.statusId,
                                    action.actionId
                                  )
                                }
                              />
                              <label
                                htmlFor={`status${status.statusId}-action${action.actionId}`}
                                className="text-xs leading-none cursor-pointer "
                              >
                                {action.actionName}
                              </label>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                ))}
              </ul>
            </TabsContent>
            {/* 量設定 */}
            <TabsContent value="amounts">
              <p>量</p>
              <div className="flex items-center gap-1 mt-2">
                <Input
                  {...form.register('amountName')}
                  placeholder={
                    addInputValidation.amount
                      ? '未入力では追加できません'
                      : '新しい量を追加'
                  }
                  className={
                    addInputValidation.amount
                      ? 'placeholder:text-red-500 border-red-500 focus-visible:border-red-500 focus-visible:ring-red-300 '
                      : ''
                  }
                />
                <Button type="button" onClick={addAmount}>
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
              {/* 量設定リスト */}
              <ul className="mt-2 flex flex-col gap-2">
                {settings.amounts.map((amount) => (
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
                      onClick={() => handleDelete(amount.amountId, 'amounts')}
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
