import React from "react";
import { CrusadeData } from "@/data/images";
import { optimizeGoogleDriveImage } from "@/utils/imageOptimization";

type Props = {
  crusade: CrusadeData;
  isSelected: boolean;
  onClick: () => void;
};

const CrusadeCard: React.FC<Props> = ({ crusade, isSelected, onClick }) => {
  const totalImages =
    crusade.images.day1.length +
    crusade.images.day2.length +
    crusade.images.day3.length;
  const thumbnailImage =
    crusade.images.day1[0] || crusade.images.day2[0] || crusade.images.day3[0];

  return (
    <button
      onClick={onClick}
      className={`relative group h-64 rounded-2xl overflow-hidden transition-all duration-300 transform hover:scale-105 ${
        isSelected
          ? "ring-4 ring-blue-500 shadow-2xl"
          : "hover:shadow-xl shadow-lg"
      }`}
    >
      {/* Background Image */}
      {thumbnailImage && (
        <img
          src={optimizeGoogleDriveImage(thumbnailImage, { width: 400, quality: 80 })}
          alt={crusade.name}
          className="absolute inset-0 w-full h-full object-cover"
        />
      )}

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90 group-hover:via-black/50 transition-all duration-300"></div>

      {/* Content */}
      <div className="relative h-full flex flex-col justify-end p-6 text-white">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight">
            {crusade.name}
          </h3>
          <div className="flex items-center gap-2 text-sm text-blue-200">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                clipRule="evenodd"
              />
            </svg>
            {crusade.location}
          </div>
          <div className="flex items-center gap-2 text-sm text-slate-300">
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M6 2a1 1 0 000 2h8a1 1 0 100-2H6zM4 5a2 2 0 012-2h8a2 2 0 012 2v10a2 2 0 01-2 2H6a2 2 0 01-2-2V5z" />
            </svg>
            {crusade.startDate} - {crusade.endDate}
          </div>
          <div className="flex items-center justify-between pt-2 border-t border-white/20">
            <span className="text-xs font-semibold text-blue-300">
              {totalImages} Photos
            </span>
            {isSelected && (
              <span className="text-xs font-bold text-blue-300 flex items-center gap-1">
                ✓ Selected
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center shadow-lg">
          <svg
            className="w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}
    </button>
  );
};

export default CrusadeCard;
