import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { listings } from '../seed/listings';
import { Unlock } from 'lucide-react';

export function Library() {
  const purchasedListingsIds = useStore((state) => state.purchasedListings);
  
  const purchasedListings = purchasedListingsIds.map(id => listings.find(l => l.id === id)).filter(Boolean);

  if (purchasedListings.length === 0) {
    return (
      <div className="max-w-4xl mx-auto text-center py-24">
        <h1 className="text-2xl font-serif mb-4">Your Library</h1>
        <p className="text-gray-500">You haven't purchased any knowledge fragments yet.</p>
        <Link to="/market" className="inline-block mt-6 px-6 py-2 bg-gray-900 text-white rounded hover:bg-gray-800">
          Browse Marketplace
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-serif tracking-tight text-gray-900">Bo's Library</h1>
        <p className="text-gray-500 mt-2">Your purchased and decrypted insight fragments.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {purchasedListings.map((listing) => (
          <Link key={listing?.id} to={`/library/${listing?.id}`} className="card-border p-6 rounded-xl bg-white block group">
            <div className="flex justify-between items-start mb-4">
              <h3 className="font-serif text-xl text-gray-900 group-hover:text-gray-600 transition-colors">{listing?.title}</h3>
              <span className="text-[11px] font-medium tracking-wide uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100/50 flex items-center gap-1.5 shrink-0">
                <Unlock className="w-3 h-3" />
                Unlocked
              </span>
            </div>
            <p className="text-[13px] text-gray-600 mb-6 font-medium">
              {listing?.category}
            </p>
            <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
              <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                Purchased for ${listing?.price}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
