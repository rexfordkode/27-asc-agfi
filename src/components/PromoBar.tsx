import React from "react";
import { FaTiktok, FaFacebook, FaYoutube, FaInstagram, FaHeart } from "react-icons/fa";
import { GiPrayer } from "react-icons/gi";
import { SocialLinks } from "@/constants/social";

const socialIcons: Record<string, React.ReactNode> = {
  TikTok: <FaTiktok className="w-4 h-4" />,
  Facebook: <FaFacebook className="w-4 h-4" />,
  YouTube: <FaYoutube className="w-4 h-4" />,
  Instagram: <FaInstagram className="w-4 h-4" />,
};

const PromoBar: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-slate-900 via-blue-900 to-slate-950 border-b border-slate-800/50">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-blue-500/15 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-8 md:py-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          {/* Main Message */}
          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <GiPrayer className="w-5 h-5 text-yellow-300 animate-bounce" style={{ animationDelay: "0s" }} />
              <h2 className="text-xl md:text-2xl font-bold text-white">
                Join Us in God's Presence
              </h2>
            </div>
            <p className="text-blue-100 text-sm md:text-base font-medium">
              Experience the transformative power of faith through salvation crusades.
            </p>
          </div>

          {/* Social Links Section */}
          <div className="flex-shrink-0">
            <div className="flex gap-2">
              {Object.entries(SocialLinks).map(([label, url], index) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`Follow us on ${label}`}
                  className="group relative w-10 h-10 rounded-full bg-gradient-to-br from-white/25 to-white/15 hover:from-white/35 hover:to-white/25 text-white flex items-center justify-center border border-white/30 hover:border-white/50 transition-all duration-300 hover:shadow-lg hover:scale-110 overflow-hidden"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <span className="relative z-10 flex items-center justify-center">
                    {socialIcons[label]}
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-indigo-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent opacity-30"></div>
    </div>
  );
};

export default PromoBar;
