import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialFragments, type Fragment } from '../seed/fragments';

export type Persona = 'Sasha' | 'Bo' | 'Cee' | 'Ari';

interface MoteState {
  activePersona: Persona;
  fragments: Fragment[];
  purchasedListings: string[];
  setActivePersona: (p: Persona) => void;
  addFragment: (f: Fragment) => void;
  purchaseListing: (id: string) => void;
  resetDemo: () => void;
}

export const useStore = create<MoteState>()(
  persist(
    (set) => ({
      activePersona: 'Sasha',
      fragments: initialFragments,
      purchasedListings: [],
      setActivePersona: (p) => set({ activePersona: p }),
      addFragment: (f) => set((state) => ({ fragments: [...state.fragments, f] })),
      purchaseListing: (id) => set((state) => ({ purchasedListings: [...state.purchasedListings, id] })),
      resetDemo: () => set({ activePersona: 'Sasha', fragments: initialFragments, purchasedListings: [] }),
    }),
    { name: 'mote-storage' }
  )
);
