import { useState } from 'react';
import axios from 'axios';
import ImageUpload from './components/ImageUpload';
import CameraCapture from './components/CameraCapture';
import IngredientsReport from './components/IngredientsReport';

function App() {
  const [ingredients, setIngredients] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const analyzeImage = async (imageFile) => {
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('file', imageFile);

      const response = await axios.post('http://localhost:8000/analyze', formData);
      setIngredients(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error analyzing image:', error);
      setError('Failed to analyze image. Please try again.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-gray-800 mb-8">
          Product Ingredients Analyzer
        </h1>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex-1">
              <ImageUpload onImageSelect={analyzeImage} />
            </div>
            <div className="flex-1">
              <CameraCapture onCapture={analyzeImage} />
            </div>
          </div>
        </div>

        {(loading || ingredients || error) && (
          <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 ease-in-out">
            <IngredientsReport 
              loading={loading}
              ingredients={ingredients}
              error={error}
            />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
