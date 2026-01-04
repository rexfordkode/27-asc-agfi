import React, { useState, useEffect } from "react";
import { CrusadeData, getAllCrusades } from "@/data/images";
import CrusadeCard from "./CrusadeCard";

type Props = {
  selectedCrusadeId: string;
  onSelectCrusade: (crusadeId: string) => void;
};

// Helper function to get the currently happening or next upcoming crusade
const getCurrentOrNextCrusade = (crusades: CrusadeData[]): string | null => {
  const now = new Date();

  // Parse date strings like "January 2, 2026" or "January 5, 2026 @ 7:00 PM"
  const parseDate = (dateStr: string): Date => {
    const cleanDate = dateStr.split("@")[0].trim();
    return new Date(cleanDate);
  };

  // Find crusade that's currently happening
  for (const crusade of crusades) {
    const startDate = parseDate(crusade.startDate);
    const endDate = parseDate(crusade.endDate);

    // Set end date to end of day
    endDate.setHours(23, 59, 59, 999);

    if (now >= startDate && now <= endDate) {
      return crusade.id;
    }
  }

  // If no current crusade, find the next upcoming one
  for (const crusade of crusades) {
    const startDate = parseDate(crusade.startDate);
    if (startDate > now) {
      return crusade.id;
    }
  }

  // If no upcoming crusade, return the first one
  return crusades.length > 0 ? crusades[0].id : null;
};

const CrusadeCarousel: React.FC<Props> = ({
  selectedCrusadeId,
  onSelectCrusade,
}) => {
  const [crusades, setCrusades] = useState<CrusadeData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const allCrusades = getAllCrusades();
    setCrusades(allCrusades);

    // Get the current or next crusade based on date
    const currentCrusadeId = getCurrentOrNextCrusade(allCrusades);

    // Set initial index based on current/next crusade or selected crusade
    const indexToUse = currentCrusadeId || selectedCrusadeId;
    const selectedIndex = allCrusades.findIndex((c) => c.id === indexToUse);

    if (selectedIndex >= 0) {
      setCurrentIndex(selectedIndex);
      // Only trigger onSelectCrusade if different from current selected
      if (indexToUse !== selectedCrusadeId) {
        onSelectCrusade(indexToUse);
      }
    }
  }, []);

  if (crusades.length === 0) {
    return null;
  }

  const handlePrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? crusades.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === crusades.length - 1 ? 0 : prev + 1));
  };

  const handleSelectCrusade = (crusadeId: string) => {
    onSelectCrusade(crusadeId);
    const index = crusades.findIndex((c) => c.id === crusadeId);
    if (index >= 0) {
      setCurrentIndex(index);
    }
  };

  return (
    <section className="relative bg-gradient-to-b from-blue-50 via-white to-slate-50 py-16 md:py-24">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/40 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="mb-12 animate-slideDown text-center">
          <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 text-white text-sm font-bold uppercase tracking-wider mb-4">
            Our Crusades
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            Explore Our Events
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto font-light">
            Discover the power and glory from our crusade programs across
            multiple locations
          </p>
        </div>

        {/* Single crusade view for small screens, carousel for larger */}
        {crusades.length === 1 ? (
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <CrusadeCard
                crusade={crusades[0]}
                isSelected={true}
                onClick={() => handleSelectCrusade(crusades[0].id)}
              />
            </div>
          </div>
        ) : (
          <>
            {/* Desktop carousel */}
            <div className="hidden md:block">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {crusades.map((crusade) => (
                  <div key={crusade.id}>
                    <CrusadeCard
                      crusade={crusade}
                      isSelected={selectedCrusadeId === crusade.id}
                      onClick={() => handleSelectCrusade(crusade.id)}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile carousel */}
            <div className="md:hidden">
              <div className="relative">
                <div className="overflow-hidden rounded-2xl">
                  <div
                    className="flex transition-transform duration-300"
                    style={{
                      transform: `translateX(-${currentIndex * 100}%)`,
                    }}
                  >
                    {crusades.map((crusade) => (
                      <div key={crusade.id} className="w-full flex-shrink-0">
                        <CrusadeCard
                          crusade={crusade}
                          isSelected={selectedCrusadeId === crusade.id}
                          onClick={() => handleSelectCrusade(crusade.id)}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Navigation buttons */}
                <button
                  onClick={handlePrevious}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 shadow-lg"
                  aria-label="Previous"
                >
                  <svg
                    className="w-6 h-6"
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
                </button>

                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-slate-900 flex items-center justify-center transition-all duration-300 hover:scale-110 z-10 shadow-lg"
                  aria-label="Next"
                >
                  <svg
                    className="w-6 h-6"
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

                {/* Pagination indicators */}
                <div className="flex justify-center gap-2 mt-6">
                  {crusades.map((crusade) => (
                    <button
                      key={crusade.id}
                      onClick={() =>
                        setCurrentIndex(
                          crusades.findIndex((c) => c.id === crusade.id)
                        )
                      }
                      className={`h-2 rounded-full transition-all duration-300 ${
                        crusades[currentIndex]?.id === crusade.id
                          ? "bg-blue-500 w-8"
                          : "bg-white/30 w-2 hover:bg-white/50"
                      }`}
                      aria-label={`Go to ${crusade.name}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default CrusadeCarousel;
