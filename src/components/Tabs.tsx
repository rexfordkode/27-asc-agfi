import React from "react";

type Props = {
  value: "day1" | "day2" | "day3";
  onChange: (v: "day1" | "day2" | "day3") => void;
};

const Tabs: React.FC<Props> = ({ value, onChange }) => {
  const btn = (v: "day1" | "day2" | "day3") =>
    `px-3 py-2 rounded-lg font-medium transition ${
      value === v
        ? "bg-white border border-sky-100 shadow-sm text-sky-700"
        : "text-gray-600 hover:text-sky-700"
    }`;

  return (
    <nav className="flex gap-3 px-4 mt-4 max-w-5xl mx-auto">
      <button className={btn("day1")} onClick={() => onChange("day1")}>
        Day 1
      </button>
      <button className={btn("day2")} onClick={() => onChange("day2")}>
        Day 2
      </button>
      <button className={btn("day3")} onClick={() => onChange("day3")}>
        Day 3
      </button>
    </nav>
  );
};

export default Tabs;
