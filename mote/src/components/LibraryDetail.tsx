import { useParams, Link } from 'react-router-dom';
import { listings } from '../seed/listings';
import { useStore } from '../store/useStore';

export function LibraryDetail() {
  const { id } = useParams();
  const listing = listings.find((l) => l.id === id);
  const isPurchased = useStore((state) => state.purchasedListings.includes(id || ''));

  if (!listing || !isPurchased) {
    return <div className="max-w-2xl mx-auto py-8">Listing not found or not purchased.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <div className="mb-6 flex justify-between items-center">
        <Link to="/library" className="text-sm text-gray-500 hover:text-gray-900">
          ← Back to Library
        </Link>
        <span className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-600">{listing.category}</span>
      </div>

      <h1 className="text-3xl font-serif mb-8">{listing.title}</h1>

      <div className="prose prose-stone font-serif leading-relaxed mb-12">
        <p>This is the full, decrypted content of the fragment. It was pulled from Swarm and decrypted using the key released during your purchase transaction.</p>
        <p><em>(Mock content for demo purposes. In production, this would be the actual text payload from the seller.)</em></p>
        <p>For this specific listing, the seller shared the following insight:</p>
        <blockquote className="border-l-4 border-amber-500 pl-4 italic bg-gray-50 p-4">
           The optimal path for capital efficiency in this scenario involves a nested strategy that minimizes slippage while maximizing the emission rate...
        </blockquote>
      </div>

      <div className="border-t pt-6 flex justify-between items-center text-sm">
        <div className="text-gray-500">
          Authored by <span className="font-medium text-gray-900">{listing.seller}</span>
        </div>
        <button className="text-gray-400 hover:text-gray-900 underline decoration-gray-300">
          Re-fetch from Swarm
        </button>
      </div>
    </div>
  );
}
