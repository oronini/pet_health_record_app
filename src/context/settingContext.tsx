'use client';

import { settingsData } from '@/lib/data/setting';
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

type SettingContextType = {
  settingData: typeof settingsData;
  setSettingData: (settingData: typeof settingsData) => void;
};

const SettingContext = createContext<SettingContextType>({
  settingData: {
    actions: [],
    statuses: [],
    amounts: [],
  },
  setSettingData: () => {},
});

export function useSettingContext() {
  return useContext(SettingContext);
}

export function SettingProvider({ children }: { children: ReactNode }) {
  const [settingData, setSettingData] = useState<typeof settingsData>({
    actions: [],
    statuses: [],
    amounts: [],
  });

  // 初期データの読み込み
  useEffect(() => {
    const savedSettings = localStorage.getItem('settingData');
    if (savedSettings) {
      setSettingData(JSON.parse(savedSettings));
    } else {
      setSettingData(settingsData);
    }
  }, []);

  // データの保存
  useEffect(() => {
    localStorage.setItem('settingData', JSON.stringify(settingData));
  }, [settingData]);

  return (
    <SettingContext.Provider value={{ settingData, setSettingData }}>
      {children}
    </SettingContext.Provider>
  );
}
