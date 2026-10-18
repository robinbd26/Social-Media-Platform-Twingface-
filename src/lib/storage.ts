export interface StoredFile {
  url: string;
  key: string;
}

export function getFileExtension(filename: string): string {
  const idx = filename.lastIndexOf('.');
  return idx === -1 ? '' : filename.slice(idx + 1);
}

const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

export function isValidImageType(type: string): boolean {
  return IMAGE_TYPES.includes(type);
}
