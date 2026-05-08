import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export function LibraryDetail() {
  const { id } = useParams();
  const listings = useStore((state) => state.listings);
  const activePersona = useStore((state) => state.activePersona);
  const purchasedListingsMap = useStore((state) => state.purchasedListings);
  
  const listing = listings.find((l) => l.id === id);
  const isPurchased = (purchasedListingsMap[activePersona] || []).includes(id || '');

  if (!listing || !isPurchased) {
    return <div className="max-w-2xl mx-auto py-8">Listing not found or not purchased.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-10 flex justify-between items-center">
        <Link to="/library" className="text-[13px] font-medium text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest flex items-center gap-2">
          <span>&larr;</span> Back to Library
        </Link>
        <span className="text-[11px] font-semibold uppercase tracking-widest text-emerald-900 bg-emerald-100/50 px-3 py-1.5 rounded-full border border-emerald-200/50">
          {listing.category}
        </span>
      </div>

      <h1 className="text-4xl sm:text-5xl font-serif text-gray-900 leading-[1.2] text-pretty mb-12">
        {listing.title}
      </h1>

      <div className="prose prose-lg prose-stone font-serif leading-loose text-gray-800 mb-16 text-pretty">
        <p className="text-xl leading-relaxed text-gray-600 mb-8 italic">This is the full, decrypted content of the fragment. It was pulled from Swarm and decrypted using the key released during your purchase transaction.</p>
        <p className="text-sm text-gray-400 font-sans tracking-wide uppercase font-medium mb-10">(Mock content for demo purposes. In production, this would be the actual text payload from the seller.)</p>
        <p>For this specific listing, the seller shared the following insight:</p>
        <blockquote className="border-l-4 border-amber-500 pl-6 my-8 py-2 text-xl italic bg-gray-50/50 rounded-r-xl">
           The optimal path for capital efficiency in this scenario involves a nested strategy that minimizes slippage while maximizing the emission rate. Look closely at the delta between the primary and secondary pools during the epoch transition...
        </blockquote>
      </div>

      <div className="border-t border-gray-200/80 pt-8 flex justify-between items-center">
        <div className="text-[13px] text-gray-500">
          Authored by <span className="font-mono font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">{listing.seller}</span>
        </div>
        <button className="text-[13px] font-medium text-gray-400 hover:text-gray-900 transition-colors underline underline-offset-4 decoration-gray-300">
          Re-fetch from Swarm
        </button>
      </div>
    </div>
  );
}
