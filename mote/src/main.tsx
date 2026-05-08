import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { Vault } from './components/Vault';
import { VaultNew } from './components/VaultNew';
import { Market } from './components/Market';
import { DecisionMarket } from './components/DecisionMarket';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/vault" replace />} />
          <Route path="vault" element={<Vault />} />
          <Route path="vault/new" element={<VaultNew />} />
          <Route path="market" element={<Market />} />
          <Route path="market/:category" element={<div>Category Page</div>} />
          <Route path="library" element={<div>Library</div>} />
          <Route path="curate" element={<DecisionMarket />} />
          <Route path="curate/:category" element={<DecisionMarket />} />
          <Route path="agent" element={<div>Agent Feed</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
