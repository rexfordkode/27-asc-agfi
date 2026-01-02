import React from "react";
import { FaTiktok, FaFacebook, FaYoutube, FaInstagram } from "react-icons/fa";
import { SocialLinks } from "@/constants/social";

const socialIcons: Record<string, React.ReactNode> = {
  TikTok: <FaTiktok className="w-5 h-5" />,
  Facebook: <FaFacebook className="w-5 h-5" />,
  YouTube: <FaYoutube className="w-5 h-5" />,
  Instagram: <FaInstagram className="w-5 h-5" />,
};

const PromoBar: React.FC = () => {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-amber-50 via-orange-50 to-amber-50 border-b border-orange-200">
      {/* Animated background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-300/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 lg:px-8 py-6 md:py-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-6">
          {/* Social Links */}
          <div className="flex-shrink-0">
            <p className="text-xs font-semibold text-slate-600 uppercase tracking-wider mb-3">
              Watch & Follow AGFI 👇
            </p>
            <div className="grid grid-cols-4 gap-3">
              {Object.entries(SocialLinks).map(([label, url]) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  className="w-12 h-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white hover:shadow-lg hover:scale-110 transition-all duration-200 border border-orange-600/50 hover:border-orange-400"
                >
                  {socialIcons[label]}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoBar;
