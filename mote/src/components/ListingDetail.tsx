import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, Unlock, Key } from 'lucide-react';
import { useStore, PERSONA_DETAILS } from '../store/useStore';
import { createWalletClient, http, publicActions, keccak256, stringToBytes } from 'viem';
import { anvil } from 'viem/chains';
import { SKILLS_REGISTRY_ADDRESS, SKILLS_REGISTRY_ABI } from '../lib/contract';

export function ListingDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const listings = useStore((state) => state.listings);
  const listing = listings.find((l) => l.id === id);
  const purchaseListing = useStore((state) => state.purchaseListing);
  const activePersona = useStore((state) => state.activePersona);
  const activeDetails = PERSONA_DETAILS[activePersona];

  const [buyState, setBuyState] = useState<'idle' | 'wallet' | 'confirming' | 'key-release' | 'decrypting'>('idle');

  if (!listing) return <div>Listing not found</div>;

  const handleBuy = () => {
    setBuyState('wallet');
  };

  const handleSign = async () => {
    setBuyState('confirming');
    
    try {
      const client = createWalletClient({
        chain: anvil,
        transport: http('http://localhost:8545')
      }).extend(publicActions);

      const [address] = await client.getAddresses();
      const priceInWei = BigInt(listing.price) * BigInt(10**18);

      // Generate a mock hash for the listing ID for the contract call
      const bytes32Id = keccak256(stringToBytes(listing.id));

      await client.writeContract({
        address: SKILLS_REGISTRY_ADDRESS,
        abi: SKILLS_REGISTRY_ABI,
        functionName: 'purchaseFragment',
        args: [bytes32Id],
        account: address,
        value: priceInWei
      });

      // Flow continue
      setTimeout(() => {
        setBuyState('key-release');
        setTimeout(() => {
          setBuyState('decrypting');
          setTimeout(() => {
            purchaseListing(activePersona, listing.id);
            navigate(`/library/${listing.id}`);
          }, 600);
        }, 1200);
      }, 600);
    } catch (e) {
      console.error("Purchase failed:", e);
      setBuyState('idle');
      alert("Purchase failed. Check if Anvil is running.");
    }
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
        <div className="text-right flex items-center gap-6">
          <div className="relative group cursor-help text-right">
            <div className="text-[11px] font-semibold text-gray-400 uppercase tracking-widest mb-1">AI Estimate</div>
            <div className="text-2xl font-serif text-gray-400 line-through decoration-gray-300">
              ${listing.aiPrice || 24}
            </div>
            <div className="absolute hidden group-hover:block bottom-full right-0 mb-2 w-56 p-3 bg-gray-900 text-white text-[11px] uppercase tracking-wider rounded-md shadow-xl z-10 text-center">
              Intrinsic value estimated by local model
            </div>
          </div>
          <div className="w-px h-8 bg-gray-200"></div>
          <div className="text-right">
            <div className="text-[11px] font-semibold text-amber-600 uppercase tracking-widest mb-1">Asking Price</div>
            <div className="text-3xl font-serif text-gray-900">
              ${listing.price}
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
                className="bg-white border shadow-xl rounded-2xl p-8 w-96"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="font-semibold text-gray-900">Wallet Signature</h3>
                  <div className="flex items-center gap-1.5 px-2.5 py-1 bg-blue-50 rounded-full">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full animate-pulse" />
                    <span className="text-[11px] font-bold text-blue-600 uppercase tracking-tight">Mainnet</span>
                  </div>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider mb-2">Account</div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{activePersona}</div>
                          <div className="text-[11px] text-gray-500 font-mono">{activeDetails.address}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xs font-bold text-gray-900">${activeDetails.balance.toFixed(2)}</div>
                        <div className="text-[10px] text-gray-400">Balance</div>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100">
                    <div className="text-[10px] uppercase font-bold text-amber-600 tracking-wider mb-1">Contract Action</div>
                    <div className="text-sm font-medium text-amber-900 leading-tight">Purchase Knowledge Fragment: "{listing.title}"</div>
                    <div className="mt-3 flex justify-between items-end">
                      <div className="text-[10px] text-amber-600/70 italic">Escrow key-release authorized</div>
                      <div className="text-lg font-serif font-bold text-gray-900">${listing.price}</div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => setBuyState('idle')}
                    className="flex-1 py-3 px-4 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-xl text-sm font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSign}
                    className="flex-[2] py-3 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-semibold shadow-lg shadow-blue-500/20 transition-all active:scale-[0.98]"
                  >
                    Confirm & Pay
                  </button>
                </div>
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
