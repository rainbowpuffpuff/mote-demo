import { Link } from 'react-router-dom';
import { listings } from '../seed/listings';

export function Market() {
  const categories = ['DeFi alpha', 'Personal finance', 'Productivity', 'Health', 'Relationships', 'Career'];

  return (
    <div className="max-w-6xl mx-auto">
      <h1 className="text-2xl font-serif mb-8">Marketplace</h1>
      <div className="grid grid-cols-3 gap-6">
        {categories.map((cat) => {
          const slug = cat.toLowerCase().replace(' ', '-');
          return (
            <Link key={cat} to={`/market/${slug}`} className="border p-6 rounded-lg hover:border-gray-400 transition-colors">
              <h3 className="font-medium text-lg">{cat}</h3>
              <p className="text-xs text-gray-400 mt-2">
                {listings.filter((l) => l.category === cat).length} active listings
              </p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
