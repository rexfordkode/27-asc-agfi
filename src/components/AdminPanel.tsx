import React, { useState, useEffect } from "react";
import OneDrivePicker from "./OneDrivePicker";
import { getAllCrusades } from "@/data/images";

interface AdminPanelProps {
  onImagesAdd: (
    crusadeId: string,
    day: "day1" | "day2" | "day3" | "day4",
    urls: string[]
  ) => void;
  onImageRemove: (
    crusadeId: string,
    day: "day1" | "day2" | "day3" | "day4",
    index: number
  ) => void;
  currentCrusadeId: string;
  currentImages: Record<
    string,
    Record<"day1" | "day2" | "day3" | "day4", string[]>
  >;
}

// Generate the images.ts file content
const generateImagesFile = (
  crusadeImages: Record<
    string,
    Record<"day1" | "day2" | "day3" | "day4", string[]>
  >
): string => {
  const formatArray = (urls: string[]) => {
    if (urls.length === 0) return "[]";
    return `[\n    ${urls.map((url) => `"${url}"`).join(",\n    ")},\n  ]`;
  };

  const crusades = getAllCrusades();
  let crusadeContent = "";

  for (const crusade of crusades) {
    const images = crusadeImages[crusade.id] || crusade.images;
    crusadeContent += `  "${crusade.id}": {
    id: "${crusade.id}",
    name: "${crusade.name}",
    location: "${crusade.location}",
    startDate: "${crusade.startDate}",
    endDate: "${crusade.endDate}",
    description: "${crusade.description}",
    dayCount: ${crusade.dayCount},
    images: {
      day1: ${formatArray(images.day1)},
      day2: ${formatArray(images.day2)},
      day3: ${formatArray(images.day3)},
      day4: ${formatArray(images.day4)},
    },
  },\n`;
  }

  return `// Multi-crusade image data structure
// Using Google Drive direct download links for best performance.

export interface CrusadeData {
  id: string;
  name: string;
  location: string;
  startDate: string;
  endDate: string;
  description: string;
  dayCount: number;
  images: {
    day1: string[];
    day2: string[];
    day3: string[];
    day4: string[];
  };
}

export const CRUSADES: Record<string, CrusadeData> = {
${crusadeContent}};

// Legacy export for backwards compatibility
export const IMAGES_BY_DAY = CRUSADES["crusade-2026-main"].images;

// Helper function to get crusade by ID
export const getCrusadeById = (id: string): CrusadeData | undefined => {
  return CRUSADES[id];
};

// Helper function to get all crusades
export const getAllCrusades = (): CrusadeData[] => {
  return Object.values(CRUSADES);
};

// Key decisions:
// - Multi-crusade structure allows multiple programs at different locations
// - Keep a plain record keyed by day within each crusade for easy switching
// - URLs are Google Drive direct-download links for best performance (no login needed).
`;
};

// Download the file
const downloadFile = (content: string, filename: string) => {
  const blob = new Blob([content], { type: "text/typescript" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
};

const AdminPanel: React.FC<AdminPanelProps> = ({
  onImagesAdd,
  onImageRemove,
  currentCrusadeId,
  currentImages,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedCrusadeId, setSelectedCrusadeId] =
    useState<string>(currentCrusadeId);
  const [selectedDay, setSelectedDay] = useState<
    "day1" | "day2" | "day3" | "day4"
  >("day1");
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [manualUrls, setManualUrls] = useState("");
  const crusades = getAllCrusades();
  const selectedCrusade = crusades.find(
    (crusade) => crusade.id === selectedCrusadeId
  );
  const dayOptions = [
    { id: "day1", label: "Day 1 - Opening Night" },
    { id: "day2", label: "Day 2 - Healing & Deliverance" },
    { id: "day3", label: "Day 3 - Power & Closing Glory" },
    { id: "day4", label: "Health Screening - Community Care" },
  ] as const;
  const availableDayOptions = dayOptions.slice(
    0,
    selectedCrusade?.dayCount ?? 3
  );

  useEffect(() => {
    setSelectedCrusadeId(currentCrusadeId);
  }, [currentCrusadeId]);

  useEffect(() => {
    if (
      selectedDay === "day4" &&
      selectedCrusade?.dayCount &&
      selectedCrusade.dayCount < 4
    ) {
      setSelectedDay("day1");
    }
  }, [selectedCrusade?.dayCount, selectedDay]);

  const ADMIN_PASSWORD = "agfi2026"; // Change this to your secure password

  const handleAuth = () => {
    if (password === ADMIN_PASSWORD) {
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password");
    }
  };

  const handleFilesSelected = (files: any[]) => {
    const urls = files.map((file) => file.url);
    onImagesAdd(selectedCrusadeId, selectedDay, urls);
    alert(`${files.length} images added to ${selectedDay}!`);
  };

  const handleRemoveImage = (index: number) => {
    if (confirm("Are you sure you want to remove this image?")) {
      onImageRemove(selectedCrusadeId, selectedDay, index);
    }
  };

  const handleManualAdd = () => {
    // Extract all URLs from the textarea, regardless of separators
    const urls = Array.from(
      new Set(
        manualUrls.match(/https?:\/\/\S+/g)?.map((url) => url.trim()) || []
      )
    );

    if (urls.length === 0) {
      alert("Please paste at least one OneDrive link.");
      return;
    }

    onImagesAdd(selectedCrusadeId, selectedDay, urls);
    setManualUrls("");
    alert(
      `${urls.length} link${
        urls.length === 1 ? "" : "s"
      } added to ${selectedDay}.`
    );
  };

  const handleDownloadConfig = () => {
    const fileContent = generateImagesFile(currentImages);
    downloadFile(fileContent, "images.ts");
    alert(
      "images.ts file downloaded! Replace the file in src/data/images.ts and commit the changes."
    );
  };

  const handleCopyToClipboard = () => {
    const fileContent = generateImagesFile(currentImages);
    navigator.clipboard.writeText(fileContent);
    alert("Configuration copied to clipboard!");
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 w-12 h-12 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 z-40"
        title="Admin Panel"
      >
        {/* COMMENTED OUT: + icon */}
        {/* <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg> */}
      </button>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full p-8 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-slate-900">Admin Panel</h2>
          <button
            onClick={() => {
              setIsOpen(false);
              setIsAuthenticated(false);
              setPassword("");
            }}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 flex items-center justify-center transition-colors"
          >
            ×
          </button>
        </div>

        {!isAuthenticated ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Enter Admin Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAuth()}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter password"
              />
            </div>
            <button
              onClick={handleAuth}
              className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
            >
              Authenticate
            </button>
          </div>
        ) : (
          <div className="space-y-6">
            <div>
              <label
                htmlFor="crusade-select"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Select Crusade/Program
              </label>
              <select
                id="crusade-select"
                value={selectedCrusadeId}
                onChange={(e) => setSelectedCrusadeId(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {crusades.map((crusade) => (
                  <option key={crusade.id} value={crusade.id}>
                    {crusade.name} - {crusade.location}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="day-select"
                className="block text-sm font-medium text-slate-700 mb-2"
              >
                Select Day
              </label>
              <select
                id="day-select"
                value={selectedDay}
                onChange={(e) =>
                  setSelectedDay(
                    e.target.value as "day1" | "day2" | "day3" | "day4"
                  )
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                {availableDayOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-slate-700">
                Paste OneDrive links (one per line)
              </label>
              <textarea
                value={manualUrls}
                onChange={(e) => setManualUrls(e.target.value)}
                className="w-full h-24 px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="https://1drv.ms/..."
              />
              {/* COMMENTED OUT: Add button disabled
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleManualAdd}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                >
                  Add links to this day
                </button>
              </div>
              */}
            </div>

            {/* COMMENTED OUT: Add images functionality disabled for production
            <OneDrivePicker
              onSuccess={handleFilesSelected}
              onCancel={() => {}}
            />
            */}

            {/* Current Images List */}
            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center justify-between">
                <span>
                  Current Images (
                  {
                    (currentImages[selectedCrusadeId]?.[selectedDay] || [])
                      .length
                  }
                  )
                </span>
              </h3>

              {(currentImages[selectedCrusadeId]?.[selectedDay] || [])
                .length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">
                  No images added yet for this day
                </p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {(currentImages[selectedCrusadeId]?.[selectedDay] || []).map(
                    (url, index) => (
                      <div
                        key={`${selectedCrusadeId}-${selectedDay}-${index}`}
                        className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                      >
                        <img
                          src={url}
                          alt=""
                          className="w-12 h-12 object-cover rounded border border-slate-200"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-slate-700 truncate">
                            Image {index + 1}
                          </p>
                          <p className="text-xs text-slate-500 truncate">
                            {url.substring(0, 50)}...
                          </p>
                        </div>
                        <button
                          onClick={() => handleRemoveImage(index)}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                          title="Remove image"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    )
                  )}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
                <div className="flex items-start gap-3">
                  <svg
                    className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <div>
                    <p className="text-sm font-semibold text-amber-900 mb-1">
                      ⚠️ Important: Changes are LOCAL only!
                    </p>
                    <p className="text-xs text-amber-800">
                      Other users won't see your changes until you download the
                      file, commit it, and deploy to GitHub Pages.
                    </p>
                  </div>
                </div>
              </div>

              {/* Export Options */}
              <div className="space-y-2">
                <button
                  onClick={handleDownloadConfig}
                  className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  Download images.ts
                </button>

                <button
                  onClick={handleCopyToClipboard}
                  className="w-full px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white font-semibold rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                    />
                  </svg>
                  Copy to Clipboard
                </button>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mt-3">
                  <p className="text-xs font-semibold text-blue-900 mb-2">
                    📝 Deployment Steps:
                  </p>
                  <ol className="text-xs text-blue-800 space-y-1 list-decimal list-inside">
                    <li>Click "Download images.ts" above</li>
                    <li>Replace src/data/images.ts in your project</li>
                    <li>
                      Run:{" "}
                      <code className="bg-blue-100 px-1 rounded">
                        git add . && git commit -m "Update images"
                      </code>
                    </li>
                    <li>
                      Run:{" "}
                      <code className="bg-blue-100 px-1 rounded">git push</code>
                    </li>
                    <li>Wait 2-3 minutes for GitHub Pages to deploy</li>
                  </ol>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
