/**
 * Optimize Google Drive image URLs for faster loading
 * Adds compression and caching parameters
 */
export const optimizeGoogleDriveImage = (
  url: string,
  options: { width?: number; quality?: number } = {}
): string => {
  if (!url.includes("lh3.googleusercontent.com")) {
    return url;
  }

  const { width = 800, quality = 85 } = options;

  // Check if URL already has parameters
  if (url.includes("?")) {
    return `${url}&w=${width}&q=${quality}`;
  }

  return `${url}?w=${width}&q=${quality}`;
};

/**
 * Preload images for faster display
 */
export const preloadImage = (src: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
};

/**
 * Batch preload multiple images with a limit
 */
export const preloadImages = async (
  urls: string[],
  limit: number = 3
): Promise<void> => {
  const chunks = [];
  for (let i = 0; i < urls.length; i += limit) {
    chunks.push(urls.slice(i, i + limit));
  }

  for (const chunk of chunks) {
    await Promise.all(chunk.map(preloadImage)).catch(() => {
      // Silently fail for individual images
    });
  }
};
