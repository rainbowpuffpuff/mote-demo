import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';

export function Market() {
  const categories = ['DeFi alpha', 'Yield farming', 'Productivity', 'Agent skills', 'Health', 'Career'];
  const listings = useStore((state) => state.listings);

  return (
    <div className="max-w-5xl mx-auto py-8">
      <div className="mb-12">
        <h1 className="text-4xl font-serif tracking-tight text-gray-900">Marketplace</h1>
        <p className="text-gray-500 mt-2">Browse insight fragments curated by the market.</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat) => {
          const slug = cat.toLowerCase().replace(' ', '-');
          const count = listings.filter((l) => l.category === cat).length;
          const isActive = count > 0;
          return (
            <Link 
              key={cat} 
              to={isActive ? `/market/${slug}` : '#'} 
              className={`card-border p-8 rounded-xl bg-white block ${!isActive ? 'opacity-50 cursor-not-allowed hover:border-gray-200 hover:shadow-none' : ''}`}
            >
              <h3 className="font-serif text-2xl text-gray-900 mb-2">{cat}</h3>
              <p className="text-sm font-medium text-gray-500">
                {isActive ? `${count} active listings` : 'Opening soon'}
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
