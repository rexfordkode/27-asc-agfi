import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import PromoBar from "@/components/PromoBar";
import CrusadeCarousel from "@/components/CrusadeCarousel";
import Tabs from "@/components/Tabs";
import Gallery from "@/components/Gallery";
import Modal from "@/components/Modal";
import AdminPanel from "@/components/AdminPanel";
import { getAllCrusades, getCrusadeById } from "@/data/images";

const App: React.FC = () => {
  const [selectedCrusadeId, setSelectedCrusadeId] = useState<string>(
    "crusade-2026-main"
  );
  const [day, setDay] = useState<"day1" | "day2" | "day3">("day1");
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Initialize with localStorage data or fallback to default
  const [crusadeImages, setCrusadeImages] = useState<
    Record<string, Record<"day1" | "day2" | "day3", string[]>>
  >(() => {
    const savedImages = localStorage.getItem("agfi_crusade_images");
    if (savedImages) {
      try {
        return JSON.parse(savedImages);
      } catch (error) {
        // Initialize with current crusades
        const crusades = getAllCrusades();
        const initialData: Record<string, Record<"day1" | "day2" | "day3", string[]>> = {};
        crusades.forEach((crusade) => {
          initialData[crusade.id] = { ...crusade.images };
        });
        return initialData;
      }
    }
    // Initialize with current crusades
    const crusades = getAllCrusades();
    const initialData: Record<string, Record<"day1" | "day2" | "day3", string[]>> = {};
    crusades.forEach((crusade) => {
      initialData[crusade.id] = { ...crusade.images };
    });
    return initialData;
  });

  // Track scroll position for back-to-top and progress bar
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = (scrollTop / docHeight) * 100;

      setScrollProgress(progress);
      setShowScrollTop(scrollTop > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);


  // Save images to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("agfi_crusade_images", JSON.stringify(crusadeImages));
  }, [crusadeImages]);

  const handleImagesAdd = (
    crusadeId: string,
    selectedDay: "day1" | "day2" | "day3",
    urls: string[]
  ) => {
    setCrusadeImages((prev) => ({
      ...prev,
      [crusadeId]: {
        ...prev[crusadeId],
        [selectedDay]: [...(prev[crusadeId]?.[selectedDay] || []), ...urls],
      },
    }));
  };

  const handleImageRemove = (
    crusadeId: string,
    selectedDay: "day1" | "day2" | "day3",
    index: number
  ) => {
    setCrusadeImages((prev) => ({
      ...prev,
      [crusadeId]: {
        ...prev[crusadeId],
        [selectedDay]: prev[crusadeId]?.[selectedDay]?.filter((_, i) => i !== index) || [],
      },
    }));
  };

  const currentCrusadeImages = crusadeImages[selectedCrusadeId] || { day1: [], day2: [], day3: [] };
  const currentImages = currentCrusadeImages[day];

  const handleNext = () => {
    if (previewIndex !== null && previewIndex < currentImages.length - 1) {
      setPreviewIndex(previewIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (previewIndex !== null && previewIndex > 0) {
      setPreviewIndex(previewIndex - 1);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDayChange = (newDay: "day1" | "day2" | "day3") => {
    setDay(newDay);
    // Smooth scroll to gallery section
    setTimeout(() => {
      const gallery = document.getElementById("gallery");
      if (gallery) {
        gallery.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const handleCrusadeChange = (crusadeId: string) => {
    setSelectedCrusadeId(crusadeId);
    setDay("day1");
    setPreviewIndex(null);
    // Smooth scroll to gallery section
    setTimeout(() => {
      const gallery = document.getElementById("gallery");
      if (gallery) {
        gallery.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 100);
  };

  const currentCrusade = getCrusadeById(selectedCrusadeId);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-slate-200 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-blue-600 transition-all duration-300"
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>

      {/* Skip to main content for accessibility */}
      <a href="#main" className="sr-only focus:not-sr-only">
        Skip to main content
      </a>

      <Header />
      <PromoBar />
      <main id="main">
        <CrusadeCarousel
          selectedCrusadeId={selectedCrusadeId}
          onSelectCrusade={handleCrusadeChange}
        />
        <Tabs
          value={day}
          onChange={handleDayChange}
          imageCounts={{
            day1: currentCrusadeImages.day1.length,
            day2: currentCrusadeImages.day2.length,
            day3: currentCrusadeImages.day3.length,
          }}
          dayCount={currentCrusade?.dayCount || 3}
        />
        <div id="gallery">
          <Gallery
            images={currentImages}
            onPreview={(index) => setPreviewIndex(index)}
            currentDay={day}
          />
        </div>
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

      {/* Back to Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-6 left-6 w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white flex items-center justify-center shadow-[0_8px_30px_rgba(59,130,246,0.4)] hover:shadow-[0_8px_40px_rgba(59,130,246,0.6)] transition-all duration-300 hover:scale-110 z-40 group"
          aria-label="Back to top"
        >
          <svg
            className="w-6 h-6 transform group-hover:-translate-y-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </button>
      )}

      {/* Admin Panel */}
      <AdminPanel
        onImagesAdd={handleImagesAdd}
        onImageRemove={handleImageRemove}
        currentCrusadeId={selectedCrusadeId}
        currentImages={crusadeImages}
      />

      {previewIndex !== null && (
        <Modal
          src={currentImages[previewIndex]}
          onClose={() => setPreviewIndex(null)}
          onNext={
            previewIndex < currentImages.length - 1 ? handleNext : undefined
          }
          onPrevious={previewIndex > 0 ? handlePrevious : undefined}
          currentIndex={previewIndex}
          totalImages={currentImages.length}
        />
      )}
    </div>
  );
};

export default App;
// Force rebuild Fri Jan  2 22:40:44 EST 2026
