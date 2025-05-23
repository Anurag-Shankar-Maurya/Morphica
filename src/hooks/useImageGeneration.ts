import { useState } from 'react';

export const useImageGeneration = () => {
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);
  const [error, setError] = useState('');
  const [showFullScreen, setShowFullScreen] = useState(false);

  const generateImage = async () => {
    setImageUrl('');
    setLoadingImage(true);
    setError('');

    try {
      // Payload matching cURL command, focusing on image output
      const payload = {
        contents: [
          {
            role: "user",
            parts: [
              {
                text: "1:1 image for: "+prompt+"\nAvoid including (Negatice Prompt): "+negativePrompt
              }
            ]
          }
        ],
        generationConfig: {
          responseModalities: ["TEXT", "IMAGE"],
        }
      };

      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const modelId = "gemini-2.0-flash-preview-image-generation";
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${modelId}:generateContent?key=${apiKey}`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      // Parse JSON response
      const data = await response.json();
      let imageFound = false;

      // Check for image in candidates
      if (
        data.candidates &&
        data.candidates[0] &&
        data.candidates[0].content &&
        data.candidates[0].content.parts
      ) {
        const parts = data.candidates[0].content.parts;

        // Look only for image data, ignore text
        for (const part of parts) {
          if (part.inlineData && part.inlineData.mimeType === 'image/png') {
            const base64Image = part.inlineData.data;
            setImageUrl(`data:image/png;base64,${base64Image}`);
            imageFound = true;
            break;
          }
        }
      }

      if (!imageFound) {
        setError('No image data received from the API.');
      }

    } catch (err) {
      console.error('Error generating image:', err);
      setError(`Failed to generate image: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      setLoadingImage(false);
    }
  };

  const handleDownloadImage = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;

      // Generate filename with timestamp
      const now = new Date();
      const year = now.getFullYear();
      const month = String(now.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
      const day = String(now.getDate()).padStart(2, '0');
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');

      link.download = `morphica_${year}-${month}-${day}_${hours}-${minutes}-${seconds}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return {
    prompt,
    setPrompt,
    negativePrompt,
    setNegativePrompt,
    imageUrl,
    setImageUrl,
    loadingImage,
    error,
    setError,
    generateImage,
    handleDownloadImage,
    showFullScreen,
    setShowFullScreen
  };
};