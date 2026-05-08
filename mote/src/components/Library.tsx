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
    <div className="max-w-4xl mx-auto">
      <h1 className="text-2xl font-serif mb-8">Bo's Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {purchasedListings.map((listing) => (
          <Link key={listing?.id} to={`/library/${listing?.id}`} className="border border-gray-200 p-4 rounded-lg hover:border-gray-300 transition-colors block">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium text-gray-900">{listing?.title}</h3>
              <span className="text-xs text-green-800 bg-green-50 px-2 py-0.5 rounded flex items-center gap-1">
                <Unlock className="w-3 h-3" />
                Unlocked
              </span>
            </div>
            <p className="text-sm text-gray-600 mb-2">
              {listing?.category}
            </p>
            <p className="text-xs text-gray-400">
              Purchased for ${listing?.price}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
