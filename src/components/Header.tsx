import React, { useState, useEffect } from "react";

// Add your banner image URL here
const BANNER_IMAGE =
  "https://lh3.googleusercontent.com/d/1EwRGUNU7W2i4yLv4OvEu7qG_yhLdX5ij";

const Header: React.FC = () => {
  const [mounted, setMounted] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <header className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
      {/* Banner Image with Overlay */}
      <div className="relative w-full h-[400px] md:h-[500px]">
        {/* Banner Image */}
        <div className="absolute inset-0">
          <img
            src={BANNER_IMAGE}
            alt="AGFI Crusade Banner"
            className={`w-full h-full object-cover transition-all duration-700 ${
              imageLoaded ? "opacity-100 scale-100" : "opacity-0 scale-105"
            }`}
            onLoad={() => setImageLoaded(true)}
          />

          {/* Loading skeleton for banner */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-slate-800 via-slate-700 to-slate-800 animate-pulse"></div>
          )}
        </div>

        {/* Gradient Overlays for Better Text Readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/60 to-black/30"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-black/40"></div>

        {/* Content Overlay */}
        <div className="relative h-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col justify-end pb-12 md:pb-16">
          {/* Logo Badge */}
          <div
            className={`mb-6 transform transition-all duration-1000 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="inline-flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl blur-lg opacity-75 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative w-14 h-14 rounded-xl bg-gradient-to-br from-blue-400 via-blue-500 to-purple-600 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-transform duration-300 border-2 border-white/20">
                  <span className="text-white font-black text-2xl">🙏</span>
                </div>
              </div>
              <div>
                <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter drop-shadow-2xl">
                  AGFI
                </h1>
                <p className="text-blue-300 text-xs font-bold tracking-widest mt-1 drop-shadow-lg">
                  POWER IN THE NAME JESUS CRUSADE
                </p>
              </div>
            </div>
          </div>

          {/* Event Title */}
          <div
            className={`mb-4 transform transition-all duration-1000 delay-100 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <h2 className="text-2xl md:text-4xl font-bold text-white drop-shadow-2xl max-w-3xl">
              27th Annual Salvation Crusade
            </h2>
            <p className="text-base md:text-lg text-gray-200 mt-2 drop-shadow-lg max-w-2xl font-light">
              Experience three powerful days of miracles, divine healing, and
              life-transforming encounters
            </p>
          </div>

          {/* Info Pills */}
          <div
            className={`flex flex-wrap gap-3 transform transition-all duration-1000 delay-200 ${
              mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-2 shadow-lg">
              <span className="text-lg">📍</span>
              <span className="text-white text-sm font-semibold">
                Mpohor, Western Region 🇬🇭
              </span>
            </div>
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-2 shadow-lg">
              <span className="text-lg">📅</span>
              <span className="text-white text-sm font-semibold">
                2nd - 4th January 2026
              </span>
            </div>
            <div className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 flex items-center gap-2 shadow-lg">
              <span className="text-lg">🕖</span>
              <span className="text-white text-sm font-semibold">
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
