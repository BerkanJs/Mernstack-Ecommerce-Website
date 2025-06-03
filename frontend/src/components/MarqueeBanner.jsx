import React, { useState, useEffect, useRef } from "react";
import { motion, useAnimation } from "framer-motion";

const messages = [
  "🚀 Sign up today and enjoy an exclusive 40% discount on your first purchase!",
  "🛒 Don’t miss out on this limited-time offer to save big!",
  "✉️ Enter your email & subscribe!",
];

const MarqueeBanner = () => {
  const controls = useAnimation();
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true);
      controls.stop();

      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      scrollTimeout.current = setTimeout(() => {
        setIsScrolling(false);
        controls.start({
          x: ["100%", "-100%"],
          transition: { repeat: Infinity, ease: "linear", duration: 20 },
        });
      }, 500);
    };

    window.addEventListener("scroll", handleScroll);

    // Başlangıçta animasyonu başlat
    controls.start({
      x: ["100%", "-100%"],
      transition: { repeat: Infinity, ease: "linear", duration: 20 },
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, [controls]);

  return (
    <div
      className="relative overflow-hidden bg-[#2c2c2e] text-white"
      style={{ height: "10%", minHeight: "24px", opacity: isScrolling ? 0 : 1, pointerEvents: isScrolling ? "none" : "auto", transition: "opacity 0.3s" }}
    >
      <motion.div
        className="flex whitespace-nowrap text-sm"
        animate={controls}
      >
        {messages.map((msg, i) => (
          <span key={i} className="mx-8 flex-shrink-0">
            {msg}
          </span>
        ))}
      </motion.div>
    </div>
  );
};

export default MarqueeBanner;
