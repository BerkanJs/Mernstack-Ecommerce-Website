import React from "react";
import { motion } from "framer-motion";
import {
  Monitor,
  Smartphone,
  Headphones,
  ShoppingCart,


  Watch,
  Laptop,
  Speaker,
  Camera,
  TabletSmartphone,



} from "lucide-react";

const icons = [
  Monitor,
  Smartphone,
  Headphones,
  ShoppingCart,


  Watch,
  Laptop,
  Speaker,
  Camera,
  TabletSmartphone,


];

const positions = Array.from({ length: icons.length }, () => ({
  top: `${Math.random() * 85 + 5}%`,
  left: `${Math.random() * 85 + 5}%`,
}));

const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 w-full h-full bg-gradient-to-b from-[#1c1c1e] via-gray-700 to-white z-0 overflow-hidden">
      {icons.map((Icon, index) => {
        const position = positions[index];

        return (
          <div key={index} className="absolute inset-0 w-full h-full bg-gradient-to-b from-gray-100 via-white to-gray-200 z-0 overflow-hidden">
            {icons.map((Icon, index) => {
              const position = positions[index];

              return (
                <motion.div
                  key={index}
                  className="absolute"
                  initial={{ opacity: 0.3 }}
                  animate={{
                    opacity: [0.3, 0.6, 0.3],
                    y: [-10, 0, 10],
                    x: [-5, 0, 5],
                  }}
                  transition={{
                    duration: 6 + (index % 5),
                    repeat: Infinity,
                    repeatType: "mirror",
                    ease: "easeInOut",
                  }}
                  style={{
                    top: position.top,
                    left: position.left,
                  }}
                >
                  <Icon className="text-gray-300 w-10 h-10 sm:w-12 sm:h-12" />
                </motion.div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AnimatedBackground;
