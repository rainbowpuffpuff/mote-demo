import { useEffect, useState } from 'react';
import { Outlet, NavLink, useLocation, useNavigate } from 'react-router-dom';
import { useStore, type Persona } from '../store/useStore';

const navItems = [
  { label: 'Vault', path: '/vault' },
  { label: 'Market', path: '/market' },
  { label: 'Library', path: '/library' },
  { label: 'Curate', path: '/curate' },
  { label: 'Agent feed', path: '/agent' },
];

const personas: Persona[] = ['Sasha', 'Bo', 'Cee', 'Ari'];

export function AppShell() {
  const { activePersona, setActivePersona, resetDemo } = useStore();
  const location = useLocation();
  const navigate = useNavigate();
  const [showOverlay, setShowOverlay] = useState(true);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Hotkeys require Cmd/Ctrl
      if (e.metaKey || e.ctrlKey) {
        if (e.key === '/') {
          e.preventDefault();
          setShowOverlay((prev) => !prev);
        }
        if (['1', '2', '3', '4'].includes(e.key)) {
          e.preventDefault();
          const p = personas[parseInt(e.key) - 1];
          if (p) setActivePersona(p);
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [setActivePersona]);

  const handleReset = () => {
    resetDemo();
    navigate('/vault');
  };

  const currentActMap: Record<string, string> = {
    '/vault': 'Act 1: Seller (Sasha)',
    '/vault/new': 'Act 1: Seller (Sasha)',
    '/market': 'Act 2: Browse (Bo)',
    '/library': 'Act 3: Own (Bo)',
    '/curate': 'Act 4: Curate (Cee)',
    '/agent': 'Bonus: Agent Feed (Ari)',
  };

  const currentAct = Object.entries(currentActMap).find(([path]) => location.pathname.startsWith(path))?.[1] || 'Demo Mode';

  return (
    <div className="flex min-h-screen bg-white text-gray-900 font-sans relative">
      {/* Top Navbar */}
      <div className="absolute top-0 left-64 right-0 h-16 border-b flex items-center justify-between px-8 bg-white z-10">
        <div className="flex gap-2 bg-gray-100 p-1 rounded-md">
          {personas.map((p) => (
            <button
              key={p}
              onClick={() => setActivePersona(p)}
              className={`px-3 py-1 text-sm rounded transition-colors ${
                activePersona === p ? 'bg-white shadow-sm font-medium' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        
        {showOverlay && (
          <div className="flex items-center gap-4">
            <div className="text-xs bg-amber-100 text-amber-900 px-3 py-1.5 rounded-full font-medium">
              {currentAct}
            </div>
            <button
              onClick={handleReset}
              className="text-xs border px-3 py-1.5 rounded text-gray-600 hover:bg-gray-50 hover:text-red-600 transition-colors"
            >
              Reset demo
            </button>
          </div>
        )}
      </div>

      <nav className="w-64 border-r border-gray-200 p-8 pt-24 flex flex-col gap-10 bg-white shadow-[1px_0_10px_rgba(0,0,0,0.02)] z-0">
        <h1 className="font-serif text-4xl text-gray-900 tracking-tight">Mote<span className="text-amber-500">.</span></h1>
        <div className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2.5 rounded-lg transition-all duration-200 text-[13px] tracking-wide uppercase font-medium ${
                  isActive ? 'bg-gray-900 text-white shadow-md' : 'text-gray-500 hover:text-gray-900 hover:bg-gray-100'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      
      <main className="flex-1 pt-28 px-16 pb-16 overflow-y-auto bg-gray-50/30">
        <Outlet />
      </main>
    </div>
  );
}
