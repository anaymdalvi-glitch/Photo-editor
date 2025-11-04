
import React, { useState, useCallback, useMemo } from 'react';
import { Header } from './components/Header';
import { ImageUploader } from './components/ImageUploader';
import { PromptEditor } from './components/PromptEditor';
import { ImagePreview } from './components/ImagePreview';
import { editImageWithGemini } from './services/geminiService';
import type { ImageState } from './types';
import { fileToBase64 } from './utils/fileUtils';

const App: React.FC = () => {
  const [originalImage, setOriginalImage] = useState<ImageState | null>(null);
  const [editedImage, setEditedImage] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback(async (file: File) => {
    setError(null);
    setEditedImage(null);
    const { base64, mimeType } = await fileToBase64(file);
    setOriginalImage({
      file,
      base64,
      mimeType,
    });
  }, []);

  const handleEdit = useCallback(async () => {
    if (!originalImage || !prompt.trim()) {
      setError('Please upload an image and enter an editing prompt.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setEditedImage(null);

    try {
      const result = await editImageWithGemini(originalImage.base64, originalImage.mimeType, prompt);
      setEditedImage(result);
    } catch (e) {
      console.error(e);
      const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
      setError(`Failed to edit image. ${errorMessage}`);
    } finally {
      setIsLoading(false);
    }
  }, [originalImage, prompt]);

  const handleClear = useCallback(() => {
    setOriginalImage(null);
    setEditedImage(null);
    setPrompt('');
    setError(null);
    setIsLoading(false);
  }, []);

  const downloadFilename = useMemo(() => {
    if (!originalImage || !prompt) {
      return 'edited-image.png';
    }

    const nameWithoutExtension = originalImage.file.name.split('.').slice(0, -1).join('.') || originalImage.file.name;
    const promptSlug = prompt
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .slice(0, 50);

    return `${nameWithoutExtension}-${promptSlug}.png`;
  }, [originalImage, prompt]);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 lg:p-6 flex flex-col lg:flex-row gap-6">
        <div className="w-full lg:w-1/3 xl:w-1/4 flex flex-col gap-6">
          <ImageUploader onImageUpload={handleImageUpload} originalImage={originalImage?.base64 ?? null} onClear={handleClear} />
          {originalImage && (
            <PromptEditor
              prompt={prompt}
              setPrompt={setPrompt}
              onEdit={handleEdit}
              isLoading={isLoading}
              disabled={!originalImage}
            />
          )}
        </div>
        <div className="w-full lg:w-2/3 xl:w-3/4 flex-grow">
          <ImagePreview
            originalImage={originalImage?.base64 ?? null}
            editedImage={editedImage}
            isLoading={isLoading}
            error={error}
            downloadFilename={downloadFilename}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
