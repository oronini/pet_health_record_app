'use client';

import {
  createContext,
  useContext,
  ReactNode,
  Dispatch,
  SetStateAction,
  useState,
} from 'react';
import { Record } from '@/lib/types/records';
import { recordData as initialRecordData } from '@/lib/data/recored';

type RecordContextType = {
  recordData: Record[];
  setRecordData: Dispatch<SetStateAction<Record[]>>;
};

const RecordContext = createContext<RecordContextType>({
  recordData: [],
  setRecordData: () => {},
});

export const useRecordContext = () => {
  return useContext(RecordContext);
};

export const RecordProvider = ({ children }: { children: ReactNode }) => {
  const [recordData, setRecordData] = useState<Record[]>(
    initialRecordData.map((record) => ({
      ...record,
      status: record.status || '',
      amount: record.amount || '',
      note: record.note || '',
    }))
  );

  return (
    <RecordContext.Provider value={{ recordData, setRecordData }}>
      {children}
    </RecordContext.Provider>
  );
};
