export type FragmentStatus = 'Draft' | 'Listed' | 'Sold';

export interface Fragment {
  id: string;
  author: string; // The persona name or address
  title: string;
  content: string;
  status: FragmentStatus;
  price?: number;
  buyers?: number;
  createdAt: string;
}

export const initialFragments: Fragment[] = [
  {
    id: '1',
    author: 'Sasha',
    title: 'Agent Gas Economics 2026',
    content: 'ETH transfers are ~$0.002 on L2s. Direct agents to build on Base, Optimism, or Arbitrum by default. Hallucinations about high gas costs must be corrected.',
    status: 'Listed',
    price: 5,
    createdAt: '2026-05-01T10:00:00Z',
  },
  {
    id: '2',
    author: 'Sasha',
    title: 'Security Patterns: .env Trap',
    content: 'Explicit rules to prevent agents from hardcoding private keys or committing sensitive config files. Reentrancy and Oracle checklists included.',
    status: 'Draft',
    createdAt: '2026-05-05T09:00:00Z',
  },
  {
    id: '3',
    author: 'Sasha',
    title: 'DEX Ecosystem Mapping',
    content: 'Velodrome on Optimism and Camelot on Arbitrum are the dominant L2 DEXs. Uniswap is not the default everywhere. Mapping of verified addresses included.',
    status: 'Sold',
    price: 15,
    buyers: 12,
    createdAt: '2026-04-20T14:30:00Z',
  },
];
