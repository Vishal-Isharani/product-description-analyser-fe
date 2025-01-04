import { useState } from 'react';
import PropTypes from 'prop-types';

function ImageUrlInput({ onUrlSubmit }) {
  const [url, setUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onUrlSubmit(url.trim());
      setUrl('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="flex flex-col items-center space-y-4">
        <div className="w-full max-w-2xl">
          <label htmlFor="image-url" className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <div className="flex gap-3">
            <input
              type="url"
              id="image-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com/product-image.jpg"
              className="flex-1 min-w-0 block w-full px-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 sm:text-sm"
              required
            />
            <button
              type="submit"
              className="btn-primary whitespace-nowrap"
              disabled={!url.trim()}
            >
              Analyze URL
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}

ImageUrlInput.propTypes = {
  onUrlSubmit: PropTypes.func.isRequired,
};

export default ImageUrlInput; 