import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { FragmentCard } from '../components/FragmentCard';

export function Vault() {
  const { fragments } = useStore();

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex justify-between items-end mb-12">
        <div>
          <h1 className="text-4xl font-serif tracking-tight text-gray-900">Sasha's Vault</h1>
          <p className="text-gray-500 mt-2">Manage your local knowledge fragments and draft listings.</p>
        </div>
        <Link to="/vault/new" className="px-5 py-2.5 bg-gray-900 text-white rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors shadow-sm">
          + New fragment
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {fragments.map((f) => (
          <Link key={f.id} to={f.status === 'Draft' ? `/vault/edit/${f.id}` : '#'}>
            <FragmentCard fragment={f} />
          </Link>
        ))}
      </div>
    </div>
  );
}
