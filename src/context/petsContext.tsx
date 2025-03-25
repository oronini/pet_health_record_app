'use client';

import { pets } from '@/lib/data/recored';
import { createContext, useState, useContext, ReactNode } from 'react';

const PetsContext = createContext<{
  petsData: typeof pets;
  setPetsData: (petsData: typeof pets) => void;
}>({
  petsData: [],
  setPetsData: () => {},
});

export function usePetsContext() {
  return useContext(PetsContext);
}

export function PetsProvider({ children }: { children: ReactNode }) {
  const [petsData, setPetsData] = useState(pets);

  const value = {
    petsData,
    setPetsData,
  };

  return <PetsContext.Provider value={value}>{children}</PetsContext.Provider>;
}
