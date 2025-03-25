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

  useEffect(() => {
    setPetsData(pets);
  }, []);

  return (
    <PetsContext.Provider value={{ petsData, setPetsData }}>
      {children}
    </PetsContext.Provider>
  );
}
