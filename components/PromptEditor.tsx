
import React from 'react';

interface PromptEditorProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  onEdit: () => void;
  isLoading: boolean;
  disabled: boolean;
}

const suggestionPrompts = [
  'Remove the background',
  'Enhance photo quality',
  'Add a retro filter',
  'Make it look like a painting',
  'Add a dog wearing a hat',
  'Change the season to winter',
];

export const PromptEditor: React.FC<PromptEditorProps> = ({ prompt, setPrompt, onEdit, isLoading, disabled }) => {
  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700 flex flex-col gap-4">
      <div>
        <h2 className="text-lg font-semibold mb-2 text-white">2. Describe Your Edit</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., 'Add sunglasses to the person' or 'Make the sky look like a sunset'"
          rows={3}
          className="w-full bg-gray-900 border border-gray-600 rounded-md p-2 text-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-colors"
          disabled={disabled}
        />
      </div>
      
      <div>
        <h3 className="text-sm font-medium text-gray-400 mb-2">Suggestions</h3>
        <div className="flex flex-wrap gap-2">
          {suggestionPrompts.map((p) => (
            <button
              key={p}
              onClick={() => setPrompt(p)}
              disabled={disabled}
              className="px-3 py-1 text-xs bg-gray-700 text-gray-300 rounded-full hover:bg-purple-600 hover:text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {p}
            </button>
          ))}
        </div>
      </div>
      
      <button
        onClick={onEdit}
        disabled={isLoading || disabled || !prompt.trim()}
        className="w-full flex items-center justify-center gap-2 bg-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-purple-500 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <>
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Editing...
          </>
        ) : (
          'Generate Edit'
        )}
      </button>
    </div>
  );
};
