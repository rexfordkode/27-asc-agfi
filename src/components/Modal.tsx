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
      className="fixed inset-0 bg-black/60 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="relative max-w-3xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <img src={src} alt="Preview" className="w-full h-auto rounded-lg" />
        <button
          className="absolute -top-3 -right-3 bg-white rounded-full w-9 h-9 flex items-center justify-center text-xl shadow"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal;
