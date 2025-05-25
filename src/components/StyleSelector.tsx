import React, { useState } from 'react';

interface StyleSelectorProps {
  styleSelected: string;
  setStyleSelected: (style: string) => void;
}

const StyleSelector: React.FC<StyleSelectorProps> = ({ styleSelected, setStyleSelected }) => {
  // Predefined list of artistic styles for the dropdown
  const styleOptions = [
    "Select a Style", // Default option
    "None", // Option to clear/unselect style
    "Oil Painting",
    "Watercolor",
    "Photorealistic",
    "Anime Style",
    "Cartoon",
    "Cyberpunk",
    "Neon Glow",
    "Pixel Art",
    "Isometric",
    "3D Render",
    "Cubism",
    "Surrealism",
    "Minimalist",
    "Line Art",
    "Sketch",
    "Cinematic",
    "Vibrant",
    "Grayscale",
    "Black and White",
    "Vintage",
    "Retro",
    "Gothic",
    "Futuristic",
    "Fantasy",
    "Sci-Fi",
    "Nature",
    "Impressionistic",
    "Abstract",
    "Pop Art",
    "Renaissance",
    "Street Art",
    "Art Nouveau",
    "Baroque",
    "Art Deco",
  ];

  const handleStyleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStyle = e.target.value;
    
    if (newStyle === "None") {
      // Clear the selected style by setting it to empty string
      setStyleSelected("");
    } else if (newStyle && newStyle !== "Select a Style") {
      // Set the selected style directly
      setStyleSelected(newStyle);
    }
  };

  // Determine what value to show in the select
  const getDisplayValue = () => {
    if (!styleSelected || styleSelected === "") {
      return "Select a Style";
    }
    return styleSelected;
  };

  return (
    <div className="mb-6 animate-fadeIn">
      <div className="relative group">
        <label htmlFor="styleSelect" className="block text-base font-semibold mb-2 text-gray-700 dark:text-gray-300 cursor-help">
          Select an Artistic Style:
        </label>
        <span className="absolute hidden group-hover:block bg-gray-800 text-white text-xs rounded py-1 px-2 z-10 bottom-full left-1/4 transform -translate-x-1/2 mb-2 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          Choose a visual style to apply to the generated image.
        </span>
      </div>
      <select
        id="styleSelect"
        value={getDisplayValue()} // Use helper function to determine display value
        onChange={handleStyleChange}
        className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-4 px-4 text-lg text-gray-700 dark:text-gray-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent bg-gray-50 dark:bg-gray-700 transition-all duration-300"
      >
        {styleOptions.map((style, index) => (
          <option 
            key={index} 
            value={style} 
            disabled={style === "Select a Style"}
            className={style === "None" ? "font-semibold text-red-600" : ""}
          >
            {style}
          </option>
        ))}
      </select>
      
      {/* Display current selection status */}
      {/* <div className="mt-2 text-sm text-gray-600 dark:text-gray-400">
        {styleSelected && styleSelected !== "" ? (
          <span className="flex items-center">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
            Current style: <strong className="ml-1">{styleSelected}</strong>
          </span>
        ) : (
          <span className="flex items-center">
            <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
            No style selected
          </span>
        )}
      </div> */}
    </div>
  );
};

export default StyleSelector;