import React from 'react';
import { Wand2, Lightbulb, AlertOctagon, BookText, ImageIcon } from 'lucide-react';

interface ActionsPanelProps {
  prompt: string;
  anyLLMLoading: boolean;
  loadingImage: boolean;
  loadingPrompt: boolean;
  loadingSuggestions: boolean;
  loadingNegativePrompt: boolean;
  loadingStory: boolean;
  enhancePrompt: () => Promise<void>;
  suggestPrompts: () => Promise<void>;
  generateNegativePrompt: () => Promise<void>;
  generateStory: () => Promise<void>;
  generateImage: () => Promise<void>;
  uploadedImages: string[];
}

const ActionsPanel: React.FC<ActionsPanelProps> = ({
  prompt,
  anyLLMLoading,
  loadingImage,
  loadingPrompt,
  loadingSuggestions,
  loadingNegativePrompt,
  loadingStory,
  enhancePrompt,
  suggestPrompts,
  generateNegativePrompt,
  generateStory,
  generateImage,
  uploadedImages
}) => {
  return (
    <div className="mb-8 animate-fadeIn">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
        <button
          onClick={enhancePrompt}
          disabled={anyLLMLoading || loadingImage || !prompt.trim()}
          className="bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm flex items-center justify-center"
        >
          {loadingPrompt ? (
            <span className="animate-pulse">Enhancing...</span>
          ) : (
            <>
              <Wand2 size={16} className="mr-2" /> Enhance Prompt
            </>
          )}
        </button>
        <button
          onClick={suggestPrompts}
          disabled={anyLLMLoading || loadingImage || !prompt.trim()}
          className="bg-gradient-to-r from-green-500 to-teal-500 hover:from-green-600 hover:to-teal-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm flex items-center justify-center"
        >
          {loadingSuggestions ? (
            <span className="animate-pulse">Suggesting...</span>
          ) : (
            <>
              <Lightbulb size={16} className="mr-2" /> Suggest Prompts
            </>
          )}
        </button>
        <button
          onClick={generateNegativePrompt}
          disabled={anyLLMLoading || loadingImage || !prompt.trim()}
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm flex items-center justify-center"
        >
          {loadingNegativePrompt ? (
            <span className="animate-pulse">Generating...</span>
          ) : (
            <>
              <AlertOctagon size={16} className="mr-2" /> Generate Negative
            </>
          )}
        </button>
        <button
          onClick={generateStory}
          disabled={anyLLMLoading || loadingImage || !prompt.trim()}
          className="bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-600 hover:to-orange-600 text-white font-bold py-3 px-4 rounded-xl shadow-md hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-sm flex items-center justify-center"
        >
          {loadingStory ? (
            <span className="animate-pulse">Creating Story...</span>
          ) : (
            <>
              <BookText size={16} className="mr-2" /> Generate Story
            </>
          )}
        </button>
      </div>
      
      <button
        onClick={generateImage}
        disabled={loadingImage || anyLLMLoading || (!prompt.trim() && uploadedImages.length === 0)}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold py-4 px-6 rounded-xl shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 ease-in-out w-full disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-xl tracking-wide flex items-center justify-center"
      >
        {loadingImage ? (
          <span className="flex items-center">
            <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Generating Image...
          </span>
        ) : (
          <>
            <ImageIcon size={20} className="mr-2" /> Generate Image
          </>
        )}
      </button>
    </div>
  );
};

export default ActionsPanel;