import React, { useEffect } from "react";

interface OneDrivePickerProps {
  onSuccess: (files: any[]) => void;
  onCancel?: () => void;
}

declare global {
  interface Window {
    OneDrive: any;
  }
}

const OneDrivePicker: React.FC<OneDrivePickerProps> = ({
  onSuccess,
  onCancel,
}) => {
  useEffect(() => {
    // Load OneDrive picker script
    const script = document.createElement("script");
    script.src = "https://js.live.net/v7.2/OneDrive.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  const openPicker = () => {
    if (window.OneDrive) {
      const odOptions = {
        clientId: "YOUR_ONEDRIVE_CLIENT_ID", // Replace with your OneDrive App Client ID
        action: "download",
        multiSelect: true,
        openInNewWindow: true,
        advanced: {
          filter: "folder,.jpg,.jpeg,.png,.gif,.webp",
        },
        success: (files: any) => {
          console.log("Files selected:", files);
          const fileUrls = files.value.map((file: any) => ({
            name: file.name,
            url: file["@microsoft.graph.downloadUrl"],
            thumbnailUrl:
              file.thumbnails?.[0]?.large?.url ||
              file["@microsoft.graph.downloadUrl"],
          }));
          onSuccess(fileUrls);
        },
        cancel: () => {
          console.log("Picker cancelled");
          onCancel?.();
        },
        error: (error: any) => {
          console.error("Picker error:", error);
        },
      };

      window.OneDrive.open(odOptions);
    } else {
      alert("OneDrive picker is not loaded yet. Please try again.");
    }
  };

  return (
    <button
      onClick={openPicker}
      className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M13.8 12l4.8-2.4L13.8 7.2 9 9.6l4.8 2.4zM9 14.4l4.8 2.4 4.8-2.4L13.8 12 9 14.4zM4.2 9.6L9 7.2 4.2 4.8v4.8zM4.2 14.4v4.8L9 16.8l-4.8-2.4z" />
      </svg>
      Add Images from OneDrive
    </button>
  );
};

export default OneDrivePicker;
