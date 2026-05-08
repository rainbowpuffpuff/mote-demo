export interface PricePoint {
  time: string;
  price: number;
}

export interface MarketCandidate {
  id: string;
  listingId: string;
  title: string;
  yesPrice: number; // 0 to 1 scale
  noPrice: number;  // 0 to 1 scale
  volume: number;
  liquidity: number; // Total USDC pooled
  priceHistory: PricePoint[];
}

export interface Market {
  category: string;
  epoch: number;
  deadline: string;
  candidates: MarketCandidate[];
  resolved: boolean;
}

const generateHistory = (startPrice: number): PricePoint[] => {
  const history: PricePoint[] = [];
  let currentPrice = startPrice;
  for (let i = 0; i < 20; i++) {
    currentPrice = Math.max(0.01, Math.min(0.99, currentPrice + (Math.random() - 0.5) * 0.1));
    history.push({ time: `${i}:00`, price: parseFloat(currentPrice.toFixed(2)) });
  }
  return history;
};

export const activeMarket: Market = {
  category: 'DeFi alpha',
  epoch: 42,
  deadline: '2026-05-15T00:00:00Z',
  resolved: false,
  candidates: [
    { 
      id: 'c1', 
      listingId: 'l1', 
      title: 'Yield Farm Optimization',
      yesPrice: 0.65, 
      noPrice: 0.35, 
      volume: 12500,
      liquidity: 45000,
      priceHistory: generateHistory(0.4)
    },
    { 
      id: 'c2', 
      listingId: 'l2', 
      title: 'Bridge Liquidity Risks',
      yesPrice: 0.38, 
      noPrice: 0.62, 
      volume: 8200,
      liquidity: 28000,
      priceHistory: generateHistory(0.3)
    },
    { 
      id: 'c3', 
      listingId: 'l3', 
      title: 'Tax Strategy 2026',
      yesPrice: 0.12, 
      noPrice: 0.88, 
      volume: 4500,
      liquidity: 12000,
      priceHistory: generateHistory(0.1)
    },
  ],
};
