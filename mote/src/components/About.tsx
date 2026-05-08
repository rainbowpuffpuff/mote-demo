import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, ShieldCheck, TrendingUp, Users } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-gray-900 leading-tight mb-6">
          The Marketplace for Insights, Powered by Umia Protocol
        </h1>
        <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
          Mote solves the "lemons problem" for knowledge. By combining local AI processing, encrypted decentralized storage, and decision markets, we allow humans and agents to buy and sell the smallest economically valuable units of insight without ever spoiling the alpha before purchase.
        </p>
        <Link to="/vault" className="inline-flex items-center gap-2 mt-8 px-6 py-3 bg-gray-900 text-white rounded-lg font-medium tracking-wide shadow-md hover:bg-gray-800 transition-all active:scale-[0.98]">
          Enter the Demo <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="space-y-16">
        {/* Uniqueness / Problem Novelty */}
        <section className="card-border rounded-2xl bg-white p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <BrainCircuit className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-blue-50 rounded-lg text-blue-600"><BrainCircuit className="w-5 h-5" /></span>
              <h2 className="text-2xl font-serif text-gray-900">Uniqueness & Innovation</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              While the space of on-chain governance solutions is active, the underlying <strong>Umia Protocol</strong> carves out a distinct niche by identifying a core challenge in on-chain group coordination. Focused on what we term "Quantum Organisations," Umia introduces a fresh perspective to established governance issues.
            </p>
            <p className="text-gray-700 leading-relaxed">
              We leverage <strong>decision markets</strong> and <strong>Quantum Tokens</strong> to align incentives, rewarding accurate predictions about governance outcomes rather than relying on opaque voting. This mechanism provides a unique, full-stack framework for managing and funding crypto-native and AI-native organizations.
            </p>
          </div>
        </section>

        {/* Investment Thesis */}
        <section className="card-border rounded-2xl bg-white p-8 sm:p-10 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-5">
            <TrendingUp className="w-32 h-32" />
          </div>
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-amber-50 rounded-lg text-amber-600"><TrendingUp className="w-5 h-5" /></span>
              <h2 className="text-2xl font-serif text-gray-900">Investment Thesis & Market</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              Mote targets a significant and growing market driven by the explosion of AI agents requiring scalable on-chain capital and governance. As a first-mover in production decision-market governance, Umia establishes a massive competitive moat through an AI-native design (CLI interfaces, JSON feed outputs) integrated with legal and on-chain hybrid solutions.
            </p>
            <div className="bg-gray-50/80 border border-gray-200/60 rounded-xl p-6 mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-900 mb-3">The $UMIA Token Model</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Designed for sustainable value accrual, the $UMIA token captures fees from decision-market activity and venture creation. It grants robust utility, enabling participation in community track curation, fee parameter setting, and treasury deployment. Holders gain direct governance power and a diversified portfolio exposure to the entire launched ecosystem.
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Founders & Track Record */}
          <section className="card-border rounded-2xl bg-white p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Users className="w-5 h-5" /></span>
              <h2 className="text-xl font-serif text-gray-900">Founders & Track Record</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Our team brings diverse, deep domain expertise to the table. From strategic growth (NFTboi_ from Arch Network) and capital formation (Oxytocin), to rigorous academic and technical research (Moncesco from Chainbound, Ki Ageng Satria Pamungkas from Edinburgh University).
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              All founders prominently feature Umia Finance in their bios, indicating massive personal investment, commitment signals, and a high level of dedication to building a full-stack protocol with an ambitious, feasible roadmap—backed by MetaLeX and Certora.
            </p>
          </section>

          {/* Social Presence */}
          <section className="card-border rounded-2xl bg-white p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-rose-50 rounded-lg text-rose-600"><ShieldCheck className="w-5 h-5" /></span>
              <h2 className="text-xl font-serif text-gray-900">Social Presence & Authenticity</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              Our clear focus on building an "onchain venture creation layer for AI-native companies" resonates strongly online. With exceptional organic follower-to-following ratios, verified statuses, and highly engaging thought leadership on pricing ideas via GitHub, the audience authenticity is exceptionally high.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              The founders maintain strong public credibility, leveraging a combined following of over 100k+ to maintain visibility, attract genuine interest, and consistently communicate the core value proposition.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
