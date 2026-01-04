import React, { useState, useEffect } from "react";

// Add your banner image URL here
// Optimized Google Drive URL with caching and lazy loading
const BANNER_IMAGE =
  "https://lh3.googleusercontent.com/d/1EwRGUNU7W2i4yLv4OvEu7qG_yhLdX5ij?export=download&w=1200&q=80";

const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Banner Image with Overlay */}
      <div className="relative w-full h-[300px] sm:h-[380px] md:h-[500px] lg:h-[600px]">
        {/* Banner Image */}
        <div className="absolute inset-0">
          <img
            src={BANNER_IMAGE}
            alt="AGFI Crusade Banner"
            className={`w-full h-full object-cover object-center transition-all duration-700 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            loading="eager"
            decoding="async"
            onLoad={() => setImageLoaded(true)}
            style={{
              filter: imageLoaded ? "brightness(0.85) contrast(1.1)" : "none",
              backgroundSize: "cover",
            }}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 100vw, (max-width: 1024px) 100vw, 100vw"
          />

          {/* Loading skeleton for banner */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse"></div>
          )}
        </div>

        {/* Enhanced Gradient Overlays for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50"></div>

        {/* Content Overlay */}
        <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8 sm:pb-12 md:pb-16">
          {/* Logo Badge */}
          <div
            className={`mb-4 sm:mb-6 transform transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-3 group">
              <div>
                <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
                  AGFI
                </h1>
                <p className="text-blue-300 text-xs sm:text-sm font-bold tracking-widest mt-1 drop-shadow-lg">
                  POWER IN THE NAME JESUS CRUSADE
                </p>
              </div>
            </div>
          </div>

          {/* Event Title */}
          <div
            className={`mb-3 sm:mb-4 transform transition-all duration-1000 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow-2xl max-w-3xl">
              27th Annual Salvation Crusade
            </h2>
            <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-200 mt-2 drop-shadow-lg max-w-2xl font-light">
              Experience three powerful days of miracles, divine healing, and
              life-transforming encounters
            </p>
          </div>

          {/* Info Pills */}
          <div
            className={`flex flex-wrap gap-2 sm:gap-3 transform transition-all duration-1000 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-2 shadow-lg">
              <span className="text-base sm:text-lg">📍</span>
              <span className="text-white text-xs sm:text-sm font-semibold">
                Mpohor, Western Region 🇬🇭
              </span>
            </div>
            <div className="px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-2 shadow-lg">
              <span className="text-base sm:text-lg">📅</span>
              <span className="text-white text-xs sm:text-sm font-semibold">
                2nd - 4th January 2026
              </span>
            </div>
            <div className="px-3 sm:px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-2 shadow-lg">
              <span className="text-base sm:text-lg">🕖</span>
              <span className="text-white text-xs sm:text-sm font-semibold">
                7:00 PM GMT Daily
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>
    </header>
  );
};

export default Header;
