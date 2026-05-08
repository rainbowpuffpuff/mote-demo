export interface Listing {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  aiPrice: number;
  seller: string;
  createdAt: string;
}

export const listings: Listing[] = [
  { 
    id: 'l1', 
    category: 'Agent skills', 
    title: 'Agent Gas Economics 2026', 
    description: 'A structural text detailing current L2 gas realities to prevent agent hallucinations regarding mainnet costs.', 
    price: 5, 
    aiPrice: 4, 
    seller: '0xSash...4a92', 
    createdAt: '2026-05-01' 
  },
  { 
    id: 'l2', 
    category: 'Agent skills', 
    title: 'DEX Ecosystem Mapping', 
    description: 'An empirical log of verified L2 DEX addresses (Aerodrome, Velodrome, Camelot) for agent-native swaps.', 
    price: 15, 
    aiPrice: 18, 
    seller: '0xSash...4a92', 
    createdAt: '2026-05-02' 
  },
  { 
    id: 'l3', 
    category: 'DeFi alpha', 
    title: 'Tax Strategy 2026', 
    description: 'Legitimate ways to optimize crypto tax using modern L2-native reporting tools.', 
    price: 99, 
    aiPrice: 105, 
    seller: '0xC3...5d', 
    createdAt: '2026-05-03' 
  },
];
