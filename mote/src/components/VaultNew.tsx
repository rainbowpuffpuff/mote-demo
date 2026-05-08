import { useState } from 'react';
import { Lock } from 'lucide-react';
import { AnalysisPanel } from './AnalysisPanel';

export function VaultNew() {
  const [content, setContent] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Mocked 2.4s analysis timeline
  };

  return (
    <div className="max-w-6xl mx-auto py-8">
      <div className="flex gap-16">
        <div className="flex-1">
          <h1 className="text-4xl font-serif tracking-tight text-gray-900 mb-8">New Fragment</h1>
          <input 
              type="text" 
              placeholder="Title (optional)" 
              className="w-full mb-6 p-4 border-b border-gray-300 focus:border-gray-900 outline-none text-xl font-serif bg-transparent transition-colors placeholder:text-gray-300"
          />
          <div className="relative">
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-[400px] p-6 card-border rounded-xl font-mono text-[13px] leading-relaxed mb-4 resize-none focus:outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100/50 bg-white"
              placeholder="Paste your insight fragment here..."
            />
            <div className="absolute bottom-10 right-6 flex justify-between w-[calc(100%-3rem)] text-[11px] font-medium tracking-wide text-gray-400 uppercase pointer-events-none">
              <span>{content.length} characters</span>
              <span className="flex items-center gap-1.5 text-amber-600/70"><Lock className="w-3 h-3" /> "This stays on your device."</span>
            </div>
          </div>
          <button
            onClick={handleAnalyze}
            disabled={content.length < 200 || analyzing}
            className="w-full py-4 bg-gray-900 text-white rounded-xl font-medium tracking-wide shadow-md disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none hover:bg-gray-800 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
          >
            {analyzing ? 'Running Gemma locally...' : 'Analyze locally'}
          </button>
        </div>
        <div className="w-96 pt-[88px]">
          <AnalysisPanel content={content} isAnalyzing={analyzing} />
        </div>
      </div>
    </div>
  );
}
