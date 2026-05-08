import { Outlet, NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Vault', path: '/vault' },
  { label: 'Market', path: '/market' },
  { label: 'Library', path: '/library' },
  { label: 'Curate', path: '/curate' },
  { label: 'Agent feed', path: '/agent' },
];

export function AppShell() {
  return (
    <div className="flex min-h-screen">
      <nav className="w-64 border-r border-gray-200 p-6 flex flex-col gap-8">
        <h1 className="font-serif text-2xl">Mote</h1>
        <div className="flex flex-col gap-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `px-4 py-2 rounded-md transition-colors ${
                  isActive ? 'bg-gray-100 font-medium' : 'text-gray-600 hover:bg-gray-50'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </div>
      </nav>
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}
