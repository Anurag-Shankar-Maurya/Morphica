import React from 'react';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="relative overflow-hidden">
      <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 h-3"></div>
      <div className="flex justify-between items-center p-6 md:p-8">
        <h1 className="text-3xl md:text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
          MORPHIC: AI IMAGE GENERATOR
        </h1>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white shadow-md hover:scale-105 transform transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? (
            <Sun size={20} className="text-yellow-300" />
          ) : (
            <Moon size={20} className="text-indigo-700" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Header;