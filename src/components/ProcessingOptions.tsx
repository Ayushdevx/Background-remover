import React from 'react';
import { Settings, Crop } from 'lucide-react';
import type { ProcessingOptionsProps } from '../types/options';

export function ProcessingOptionsPanel({ options, onOptionsChange }: ProcessingOptionsProps) {
  return (
    <div className="bg-gray-50 rounded-lg p-4 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Settings className="h-5 w-5 text-gray-500" />
          <h3 className="font-medium text-gray-700">Processing Options</h3>
        </div>
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Output Size
          </label>
          <select
            value={options.size}
            onChange={(e) => onOptionsChange({ ...options, size: e.target.value as ProcessingOptionsProps['options']['size'] })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="auto">Auto</option>
            <option value="preview">Preview (Fast)</option>
            <option value="full">Full Resolution</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Format
          </label>
          <select
            value={options.format}
            onChange={(e) => onOptionsChange({ ...options, format: e.target.value as ProcessingOptionsProps['options']['format'] })}
            className="w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
          </select>
        </div>
      </div>

      <div className="flex items-center space-x-2">
        <input
          type="checkbox"
          id="crop"
          checked={options.crop}
          onChange={(e) => onOptionsChange({ ...options, crop: e.target.checked })}
          className="rounded border-gray-300 text-blue-500 focus:ring-blue-500"
        />
        <label htmlFor="crop" className="text-sm text-gray-700 flex items-center space-x-1">
          <Crop className="h-4 w-4" />
          <span>Auto-crop to content</span>
        </label>
      </div>
    </div>
  );
}