import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialFragments, type Fragment } from '../seed/fragments';
import { listings as initialListings, type Listing } from '../seed/listings';

export type Persona = 'Sasha' | 'Bo' | 'Cee' | 'Ari';

interface MoteState {
  activePersona: Persona;
  fragments: Fragment[];
  listings: Listing[];
  purchasedListings: string[];
  setActivePersona: (p: Persona) => void;
  addFragment: (f: Fragment) => void;
  updateFragment: (id: string, data: Partial<Fragment>) => void;
  addListing: (l: Listing) => void;
  purchaseListing: (id: string) => void;
  resetDemo: () => void;
}

export const useStore = create<MoteState>()(
  persist(
    (set) => ({
      activePersona: 'Sasha',
      fragments: initialFragments,
      listings: initialListings,
      purchasedListings: [],
      setActivePersona: (p) => set({ activePersona: p }),
      addFragment: (f) => set((state) => ({ fragments: [...state.fragments, f] })),
      updateFragment: (id, data) => set((state) => ({
        fragments: state.fragments.map(f => f.id === id ? { ...f, ...data } : f)
      })),
      addListing: (l) => set((state) => ({ listings: [...state.listings, l] })),
      purchaseListing: (id) => set((state) => ({ purchasedListings: [...state.purchasedListings, id] })),
      resetDemo: () => set({ activePersona: 'Sasha', fragments: initialFragments, listings: initialListings, purchasedListings: [] }),
    }),
    { name: 'mote-storage' }
  )
);
