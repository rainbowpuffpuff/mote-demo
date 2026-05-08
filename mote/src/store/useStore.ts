import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { initialFragments, type Fragment } from '../seed/fragments';
import { listings as initialListings, type Listing } from '../seed/listings';

export type Persona = 'Sasha' | 'Bo' | 'Cee' | 'Ari';

export const PERSONA_DETAILS: Record<Persona, { address: string, balance: number, role: string }> = {
  Sasha: { address: '0xSash...4a92', balance: 142.50, role: 'Seller' },
  Bo: { address: '0xBo88...1f33', balance: 850.00, role: 'Buyer' },
  Cee: { address: '0xCee7...9b21', balance: 3200.00, role: 'Curator' },
  Ari: { address: '0xAri1...001a', balance: 0.00, role: 'Agent' }
};

interface MoteState {
  activePersona: Persona;
  fragments: Fragment[];
  listings: Listing[];
  purchasedListings: Record<Persona, string[]>;
  setActivePersona: (p: Persona) => void;
  addFragment: (f: Fragment) => void;
  updateFragment: (id: string, data: Partial<Fragment>) => void;
  addListing: (l: Listing) => void;
  purchaseListing: (persona: Persona, id: string) => void;
  resetDemo: () => void;
}

export const useStore = create<MoteState>()(
  persist(
    (set) => ({
      activePersona: 'Sasha',
      fragments: initialFragments,
      listings: initialListings,
      purchasedListings: { Sasha: [], Bo: [], Cee: [], Ari: [] },
      setActivePersona: (p) => set({ activePersona: p }),
      addFragment: (f) => set((state) => ({ fragments: [...state.fragments, f] })),
      updateFragment: (id, data) => set((state) => ({
        fragments: state.fragments.map(f => f.id === id ? { ...f, ...data } : f)
      })),
      addListing: (l) => set((state) => ({ listings: [...state.listings, l] })),
      purchaseListing: (persona, id) => set((state) => ({ 
        purchasedListings: {
          ...state.purchasedListings,
          [persona]: [...(state.purchasedListings[persona] || []), id]
        }
      })),
      resetDemo: () => set({ 
        activePersona: 'Sasha', 
        fragments: initialFragments, 
        listings: initialListings, 
        purchasedListings: { Sasha: [], Bo: [], Cee: [], Ari: [] } 
      }),
    }),
    { name: 'mote-storage' }
  )
);
