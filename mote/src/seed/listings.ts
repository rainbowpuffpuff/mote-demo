export interface Listing {
  id: string;
  category: string;
  title: string;
  description: string;
  price: number;
  seller: string;
  createdAt: string;
}

export const listings: Listing[] = [
  { id: 'l1', category: 'DeFi alpha', title: 'Yield Farm Optimization', description: 'Advanced strategies for maximizing yield...', price: 24, seller: '0xA1...3f', createdAt: '2026-05-01' },
  { id: 'l2', category: 'DeFi alpha', title: 'Bridge Liquidity', description: 'Cross-chain bridge risks and opportunities...', price: 45, seller: '0xB2...4c', createdAt: '2026-05-02' },
  { id: 'l3', category: 'Personal finance', title: 'Tax Strategy 2026', description: 'Legitimate ways to optimize crypto tax...', price: 99, seller: '0xC3...5d', createdAt: '2026-05-03' },
];
