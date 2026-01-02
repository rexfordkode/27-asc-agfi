// Image data structure grouping images by day.
// Using Google Drive direct download links for best performance.

export const IMAGES_BY_DAY: Record<"day1" | "day2" | "day3", string[]> = {
  day1: [
    "https://drive.google.com/uc?export=download&id=1SQA3jci-gQ5bAnhnCtkfY6J8vdsN80bH",
  ],
  day2: [
    "https://drive.google.com/uc?export=download&id=1Ahnf9ANFR0gSYgPDj45d1Dejk6Z4rCyf",
  ],
  day3: [
    "https://drive.google.com/uc?export=download&id=1hckUnRJ_GdP5jlVbpU_WDb3stjf6JPR8",
  ],
};

// Key decisions:
// - Keep a plain record keyed by day so the `Tabs` component can switch easily.
// - URLs are Google Drive direct-download links for best performance (no login needed).
