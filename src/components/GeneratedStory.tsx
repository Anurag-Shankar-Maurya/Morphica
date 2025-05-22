import React from 'react';

interface GeneratedStoryProps {
  story: string;
}

const GeneratedStory: React.FC<GeneratedStoryProps> = ({ story }) => {
  return (
    <div className="mt-8 p-5 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-900/20 dark:to-amber-900/20 border border-orange-200 dark:border-orange-800/30 rounded-xl shadow-md animate-fadeIn">
      <h2 className="text-xl font-semibold text-orange-800 dark:text-orange-400 mb-4 flex items-center justify-center">
        <span className="bg-gradient-to-r from-orange-500 to-amber-500 h-1 w-12 rounded mr-3"></span>
        Story Context
        <span className="bg-gradient-to-r from-amber-500 to-orange-500 h-1 w-12 rounded ml-3"></span>
      </h2>
      <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-base italic">{story}</p>
    </div>
  );
};

export default GeneratedStory;