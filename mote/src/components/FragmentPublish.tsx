import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Sparkles, Check, ChevronRight } from 'lucide-react';
import { useStore } from '../store/useStore';

export function FragmentPublish() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { fragments, updateFragment, addListing } = useStore();
  const fragment = fragments.find((f) => f.id === id);

  const [analyzing, setAnalyzing] = useState(true);
  const [selectedDesc, setSelectedDesc] = useState<number>(0);
  const [customPrice, setCustomPrice] = useState<number | string>('');
  const [publishing, setPublishing] = useState(false);

  useEffect(() => {
    // Simulate Gemini 3.1 Flash Lite analysis taking 3 seconds
    const timer = setTimeout(() => {
      setAnalyzing(false);
      setCustomPrice(24); // Suggested price
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  if (!fragment) return <div className="p-8">Fragment not found.</div>;

  const mockDescriptions = [
    { tone: 'Objective', text: `An unverified user report claiming success with ${fragment.title || 'a specific farming strategy'}. Contains configuration details.` },
    { tone: 'Structural', text: `CLI commands and parameters for interacting with ${fragment.title || 'the terminal'}. Claims to achieve specific yield metrics.` },
    { tone: 'Empirical', text: `A brief log of a user executing a yield strategy on ${fragment.title || 'the mentioned network'}, including stated outcomes.` }
  ];

  const handlePublish = () => {
    setPublishing(true);
    setTimeout(() => {
      // Update fragment status
      updateFragment(fragment.id, { status: 'Listed', price: Number(customPrice) || 24 });
      
      // Add to marketplace listings
      addListing({
        id: fragment.id, // For demo, using same ID
        category: 'Agent skills', // Auto-categorized as Agent skills for this demo flow
        title: fragment.title,
        description: mockDescriptions[selectedDesc].text,
        price: Number(customPrice) || 24,
        aiPrice: 24, // Assuming the AI generated price is statically 24 for this demo
        seller: '0xSash...4a',
        createdAt: new Date().toISOString(),
      });
      
      navigate('/vault');
    }, 1500);
  };

  return (
    <div className="max-w-4xl mx-auto py-12">
      <div className="mb-12">
        <h1 className="text-4xl font-serif tracking-tight text-gray-900">Publish Fragment</h1>
        <p className="text-gray-500 mt-2">Prepare your insight for the Mote marketplace.</p>
      </div>

      {analyzing ? (
        <div className="card-border rounded-xl bg-white p-12 text-center flex flex-col items-center justify-center min-h-[400px]">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-blue-500 blur-xl opacity-20 rounded-full animate-pulse"></div>
            <Sparkles className="w-12 h-12 text-blue-600 relative z-10 animate-bounce" />
          </div>
          <h3 className="text-xl font-medium text-gray-900 mb-2">Analyzing locally</h3>
          <p className="text-gray-500 font-mono text-sm tracking-wide">Model: <span className="text-blue-600 font-semibold">gemini-3.1-flash-lite-preview</span></p>
          <div className="w-64 h-1 bg-gray-100 rounded-full mt-8 overflow-hidden">
            <div className="h-full bg-blue-500 animate-[pulse_2s_ease-in-out_infinite]" style={{ width: '60%' }}></div>
          </div>
          <p className="text-xs text-gray-400 mt-4 uppercase tracking-widest">Generating secure descriptions...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-8">
            <div>
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-4">Generated Descriptions</h3>
              <p className="text-sm text-gray-600 mb-4 leading-relaxed">Gemini generated these descriptions based on your content. The raw text remains encrypted and never leaves your device.</p>
              
              <div className="space-y-3">
                {mockDescriptions.map((desc, idx) => (
                  <div 
                    key={idx}
                    onClick={() => setSelectedDesc(idx)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedDesc === idx ? 'border-blue-500 bg-blue-50/30 shadow-sm ring-1 ring-blue-500/20' : 'border-gray-200 hover:border-blue-300'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[11px] font-medium uppercase tracking-wider text-blue-800 bg-blue-100/50 px-2 py-0.5 rounded-sm">{desc.tone}</span>
                      {selectedDesc === idx && <Check className="w-4 h-4 text-blue-600" />}
                    </div>
                    <p className="text-gray-800 font-serif text-sm leading-relaxed">{desc.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-8">
            <div className="card-border p-8 rounded-xl bg-gray-50/50">
              <h3 className="text-[11px] font-semibold uppercase tracking-widest text-gray-400 mb-6">Pricing & Category</h3>
              
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Suggested Category</label>
                <div className="bg-white border border-gray-200 px-4 py-2 rounded-lg text-sm font-medium text-gray-900 inline-block shadow-sm">
                  Agent skills
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Seller Asking Price (USDC)</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                  <input 
                    type="number" 
                    value={customPrice}
                    onChange={(e) => setCustomPrice(e.target.value)}
                    className="w-full pl-8 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-xl font-medium focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all shadow-sm"
                  />
                </div>
                <p className="text-[11px] text-gray-500 mt-3 uppercase tracking-wide leading-relaxed">
                  Gemini estimates the intrinsic value at <span className="font-semibold text-gray-900">$24</span> based on contained insights.<br/>
                  <span className="text-amber-600/90">Both the AI estimate and your asking price will be displayed to buyers.</span>
                </p>
              </div>
            </div>

            <button
              onClick={handlePublish}
              disabled={publishing}
              className="w-full py-4 bg-gray-900 text-white rounded-xl font-medium tracking-wide shadow-md disabled:bg-gray-200 disabled:text-gray-400 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              {publishing ? 'Encrypting & Posting to Swarm...' : 'Post to Market'}
              {!publishing && <ChevronRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
