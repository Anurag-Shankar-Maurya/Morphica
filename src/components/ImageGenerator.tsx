import React, { useEffect, useRef } from 'react';
import PromptInput from './PromptInput';
import NegativePromptInput from './NegativePromptInput';
import StyleSelector from './StyleSelector';
import ActionsPanel from './ActionsPanel';
import ImageDisplay from './ImageDisplay';
import Header from './Header';
import SuggestedPrompts from './SuggestedPrompts';
import GeneratedStory from './GeneratedStory';
import ErrorMessage from './ErrorMessage';
import { useImageGeneration } from '../hooks/useImageGeneration';
import { useLLMOperations } from '../hooks/useLLMOperations';

const ImageGenerator: React.FC = () => {
  // Max character limits
  const MAX_PROMPT_LENGTH = 3000;
  const MAX_NEGATIVE_PROMPT_LENGTH = 500;
  
  // Refs for scrolling
  const suggestedPromptsRef = useRef<HTMLDivElement>(null);
  const generatedStoryRef = useRef<HTMLDivElement>(null);
  const generatedImageRef = useRef<HTMLDivElement>(null);
  const promptInputRef = useRef<HTMLTextAreaElement>(null);
  
  // Image generation state and functions
  const { 
    prompt, 
    setPrompt, 
    negativePrompt, 
    setNegativePrompt,
    styleSelected,
    setStyleSelected,
    imageUrl, 
    loadingImage,
    error,
    setError,
    generateImage,
    handleDownloadImage,
    showFullScreen,
    setShowFullScreen,
    uploadedImages,
    setUploadedImages
  } = useImageGeneration();

  
  // LLM operations state and functions
  const {
    suggestedPrompts,
    setSuggestedPrompts,
    generatedStory,
    setGeneratedStory,
    loadingPrompt,
    loadingSuggestions,
    loadingNegativePrompt,
    loadingInspireMe,
    loadingStory,
    anyLLMLoading,
    enhancePrompt,
    suggestPrompts,
    generateNegativePrompt,
    inspireMe,
    generateStory,
    clearLLMStates
  } = useLLMOperations({ prompt, setPrompt, setNegativePrompt, setError });
  
  // Helper functions
  const clearPrompt = () => {
    setPrompt('');
    clearLLMStates();
  };
  
  const clearNegativePrompt = () => {
    setNegativePrompt('');
  };
  
  // Scroll effects
  useEffect(() => {
    if (suggestedPrompts.length > 0 && suggestedPromptsRef.current) {
      suggestedPromptsRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [suggestedPrompts]);
  
  useEffect(() => {
    if (generatedStory && generatedStoryRef.current) {
      generatedStoryRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [generatedStory]);
  
  useEffect(() => {
    if (imageUrl && generatedImageRef.current) {
      generatedImageRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }, [imageUrl]);

  const handleSuggestedPromptSelect = () => {
    if (promptInputRef.current) {
      promptInputRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
      promptInputRef.current.focus();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      <div className="w-full max-w-3xl bg-white dark:bg-gray-800 rounded-2xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl">
        <Header />
        
        <div className="p-6 md:p-8">
          <PromptInput 
            ref={promptInputRef}
            prompt={prompt}
            setPrompt={setPrompt}
            maxLength={MAX_PROMPT_LENGTH}
            loadingInspireMe={loadingInspireMe}
            anyLLMLoading={anyLLMLoading}
            loadingImage={loadingImage}
            inspireMe={inspireMe}
            clearPrompt={clearPrompt}
            uploadedImages={uploadedImages}
            setUploadedImages={setUploadedImages}
          />
          
          <NegativePromptInput 
            negativePrompt={negativePrompt}
            setNegativePrompt={setNegativePrompt}
            maxLength={MAX_NEGATIVE_PROMPT_LENGTH}
            anyLLMLoading={anyLLMLoading}
            clearNegativePrompt={clearNegativePrompt}
          />
          
          <ActionsPanel 
            prompt={prompt}
            anyLLMLoading={anyLLMLoading}
            loadingImage={loadingImage}
            loadingPrompt={loadingPrompt}
            loadingSuggestions={loadingSuggestions}
            loadingNegativePrompt={loadingNegativePrompt}
            loadingStory={loadingStory}
            enhancePrompt={enhancePrompt}
            suggestPrompts={suggestPrompts}
            generateNegativePrompt={generateNegativePrompt}
            generateStory={generateStory}
            generateImage={generateImage}
            uploadedImages={uploadedImages}
          />
          
          <StyleSelector styleSelected={styleSelected} setStyleSelected={setStyleSelected} />
          
          {error && <ErrorMessage error={error} />}
          
          {suggestedPrompts.length > 0 && (
            <div ref={suggestedPromptsRef}>
              <SuggestedPrompts 
                suggestedPrompts={suggestedPrompts} 
                setPrompt={setPrompt} 
                setSuggestedPrompts={setSuggestedPrompts} 
                onSelect={handleSuggestedPromptSelect}
              />
            </div>
          )}
          
          {generatedStory && (
            <div ref={generatedStoryRef}>
              <GeneratedStory story={generatedStory} />
            </div>
          )}
          
          {imageUrl && (
            <div ref={generatedImageRef}>
              <ImageDisplay 
                imageUrl={imageUrl} 
                handleDownloadImage={handleDownloadImage}
                showFullScreen={showFullScreen}
                setShowFullScreen={setShowFullScreen}
                setError={setError}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
