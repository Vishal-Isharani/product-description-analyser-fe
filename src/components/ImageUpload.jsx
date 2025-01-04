import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import PropTypes from 'prop-types';

function ImageUpload({ onImageSelect }) {
  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles?.length > 0) {
      onImageSelect(acceptedFiles[0]);
    }
  }, [onImageSelect]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    multiple: false
  });

  return (
    <div
      {...getRootProps()}
      className={`
        flex flex-col items-center justify-center p-12 border-2 border-dashed 
        rounded-xl cursor-pointer transition-all duration-200 min-h-[300px]
        ${isDragActive 
          ? 'border-primary-500 bg-primary-50' 
          : 'border-gray-300 hover:border-primary-400 hover:bg-gray-50'
        }
      `}
    >
      <input {...getInputProps()} />
      <svg
        className={`w-20 h-20 mb-6 ${isDragActive ? 'text-primary-500' : 'text-gray-400'}`}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
        />
      </svg>
      <h3 className="text-2xl font-semibold mb-2">
        {isDragActive ? 'Drop the image here' : 'Drag & drop product image here'}
      </h3>
      <p className="text-base text-gray-500 mb-6">or click to select a file</p>
      <button className="btn-primary px-8">
        Choose File
      </button>
    </div>
  );
}

ImageUpload.propTypes = {
  onImageSelect: PropTypes.func.isRequired,
};

export default ImageUpload; 