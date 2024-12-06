import React, { useState, useEffect } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { ImageCompare } from './components/ImageCompare';
import { ProcessingOptionsPanel } from './components/ProcessingOptions';
import { RecentImages } from './components/RecentImages';
import { Toast } from './components/Toast';
import { ImageIcon, Wand2, Download } from 'lucide-react';
import type { ProcessedImage as ProcessedImageType } from './types/images';
import type { ProcessingOptionsConfig } from './types/options';
import { processImage } from './utils/imageProcessing';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const API_KEY = '5mpEKdbHGQcbJBEdcFQbDh7c';
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

function App() {
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(null);
  const [originalImageUrl, setOriginalImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [recentImages, setRecentImages] = useState<ProcessedImageType[]>([]);
  const [options, setOptions] = useState<ProcessingOptionsConfig>({
    size: 'auto',
    format: 'png',
    crop: true
  });

  useEffect(() => {
    const saved = localStorage.getItem('recentImages');
    if (saved) {
      setRecentImages(JSON.parse(saved));
    }
  }, []);

  const handleImageProcess = async (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error('File size exceeds 5MB limit');
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const originalUrl = URL.createObjectURL(file);
    setOriginalImageUrl(originalUrl);
    
    try {
      const blob = await processImage(file, options, API_KEY);
      const imageUrl = URL.createObjectURL(blob);
      setProcessedImageUrl(imageUrl);

      const newImage: ProcessedImageType = {
        id: Date.now().toString(),
        originalUrl,
        processedUrl: imageUrl,
        timestamp: Date.now(),
        name: file.name
      };

      const updatedImages = [newImage, ...recentImages.slice(0, 9)];
      setRecentImages(updatedImages);
      localStorage.setItem('recentImages', JSON.stringify(updatedImages));
      toast.success('Image processed successfully!');
    } catch (err) {
      setError('Failed to process image. Please try again.');
      toast.error('Failed to process image');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDownload = (image?: ProcessedImageType) => {
    const url = image ? image.processedUrl : processedImageUrl;
    if (!url) return;

    const link = document.createElement('a');
    link.href = url;
    link.download = `processed-${image ? image.name : 'image'}.${options.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success('Image downloaded successfully!');
  };

  const handleImageSelect = (image: ProcessedImageType) => {
    setOriginalImageUrl(image.originalUrl);
    setProcessedImageUrl(image.processedUrl);
  };

  const handleDeleteImage = (id: string) => {
    const updatedImages = recentImages.filter(img => img.id !== id);
    setRecentImages(updatedImages);
    localStorage.setItem('recentImages', JSON.stringify(updatedImages));
    toast.success('Image deleted');
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 py-12 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center items-center mb-4 space-x-2">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            >
              <Wand2 className="h-12 w-12 text-blue-500" />
            </motion.div>
            <ImageIcon className="h-12 w-12 text-blue-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            AI Background Remover
          </h1>
          <p className="text-gray-600 text-lg">
            Transform your images with our advanced AI-powered background removal tool
          </p>
        </motion.div>

        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-xl shadow-xl p-6 space-y-6"
        >
          <ProcessingOptionsPanel options={options} onOptionsChange={setOptions} />
          <ImageUploader onImageProcess={handleImageProcess} isLoading={isLoading} />

          {isLoading && (
            <div className="mt-4 text-center">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="rounded-full h-10 w-10 border-b-2 border-blue-500 mx-auto"
              />
              <p className="text-gray-600 mt-2">Processing your image...</p>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-center text-red-600 bg-red-50 rounded-lg p-4"
            >
              {error}
            </motion.div>
          )}

          {processedImageUrl && originalImageUrl && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <ImageCompare
                originalUrl={originalImageUrl}
                processedUrl={processedImageUrl}
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex justify-center mt-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleDownload()}
                  className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition-colors flex items-center space-x-2"
                >
                  <Download className="h-5 w-5" />
                  <span>Download Processed Image</span>
                </motion.button>
              </motion.div>
            </motion.div>
          )}

          <RecentImages
            images={recentImages}
            onImageSelect={handleImageSelect}
            onDownload={handleDownload}
            onDelete={handleDeleteImage}
          />
        </motion.div>
      </div>
      <Toast />
    </motion.div>
  );
}

export default App;