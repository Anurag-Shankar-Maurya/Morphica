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
      const payload = {
        instances: { prompt: prompt },
        parameters: { "sampleCount": 1 }
      };

      const apiKey = import.meta.env.VITE_IMAGEN_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

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

      if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
        const base64Image = result.predictions[0].bytesBase64Encoded;
        setImageUrl(`data:image/png;base64,${base64Image}`);
      } else {
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
      link.download = 'generated_image.png';
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