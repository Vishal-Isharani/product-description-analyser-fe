import { useState } from 'react';
import { useNavigate } from 'react-router';
import axios from 'axios';
import ImageUpload from '../components/ImageUpload';
import CameraCapture from '../components/CameraCapture';
import ImageUrlInput from '../components/ImageUrlInput';
import Loader from '../components/Loader';

function UploadPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const apiUrl = import.meta.env.VITE_API_URL;
  console.log(apiUrl);
  const handleAnalysis = async (data) => {
    try {
      navigate('/report', { state: { data } });
    } catch (error) {
      setError('Failed to process the analysis. Please try again.');
      console.error('Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const analyzeImage = async (imageFile) => {
    setIsLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const response = await axios.post(`${apiUrl}/analyze`, formData);
      handleAnalysis(response.data);
    } catch (error) {
      setError('Failed to analyze image. Please try again.');
      console.error('Error analyzing image:', error);
      setIsLoading(false);
    }
  };

  const analyzeImageUrl = async (url) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.post(`${apiUrl}/analyze-url`, { url });
      handleAnalysis(response.data);
    } catch (error) {
      setError('Failed to analyze image URL. Please try again.');
      console.error('Error analyzing image URL:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
          Product Ingredients Analyzer
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="space-y-6">
            <ImageUpload onImageSelect={analyzeImage} />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">OR</span>
              </div>
            </div>
            <ImageUrlInput onUrlSubmit={analyzeImageUrl} />
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-200"></div>
              </div>
              <div className="relative flex justify-center">
                <span className="bg-white px-4 text-sm text-gray-500">OR</span>
              </div>
            </div>
            <div className="flex justify-center">
              <CameraCapture onCapture={analyzeImage} />
            </div>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded-lg">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      {isLoading && <Loader />}
    </div>
  );
}

export default UploadPage; 