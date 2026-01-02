import React from "react";
import { SocialLinks } from "../constants/social";

type Props = {
  images: string[];
  onPreview: (url: string) => void;
};

const Gallery: React.FC<Props> = ({ images, onPreview }) => {
  return (
    <section className="max-w-5xl mx-auto px-4 py-6">
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {images.map((src, i) => (
          <figure
            key={i}
            className="bg-white rounded-lg overflow-hidden cursor-pointer shadow-sm"
            onClick={() => onPreview(src)}
          >
            <img
              loading="lazy"
              src={src}
              alt={`Program image ${i + 1}`}
              decoding="async"
              className="w-full h-48 object-cover"
            />
          </figure>
        ))}
      </div>

      <div className="fixed right-4 bottom-4 flex flex-col gap-3">
        {Object.entries(SocialLinks).map(([k, v]) => (
          <a
            key={k}
            href={v}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={k}
            className="icon-square"
          >
            <span className="text-sm font-semibold text-gray-700">{k[0]}</span>
          </a>
        ))}
      </div>
    </section>
  );
};

export default Gallery;
