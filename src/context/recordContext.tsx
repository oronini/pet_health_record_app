'use client';

import { recordData as initialRecordData } from '@/lib/data/recored';
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
} from 'react';
import { Record } from '@/lib/types/records';

type RecordContextType = {
  recordData: Record[];
  setRecordData: Dispatch<SetStateAction<Record[]>>;
};

const RecordContext = createContext<RecordContextType>({
  recordData: [],
  setRecordData: () => {},
});

export function useRecordContext() {
  return useContext(RecordContext);
}

export function RecordProvider({ children }: { children: ReactNode }) {
  const [recordData, setRecordData] = useState<Record[]>(initialRecordData);

  console.log('recordData', initialRecordData);

  const value = {
    recordData,
    setRecordData,
  };

  return (
    <RecordContext.Provider value={value}>{children}</RecordContext.Provider>
  );
}
