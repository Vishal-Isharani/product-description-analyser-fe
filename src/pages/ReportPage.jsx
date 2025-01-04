import { useLocation, useNavigate } from 'react-router';
import IngredientsReport from '../components/IngredientsReport';

function ReportPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const ingredients = location.state?.data;

  if (!ingredients) {
    navigate('/');
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
            loading={false}
            ingredients={ingredients}
            error={null}
          />
        </div>
      </div>
    </div>
  );
}

export default ReportPage; 