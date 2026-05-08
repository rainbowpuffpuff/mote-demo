import type { Fragment } from '../seed/fragments';
import { Lock } from 'lucide-react';

export function FragmentCard({ fragment }: { fragment: Fragment }) {
  const getStatusPill = () => {
    switch (fragment.status) {
      case 'Draft': return <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded">Draft</span>;
      case 'Listed': return <span className="text-xs text-amber-800 bg-amber-50 px-2 py-0.5 rounded">Listed · ${fragment.price}</span>;
      case 'Sold': return <span className="text-xs text-green-800 bg-green-50 px-2 py-0.5 rounded">Sold · ${fragment.price} · {fragment.buyers} buyers</span>;
    }
  };

  return (
    <div className="border border-gray-200 p-4 rounded-lg hover:border-gray-300 transition-colors cursor-pointer">
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{fragment.title}</h3>
        {getStatusPill()}
      </div>
      <p className="text-sm text-gray-600 italic mb-2 flex items-center gap-1">
        <Lock className="w-3 h-3" />
        {fragment.content.slice(0, 50)}...
      </p>
      <p className="text-xs text-gray-400">
        {new Date(fragment.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
}
