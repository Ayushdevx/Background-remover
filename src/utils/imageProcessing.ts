export async function processImage(file: File, options: ProcessingOptionsConfig, apiKey: string): Promise<Blob> {
  const formData = new FormData();
  formData.append('image_file', file);
  formData.append('size', options.size);
  formData.append('format', options.format);
  if (options.crop) {
    formData.append('crop', 'true');
  }

  const response = await fetch('https://api.remove.bg/v1.0/removebg', {
    method: 'POST',
    headers: {
      'X-Api-Key': apiKey
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error('Failed to process image');
  }

  return response.blob();
}