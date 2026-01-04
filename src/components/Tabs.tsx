import React from "react";

type Props = {
  value: "day1" | "day2" | "day3";
  onChange: (v: "day1" | "day2" | "day3") => void;
  imageCounts?: Record<"day1" | "day2" | "day3", number>;
  dayCount?: number; // Number of days to show (2 or 3)
};

const Tabs: React.FC<Props> = ({
  value,
  onChange,
  imageCounts,
  dayCount = 3,
}) => {
  const allDays = [
    { id: "day1", label: "Day 1", description: "Opening" },
    { id: "day2", label: "Day 2", description: "Growth" },
    { id: "day3", label: "Day 3", description: "Impact" },
  ] as const;

  // Only show days up to dayCount
  const days = allDays.slice(0, dayCount);

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-2 md:gap-4">
          {days.map((day) => {
            const count = imageCounts?.[day.id] || 0;
            return (
              <button
                key={day.id}
                onClick={() => onChange(day.id as "day1" | "day2" | "day3")}
                className={`group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex flex-col items-start ${
                  value === day.id
                    ? "bg-gradient-to-br from-blue-50 to-slate-50 text-blue-900 shadow-md border border-blue-200"
                    : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className="text-sm md:text-base">{day.label}</span>
                  {count > 0 && (
                    <span
                      className={`px-2 py-0.5 text-xs font-bold rounded-full ${
                        value === day.id
                          ? "bg-blue-500 text-white"
                          : "bg-slate-200 text-slate-600 group-hover:bg-blue-100 group-hover:text-blue-700"
                      }`}
                    >
                      {count}
                    </span>
                  )}
                </div>
                <span className="text-xs text-slate-500 group-hover:text-slate-700 transition">
                  {day.description}
                </span>
                {value === day.id && (
                  <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
