export function AnalysisPanel({ content, isAnalyzing }: { content: string, isAnalyzing: boolean }) {
  if (!content && !isAnalyzing) {
    return (
      <div className="border border-dashed border-gray-300 p-6 rounded-lg text-sm text-gray-500">
        Mote will read this on-device and suggest a category, descriptions, and a fair price. Nothing leaves this machine.
      </div>
    );
  }

  if (isAnalyzing) {
    return (
      <div className="border border-gray-200 p-6 rounded-lg">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
          <div className="h-4 bg-gray-200 rounded"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="border border-gray-200 p-6 rounded-lg">
        <h3 className="font-medium mb-4">Analysis Result</h3>
        <div className="mb-4">
            <label className="text-xs text-gray-500">Category</label>
            <div className="bg-gray-100 p-2 rounded">DeFi alpha</div>
        </div>
        <div className="mb-4">
            <label className="text-xs text-gray-500">Descriptions</label>
            <div className="space-y-2 mt-1">
                {['Short', 'Medium', 'Long'].map(len => (
                    <div key={len} className="p-2 border rounded text-sm hover:border-amber-500 cursor-pointer">{len} tone</div>
                ))}
            </div>
        </div>
    </div>
  );
}
