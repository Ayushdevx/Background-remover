import React from 'react';
import { Clock, Download, Trash2 } from 'lucide-react';
import { ProcessedImage } from '../types';
import { motion } from 'framer-motion';
import { formatDistanceToNow } from 'date-fns';

interface RecentImagesProps {
  images: ProcessedImage[];
  onImageSelect: (image: ProcessedImage) => void;
  onDownload: (image: ProcessedImage) => void;
  onDelete: (id: string) => void;
}

export function RecentImages({ images, onImageSelect, onDownload, onDelete }: RecentImagesProps) {
  if (images.length === 0) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="mt-8"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Clock className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium text-gray-700">Recent Images</h3>
        </div>
        <span className="text-sm text-gray-500">{images.length} images</span>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {images.map((image, index) => (
          <motion.div
            key={image.id}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative group"
          >
            <div 
              className="aspect-square rounded-lg overflow-hidden cursor-pointer bg-gray-100"
              onClick={() => onImageSelect(image)}
            >
              <img 
                src={image.processedUrl} 
                alt={image.name}
                className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-105"
              />
            </div>
            <div className="absolute inset-x-0 bottom-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
              <p className="text-xs text-white truncate">{image.name}</p>
              <p className="text-xs text-gray-300">
                {formatDistanceToNow(image.timestamp, { addSuffix: true })}
              </p>
            </div>
            <div className="absolute top-2 right-2 flex space-x-1">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDownload(image)}
                className="bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white"
              >
                <Download className="h-4 w-4 text-gray-700" />
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => onDelete(image.id)}
                className="bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg hover:bg-white hover:text-red-500"
              >
                <Trash2 className="h-4 w-4" />
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}