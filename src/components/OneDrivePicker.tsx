import React, { useState } from "react";

interface OneDrivePickerProps {
  onSuccess: (files: any[]) => void;
  onCancel?: () => void;
}

const OneDrivePicker: React.FC<OneDrivePickerProps> = ({
  onSuccess,
  onCancel,
}) => {
  const [links, setLinks] = useState("");

  const extractFileId = (url: string): string | null => {
    // Extract file ID from Google Drive URL
    const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/);
    return match ? match[1] : null;
  };

  const handleAddLinks = () => {
    if (!links.trim()) {
      alert("Please paste Google Drive links");
      return;
    }

    // Split by newlines and filter empty lines
    const urlList = links
      .split("\n")
      .map((link) => link.trim())
      .filter((link) => link.length > 0);

    if (urlList.length === 0) {
      alert("No valid links found");
      return;
    }

    // Convert Google Drive links to direct image URLs
    const fileData = urlList
      .map((url, index) => {
        const fileId = extractFileId(url);
        if (!fileId) {
          console.warn("Invalid Google Drive URL:", url);
          return null;
        }
        return {
          name: `Image ${index + 1}`,
          url: `https://lh3.googleusercontent.com/d/${fileId}`,
          thumbnailUrl: `https://lh3.googleusercontent.com/d/${fileId}`,
        };
      })
      .filter((item) => item !== null);

    if (fileData.length === 0) {
      alert(
        "No valid Google Drive links found. Please use the format: https://drive.google.com/file/d/FILE_ID/view"
      );
      return;
    }

    onSuccess(fileData);
    setLinks(""); // Clear textarea
  };

  return (
    <div className="space-y-3">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          Paste Google Drive Links (one per line)
        </label>
        <textarea
          value={links}
          onChange={(e) => setLinks(e.target.value)}
          placeholder="https://drive.google.com/file/d/FILE_ID/view
https://drive.google.com/file/d/ANOTHER_FILE_ID/view"
          rows={5}
          className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm font-mono resize-none"
        />
        <p className="text-xs text-slate-500 mt-1">
          Make sure files are set to "Anyone with the link" can view
        </p>
      </div>
      <button
        onClick={handleAddLinks}
        className="w-full px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2"
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
            d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"
          />
        </svg>
        Add Images from Google Drive
      </button>
    </div>
  );
};

export default OneDrivePicker;
