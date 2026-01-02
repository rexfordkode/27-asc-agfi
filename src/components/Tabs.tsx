import React from "react";

type Props = {
  value: "day1" | "day2" | "day3";
  onChange: (v: "day1" | "day2" | "day3") => void;
};

const Tabs: React.FC<Props> = ({ value, onChange }) => {
  const days = [
    { id: "day1", label: "Day 1", description: "Opening" },
    { id: "day2", label: "Day 2", description: "Growth" },
    { id: "day3", label: "Day 3", description: "Impact" },
  ] as const;

  return (
    <div className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
        <div className="flex gap-2 md:gap-4">
          {days.map((day) => (
            <button
              key={day.id}
              onClick={() => onChange(day.id as "day1" | "day2" | "day3")}
              className={`group relative px-6 py-3 rounded-lg font-semibold transition-all duration-300 flex flex-col items-start ${
                value === day.id
                  ? "bg-gradient-to-br from-blue-50 to-slate-50 text-blue-900 shadow-md border border-blue-200"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-50"
              }`}
            >
              <span className="text-sm md:text-base">{day.label}</span>
              <span className="text-xs text-slate-500 group-hover:text-slate-700 transition">
                {day.description}
              </span>
              {value === day.id && (
                <div className="absolute bottom-0 left-6 right-6 h-0.5 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full"></div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tabs;
