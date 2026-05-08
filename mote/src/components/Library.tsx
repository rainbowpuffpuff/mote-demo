import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { Unlock, PenTool } from 'lucide-react';
export function Library() {
  const purchasedListingsMap = useStore((state) => state.purchasedListings);
  const listings = useStore((state) => state.listings);
  const fragments = useStore((state) => state.fragments);
  const activePersona = useStore((state) => state.activePersona);

  const purchasedListingsIds = purchasedListingsMap[activePersona] || [];
  const purchasedListings = purchasedListingsIds.map(id => listings.find(l => l.id === id)).filter(Boolean);

  const authoredFragments = fragments.filter(f => f.author === activePersona);

  const hasContent = purchasedListings.length > 0 || authoredFragments.length > 0;

  if (!hasContent) {
    return (
      <div className="max-w-4xl mx-auto text-center py-32">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-100">
           <Unlock className="w-8 h-8 text-gray-200" />
        </div>
        <h1 className="text-3xl font-serif mb-4">{activePersona}'s Library</h1>
        <p className="text-gray-500 max-w-sm mx-auto leading-relaxed">Your library is currently empty. Purchase insights from the market or create your own in the vault.</p>
        <Link to="/market" className="inline-block mt-10 px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-all shadow-md">
          Explore the Market
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-16">
        <h1 className="text-4xl font-serif tracking-tight text-gray-900">{activePersona}'s Library</h1>
        <p className="text-gray-500 mt-2">Access your decrypted insights and authored knowledge.</p>
      </div>
      
      {purchasedListings.length > 0 && (
        <div className="mb-20">
          <div className="flex items-center gap-3 mb-8">
             <h2 className="text-2xl font-serif text-gray-900">Purchased Insights</h2>
             <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 text-[10px] font-bold uppercase tracking-widest rounded border border-emerald-100">Decrypted</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {purchasedListings.map((listing) => (
              <Link key={listing?.id} to={`/library/${listing?.id}`} className="card-border p-8 rounded-2xl bg-white block group hover:ring-2 hover:ring-emerald-500/10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-serif text-2xl text-gray-900 group-hover:text-gray-600 transition-colors leading-tight">"{listing?.title}"</h3>
                  <Unlock className="w-5 h-5 text-emerald-500 shrink-0 mt-1" />
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                  <span className="text-[11px] font-medium tracking-wide uppercase text-gray-400">{listing?.category}</span>
                  <p className="text-[11px] font-bold text-gray-900 uppercase tracking-widest">
                    Cost: ${listing?.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}

      {authoredFragments.length > 0 && (
        <div>
          <div className="flex items-center gap-3 mb-8">
             <h2 className="text-2xl font-serif text-gray-900">Authored Work</h2>
             <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-[10px] font-bold uppercase tracking-widest rounded border border-blue-100">Vault</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {authoredFragments.map((fragment) => (
              <Link key={fragment.id} to={fragment.status === 'Draft' ? `/vault/edit/${fragment.id}` : '#'} className="card-border p-8 rounded-2xl bg-white block group hover:ring-2 hover:ring-blue-500/10">
                <div className="flex justify-between items-start mb-6">
                  <h3 className="font-serif text-2xl text-gray-900 group-hover:text-gray-600 transition-colors leading-tight">{fragment.title}</h3>
                  <PenTool className="w-5 h-5 text-blue-400 shrink-0 mt-1" />
                </div>
                <div className="flex items-center justify-between pt-6 border-t border-gray-50">
                   <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded ${fragment.status === 'Listed' ? 'bg-amber-50 text-amber-700' : 'bg-gray-50 text-gray-500'}`}>
                     {fragment.status}
                   </span>
                   <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
                    {new Date(fragment.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

