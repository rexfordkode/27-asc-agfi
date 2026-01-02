import React, { useState } from "react";
import OneDrivePicker from "./OneDrivePicker";

interface AdminPanelProps {
  onImagesAdd: (day: "day1" | "day2" | "day3", urls: string[]) => void;
}

const AdminPanel: React.FC<AdminPanelProps> = ({ onImagesAdd }) => {
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
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8">
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

            <div className="pt-4 border-t border-slate-200">
              <p className="text-xs text-slate-500 text-center">
                Select images from OneDrive to add to the gallery
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;
