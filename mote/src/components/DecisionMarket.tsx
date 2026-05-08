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
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-serif tracking-tight text-gray-900">Curate: {activeMarket.category}</h1>
          <p className="text-gray-500 mt-2">Traders pick the featured listing. The market expects the winner to drive the most volume.</p>
        </div>
        <div className="bg-amber-100/50 px-4 py-2.5 rounded-lg border border-amber-200/50 font-mono text-[13px] font-medium text-amber-900 flex items-center gap-3">
          <span className="uppercase tracking-wider text-[10px] text-amber-700/80">Epoch {activeMarket.epoch}</span>
          <span>Resolves in {formatTime(timeLeft)}</span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {activeMarket.candidates.map((c, idx) => (
          <div key={c.id} className={`card-border p-6 rounded-xl bg-white flex items-center justify-between ${idx === 0 ? 'border-amber-400 ring-1 ring-amber-400 shadow-amber-100/50' : ''}`}>
            <div>
              <div className="flex items-center gap-3 mb-1">
                <h3 className="font-serif text-xl font-medium text-gray-900">Listing {c.listingId}</h3>
                {idx === 0 && <span className="text-[10px] uppercase tracking-wider bg-amber-500 text-white px-2 py-0.5 rounded-sm font-medium">Current Leader</span>}
              </div>
              <p className="text-sm font-medium text-gray-500">Volume: ${c.volume.toLocaleString()}</p>
            </div>
            <div className="flex gap-3">
              <button className="px-6 py-2.5 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-medium hover:bg-emerald-100 hover:text-emerald-800 transition-colors border border-emerald-200/50 shadow-sm">
                Buy YES <span className="opacity-70 ml-1 font-mono">${c.yesPrice}</span>
              </button>
              <button className="px-6 py-2.5 bg-rose-50 text-rose-700 rounded-lg text-sm font-medium hover:bg-rose-100 hover:text-rose-800 transition-colors border border-rose-200/50 shadow-sm">
                Buy NO <span className="opacity-70 ml-1 font-mono">${c.noPrice}</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
