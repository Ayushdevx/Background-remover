import React from 'react';
import { Download } from 'lucide-react';

interface ProcessedImageProps {
  imageUrl: string;
  onDownload: () => void;
}

export function ProcessedImage({ imageUrl, onDownload }: ProcessedImageProps) {
  return (
    <div className="mt-8">
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <img
          src={imageUrl}
          alt="Processed"
          className="w-full h-auto"
        />
        <button
          onClick={onDownload}
          className="absolute bottom-4 right-4 bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors"
        >
          <Download className="h-6 w-6 text-gray-700" />
        </button>
      </div>
    </div>
  );
}