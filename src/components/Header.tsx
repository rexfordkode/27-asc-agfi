import React from "react";

const Header: React.FC = () => {
  return (
    <header className="bg-white border-b">
      <div className="max-w-5xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-sky-700">AGFI</h1>
          <p className="text-sm text-gray-600 mt-1">
            A 3-day fellowship program gallery
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
