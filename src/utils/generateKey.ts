export const generateKey = (filename: string): string => {
  const timestamp = Date.now();
  return `uploads/${timestamp}-${filename}`;
};