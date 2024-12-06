import React, { useState } from 'react';
import { GripVertical } from 'lucide-react';
import { motion } from 'framer-motion';

interface ImageCompareProps {
  originalUrl: string;
  processedUrl: string;
}

export function ImageCompare({ originalUrl, processedUrl }: ImageCompareProps) {
  const [position, setPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const bounds = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - bounds.left;
    const newPosition = (x / bounds.width) * 100;
    setPosition(Math.min(Math.max(newPosition, 0), 100));
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="relative h-[400px] overflow-hidden rounded-lg shadow-lg"
      onMouseMove={handleMove}
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
    >
      <div className="absolute inset-0">
        <img 
          src={originalUrl} 
          alt="Original" 
          className="w-full h-full object-cover"
        />
      </div>
      <motion.div 
        className="absolute inset-0"
        initial={{ clipPath: 'inset(0 50% 0 0)' }}
        animate={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        transition={{ type: 'tween', duration: 0.1 }}
      >
        <img 
          src={processedUrl} 
          alt="Processed" 
          className="w-full h-full object-cover"
        />
      </motion.div>
      <motion.div 
        className="absolute inset-y-0 bg-white w-0.5"
        style={{ left: `${position}%` }}
        initial={{ height: 0 }}
        animate={{ height: '100%' }}
        transition={{ duration: 0.3 }}
      >
        <motion.div 
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white rounded-full p-2 shadow-lg cursor-grab active:cursor-grabbing"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
        >
          <GripVertical className="h-4 w-4 text-gray-600" />
        </motion.div>
      </motion.div>
      <div className="absolute bottom-4 left-4 text-sm text-white bg-black/50 px-3 py-1 rounded-full">
        Drag to compare
      </div>
    </motion.div>
  );
}