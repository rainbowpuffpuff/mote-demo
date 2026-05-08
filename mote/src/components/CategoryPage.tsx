import { useParams, Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export function CategoryPage() {
  const { category } = useParams();
  const listings = useStore((state) => state.listings);
  
  const formattedCategory = category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  const categoryListings = listings.filter(
    l => l.category.toLowerCase() === formattedCategory?.toLowerCase()
  );

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-8 flex justify-between items-center">
        <div>
          <Link to="/market" className="text-[13px] font-medium text-gray-400 hover:text-gray-900 transition-colors uppercase tracking-widest flex items-center gap-2 mb-4">
            <span>&larr;</span> Back to Market
          </Link>
          <h1 className="text-4xl font-serif tracking-tight text-gray-900">{formattedCategory}</h1>
          <p className="text-gray-500 mt-2">Active listings in this category.</p>
        </div>
      </div>

      {categoryListings.length === 0 ? (
        <div className="text-center py-24 border border-dashed border-gray-300 rounded-xl">
          <p className="text-gray-500">No active listings in this category yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categoryListings.map((listing) => (
            <Link key={listing.id} to={`/market/listing/${listing.id}`} className="card-border p-6 rounded-xl bg-white block group flex flex-col h-full">
              <div className="mb-4 flex-1">
                <h3 className="font-serif text-lg text-gray-900 group-hover:text-gray-600 transition-colors mb-2 leading-tight">
                  "{listing.description.slice(0, 80)}..."
                </h3>
                <span className="text-[11px] font-medium tracking-wide uppercase text-amber-800 bg-amber-50 px-2 py-0.5 rounded-sm border border-amber-100/50">
                  {listing.category}
                </span>
              </div>
              <div className="pt-4 border-t border-gray-100 flex items-center justify-between mt-auto">
                <div className="text-[11px] text-gray-500 font-mono truncate max-w-[100px]">{listing.seller}</div>
                <div className="text-lg font-serif text-gray-900">${listing.price}</div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
