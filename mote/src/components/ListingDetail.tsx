import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Key } from 'lucide-react';
import { listings } from '../seed/listings';
import { useStore } from '../store/useStore';

export function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
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
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-4">
        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{listing.category}</span>
      </div>
      <h1 className="text-3xl font-serif leading-relaxed mb-6">{listing.description}</h1>
      <div className="flex justify-between items-center border-y py-4 mb-8">
        <div>
          <div className="text-sm font-medium">{listing.seller}</div>
          <div className="text-xs text-gray-500">Member since early 2026</div>
        </div>
        <div className="text-right">
          <div className="text-2xl font-serif relative group cursor-help">
            ${listing.price}
            <div className="absolute hidden group-hover:block bottom-full right-0 mb-2 w-48 p-2 bg-gray-900 text-white text-xs rounded">
              Estimated by seller's local model
            </div>
          </div>
        </div>
      </div>

      <button
        onClick={handleBuy}
        className="w-full py-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors"
      >
        Buy for ${listing.price}
      </button>

      <div className="mt-12 text-sm text-gray-500 border border-gray-200 rounded-lg p-4">
        <h4 className="font-medium text-gray-700 mb-2">How this works</h4>
        <ul className="list-disc list-inside space-y-1">
          <li>Content is encrypted and stored on Swarm.</li>
          <li>Your payment releases the decryption key.</li>
          <li>Mote decrypts the content locally in your browser.</li>
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
