import { Link } from 'react-router-dom';
import { ArrowRight, BrainCircuit, ShieldCheck, TrendingUp, Users } from 'lucide-react';

export function About() {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
      <div className="mb-16">
        <h1 className="text-4xl sm:text-5xl font-serif tracking-tight text-gray-900 leading-tight mb-6">
          Mote: The Market for Insights
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
              <strong>Problem Novelty:</strong> The core problem of transacting sub-course knowledge fragments (single insights, alpha tips) is exceptionally forward-thinking. Current markets collapse because buyers cannot evaluate a paragraph without reading it, and once read, they no longer need to buy it.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Ecosystem Saturation:</strong> While creator economies exist, a decentralized, trustless marketplace for micro-insights is an emerging frontier. Our specific focus on AI-mediated discovery and encrypted storage carves out a highly unique niche.
            </p>
            <p className="text-gray-700 leading-relaxed">
              <strong>Solution Differentiation:</strong> Mote introduces a novel architecture: a local LLM reads the content to generate honest descriptions and fair pricing, ensuring the raw text never leaves the device before being encrypted and sent to Swarm.
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
              <h2 className="text-2xl font-serif text-gray-900">Investment Thesis & Token Model</h2>
            </div>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Market Opportunity:</strong> Mote targets a massive market at the intersection of the creator economy and AI agents. By tokenizing intellectual property with hybrid onchain rails, it appeals to every new AI/crypto project seeking scalable knowledge transfer.
            </p>
            <div className="bg-gray-50/80 border border-gray-200/60 rounded-xl p-6 mt-6">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-900 mb-3">The $MOTE Token</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                <strong>Token Utility & Moat:</strong> The $MOTE token aligns incentives across the ecosystem. It is used to participate in decision markets that curate category feeds (rewarding curators who predict high-volume listings) and captures fees from marketplace activity. Our AI-native design (CLI and agent-friendly outputs) establishes a strong competitive moat.
              </p>
            </div>
          </div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Founders & Track Record */}
          <section className="card-border rounded-2xl bg-white p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-emerald-50 rounded-lg text-emerald-600"><Users className="w-5 h-5" /></span>
              <h2 className="text-xl font-serif text-gray-900">Founders & Team</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              <strong>Track Record & Expertise:</strong> The team demonstrates exceptional proficiency in the core technologies relevant to autonomous AI agents, cryptography, and decentralized governance. Their established history in capital formation and technical research underpins a strong foundation.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Commitment Signals:</strong> Consistent engagement and a clear dedication to the AI and crypto spaces. The team's active development and rapid iteration on the Mote infrastructure highlight a highly feasible and ambitious roadmap.
            </p>
          </section>

          {/* Social Presence */}
          <section className="card-border rounded-2xl bg-white p-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="p-2 bg-rose-50 rounded-lg text-rose-600"><ShieldCheck className="w-5 h-5" /></span>
              <h2 className="text-xl font-serif text-gray-900">Social Presence</h2>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">
              <strong>Content Relevance:</strong> A clear focus on building a sustainable knowledge economy resonates strongly. Mote's messaging addresses the specific pain points of modern researchers and traders.
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">
              <strong>Audience Authenticity:</strong> High engagement metrics and organic growth driven by thought leadership in the decentralized AI and governance sectors. The public credibility of the team maintains visibility and community trust.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}