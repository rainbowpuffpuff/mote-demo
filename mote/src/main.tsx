import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppShell } from './components/AppShell';
import { Vault } from './components/Vault';
import { FragmentEditor } from './components/FragmentEditor';
import { FragmentPublish } from './components/FragmentPublish';
import { Market } from './components/Market';
import { CategoryPage } from './components/CategoryPage';
import { DecisionMarket } from './components/DecisionMarket';
import { ListingDetail } from './components/ListingDetail';
import { Library } from './components/Library';
import { LibraryDetail } from './components/LibraryDetail';
import { AgentFeed } from './components/AgentFeed';
import { About } from './components/About';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppShell />}>
          <Route index element={<Navigate to="/about" replace />} />
          <Route path="about" element={<About />} />
          <Route path="vault" element={<Vault />} />
          <Route path="vault/new" element={<FragmentEditor />} />
          <Route path="vault/edit/:id" element={<FragmentEditor />} />
          <Route path="vault/publish/:id" element={<FragmentPublish />} />
          <Route path="market" element={<Market />} />
          <Route path="market/:category" element={<CategoryPage />} />
          <Route path="market/listing/:id" element={<ListingDetail />} />
          <Route path="library" element={<Library />} />
          <Route path="library/:id" element={<LibraryDetail />} />
          <Route path="curate" element={<DecisionMarket />} />
          <Route path="curate/:category" element={<DecisionMarket />} />
          <Route path="agent" element={<AgentFeed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
