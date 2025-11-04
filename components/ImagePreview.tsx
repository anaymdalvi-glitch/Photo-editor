
import React from 'react';

interface ImagePreviewProps {
  originalImage: string | null;
  editedImage: string | null;
  isLoading: boolean;
  error: string | null;
  downloadFilename?: string;
}

const ImageCard: React.FC<{ 
    title: string; 
    src: string | null; 
    children?: React.ReactNode; 
    isDownloadable?: boolean;
    downloadFilename?: string; 
}> = ({ title, src, children, isDownloadable = false, downloadFilename = 'edited-image.png' }) => (
  <div className="flex-1 flex flex-col gap-2">
    <div className="flex justify-between items-center">
        <h3 className="font-semibold text-gray-300">{title}</h3>
        {isDownloadable && src && (
            <a 
                href={src} 
                download={downloadFilename} 
                className="flex items-center gap-1.5 text-sm bg-gray-700 text-gray-200 px-3 py-1.5 rounded-md hover:bg-purple-600 hover:text-white transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                Download
            </a>
        )}
    </div>
    <div className="aspect-square bg-gray-900 rounded-lg flex items-center justify-center overflow-hidden border border-gray-700">
      {src ? <img src={src.startsWith('data:') ? src : `data:image/png;base64,${src}`} alt={title} className="w-full h-full object-contain" /> : children}
    </div>
  </div>
);

const Placeholder: React.FC<{ message: string }> = ({ message }) => (
  <div className="text-center text-gray-500 p-4">
    <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14" />
    </svg>
    <p className="mt-2">{message}</p>
  </div>
);

const Loader: React.FC = () => (
    <div className="flex flex-col items-center justify-center text-center text-gray-400 p-4">
        <svg className="animate-spin h-12 w-12 text-purple-400 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <p className="font-semibold text-lg">AI is working its magic...</p>
        <p className="text-sm">This can take a moment.</p>
    </div>
);


export const ImagePreview: React.FC<ImagePreviewProps> = ({ originalImage, editedImage, isLoading, error, downloadFilename }) => {
  if (!originalImage) {
    return (
        <div className="bg-gray-800 w-full h-full rounded-lg border border-gray-700 flex items-center justify-center">
            <Placeholder message="Upload an image and write a prompt to start editing" />
        </div>
    );
  }

  return (
    <div className="bg-gray-800 w-full h-full rounded-lg border border-gray-700 p-4 flex flex-col gap-4">
      {error && (
        <div className="bg-red-900/50 border border-red-700 text-red-300 p-3 rounded-md text-sm">
          <strong>Error:</strong> {error}
        </div>
      )}
      <div className="flex flex-col md:flex-row gap-4 flex-grow">
        <ImageCard title="Original" src={originalImage}>
           <Placeholder message="Original image appears here." />
        </ImageCard>
        <ImageCard title="Edited" src={editedImage} isDownloadable={true} downloadFilename={downloadFilename}>
          {isLoading ? <Loader /> : <Placeholder message="Your edited image will appear here." />}
        </ImageCard>
      </div>
    </div>
  );
};
