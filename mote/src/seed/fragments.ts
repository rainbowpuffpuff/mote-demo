export type FragmentStatus = 'Draft' | 'Listed' | 'Sold';

export interface Fragment {
  id: string;
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
    title: 'Yield Farming Strategy',
    content: 'The secret is in the liquidity pair...',
    status: 'Listed',
    price: 24,
    createdAt: '2026-05-01T10:00:00Z',
  },
  {
    id: '2',
    title: 'Productivity Hack',
    content: 'Focus only on the most complex task...',
    status: 'Draft',
    createdAt: '2026-05-05T09:00:00Z',
  },
  {
    id: '3',
    title: 'DeFi Alpha Tip',
    content: 'Watch the whale movements on...',
    status: 'Sold',
    price: 50,
    buyers: 2,
    createdAt: '2026-04-20T14:30:00Z',
  },
];
