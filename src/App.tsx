import React from 'react';
import ImageGenerator from './components/ImageGenerator';
import { useTheme } from './context/ThemeContext';

function App() {
  const { theme } = useTheme();
  
  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      theme === 'dark' 
        ? 'bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100' 
        : 'bg-gradient-to-br from-blue-50 to-indigo-50 text-gray-800'
    }`}>
      <div className="container mx-auto px-4 py-8">
        <ImageGenerator />
      </div>
    </div>
  );
}

export default App;