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
  settingData: [],
  setSettingData: () => {},
});

export function useSettingContext() {
  return useContext(SettingContext);
}

export function SettingProvider({ children }: { children: ReactNode }) {
  const [settingData, setSettingData] = useState<typeof settingsData>([]);

  useEffect(() => {
    setSettingData(settingsData);
  }, []);

  return (
    <SettingContext.Provider value={{ settingData, setSettingData }}>
      {children}
    </SettingContext.Provider>
  );
}
