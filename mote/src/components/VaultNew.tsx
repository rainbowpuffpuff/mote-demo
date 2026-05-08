import { useState } from 'react';
import { AnalysisPanel } from './AnalysisPanel';

export function VaultNew() {
  const [content, setContent] = useState('');
  const [analyzing, setAnalyzing] = useState(false);

  const handleAnalyze = () => {
    setAnalyzing(true);
    // Mocked 2.4s analysis timeline
  };

  return (
    <div className="max-w-6xl mx-auto flex gap-12">
      <div className="flex-1">
        <h1 className="text-2xl font-serif mb-6">New Fragment</h1>
        <input 
            type="text" 
            placeholder="Title (optional)" 
            className="w-full mb-4 p-2 border rounded-md"
        />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-96 p-4 border rounded-md font-mono text-sm mb-2"
          placeholder="Paste your fragment here..."
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{content.length} characters</span>
          <span>"This stays on your device."</span>
        </div>
        <button
          onClick={handleAnalyze}
          disabled={content.length < 200 || analyzing}
          className="mt-6 w-full py-3 bg-gray-900 text-white rounded-md disabled:bg-gray-300"
        >
          {analyzing ? 'Running Gemma locally...' : 'Analyze locally'}
        </button>
      </div>
      <div className="w-96">
        <AnalysisPanel content={content} isAnalyzing={analyzing} />
      </div>
    </div>
  );
}
