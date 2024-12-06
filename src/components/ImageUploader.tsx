import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageUploaderProps {
  onImageProcess: (file: File) => void;
  isLoading: boolean;
}

export function ImageUploader({ onImageProcess, isLoading }: ImageUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles[0]) {
      onImageProcess(acceptedFiles[0]);
    }
  }, [onImageProcess]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png']
    },
    disabled: isLoading,
    maxFiles: 1
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div
        {...getRootProps()}
        className={`relative rounded-lg border-2 border-dashed p-8 text-center transition-all duration-200 ${
          isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400'
        }`}
      >
        <input {...getInputProps()} />
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
            className="flex flex-col items-center justify-center"
          >
            <Upload className={`h-12 w-12 mb-3 transition-colors ${isDragActive ? 'text-blue-500' : 'text-gray-400'}`} />
            <p className="text-xl font-medium text-gray-700">
              {isDragActive ? 'Drop your image here' : 'Drag & drop your image here'}
            </p>
            <p className="text-sm text-gray-500 mt-2">or click to browse</p>
            <div className="flex items-center space-x-2 mt-4">
              <ImageIcon className="h-4 w-4 text-gray-400" />
              <p className="text-xs text-gray-400">Supports: JPG, PNG (Max 5MB)</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
}