import React from 'react';
import { X } from 'lucide-react';

interface NegativePromptInputProps {
  negativePrompt: string;
  setNegativePrompt: (prompt: string) => void;
  maxLength: number;
  anyLLMLoading: boolean;
  clearNegativePrompt: () => void;
}

const NegativePromptInput: React.FC<NegativePromptInputProps> = ({
  negativePrompt,
  setNegativePrompt,
  maxLength,
  anyLLMLoading,
  clearNegativePrompt
}) => {
  return (
    <div className="mb-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div className="relative group">
          <label htmlFor="negativePrompt" className="block text-base font-semibold text-gray-700 dark:text-gray-300 cursor-help">
            Negative Prompt (elements to exclude):
          </label>
          <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Specify elements or qualities you want to avoid in the generated image.
          </span>
        </div>
        <button
          onClick={clearNegativePrompt}
          disabled={!negativePrompt.trim() || anyLLMLoading}
          className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm hover:bg-gray-400 dark:hover:bg-gray-600 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Clear negative prompt"
        >
          <X size={16} />
        </button>
      </div>
      <div className="relative">
        <textarea
          id="negativePrompt"
          className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-4 px-4 text-lg text-gray-700 dark:text-gray-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent h-20 resize-none bg-gray-50 dark:bg-gray-700 transition-all duration-300"
          placeholder="e.g., blurry, deformed, ugly, extra limbs, watermark"
          value={negativePrompt}
          onChange={(e) => setNegativePrompt(e.target.value)}
          maxLength={maxLength}
        ></textarea>
        <div className="absolute bottom-3 right-3 text-sm text-gray-500 dark:text-gray-400">
          {negativePrompt.length}/{maxLength}
        </div>
      </div>
    </div>
  );
};

export default NegativePromptInput;