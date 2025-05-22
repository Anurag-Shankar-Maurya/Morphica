import { useState } from 'react';

export const useImageGeneration = () => {
  // State for image generation
  const [prompt, setPrompt] = useState('');
  const [negativePrompt, setNegativePrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loadingImage, setLoadingImage] = useState(false);
  const [error, setError] = useState('');
  const [showFullScreen, setShowFullScreen] = useState(false);
  
  /**
   * Asynchronously generates an image based on the current positive prompt.
   * Calls the Imagen 3.0 API and updates the imageUrl state with the result.
   */
  const generateImage = async () => {
    setImageUrl(''); // Clear previous image
    setLoadingImage(true); // Set loading to true for image generation
    setError(''); // Clear any previous errors

    try {
      // Define the payload for the Imagen 3.0 API request
      const payload = {
        instances: { prompt: prompt }, // The text prompt for image generation
        parameters: { "sampleCount": 1 } // Requesting one image sample
      };

      // API key is automatically provided by the Canvas environment when empty
      const apiKey = "";
      // Construct the API URL for Imagen 3.0
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/imagen-3.0-generate-002:predict?key=${apiKey}`;

      // Make the POST request to the image generation API
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      // Check if the API response was successful
      if (!response.ok) {
        // Parse error data from the response if available
        const errorData = await response.json();
        // Throw an error with a message from the API or a generic HTTP error
        throw new Error(errorData.error?.message || `HTTP error! status: ${response.status}`);
      }

      // Parse the successful JSON response
      const result = await response.json();

      // Check if image data is present in the response
      if (result.predictions && result.predictions.length > 0 && result.predictions[0].bytesBase64Encoded) {
        const base64Image = result.predictions[0].bytesBase64Encoded;
        // Set the imageUrl state with the base64 encoded image data
        setImageUrl(`data:image/png;base64,${base64Image}`);
      } else {
        // If no image data is found, set an error message
        setError('No image data received from the API.');
      }
    } catch (err) {
      // Catch any errors during the fetch operation or response processing
      console.error('Error generating image:', err);
      // Display a user-friendly error message
      setError(`Failed to generate image: ${err instanceof Error ? err.message : String(err)}`);
    } finally {
      // Always set loading to false once the operation completes (success or failure)
      setLoadingImage(false);
    }
  };

  /**
   * Handles downloading the generated image.
   * Creates a temporary anchor tag and triggers a click event.
   */
  const handleDownloadImage = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'generated_image.png'; // Default filename
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