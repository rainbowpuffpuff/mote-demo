import { useState, useEffect } from 'react';
import { 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { TrendingUp, ArrowUpRight, Clock, Info, ShieldCheck } from 'lucide-react';
import { activeMarket, type MarketCandidate } from '../seed/markets';
import { useStore } from '../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

export function DecisionMarket() {
  const [timeLeft, setTimeLeft] = useState(180);
  const { activePersona } = useStore();
  const [selectedCandidate, setSelectedCandidate] = useState<MarketCandidate | null>(null);
  const [tradeMode, setTradeMode] = useState<'YES' | 'NO'>('YES');
  const [amount, setTradeAmount] = useState<string>('10');
  
  // User positions
  const [positions, setPositions] = useState<Record<string, { YES: number, NO: number }>>({});
  
  // Mock live trades
  const [trades, setTrades] = useState<{ id: string, user: string, side: 'YES' | 'NO', price: number, amount: number, time: string }[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);

    // Simulate random trades coming in
    const tradeSimulator = setInterval(() => {
      const candidate = activeMarket.candidates[Math.floor(Math.random() * activeMarket.candidates.length)];
      const sides: ('YES' | 'NO')[] = ['YES', 'NO'];
      const side = sides[Math.floor(Math.random() * 2)];
      const price = side === 'YES' ? candidate.yesPrice : candidate.noPrice;
      
      const newTrade = {
        id: Math.random().toString(36).substr(2, 9),
        user: `0x${Math.random().toString(16).substr(2, 4)}...${Math.random().toString(16).substr(2, 4)}`,
        side,
        price,
        amount: Math.floor(Math.random() * 50) + 1,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      setTrades(prev => [newTrade, ...prev].slice(0, 10));
    }, 4000);

    return () => {
      clearInterval(timer);
      clearInterval(tradeSimulator);
    };
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleTrade = () => {
      if (!selectedCandidate) return;
      const numericAmount = parseFloat(amount);
      const price = tradeMode === 'YES' ? selectedCandidate.yesPrice : selectedCandidate.noPrice;
      const shares = numericAmount / price;

      const newTrade = {
          id: 'user-trade-' + Date.now(),
          user: activePersona,
          side: tradeMode,
          price,
          amount: numericAmount,
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
      };
      setTrades(prev => [newTrade, ...prev].slice(0, 10));
      
      setPositions(prev => ({
        ...prev,
        [selectedCandidate.id]: {
          ... (prev[selectedCandidate.id] || { YES: 0, NO: 0 }),
          [tradeMode]: (prev[selectedCandidate.id]?.[tradeMode] || 0) + shares
        }
      }));
  };

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12">
        <div>
          <div className="flex items-center gap-2 text-amber-600 font-semibold uppercase tracking-widest text-[11px] mb-2">
            <TrendingUp className="w-4 h-4" />
            Active Decision Market
          </div>
          <h1 className="text-4xl font-serif tracking-tight text-gray-900 mb-3">
            Highest Volume Mote: {activeMarket.category}
          </h1>
          <p className="text-gray-500 max-w-2xl text-pretty">
            Which insight fragment will generate the most USD volume by the end of Epoch {activeMarket.epoch}? 
            Payout is $1.00 per share for the winner, $0.00 otherwise.
          </p>
        </div>
        <div className="bg-white border card-border px-6 py-4 rounded-2xl flex items-center gap-8 shadow-sm">
          <div className="text-right border-r pr-8 border-gray-100">
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1 flex items-center justify-end gap-1">
              <Clock className="w-3 h-3" /> Time Remaining
            </div>
            <div className="text-2xl font-mono font-bold text-gray-900">{formatTime(timeLeft)}</div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-1 flex items-center justify-end gap-1">
               Market Resolution <Info className="w-3 h-3" />
            </div>
            <div className="text-sm font-medium text-gray-900">Highest Sale Volume</div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Candidates List */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 mb-4 px-2">Candidates</h3>
          {activeMarket.candidates.map((c) => (
            <motion.div 
              layoutId={c.id}
              key={c.id} 
              onClick={() => setSelectedCandidate(c)}
              className={`group card-border p-6 rounded-2xl bg-white flex flex-col gap-6 cursor-pointer transition-all ${selectedCandidate?.id === c.id ? 'ring-2 ring-blue-500 border-blue-500' : 'hover:border-gray-300'}`}
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h3 className="font-serif text-xl font-medium text-gray-900">{c.title}</h3>
                    <span className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter">ID: {c.listingId}</span>
                  </div>
                  <div className="flex items-center gap-4 text-[13px] font-medium text-gray-500">
                    <span className="flex items-center gap-1"><ArrowUpRight className="w-3 h-3 text-emerald-500" /> ${c.volume.toLocaleString()} Vol</span>
                    <span className="text-gray-300">|</span>
                    <span className="flex items-center gap-1 text-blue-500">${c.liquidity.toLocaleString()} Liquidity</span>
                    <span className="text-gray-300">|</span>
                    <span className="text-gray-400">{(c.yesPrice * 100).toFixed(0)}% Probability</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <div className="flex flex-col gap-1 items-center">
                    <div className="text-[9px] uppercase font-bold text-emerald-600 tracking-tighter">YES</div>
                    <div className="px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg text-sm font-bold border border-emerald-100 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                      ${c.yesPrice}
                    </div>
                  </div>
                  <div className="flex flex-col gap-1 items-center">
                    <div className="text-[9px] uppercase font-bold text-rose-600 tracking-tighter">NO</div>
                    <div className="px-4 py-2 bg-rose-50 text-rose-700 rounded-lg text-sm font-bold border border-rose-100 group-hover:bg-rose-500 group-hover:text-white transition-colors">
                      ${c.noPrice}
                    </div>
                  </div>
                </div>
              </div>

              {/* Mini Chart */}
              <div className="h-32 w-full opacity-60 group-hover:opacity-100 transition-opacity">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={c.priceHistory}>
                    <defs>
                      <linearGradient id={`colorPrice-${c.id}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={c.yesPrice > 0.5 ? "#10b981" : "#3b82f6"} stopOpacity={0.1}/>
                        <stop offset="95%" stopColor={c.yesPrice > 0.5 ? "#10b981" : "#3b82f6"} stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <Area 
                      type="monotone" 
                      dataKey="price" 
                      stroke={c.yesPrice > 0.5 ? "#10b981" : "#3b82f6"} 
                      strokeWidth={2}
                      fillOpacity={1} 
                      fill={`url(#colorPrice-${c.id})`} 
                    />
                    <Tooltip 
                       content={({ active, payload }) => {
                         if (active && payload && payload.length) {
                           return (
                             <div className="bg-gray-900 text-white px-2 py-1 rounded text-[10px] font-mono shadow-xl">
                               ${payload[0].value}
                             </div>
                           );
                         }
                         return null;
                       }}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Sidebar: Trading & Activity */}
        <div className="space-y-8">
          {/* Trading Interface */}
          <div className="card-border rounded-2xl bg-white p-8 sticky top-28 shadow-lg shadow-gray-200/40">
             {selectedCandidate ? (
               <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="font-semibold text-gray-900">Trade: {selectedCandidate.title}</h3>
                    <button onClick={() => setSelectedCandidate(null)} className="text-gray-400 hover:text-gray-600 text-xs uppercase font-bold tracking-widest">&times; Clear</button>
                  </div>

                  <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-6">
                    <button 
                      onClick={() => setTradeMode('YES')}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${tradeMode === 'YES' ? 'bg-emerald-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Buy YES
                    </button>
                    <button 
                      onClick={() => setTradeMode('NO')}
                      className={`flex-1 py-2.5 rounded-lg text-sm font-bold transition-all ${tradeMode === 'NO' ? 'bg-rose-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                      Buy NO
                    </button>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="text-[10px] uppercase font-bold text-gray-400 tracking-widest mb-2 block">Amount (USDC)</label>
                      <div className="relative">
                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</span>
                         <input 
                           type="number" 
                           value={amount}
                           onChange={(e) => setTradeAmount(e.target.value)}
                           className="w-full pl-8 pr-4 py-3 bg-gray-50 border border-gray-100 rounded-xl text-lg font-bold focus:ring-2 focus:ring-blue-500/20 focus:bg-white outline-none transition-all"
                         />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50/50 p-4 rounded-xl space-y-2 border border-gray-100">
                       <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Current Price</span>
                          <span className="font-bold text-gray-900">${tradeMode === 'YES' ? selectedCandidate.yesPrice : selectedCandidate.noPrice}</span>
                       </div>
                       <div className="flex justify-between text-xs">
                          <span className="text-gray-400">Potential Payout</span>
                          <span className="font-bold text-emerald-600">${(parseFloat(amount) / (tradeMode === 'YES' ? selectedCandidate.yesPrice : selectedCandidate.noPrice)).toFixed(2)}</span>
                       </div>
                       <div className="flex justify-between text-xs border-t border-gray-100 pt-2 mt-2">
                          <span className="text-gray-400 font-medium">Estimated ROI</span>
                          <span className="font-bold text-blue-600">
                             +{(((1 / (tradeMode === 'YES' ? selectedCandidate.yesPrice : selectedCandidate.noPrice)) - 1) * 100).toFixed(0)}%
                          </span>
                       </div>
                       <div className="flex justify-between text-[10px]">
                          <span className="text-gray-400">Price Impact</span>
                          <span className="text-gray-500">{(parseFloat(amount) / selectedCandidate.liquidity * 100).toFixed(4)}%</span>
                       </div>
                    </div>
                  </div>

                  <button 
                    onClick={handleTrade}
                    className={`w-full py-4 rounded-xl text-white font-bold tracking-wide shadow-lg transition-all active:scale-[0.98] ${tradeMode === 'YES' ? 'bg-emerald-500 shadow-emerald-500/20 hover:bg-emerald-600' : 'bg-rose-500 shadow-rose-500/20 hover:bg-rose-600'}`}
                  >
                    Place Trade
                  </button>
                  <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-widest flex items-center justify-center gap-1">
                    <ShieldCheck className="w-3 h-3" /> Secure Decision Settlement
                  </p>
               </>
             ) : (
               <div className="text-center py-12">
                  <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-4 border border-gray-100">
                    <TrendingUp className="w-6 h-6 text-gray-300" />
                  </div>
                  <h4 className="text-sm font-semibold text-gray-900 mb-1">Select a Candidate</h4>
                  <p className="text-xs text-gray-500">Pick a listing from the left to start trading.</p>
               </div>
             )}
          </div>

          {/* Activity Feed */}
          <div className="space-y-4">
             {Object.keys(positions).length > 0 && (
                <div className="mb-8">
                  <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-2 mb-4">Your Positions</h3>
                  <div className="bg-gray-900 rounded-2xl p-6 shadow-xl border border-gray-800">
                    {Object.entries(positions).map(([cid, pos]) => {
                      const candidate = activeMarket.candidates.find(c => c.id === cid);
                      return (
                        <div key={cid} className="flex justify-between items-center mb-4 last:mb-0 border-b border-gray-800 pb-4 last:border-0 last:pb-0">
                          <div>
                            <div className="text-xs font-bold text-white mb-1">{candidate?.title}</div>
                            <div className="flex gap-2">
                              {pos.YES > 0 && <span className="text-[10px] text-emerald-400 font-mono">{pos.YES.toFixed(1)} YES</span>}
                              {pos.NO > 0 && <span className="text-[10px] text-rose-400 font-mono">{pos.NO.toFixed(1)} NO</span>}
                            </div>
                          </div>
                          <div className="text-right">
                             <div className="text-[10px] text-gray-500 uppercase tracking-tighter mb-1">Value</div>
                             <div className="text-sm font-bold text-white">
                               ${((pos.YES * (candidate?.yesPrice || 0)) + (pos.NO * (candidate?.noPrice || 0))).toFixed(2)}
                             </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
             )}

             <h3 className="text-[11px] font-bold uppercase tracking-widest text-gray-400 px-2">Live Activity</h3>
             <div className="bg-white border card-border rounded-2xl overflow-hidden divide-y divide-gray-50 shadow-sm">
                <AnimatePresence initial={false}>
                  {trades.map((t) => (
                    <motion.div 
                      key={t.id}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      className="p-4 text-[12px] flex items-center justify-between hover:bg-gray-50 transition-colors"
                    >
                      <div>
                        <span className="font-mono text-blue-500">{t.user}</span>
                        <span className="text-gray-400 mx-2">bought</span>
                        <span className={`font-bold ${t.side === 'YES' ? 'text-emerald-600' : 'text-rose-600'}`}>{t.side}</span>
                      </div>
                      <div className="text-right">
                         <div className="font-bold text-gray-900">${t.amount} @ ${t.price}</div>
                         <div className="text-[9px] text-gray-400">{t.time}</div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
