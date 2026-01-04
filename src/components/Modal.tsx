import React, { useEffect } from "react";
import { optimizeGoogleDriveImage } from "@/utils/imageOptimization";

type Props = {
  src: string;
  onClose: () => void;
  onNext?: () => void;
  onPrevious?: () => void;
  currentIndex?: number;
  totalImages?: number;
};

const Modal: React.FC<Props> = ({
  src,
  onClose,
  onNext,
  onPrevious,
  currentIndex = 0,
  totalImages = 1,
}) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight" && onNext) onNext();
      if (e.key === "ArrowLeft" && onPrevious) onPrevious();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, onNext, onPrevious]);

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `AGFI 27th Annual Salvation Crusade - Image ${
            currentIndex + 1
          }`,
          text: `Check out this amazing moment from AGFI's 27th Annual Salvation Crusade!`,
          url: window.location.href,
        });
      } catch (err) {
        // Share cancelled or failed silently
      }
    } else {
      // Fallback: copy link to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Enhanced Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[120px] animate-pulse delay-1000"></div>
      </div>

      {/* Modal Container */}
      <div
        className="relative max-w-7xl w-full max-h-[95vh] rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.5)] animate-scaleIn border-2 border-white/20 backdrop-blur-sm bg-gradient-to-br from-slate-900/50 to-black/50"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full h-full bg-gradient-to-br from-slate-950 to-black flex items-center justify-center p-8">
          <img
            src={optimizeGoogleDriveImage(src, { width: 1200, quality: 90 })}
            alt="Preview"
            className="max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
          />

          {/* Enhanced Navigation buttons with hover animations */}
          {onPrevious && (
            <button
              className="absolute left-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-white via-blue-50 to-white hover:from-blue-50 hover:via-white hover:to-blue-50 flex items-center justify-center text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgb(59,130,246,0.5)] transition-all duration-300 hover:scale-125 backdrop-blur-md border-2 border-blue-200/50 hover:border-blue-400 group"
              onClick={onPrevious}
              aria-label="Previous image"
              title="Previous (←)"
            >
              <svg
                className="w-7 h-7 transform group-hover:-translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              {/* Arrow indicator */}
              <div className="absolute -right-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
            </button>
          )}

          {onNext && (
            <button
              className="absolute right-6 top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-white via-blue-50 to-white hover:from-blue-50 hover:via-white hover:to-blue-50 flex items-center justify-center text-slate-900 shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgb(59,130,246,0.5)] transition-all duration-300 hover:scale-125 backdrop-blur-md border-2 border-blue-200/50 hover:border-blue-400 group"
              onClick={onNext}
              aria-label="Next image"
              title="Next (→)"
            >
              <svg
                className="w-7 h-7 transform group-hover:translate-x-0.5 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth={3}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              {/* Arrow indicator */}
              <div className="absolute -left-1 top-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500 rounded-full opacity-0 group-hover:opacity-100 group-hover:animate-ping"></div>
            </button>
          )}
        </div>

        {/* Close button */}
        <button
          className="absolute top-6 right-6 z-10 w-16 h-16 rounded-full bg-gradient-to-br from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 flex items-center justify-center text-white shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgb(239,68,68,0.5)] transition-all duration-300 hover:scale-110 hover:rotate-90 backdrop-blur-sm border-2 border-red-400/50 group"
          onClick={onClose}
          aria-label="Close preview"
          title="Close (Esc)"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={3}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Share button */}
        <button
          onClick={handleShare}
          className="absolute top-6 right-24 z-10 w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 flex items-center justify-center text-white shadow-[0_8px_30px_rgb(0,0,0,0.4)] hover:shadow-[0_8px_40px_rgb(34,197,94,0.5)] transition-all duration-300 hover:scale-110 backdrop-blur-sm border-2 border-green-400/50 group"
          aria-label="Share image"
          title="Share"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
            />
          </svg>
        </button>

        {/* Enhanced Info bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent px-8 py-8 flex items-center justify-between backdrop-blur-sm border-t border-white/10">
          <div className="flex-1">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
                <p className="text-white text-lg font-bold">
                  Image {currentIndex + 1} of {totalImages}
                </p>
              </div>
              {totalImages > 1 && (
                <div className="flex-1 max-w-xs">
                  <div className="h-2 bg-white/20 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-300"
                      style={{
                        width: `${((currentIndex + 1) / totalImages) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              )}
            </div>
            <div className="flex items-center gap-4 mt-2">
              <p className="text-white/70 text-sm flex items-center gap-2">
                <kbd className="px-2 py-1 text-xs bg-white/10 rounded border border-white/20">
                  ESC
                </kbd>
                <span>Close</span>
              </p>
              {(onPrevious || onNext) && (
                <>
                  <span className="text-white/40">•</span>
                  <p className="text-white/70 text-sm flex items-center gap-2">
                    <kbd className="px-2 py-1 text-xs bg-white/10 rounded border border-white/20">
                      ←
                    </kbd>
                    <kbd className="px-2 py-1 text-xs bg-white/10 rounded border border-white/20">
                      →
                    </kbd>
                    <span>Navigate</span>
                  </p>
                </>
              )}
            </div>
          </div>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full bg-gradient-to-r from-blue-500 via-blue-600 to-purple-600 hover:from-blue-600 hover:via-purple-600 hover:to-purple-700 text-white text-sm font-bold transition-all duration-300 hover:shadow-[0_8px_30px_rgb(59,130,246,0.5)] hover:scale-105 border border-blue-400/30 flex items-center gap-2"
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
                d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
              />
            </svg>
            Open Full Size
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
