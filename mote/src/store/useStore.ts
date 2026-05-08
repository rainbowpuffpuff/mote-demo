import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialFragments, type Fragment } from '../seed/fragments';

interface MoteState {
  fragments: Fragment[];
  addFragment: (f: Fragment) => void;
  resetDemo: () => void;
}

export const useStore = create<MoteState>()(
  persist(
    (set) => ({
      fragments: initialFragments,
      addFragment: (f) => set((state) => ({ fragments: [...state.fragments, f] })),
      resetDemo: () => set({ fragments: initialFragments }),
    }),
    { name: 'mote-storage' }
  )
);
