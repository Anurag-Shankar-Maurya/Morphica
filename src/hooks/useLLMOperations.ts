import { useState, useCallback } from 'react';

interface LLMOperationsProps {
  prompt: string;
  setPrompt: (prompt: string) => void;
  setNegativePrompt: (prompt: string) => void;
  setError: (error: string) => void;
}

export const useLLMOperations = ({ 
  prompt, 
  setPrompt, 
  setNegativePrompt, 
  setError 
}: LLMOperationsProps) => {
  // State for LLM operations
  const [suggestedPrompts, setSuggestedPrompts] = useState<string[]>([]);
  const [generatedStory, setGeneratedStory] = useState('');
  const [loadingPrompt, setLoadingPrompt] = useState(false);
  const [loadingSuggestions, setLoadingSuggestions] = useState(false);
  const [loadingNegativePrompt, setLoadingNegativePrompt] = useState(false);
  const [loadingInspireMe, setLoadingInspireMe] = useState(false);
  const [loadingStory, setLoadingStory] = useState(false);
  
  // Helper function to clear LLM-related states
  const clearLLMStates = useCallback(() => {
    setError('');
    setSuggestedPrompts([]);
    setGeneratedStory('');
  }, [setError]);
  
  // Helper function to make LLM API calls
  const callLLMAPI = useCallback(async (prompt: string, apiKey = "") => {
    let chatHistory = [];
    chatHistory.push({ role: "user", parts: [{ text: prompt }] });

    const payload = { contents: chatHistory };
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
    }

    const result = await response.json();

    if (result.candidates && result.candidates.length > 0 &&
        result.candidates[0].content && result.candidates[0].content.parts &&
        result.candidates[0].content.parts.length > 0) {
      return result.candidates[0].content.parts[0].text;
    }
    
    throw new Error('No valid response received from the LLM.');
  }, []);
  
  /**
   * Asynchronously enhances the current positive prompt using the Gemini API (LLM).
   */
  const enhancePrompt = async () => {
    clearLLMStates();
    setLoadingPrompt(true);

    try {
      const llmPrompt = `As a creative prompt engineer for an AI image generator, expand and make the following short description more detailed, imaginative, and suitable for generating a visually rich image. Focus on adding descriptive adjectives, settings, lighting, and mood. Do not include any conversational text, just the enhanced prompt.
      
      Original prompt: "${prompt}"

      Maximum generated prompt length including white spaces must be less than: "${500}"
      
      Enhanced prompt:`;

      const enhancedText = await callLLMAPI(llmPrompt);
      setPrompt(enhancedText.trim());
    } catch (err) {
      console.error('Error enhancing prompt:', err);
      setError(`Failed to enhance prompt: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoadingPrompt(false);
    }
  };
  
  /**
   * Asynchronously suggests related prompts using the Gemini API (LLM).
   */
  const suggestPrompts = async () => {
    clearLLMStates();
    setLoadingSuggestions(true);

    try {
      const llmPrompt = `Given the image generation prompt: "${prompt}", Maximum generated prompt length including white spaces must be less than: "${500}", generate 3 distinct and creative alternative or related prompts that could lead to interesting AI-generated images. Each prompt should be concise and visually descriptive. List them, one per line, without any numbering or introductory/concluding phrases.`;

      const rawSuggestions = await callLLMAPI(llmPrompt);
      const parsedSuggestions = rawSuggestions.split('\n').map(s => s.trim()).filter(s => s.length > 0);
      setSuggestedPrompts(parsedSuggestions);
    } catch (err) {
      console.error('Error suggesting prompts:', err);
      setError(`Failed to suggest prompts: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoadingSuggestions(false);
    }
  };
  
  /**
   * Asynchronously generates a negative prompt using the Gemini API (LLM).
   */
  const generateNegativePrompt = async () => {
    clearLLMStates();
    setLoadingNegativePrompt(true);

    try {
      const llmPrompt = `Based on the positive image generation prompt: "${prompt}", Maximum generated prompt length including white spaces must be less than: "${200}", suggest common elements or visual artifacts that might appear unintentionally and should be excluded from the generated image. Focus on general undesirable qualities. List them as comma-separated keywords or short phrases. Do not include any conversational text, just the comma-separated list.`;

      const negativeText = await callLLMAPI(llmPrompt);
      setNegativePrompt(negativeText.trim());
    } catch (err) {
      console.error('Error generating negative prompt:', err);
      setError(`Failed to generate negative prompt: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoadingNegativePrompt(false);
    }
  };
  
  /**
   * Asynchronously generates an inspiring prompt using the Gemini API (LLM).
   */
  const inspireMe = async () => {
    clearLLMStates();
    setLoadingInspireMe(true);

    try {
      const llmPrompt = `Generate a single, unique, and creative image generation prompt, Maximum generated prompt length including white spaces must be less than: "${500}". This prompt should be visually rich and evocative, covering a vast and unpredictable range of themes, styles, and subjects. Do not include any conversational text, just the prompt itself.`;

      const inspiredPrompt = await callLLMAPI(llmPrompt);
      setPrompt(inspiredPrompt.trim());
    } catch (err) {
      console.error('Error generating inspiring prompt:', err);
      setError(`Failed to generate inspiring prompt: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoadingInspireMe(false);
    }
  };
  
  /**
   * Asynchronously generates a short story based on the prompt using the Gemini API (LLM).
   */
  const generateStory = async () => {
    clearLLMStates();
    setLoadingStory(true);

    try {
      const llmPrompt = `Write a short, creative, and evocative story or descriptive context (around 50-100 words) for an image with the following main subject/theme: "${prompt}". Focus on setting a mood, providing a brief narrative, or describing the scene in more detail. Do not include any conversational text, just the story.`;

      const storyText = await callLLMAPI(llmPrompt);
      setGeneratedStory(storyText.trim());
    } catch (err) {
      console.error('Error generating story:', err);
      setError(`Failed to generate story/context: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoadingStory(false);
    }
  };
  
  // Determine if any LLM operation is in progress
  const anyLLMLoading = loadingPrompt || loadingSuggestions || loadingNegativePrompt || loadingInspireMe || loadingStory;
  
  return {
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
  };
};