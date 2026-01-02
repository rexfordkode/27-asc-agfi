import React, { useState } from "react";
import Header from "./components/Header";
import Tabs from "./components/Tabs";
import Gallery from "./components/Gallery";
import Modal from "./components/Modal";
import { IMAGES_BY_DAY } from "./data/images";

const App: React.FC = () => {
  const [day, setDay] = useState<"day1" | "day2" | "day3">("day1");
  const [preview, setPreview] = useState<string | null>(null);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <Header />
      <main>
        <Tabs value={day} onChange={(d) => setDay(d)} />
        <Gallery
          images={IMAGES_BY_DAY[day]}
          onPreview={(url) => setPreview(url)}
        />
      </main>
      {preview && <Modal src={preview} onClose={() => setPreview(null)} />}
    </div>
  );
};

export default App;
