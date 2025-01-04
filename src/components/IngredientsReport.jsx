import PropTypes from 'prop-types';

function IngredientsReport({ loading, ingredients, error }) {
  if (loading) {
    return (
      <div className="flex justify-center items-center p-12">
        <div className="animate-pulse-slow">
          <svg className="w-12 h-12 text-primary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
          </svg>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border-l-4 border-red-500 p-4">
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
    );
  }

  if (!ingredients) {
    return null;
  }

  const Section = ({ title, items, icon }) => (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4 text-primary-600">
        {icon}
        <h3 className="text-xl font-semibold">{title}</h3>
      </div>
      <ul className="list-disc pl-6 space-y-2">
        {items.map((item, index) => (
          <li key={index} className="text-gray-700">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );

  Section.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.string).isRequired,
    icon: PropTypes.node.isRequired,
  };

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Product Analysis Report
      </h2>

      {ingredients.Ingredients?.length > 0 && (
        <Section
          title="Ingredients"
          items={ingredients.Ingredients}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          }
        />
      )}

      {ingredients.HealthImplications?.length > 0 && (
        <Section
          title="Health Implications"
          items={ingredients.HealthImplications}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          }
        />
      )}

      {ingredients.Considerations?.length > 0 && (
        <Section
          title="Considerations"
          items={ingredients.Considerations}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          }
        />
      )}

      {ingredients.NutritionInformation?.length > 0 && (
        <Section
          title="Nutrition Information"
          items={ingredients.NutritionInformation}
          icon={
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          }
        />
      )}

      {ingredients.Conclusion && (
        <div className="mt-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
          <h3 className="text-lg font-semibold text-primary-700 mb-2">Conclusion</h3>
          <p className="text-primary-900">{ingredients.Conclusion}</p>
        </div>
      )}
    </div>
  );
}

IngredientsReport.propTypes = {
  loading: PropTypes.bool,
  ingredients: PropTypes.shape({
    Ingredients: PropTypes.arrayOf(PropTypes.string),
    HealthImplications: PropTypes.arrayOf(PropTypes.string),
    Considerations: PropTypes.arrayOf(PropTypes.string),
    NutritionInformation: PropTypes.arrayOf(PropTypes.string),
    Conclusion: PropTypes.string,
  }),
  error: PropTypes.string,
};

export default IngredientsReport; 