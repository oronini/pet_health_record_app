'use client';

import { pets } from '@/lib/data/recored';
import {
  createContext,
  useState,
  useContext,
  ReactNode,
  useEffect,
} from 'react';

type PetsContextType = {
  petsData: typeof pets;
  setPetsData: (petsData: typeof pets) => void;
};

const PetsContext = createContext<PetsContextType>({
  petsData: [],
  setPetsData: () => {},
});

export function usePetsContext() {
  return useContext(PetsContext);
}

export function PetsProvider({ children }: { children: ReactNode }) {
  const [petsData, setPetsData] = useState<typeof pets>([]);

  // 初期データの読み込み
  useEffect(() => {
    const savedPets = localStorage.getItem('petsData');
    if (savedPets) {
      setPetsData(JSON.parse(savedPets));
    } else {
      setPetsData(pets);
    }
  }, []);

  // データの保存
  useEffect(() => {
    localStorage.setItem('petsData', JSON.stringify(petsData));
  }, [petsData]);

  return (
    <PetsContext.Provider value={{ petsData, setPetsData }}>
      {children}
    </PetsContext.Provider>
  );
}
