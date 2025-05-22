import React from 'react';

interface SuggestedPromptsProps {
  suggestedPrompts: string[];
  setPrompt: (prompt: string) => void;
  setSuggestedPrompts: (prompts: string[]) => void;
}

const SuggestedPrompts: React.FC<SuggestedPromptsProps> = ({
  suggestedPrompts,
  setPrompt,
  setSuggestedPrompts
}) => {
  return (
    <div className="mt-8 animate-fadeIn">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-4 flex items-center justify-center">
        <span className="bg-gradient-to-r from-green-500 to-teal-500 h-1 w-12 rounded mr-3"></span>
        Suggested Prompts
        <span className="bg-gradient-to-r from-teal-500 to-green-500 h-1 w-12 rounded ml-3"></span>
      </h2>
      <div className="flex flex-col gap-3">
        {suggestedPrompts.map((suggestion, index) => (
          <button
            key={index}
            onClick={() => {
              setPrompt(suggestion);
              setSuggestedPrompts([]);
            }}
            className="bg-gradient-to-r from-green-50 to-teal-50 dark:from-green-900/20 dark:to-teal-900/20 hover:from-green-100 hover:to-teal-100 dark:hover:from-green-900/30 dark:hover:to-teal-900/30 text-gray-800 dark:text-gray-200 text-left py-3 px-4 rounded-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-green-400 dark:focus:ring-green-500 shadow-sm hover:shadow-md transform hover:-translate-y-1 text-base"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SuggestedPrompts;