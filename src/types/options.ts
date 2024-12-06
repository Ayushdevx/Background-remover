export interface ProcessingOptionsConfig {
  size: 'auto' | 'preview' | 'full';
  format: 'png' | 'jpg';
  crop: boolean;
}

export interface ProcessingOptionsProps {
  options: ProcessingOptionsConfig;
  onOptionsChange: (options: ProcessingOptionsConfig) => void;
}