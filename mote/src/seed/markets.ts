export interface MarketCandidate {
  id: string;
  listingId: string;
  yesPrice: number;
  noPrice: number;
  volume: number;
}

export interface Market {
  category: string;
  epoch: number;
  candidates: MarketCandidate[];
  resolved: boolean;
}

export const activeMarket: Market = {
  category: 'DeFi alpha',
  epoch: 42,
  resolved: false,
  candidates: [
    { id: 'c1', listingId: 'l1', yesPrice: 0.41, noPrice: 0.59, volume: 1200 },
    { id: 'c2', listingId: 'l2', yesPrice: 0.38, noPrice: 0.62, volume: 800 },
    { id: 'c3', listingId: 'l3', yesPrice: 0.21, noPrice: 0.79, volume: 450 },
  ],
};
