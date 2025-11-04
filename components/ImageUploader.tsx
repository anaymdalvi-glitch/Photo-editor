
import React, { useCallback, useState } from 'react';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  originalImage: string | null;
  onClear: () => void;
}

const UploadIcon: React.FC = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
  </svg>
);

export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, originalImage, onClear }) => {
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onImageUpload(e.target.files[0]);
    }
  };

  const handleDragEvents = (e: React.DragEvent<HTMLDivElement>, dragging: boolean) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(dragging);
  };

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    handleDragEvents(e, false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      onImageUpload(e.dataTransfer.files[0]);
    }
  }, [onImageUpload]);

  return (
    <div className="bg-gray-800 p-4 rounded-lg border border-gray-700">
      <h2 className="text-lg font-semibold mb-2 text-white">1. Upload Image</h2>
      {originalImage ? (
        <div className="relative group">
          <img src={`data:image/png;base64,${originalImage}`} alt="Original" className="w-full h-auto rounded-md object-cover" />
           <button
              onClick={onClear}
              className="absolute top-2 right-2 bg-black/60 text-white rounded-full p-2 text-sm hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-red-500 transition-all duration-200 opacity-0 group-hover:opacity-100"
              aria-label="Clear image"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
        </div>
      ) : (
        <div
          onDragEnter={(e) => handleDragEvents(e, true)}
          onDragLeave={(e) => handleDragEvents(e, false)}
          onDragOver={(e) => handleDragEvents(e, true)}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors duration-200 ${isDragging ? 'border-purple-500 bg-gray-700/50' : 'border-gray-600 hover:border-purple-400'}`}
        >
          <input
            type="file"
            id="file-upload"
            className="hidden"
            accept="image/png, image/jpeg, image/webp"
            onChange={handleFileChange}
          />
          <label htmlFor="file-upload" className="flex flex-col items-center gap-2 cursor-pointer">
            <UploadIcon />
            <p className="text-gray-400">
              <span className="font-semibold text-purple-400">Click to upload</span> or drag and drop
            </p>
            <p className="text-xs text-gray-500">PNG, JPG, or WEBP</p>
          </label>
        </div>
      )}
    </div>
  );
};
