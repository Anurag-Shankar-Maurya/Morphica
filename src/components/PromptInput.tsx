import React from 'react';
import { Sparkles, X } from 'lucide-react';

interface PromptInputProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  maxLength: number;
  loadingInspireMe: boolean;
  anyLLMLoading: boolean;
  loadingImage: boolean;
  inspireMe: () => Promise<void>;
  clearPrompt: () => void;
}

const PromptInput: React.FC<PromptInputProps> = ({
  prompt,
  setPrompt,
  maxLength,
  loadingInspireMe,
  anyLLMLoading,
  loadingImage,
  inspireMe,
  clearPrompt
}) => {
  return (
    <div className="mb-6 animate-fadeIn">
      <div className="flex items-center justify-between mb-2">
        <div className="relative group">
          <label htmlFor="prompt" className="block text-base font-semibold text-gray-700 dark:text-gray-300 cursor-help">
            Enter your image prompt:
          </label>
          <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 bottom-full left-1/2 transform -translate-x-1/3 mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            Describe the image you want to generate in detail.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={inspireMe}
            disabled={anyLLMLoading || loadingImage}
            className="px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-bold rounded-full shadow-md hover:shadow-lg transform transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:opacity-50 disabled:cursor-not-allowed text-sm flex items-center"
          >
            {loadingInspireMe ? (
              <>
                <span className="animate-spin mr-2">⚙️</span> Inspiring...
              </>
            ) : (
              <>
                <Sparkles size={16} className="mr-1" /> Inspire Me
              </>
            )}
          </button>
          <button
            onClick={clearPrompt}
            disabled={!prompt.trim() || anyLLMLoading}
            className="p-2 rounded-full bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-white shadow-sm hover:bg-gray-400 dark:hover:bg-gray-600 transform transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-gray-400 disabled:opacity-50 disabled:cursor-not-allowed"
            aria-label="Clear prompt"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      <div className="relative">
        <textarea
          id="prompt"
          className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-4 px-4 text-lg text-gray-700 dark:text-gray-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-32 resize-none bg-gray-50 dark:bg-gray-700 transition-all duration-300"
          placeholder="e.g., A vibrant fantasy forest with glowing mushrooms and a hidden waterfall"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={maxLength}
        ></textarea>
        <div className="absolute bottom-3 right-3 text-sm text-gray-500 dark:text-gray-400">
          {prompt.length}/{maxLength}
        </div>
      </div>
    </div>
  );
};

export default PromptInput;