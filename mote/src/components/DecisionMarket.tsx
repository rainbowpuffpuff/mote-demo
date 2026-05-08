import { useState, useEffect } from 'react';
import { activeMarket } from '../seed/markets';

export function DecisionMarket() {
  const [timeLeft, setTimeLeft] = useState(180); // 3-minute demo countdown

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setInterval(() => setTimeLeft((t) => t - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif">Curate: {activeMarket.category}</h1>
        <div className="bg-amber-100 px-4 py-2 rounded-full font-mono text-amber-900">
          Epoch {activeMarket.epoch} · Resolves in {formatTime(timeLeft)}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {activeMarket.candidates.map((c) => (
          <div key={c.id} className="border p-4 rounded-lg flex items-center justify-between">
            <div>
              <h3 className="font-medium">Listing {c.listingId}</h3>
              <p className="text-sm text-gray-500">Volume: ${c.volume}</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-green-100 text-green-800 rounded text-sm hover:bg-green-200">
                Buy YES (${c.yesPrice})
              </button>
              <button className="px-3 py-1 bg-red-100 text-red-800 rounded text-sm hover:bg-red-200">
                Buy NO (${c.noPrice})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
