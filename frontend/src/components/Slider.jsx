import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { headphoneData2 } from '../assets/IMG/MockData/';

const App = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [items, setItems] = useState(headphoneData2);
  const [previousImage, setPreviousImage] = useState(null);

  useEffect(() => {
    const intervalId = setInterval(() => {
      nextSlide();
    }, 3000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      setPreviousImage(items[items.length - 1].image);
    }
  }, [items]);

  const nextSlide = () => {
    setPreviousImage(items[0].image);
    setItems((prevItems) => {
      const firstItem = prevItems[0];
      return [...prevItems.slice(1), firstItem];
    });
    setCurrentIndex(0);
  };

  const prevSlide = () => {
    setPreviousImage(items[items.length - 1].image);
    setItems((prevItems) => {
      const lastItem = prevItems[prevItems.length - 1];
      return [lastItem, ...prevItems.slice(0, -1)];
    });
    setCurrentIndex(0);
  };

  return (
    <div className="relative w-screen h-screen bg-gray-200 overflow-hidden flex justify-center items-center">
      {previousImage && (
        <div
          className="absolute top-0 left-0 w-full h-full bg-cover bg-center blur-md transition-all duration-500 opacity-50"
          style={{ backgroundImage: `url(${previousImage})` }}
        ></div>
      )}
      <div className="relative w-[80%] h-[500px] bg-gray-50 shadow-xl rounded-xl">
        <div className="absolute bottom-5 right-5 flex space-x-4">
          {items.map((item, index) => (
            <div
              key={item.id}
              className={`w-24 h-36 bg-cover bg-center rounded-md shadow-md cursor-pointer transition-opacity duration-300 ${
                index === 0 ? 'opacity-100' : 'opacity-60 hover:opacity-100'
              }`}
              style={{ backgroundImage: `url(${item.image})`, backgroundColor: item.bgColor }}
              onClick={() => {
                // Küçük kartlara tıklanınca ilgili slayta gitme işlevi (isteğe bağlı)
                const diff = index - 0;
                if (diff > 0) {
                  for (let i = 0; i < diff; i++) {
                    setPreviousImage(items[0].image);
                    setItems((prev) => [...prev.slice(1), prev[0]]);
                  }
                } else if (diff < 0) {
                  for (let i = 0; i < Math.abs(diff); i++) {
                    setPreviousImage(items[items.length - 1].image);
                    setItems((prev) => [prev.slice(-1)[0], ...prev.slice(0, -1)]);
                  }
                }
                setCurrentIndex(0);
              }}
            ></div>
          ))}
        </div>

        {items[0] && (
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full flex justify-center items-center">
            <div className="absolute top-5 left-5 text-left text-white">
              <div className="text-4xl font-bold">{items[0].title}</div>
              <div className="mt-2 mb-3">{items[0].subtitle}</div>
              <div className="font-semibold text-lg">{items[0].price}</div>
              <div className="mt-1">Model: {items[0].modal}</div>
              <button className="px-5 py-2 bg-black rounded-full mt-3">Daha fazlası için</button>
            </div>
            <div
              className="w-[400px] h-[400px] bg-cover bg-center rounded-xl shadow-xl"
              style={{ backgroundImage: `url(${items[0].image})`, backgroundColor: items[0].bgColor }}
            ></div>
          </div>
        )}

        <div className="absolute top-1/2 left-5 transform -translate-y-1/2">
          <button
            onClick={prevSlide}
            className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        </div>
        <div className="absolute top-1/2 right-5 transform -translate-y-1/2">
          <button
            onClick={nextSlide}
            className="w-10 h-10 rounded-lg bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default App;