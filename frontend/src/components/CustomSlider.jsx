import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { headphoneData } from "../assets/IMG/MockData";

const CustomSlider = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const timeoutRef = useRef(null);

  // Sayfa yön değiştirme fonksiyonu
  const paginate = (newDirection) => {
    setDirection(newDirection);
    setSelectedIndex((prev) => {
      if (newDirection === 1) {
        return (prev + 1) % headphoneData.length;
      } else if (newDirection === -1) {
        return prev === 0 ? headphoneData.length - 1 : prev - 1;
      }
      return prev;
    });
  };

  // Kartlara tıklanınca seçilen indexi güncelle, direction set et ve timer resetle
  const handleCardClick = (clickedIndex) => {
    if (clickedIndex === selectedIndex) return;

    const newDirection = clickedIndex > selectedIndex ? 1 : -1;
    setDirection(newDirection);
    setSelectedIndex(clickedIndex);
    resetAutoPlay();
  };

  // Otomatik oynatma timer'ını resetler
  const resetAutoPlay = () => {
    if (timeoutRef.current) {
      clearInterval(timeoutRef.current);
    }
    startAutoPlay();
  };

  // Otomatik oynatma başlat
  const startAutoPlay = () => {
    timeoutRef.current = setInterval(() => {
      paginate(1);
    }, 2500); // 5 saniye
  };

  // Bileşen mount olduğunda otomatik oynatmayı başlat, unmountta temizle
  useEffect(() => {
    startAutoPlay();

    return () => {
      if (timeoutRef.current) {
        clearInterval(timeoutRef.current);
      }
    };
  }, []);

  // Max 3 kart göster, seçilen ve 2 yanındaki (döngüsel)
  const getVisibleIndexes = () => {
    const total = headphoneData.length;
    let indexes = [];

    indexes.push(selectedIndex);
    indexes.push((selectedIndex + 1) % total);
    indexes.push((selectedIndex + 2) % total);

    return indexes;
  };

  const visibleIndexes = getVisibleIndexes();
  const visibleCards = visibleIndexes.map((i) => headphoneData[i]);
  const selectedItem = headphoneData[selectedIndex];

  // Kart variantları - scale ve opacity ile birbirlerinden ayrılıyorlar
  const cardVariants = {
    initial: { scale: 0.8, opacity: 0.6 },
    selected: { scale: 1, opacity: 1, zIndex: 2 },
    unselected: { scale: 0.85, opacity: 0.6, zIndex: 1 },
  };

  // Yazı animasyonu: aşağıdan yukarı çıkacak şekilde opacity ve y hareketi
  const textVariants = {
    enter: {
      opacity: 0,
      y: 30,
    },
    center: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -30,
    },
  };

  return (
    <div className="relative w-[90%] min-h-[100vh] rounded-lg shadow-[0_30px_50px_#dbdbdb] mx-auto mt-10 select-none overflow-hidden bg-gray-50">
      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedItem._id + "-bg"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.8 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="absolute inset-0 bg-center bg-no-repeat bg-contain"
            style={{
              backgroundImage: `url(${selectedItem.image})`,
            }}
          />
        </AnimatePresence>
      </div>

      {/* TEXT */}
      <div className="absolute top-1/2 left-12 transform -translate-y-1/2 text-gray-900 font-sans max-w-md z-10">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={selectedItem._id + "-text"}
            variants={textVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.5 }}
          >
            <h2
              className="text-5xl uppercase font-extrabold tracking-wider drop-shadow-sm"
              style={{ letterSpacing: "0.12em" }}
            >
              {selectedItem.title}
            </h2>
            <p className="mt-4 text-lg font-medium leading-relaxed text-gray-800 drop-shadow-xs">
              {selectedItem.subtitle}
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* CARDS */}
      <div className="absolute bottom-5 right-5 w-[460px] h-[140px] rounded-lg shadow-lg flex items-center justify-center gap-6 p-4 z-20">
        {visibleCards.map((item, idx) => {
          const actualIndex = visibleIndexes[idx];
          const isSelected = actualIndex === selectedIndex;
          return (
            <motion.div
              key={item._id}
              onClick={() => handleCardClick(actualIndex)}
              variants={cardVariants}
              initial="initial"
              animate={isSelected ? "selected" : "unselected"}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="rounded-lg border-4 shadow-md flex-shrink-0 cursor-pointer"
              style={{
                width: "140px",
                height: "110px",
                backgroundImage: `url(${item.image})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                borderColor: isSelected ? "#000" : "transparent",
                boxShadow: isSelected ? "0 0 15px rgba(0,0,0,0.4)" : "none",
                zIndex: isSelected ? 10 : 1,
              }}
              title={item.title}
            />
          );
        })}
      </div>

      {/* NAV BUTTONS */}
      <div className="absolute bottom-5 left-5 flex gap-4 z-30">
        <button
          onClick={() => {
            paginate(-1);
            resetAutoPlay();
          }}
          className="w-12 h-12 rounded-md bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition"
          aria-label="Önceki"
        >
          <FaArrowLeft size={20} />
        </button>
        <button
          onClick={() => {
            paginate(1);
            resetAutoPlay();
          }}
          className="w-12 h-12 rounded-md bg-gray-800 hover:bg-gray-700 text-white flex items-center justify-center transition"
          aria-label="Sonraki"
        >
          <FaArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default CustomSlider;
