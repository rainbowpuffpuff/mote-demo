import type { Fragment } from '../seed/fragments';
import { Lock } from 'lucide-react';

export function FragmentCard({ fragment }: { fragment: Fragment }) {
  const getStatusPill = () => {
    switch (fragment.status) {
      case 'Draft': return <span className="text-[11px] font-medium tracking-wide uppercase text-gray-500 bg-gray-100 px-2.5 py-1 rounded-sm">Draft</span>;
      case 'Listed': return <span className="text-[11px] font-medium tracking-wide uppercase text-amber-800 bg-amber-50 px-2.5 py-1 rounded-sm border border-amber-100/50">Listed · ${fragment.price}</span>;
      case 'Sold': return <span className="text-[11px] font-medium tracking-wide uppercase text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-sm border border-emerald-100/50">Sold · ${fragment.price} · {fragment.buyers} buyers</span>;
    }
  };

  return (
    <div className="card-border p-6 rounded-xl bg-white cursor-pointer group">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-serif text-xl text-gray-900 group-hover:text-gray-600 transition-colors">{fragment.title}</h3>
        {getStatusPill()}
      </div>
      <p className="font-serif text-gray-600 italic mb-6 flex items-start gap-2 leading-relaxed text-pretty">
        <Lock className="w-3.5 h-3.5 mt-1 shrink-0 opacity-50" />
        {fragment.content.slice(0, 80)}...
      </p>
      <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
        <p className="text-[11px] font-medium text-gray-400 uppercase tracking-widest">
          {new Date(fragment.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
        </p>
      </div>
    </div>
  );
}
