import React, { useRef, useImperativeHandle, forwardRef } from 'react';
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
  uploadedImages: string[];
  setUploadedImages: (images: string[]) => void;
}

const PromptInput = forwardRef<HTMLTextAreaElement, PromptInputProps>(({
  prompt,
  setPrompt,
  maxLength,
  loadingInspireMe,
  anyLLMLoading,
  loadingImage,
  inspireMe,
  clearPrompt,
  uploadedImages,
  setUploadedImages
}, ref) => {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useImperativeHandle(ref, () => textareaRef.current as HTMLTextAreaElement);

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
          ref={textareaRef}
          id="prompt"
          className="shadow-sm appearance-none border border-gray-300 dark:border-gray-600 rounded-xl w-full py-4 px-4 text-lg text-gray-700 dark:text-gray-200 leading-relaxed focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent h-32 resize-none bg-gray-50 dark:bg-gray-700 transition-all duration-300"
          placeholder="e.g., A vibrant fantasy forest with glowing mushrooms and a hidden waterfall"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          maxLength={maxLength}
        ></textarea>
        {/* Image upload button positioned just above the character count */}
        <div className="absolute bottom-8 right-3 flex items-center space-x-2">
          <label
            htmlFor="image-upload"
            className="cursor-pointer p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
            title="Upload images"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-600 dark:text-gray-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3v4M8 3v4m-5 4h18"
              />
            </svg>
            <span className="sr-only">Upload images</span>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            multiple
            className="hidden"
            onChange={async (e) => {
              const files = e.target.files;
              if (!files) return;
              const base64Images: string[] = [];
              for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const base64 = await new Promise<string>((resolve, reject) => {
                  const reader = new FileReader();
                  reader.readAsDataURL(file);
                  reader.onload = () => {
                    const result = reader.result as string;
                    // Remove the data URL prefix to get only base64 string
                    const base64String = result.split(',')[1];
                    resolve(base64String);
                  };
                  reader.onerror = (error) => reject(error);
                });
                base64Images.push(base64);
              }
              setUploadedImages(base64Images);
            }}
          />
        </div>
        <div className="absolute bottom-3 right-3 text-sm text-gray-500 dark:text-gray-400">
          {prompt.length}/{maxLength}
        </div>
      </div>
    </div>
  );
});

export default PromptInput;
