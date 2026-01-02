import React, { useState, useEffect } from "react";
import OneDrivePicker from "./OneDrivePicker";

interface AdminPanelProps {
  onImagesAdd: (day: "day1" | "day2" | "day3", urls: string[]) => void;
  onImageRemove: (day: "day1" | "day2" | "day3", index: number) => void;
  currentImages: Record<"day1" | "day2" | "day3", string[]>;
}

// Generate the images.ts file content
const generateImagesFile = (
  images: Record<"day1" | "day2" | "day3", string[]>
): string => {
  const formatArray = (urls: string[]) => {
    if (urls.length === 0) return "[]";
    return `[\n    ${urls.map((url) => `"${url}"`).join(",\n    ")},\n  ]`;
  };

  return `// Image data structure grouping images by day.
// Using Google Drive direct download links for best performance.

export const IMAGES_BY_DAY: Record<"day1" | "day2" | "day3", string[]> = {
  day1: ${formatArray(images.day1)},
  day2: ${formatArray(images.day2)},
  day3: ${formatArray(images.day3)},
};

// Key decisions:
// - Keep a plain record keyed by day so the \`Tabs\` component can switch easily.
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
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

const AdminPanel: React.FC<AdminPanelProps> = ({
  onImagesAdd,
  onImageRemove,
  currentImages,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState<"day1" | "day2" | "day3">(
    "day1"
  );
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

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
    onImagesAdd(selectedDay, urls);
    alert(`${files.length} images added to ${selectedDay}!`);
  };

  const handleRemoveImage = (index: number) => {
    if (confirm("Are you sure you want to remove this image?")) {
      onImageRemove(selectedDay, index);
    }
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
        <svg
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
        </svg>
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
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Select Day
              </label>
              <select
                value={selectedDay}
                onChange={(e) =>
                  setSelectedDay(e.target.value as "day1" | "day2" | "day3")
                }
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="day1">Day 1 - Opening Night</option>
                <option value="day2">Day 2 - Healing & Deliverance</option>
                <option value="day3">Day 3 - Power & Closing Glory</option>
              </select>
            </div>

            <OneDrivePicker
              onSuccess={handleFilesSelected}
              onCancel={() => console.log("Picker cancelled")}
            />

            {/* Current Images List */}
            <div className="pt-4 border-t border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700 mb-3 flex items-center justify-between">
                <span>
                  Current Images ({currentImages[selectedDay].length})
                </span>
              </h3>

              {currentImages[selectedDay].length === 0 ? (
                <p className="text-sm text-slate-500 text-center py-4">
                  No images added yet for this day
                </p>
              ) : (
                <div className="space-y-2 max-h-60 overflow-y-auto">
                  {currentImages[selectedDay].map((url, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-2 bg-slate-50 rounded-lg hover:bg-slate-100 transition-colors group"
                    >
                      <img
                        src={url}
                        alt={`Image ${index + 1}`}
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
                  ))}
                </div>
              )}
            </div>

            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center mb-4">
                Paste Google Drive share links above (one per line)
              </p>

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

                <p className="text-xs text-slate-500 text-center pt-2">
                  After downloading, replace src/data/images.ts and push to
                  GitHub
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
