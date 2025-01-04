import { useNavigate } from 'react-router';
import axios from 'axios';
import ImageUpload from '../components/ImageUpload';
import CameraCapture from '../components/CameraCapture';
import ImageUrlInput from '../components/ImageUrlInput';

function UploadPage() {
  const navigate = useNavigate();

  const handleAnalysis = async (data) => {
    try {
      navigate('/report', { state: { data } });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const analyzeImage = async (imageFile) => {
    try {
      const formData = new FormData();
      formData.append('file', imageFile);
      const response = await axios.post('http://localhost:8000/analyze', formData);
      handleAnalysis(response.data);
    } catch (error) {
      console.error('Error analyzing image:', error);
    }
  };

  const analyzeImageUrl = async (url) => {
    try {
      const response = await axios.post('http://localhost:8000/analyze-url', { url });
      handleAnalysis(response.data);
    } catch (error) {
      console.error('Error analyzing image URL:', error);
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
      </div>
    </div>
  );
}

export default UploadPage; 