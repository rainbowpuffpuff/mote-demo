import { Link } from 'react-router-dom';
import { useStore } from '../store/useStore';
import { FragmentCard } from '../components/FragmentCard';

export function Vault() {
  const { fragments } = useStore();

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-serif">Sasha's Vault</h1>
        <Link to="/vault/new" className="px-4 py-2 bg-gray-900 text-white rounded-md text-sm hover:bg-gray-800">
          + New fragment
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fragments.map((f) => (
          <FragmentCard key={f.id} fragment={f} />
        ))}
      </div>
    </div>
  );
}
