import React, { useState } from "react";
import Header from "@/components/Header";
import PromoBar from "@/components/PromoBar";
import Tabs from "@/components/Tabs";
import Gallery from "@/components/Gallery";
import Modal from "@/components/Modal";
import { IMAGES_BY_DAY } from "@/data/images";

const App: React.FC = () => {
  const [day, setDay] = useState<"day1" | "day2" | "day3">("day1");
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Skip to main content for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>

      <Header />
      <PromoBar />
      <main id="main">
        <Tabs value={day} onChange={(d) => setDay(d)} />
        <Gallery
          images={IMAGES_BY_DAY[day]}
          onPreview={(url) => setPreview(url)}
          currentDay={day}
        />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white/50 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12 text-center">
          <p className="text-slate-600 text-sm">
            © 2026 AGFI - 27th Annual Salvation Crusade. Power in the Name of
            Jesus.
          </p>
        </div>
      </footer>

      {preview && <Modal src={preview} onClose={() => setPreview(null)} />}
    </div>
  );
};

export default App;
