import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Key } from 'lucide-react';
import { useStore } from '../store/useStore';

export function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listings = useStore((state) => state.listings);
  const listing = listings.find((l) => l.id === id);
  const purchaseListing = useStore((state) => state.purchaseListing);

  const [buyState, setBuyState] = useState<'idle' | 'wallet' | 'confirming' | 'key-release' | 'decrypting'>('idle');

  if (!listing) return <div>Listing not found</div>;

  const handleBuy = () => {
    setBuyState('wallet');
  };

  const handleSign = () => {
    setBuyState('confirming');
    setTimeout(() => {
      setBuyState('key-release');
      setTimeout(() => {
        setBuyState('decrypting');
        setTimeout(() => {
          purchaseListing(listing.id);
          navigate(`/library/${listing.id}`);
        }, 600); // Decrypting -> Done
      }, 1200); // Key release -> Decrypting
    }, 600); // Confirming -> Key release
  };

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-8">
        <span className="text-[11px] font-semibold uppercase tracking-widest text-amber-900 bg-amber-100/50 px-3 py-1.5 rounded-full border border-amber-200/50">
          {listing.category}
        </span>
      </div>
      
      <h1 className="text-4xl sm:text-5xl font-serif text-gray-900 leading-[1.3] text-pretty mb-12">
        "{listing.description}"
      </h1>
      
      <div className="flex justify-between items-center py-6 border-y border-gray-200/80 mb-10">
        <div>
          <div className="text-sm font-medium text-gray-900 mb-0.5">{listing.seller}</div>
          <div className="text-[13px] text-gray-500 font-mono">Member since 2026</div>
        </div>
        <div className="text-right flex items-center gap-4">
          <div className="text-3xl font-serif text-gray-900 relative group cursor-help">
            ${listing.price}
            <div className="absolute hidden group-hover:block bottom-full right-0 mb-2 w-56 p-3 bg-gray-900 text-white text-[11px] uppercase tracking-wider rounded-md shadow-xl z-10 text-center">
              Price estimated by local model
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleBuy}
        className="w-full py-4 bg-gray-900 hover:bg-gray-800 text-white rounded-xl font-medium tracking-wide transition-all shadow-md hover:shadow-lg active:scale-[0.98]"
      >
        Buy & Decrypt (${listing.price})
      </button>

      <div className="mt-16 text-[13px] leading-relaxed text-gray-500 bg-gray-50/50 border border-gray-200/50 rounded-xl p-6">
        <h4 className="font-semibold text-gray-900 mb-3 uppercase tracking-wider text-[11px]">How trust is established</h4>
        <ul className="space-y-2">
          <li className="flex gap-3"><span className="text-amber-500/70">1.</span> Content is encrypted locally and replicated to Swarm.</li>
          <li className="flex gap-3"><span className="text-amber-500/70">2.</span> A local LLM generated the description above without leaking cleartext.</li>
          <li className="flex gap-3"><span className="text-amber-500/70">3.</span> Your payment releases the escrowed decryption key instantly.</li>
        </ul>
      </div>

      <AnimatePresence>
        {buyState !== 'idle' && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-white/90 backdrop-blur-sm z-50 flex items-center justify-center"
          >
            {buyState === 'wallet' && (
              <motion.div
                initial={{ scale: 0.95 }}
                animate={{ scale: 1 }}
                className="bg-white border shadow-xl rounded-xl p-6 w-80"
              >
                <h3 className="font-medium mb-4">MetaMask (Mock)</h3>
                <div className="bg-gray-50 p-3 rounded mb-4 text-sm font-mono break-all text-gray-600">
                  Buy {listing.id} for ${listing.price}
                </div>
                <button
                  onClick={handleSign}
                  className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-medium transition-colors"
                >
                  Sign & Pay
                </button>
              </motion.div>
            )}

            {buyState === 'confirming' && (
              <div className="text-center">
                <div className="w-4 h-4 bg-amber-500 rounded-full mx-auto mb-4 animate-ping" />
                <p className="font-medium">Waiting for confirmation</p>
                <p className="text-sm text-gray-500 mt-1">block 12,481,402</p>
              </div>
            )}

            {buyState === 'key-release' && (
              <div className="flex items-center gap-12 text-gray-800">
                <Lock className="w-12 h-12" />
                <motion.div
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <Key className="w-8 h-8 text-amber-500" />
                </motion.div>
                <Unlock className="w-12 h-12" />
              </div>
            )}

            {buyState === 'decrypting' && (
              <div className="max-w-md w-full p-8 text-center">
                <div className="h-6 bg-gray-200 rounded w-full mb-4 animate-pulse" />
                <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto animate-pulse" />
                <p className="mt-8 text-sm text-gray-500 font-medium animate-pulse">Decrypting locally...</p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
