export interface ProcessedImage {
  id: string;
  originalUrl: string;
  processedUrl: string;
  timestamp: number;
  name: string;
}

export interface ProcessingOptions {
  size: 'auto' | 'preview' | 'full';
  format: 'png' | 'jpg';
  crop: boolean;
}