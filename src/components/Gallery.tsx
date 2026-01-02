import React, { useState } from "react";
import { FaTiktok, FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { SocialLinks } from "@/constants/social";

type Props = {
  images: string[];
  onPreview: (index: number) => void;
  currentDay: "day1" | "day2" | "day3";
};

const socialIcons: Record<string, React.ReactNode> = {
  TikTok: <FaTiktok className="w-5 h-5" />,
  Facebook: <FaFacebook className="w-5 h-5" />,
  YouTube: <FaYoutube className="w-5 h-5" />,
  Instagram: <FaInstagram className="w-5 h-5" />,
};

const dayInfo: Record<
  "day1" | "day2" | "day3",
  { title: string; subtitle: string; date: string }
> = {
  day1: {
    title: "Day 1",
    subtitle: "Opening Night - Salvation",
    date: "January 2nd, 2026",
  },
  day2: {
    title: "Day 2",
    subtitle: "Healing & Deliverance",
    date: "January 3rd, 2026",
  },
  day3: {
    title: "Day 3",
    subtitle: "Power & Closing Glory",
    date: "January 4th, 2026",
  },
};

const Gallery: React.FC<Props> = ({ images, onPreview, currentDay }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [imagesPerPage] = useState(12);
  const [currentPage, setCurrentPage] = useState(1);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleImageLoad = (index: number) => {
    setLoadedImages((prev) => new Set([...prev, index]));
  };

  // Reset to page 1 when day changes
  React.useEffect(() => {
    setIsTransitioning(true);
    setCurrentPage(1);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [currentDay]);

  // Pagination logic
  const totalPages = Math.ceil(images.length / imagesPerPage);
  const startIndex = (currentPage - 1) * imagesPerPage;
  const endIndex = startIndex + imagesPerPage;
  const currentImages = images.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="relative bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-32 left-0 w-96 h-96 bg-blue-100/30 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100/20 rounded-full blur-3xl"></div>
      </div>

      {/* Main content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-20 md:py-32">
        {images.length > 0 ? (
          <>
            {/* Section header with animation */}
            <div className="mb-16 animate-slideDown">
              <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-1 h-16 bg-gradient-to-b from-blue-600 via-blue-500 to-transparent rounded-full"></div>
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="px-3 py-1 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs font-bold uppercase tracking-wider">
                        {dayInfo[currentDay].title}
                      </span>
                      <span className="text-slate-500 text-sm">•</span>
                      <span className="text-slate-600 text-sm font-medium">
                        {dayInfo[currentDay].date}
                      </span>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
                      {dayInfo[currentDay].subtitle}
                    </h2>
                    <p className="text-lg text-slate-600 mt-3 font-light">
                      {images.length}{" "}
                      {images.length === 1 ? "moment" : "moments"} captured
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Premium grid layout with stagger animation */}
            <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 transition-opacity duration-300 ${
              isTransitioning ? "opacity-0" : "opacity-100"
            }`}>
              {currentImages.map((src, i) => {
                const globalIndex = startIndex + i;
                return (
                  <div
                    key={globalIndex}
                    className="group relative h-72 rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200 cursor-pointer shadow-md hover:shadow-2xl transition-shadow duration-300"
                    onClick={() => onPreview(globalIndex)}
                    onMouseEnter={() => setHoveredIndex(globalIndex)}
                    onMouseLeave={() => setHoveredIndex(null)}
                    style={{
                      animation: `fadeInUp 0.4s ease-out ${i * 0.05}s both`,
                    }}
                  >
                    {/* Image container */}
                    <div className="relative w-full h-full">
                      <img
                        loading="lazy"
                        src={src}
                        alt={`Program image ${globalIndex + 1}`}
                        decoding="async"
                        onLoad={() => handleImageLoad(globalIndex)}
                        className={`w-full h-full object-cover group-hover:scale-110 transition-all duration-700 ${
                          loadedImages.has(globalIndex)
                            ? "opacity-100"
                            : "opacity-0"
                        }`}
                      />

                      {/* Enhanced loading skeleton */}
                      {!loadedImages.has(globalIndex) && (
                        <div className="absolute inset-0">
                          <div className="w-full h-full bg-gradient-to-r from-slate-200 via-slate-300 to-slate-200 animate-shimmer bg-[length:200%_100%]"></div>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 border-4 border-slate-400/30 border-t-blue-500 rounded-full animate-spin"></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    {/* Content overlay */}
                    <div className="absolute inset-0 flex flex-col items-end justify-between p-5 opacity-0 group-hover:opacity-100 transition-all duration-300">
                      <div className="w-11 h-11 rounded-full bg-white/10 backdrop-blur-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-12 transition-all duration-300 border border-white/20 shadow-lg">
                        <svg
                          className="w-6 h-6"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2.5}
                            d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                          />
                        </svg>
                      </div>
                      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                        <p className="text-white font-bold text-base">
                          {dayInfo[currentDay].title} • Photo {globalIndex + 1}
                        </p>
                        <p className="text-white/80 text-xs mt-1 flex items-center gap-1">
                          <svg
                            className="w-3 h-3"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                            <path
                              fillRule="evenodd"
                              d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Click to view full size
                        </p>
                      </div>
                    </div>

                    {/* Shine effect */}
                    <div
                      className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl pointer-events-none"
                      style={{
                        transform:
                          hoveredIndex === globalIndex
                            ? "translateX(100%)"
                            : "translateX(-100%)",
                        transition: "transform 0.7s ease-out",
                      }}
                    ></div>
                  </div>
                );
              })}
            </div>

            {/* Pagination Controls */}
            {totalPages > 1 && (
              <div className="mt-16 flex flex-col items-center gap-6">
                <div className="flex items-center gap-2">
                  {/* Previous Button */}
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1}
                    className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-blue-400 transition-all duration-200 flex items-center gap-2"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 19l-7-7 7-7"
                      />
                    </svg>
                    Previous
                  </button>

                  {/* Page Numbers */}
                  <div className="flex items-center gap-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                      (page) => (
                        <button
                          key={page}
                          onClick={() => goToPage(page)}
                          className={`w-10 h-10 rounded-lg font-semibold transition-all duration-200 ${
                            currentPage === page
                              ? "bg-gradient-to-br from-blue-500 to-blue-600 text-white shadow-lg scale-110"
                              : "bg-white border border-slate-300 text-slate-700 hover:border-blue-400 hover:bg-slate-50"
                          }`}
                        >
                          {page}
                        </button>
                      )
                    )}
                  </div>

                  {/* Next Button */}
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-slate-700 font-medium disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-blue-400 transition-all duration-200 flex items-center gap-2"
                  >
                    Next
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </button>
                </div>

                {/* Page info */}
                <p className="text-slate-500 text-sm">
                  Page {currentPage} of {totalPages} • Showing {startIndex + 1}-
                  {Math.min(endIndex, images.length)} of {images.length} images
                </p>
              </div>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 text-center animate-fadeIn">
            <div className="relative mb-8">
              <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-3xl"></div>
              <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-slate-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            </div>
            <h3 className="text-slate-700 font-bold text-2xl mb-2">
              No Images Yet
            </h3>
            <p className="text-slate-500 text-base max-w-md mb-6">
              {dayInfo[currentDay].subtitle} photos will be uploaded soon. Check back after the event!
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 rounded-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold transition-all duration-300 hover:shadow-lg flex items-center gap-2"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh Page
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Social Links - Premium floating */}
      <div className="fixed right-6 bottom-6 flex flex-col gap-4 z-30">
        {Object.entries(SocialLinks).map(([k, v], idx) => (
          <a
            key={k}
            href={v}
            target="_blank"
            rel="noreferrer noopener"
            aria-label={`Visit ${k}`}
            className="group relative w-14 h-14 rounded-full bg-gradient-to-br from-slate-900 to-black flex items-center justify-center text-white hover:shadow-2xl hover:scale-125 transition-all duration-300 border border-slate-700/50 hover:border-blue-400/80 hover:from-blue-600 hover:to-blue-800"
            title={k}
            style={{
              animation: `slideUp 0.5s ease-out ${idx * 0.1}s both`,
            }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-400/0 via-blue-400/20 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 group-hover:animate-pulse"></div>
            <span className="relative text-lg">{socialIcons[k]}</span>
          </a>
        ))}
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }

        .animate-shimmer {
          animation: shimmer 2s infinite linear;
        }
      `}</style>
    </section>
  );
};

export default Gallery;
