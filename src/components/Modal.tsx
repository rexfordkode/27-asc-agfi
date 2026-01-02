import React, { useEffect } from "react";

type Props = {
  src: string;
  onClose: () => void;
};

const Modal: React.FC<Props> = ({ src, onClose }) => {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fadeIn"
      onClick={onClose}
    >
      {/* Background decorations */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>

      {/* Modal Container */}
      <div
        className="relative max-w-6xl w-full max-h-[90vh] rounded-2xl overflow-hidden shadow-2xl animate-scaleIn border border-white/10 backdrop-blur-sm"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full h-full bg-black flex items-center justify-center">
          <img
            src={src}
            alt="Preview"
            className="max-w-full max-h-full object-contain"
          />
        </div>

        {/* Close button */}
        <button
          className="absolute top-6 right-6 z-10 w-14 h-14 rounded-full bg-white/95 hover:bg-white flex items-center justify-center text-3xl text-slate-900 shadow-2xl hover:shadow-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm border border-white/50 font-light"
          onClick={onClose}
          aria-label="Close preview"
          title="Close (Esc)"
        >
          ×
        </button>

        {/* Info bar - Premium */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent px-8 py-6 flex items-center justify-between">
          <div>
            <p className="text-white text-sm font-semibold">Image Preview</p>
            <p className="text-white/60 text-xs mt-1">
              Press ESC or click outside to close
            </p>
          </div>
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white text-sm font-semibold transition-all duration-300 hover:shadow-lg"
          >
            Open in New Tab
          </a>
        </div>
      </div>
    </div>
  );
};

export default Modal;
