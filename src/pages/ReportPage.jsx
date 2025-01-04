import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router';
import IngredientsReport from '../components/IngredientsReport';
import Chat from '../components/Chat';
import Loader from '../components/Loader';

function ReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const ingredients = location.state?.data;

  useEffect(() => {
    if (!ingredients) {
      navigate('/');
      return;
    }
    // Simulate a short loading time for smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [ingredients, navigate]);

  if (!ingredients) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            Analysis Report
          </h1>
          <button
            onClick={() => navigate('/')}
            className="btn-primary flex items-center gap-2"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            Analyze Another Product
          </button>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 ease-in-out">
          <IngredientsReport 
            loading={isLoading}
            ingredients={ingredients}
            error={null}
          />
        </div>

        <Chat ingredients={ingredients} />
      </div>

      {isLoading && <Loader />}
    </div>
  );
}

export default ReportPage; 