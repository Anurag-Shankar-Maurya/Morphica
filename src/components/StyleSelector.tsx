import React, { useState } from 'react';

interface StyleSelectorProps {
  setPrompt: (prompt: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ setPrompt }) => {
  // Predefined list of artistic styles for the dropdown
  const styleOptions = [
    "Select a Style", // Default option
    "oil painting",
    "cyberpunk",
    "watercolor",
    "photorealistic",
    "anime style",
    "pixel art",
    "surrealism",
    "baroque",
    "impressionistic",
    "sci-fi art"
  ];

  // State to control the select element's value
  const [selectedStyle, setSelectedStyle] = useState("Select a Style");

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStyle = e.target.value;
    if (newStyle && newStyle !== "Select a Style") {
      // Append the selected style to the current prompt
      setPrompt(prevPrompt =>prevPrompt.trim()? `${prevPrompt.trim()}\nFinal style for this image is now "${newStyle}".`: newStyle);
      // Reset the select element to the default option
      setSelectedStyle("Select a Style");
    }
  };

  return (
    <div className="mb-6 animate-fadeIn">
      <div className="relative group">
        <label htmlFor="styleSelect" className="block text-base font-semibold mb-2 text-gray-700 dark:text-gray-300 cursor-help">
          Select an Artistic Style:
        </label>
        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Choose a visual style to apply to the generated image.
        </span>
      </div>
      <select
        id="styleSelect"
        value={selectedStyle} // Controlled component
        onChange={handleStyleChange}
        className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-4 px-4 text-lg text-gray-700 dark:text-gray-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 transition-all duration-300"
      >
        {styleOptions.map((style, index) => (
          <option key={index} value={style} disabled={style === "Select a Style"}>
            {style}
          </option>
        ))}
      </select>
    </div>
  );
};

export default StyleSelector;