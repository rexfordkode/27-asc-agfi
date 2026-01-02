// Image data structure grouping images by day.
// Using Google Drive direct download links for best performance.

export const IMAGES_BY_DAY: Record<"day1" | "day2" | "day3", string[]> = {
  day1: [
    "https://lh3.googleusercontent.com/d/10MeidtsJEnxHLWyrhKpmGaNk-8js4fVK",
  ],
  day2: [
    "https://lh3.googleusercontent.com/d/1SQA3jci-gQ5bAnhnCtkfY6J8vdsN80bH",
  ],
  day3: [
    "https://lh3.googleusercontent.com/d/1T1cVBQrE9-cKu3t2uyGDL09FLV-MFy6B",
  ],
};

// Key decisions:
// - Keep a plain record keyed by day so the `Tabs` component can switch easily.
// - URLs are Google Drive direct-download links for best performance (no login needed).
