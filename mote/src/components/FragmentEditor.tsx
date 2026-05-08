import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Lock } from 'lucide-react';
import { useStore } from '../store/useStore';

export function FragmentEditor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const fragments = useStore((state) => state.fragments);
  const addFragment = useStore((state) => state.addFragment);
  const updateFragment = useStore((state) => state.updateFragment);
  
  const existingFragment = id ? fragments.find(f => f.id === id) : null;

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (existingFragment) {
      setTitle(existingFragment.title);
      setContent(existingFragment.content);
    }
  }, [existingFragment]);

  const activePersona = useStore((state) => state.activePersona);

  const handleSaveDraft = () => {
    if (existingFragment) {
      updateFragment(existingFragment.id, { title, content });
      navigate('/vault');
    } else {
      const newId = `frag_${Date.now()}`;
      addFragment({
        id: newId,
        author: activePersona,
        title: title || 'Untitled Fragment',
        content,
        status: 'Draft',
        createdAt: new Date().toISOString(),
      });
      navigate('/vault');
    }
  };

  const handlePost = () => {
    // If it's new, save it first, then navigate to publish
    let targetId = existingFragment?.id;
    if (!targetId) {
      targetId = `frag_${Date.now()}`;
      addFragment({
        id: targetId,
        author: activePersona,
        title: title || 'Untitled Fragment',
        content,
        status: 'Draft',
        createdAt: new Date().toISOString(),
      });
    } else {
      updateFragment(targetId, { title, content });
    }
    navigate(`/vault/publish/${targetId}`);
  };

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex gap-16">
        <div className="flex-1">
          <h1 className="text-4xl font-serif tracking-tight text-gray-900 mb-8">
            {existingFragment ? 'Edit Fragment' : 'New Fragment'}
          </h1>
          <input 
              type="text" 
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
          <div className="flex gap-4">
            <button
              onClick={handleSaveDraft}
              disabled={content.length < 10}
              className="flex-1 py-4 bg-white text-gray-900 border border-gray-300 rounded-xl font-medium tracking-wide shadow-sm hover:bg-gray-50 transition-all active:scale-[0.99]"
            >
              Save Draft
            </button>
            <button
              onClick={handlePost}
              disabled={content.length < 10}
              className="flex-1 py-4 bg-gray-900 text-white rounded-xl font-medium tracking-wide shadow-md disabled:bg-gray-200 disabled:text-gray-400 disabled:shadow-none hover:bg-gray-800 transition-all active:scale-[0.99] flex items-center justify-center gap-2"
            >
              Post to Market
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
