import { JsonView, defaultStyles } from 'react-json-view-lite';
import 'react-json-view-lite/dist/index.css';
import { listings } from '../seed/listings';

export function AgentFeed() {
  const publicListings = listings.map(({ id, category, description, price, seller }) => ({
    id,
    category,
    description,
    price,
    seller,
    purchaseEndpoint: `https://mote.network/api/v1/purchase/${id}`,
  }));

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-serif mb-2">Agent Feed (JSON)</h1>
        <p className="text-sm text-gray-500">Read-only for the demo. Programmatic purchase comes after.</p>
      </div>

      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-gray-800">
        <div className="bg-gray-800 px-4 py-2 flex items-center gap-2 border-b border-gray-700">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-amber-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          <div className="font-mono text-xs text-gray-400 ml-4">
            curl https://mote.network/api/v1/listings
          </div>
        </div>
        <div className="p-6 overflow-auto max-h-[600px] text-sm">
          <JsonView
            data={publicListings}
            shouldExpandNode={() => true}
            style={{
              ...defaultStyles,
              container: '',
              basicChildStyle: 'ml-4',
              label: 'text-blue-400 font-mono',
              nullValue: 'text-gray-500 font-mono',
              undefinedValue: 'text-gray-500 font-mono',
              stringValue: 'text-green-400 font-mono',
              booleanValue: 'text-purple-400 font-mono',
              numberValue: 'text-amber-400 font-mono',
              otherValue: 'text-gray-400 font-mono',
              punctuation: 'text-gray-400 font-mono',
              collapseIcon: 'cursor-pointer text-gray-500 hover:text-gray-300',
              expandIcon: 'cursor-pointer text-gray-500 hover:text-gray-300',
              collapsedContent: 'text-gray-500 italic',
            }}
          />
        </div>
      </div>
    </div>
  );
}
