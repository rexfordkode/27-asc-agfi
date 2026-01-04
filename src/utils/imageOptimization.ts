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
 * Convert OneDrive share URL to direct download URL
 */
const convertOneDriveUrl = (url: string): string => {
  // Handle 1drv.ms short links by expanding to full URL format
  if (url.includes("1drv.ms")) {
    // OneDrive short links need to be converted to direct download
    // Unfortunately, these require server-side resolution or redirect following
    // For now, we'll note that users should use the full OneDrive share URL
    console.warn(
      "OneDrive short links (1drv.ms) may not display. Please use full OneDrive share URLs."
    );
    return url;
  }

  // Handle full OneDrive URLs
  if (url.includes("onedrive.live.com")) {
    try {
      const urlObj = new URL(url);

      // If it's already a download URL, return as is
      if (url.includes("/download?")) {
        return url;
      }

      // Extract resid parameter which is present in most OneDrive URLs
      const resid = urlObj.searchParams.get("resid");
      const authkey = urlObj.searchParams.get("authkey");
      const cid = urlObj.searchParams.get("cid");
      const id = urlObj.searchParams.get("id");

      // Build download URL with available parameters
      if (resid) {
        let downloadUrl = `https://onedrive.live.com/download?resid=${encodeURIComponent(
          resid
        )}`;
        if (authkey) {
          downloadUrl += `&authkey=${encodeURIComponent(authkey)}`;
        }
        return downloadUrl;
      }

      if (cid && id) {
        return `https://onedrive.live.com/download?cid=${encodeURIComponent(
          cid
        )}&id=${encodeURIComponent(id)}`;
      }

      // If we can't extract proper parameters, warn and return original
      console.warn("Could not convert OneDrive URL to download format:", url);
      return url;
    } catch (e) {
      console.error("Error parsing OneDrive URL:", e);
      return url;
    }
  }

  return url;
};

/**
 * Convert Google Drive share URL to direct download URL
 */
const convertGoogleDriveUrl = (url: string): string => {
  // Handle drive.google.com/file/d/ format
  if (url.includes("drive.google.com/file/d/")) {
    const match = url.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
    if (match && match[1]) {
      const fileId = match[1];
      // Convert to lh3.googleusercontent.com format which works with img tags
      return `https://lh3.googleusercontent.com/d/${fileId}`;
    }
  }

  // Handle drive.google.com/uc?id= format
  if (url.includes("drive.google.com/uc?")) {
    try {
      const urlObj = new URL(url);
      const fileId = urlObj.searchParams.get("id");
      if (fileId) {
        return `https://lh3.googleusercontent.com/d/${fileId}`;
      }
    } catch (e) {
      // Fall through to return original
    }
  }

  // Handle drive.google.com/open?id= format
  if (url.includes("drive.google.com/open?")) {
    try {
      const urlObj = new URL(url);
      const fileId = urlObj.searchParams.get("id");
      if (fileId) {
        return `https://lh3.googleusercontent.com/d/${fileId}`;
      }
    } catch (e) {
      // Fall through to return original
    }
  }

  return url;
};

/**
 * Normalize image URLs for display (Google Drive + OneDrive)
 */
export const normalizeImageUrl = (
  url: string,
  options: { width?: number; quality?: number } = {}
): string => {
  // Convert Google Drive share URLs to direct format first
  if (url.includes("drive.google.com")) {
    url = convertGoogleDriveUrl(url);
    // Continue to optimize if conversion was successful
  }

  if (url.includes("lh3.googleusercontent.com")) {
    return optimizeGoogleDriveImage(url, options);
  }

  if (/1drv\.ms|onedrive\.live\.com/i.test(url)) {
    return convertOneDriveUrl(url);
  }

  return url;
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
