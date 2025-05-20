

import React from "react";
import { easeInOut, motion } from "framer-motion";
import{headphoneData} from "../assets/IMG/MockData"

const fadeUp = (delay) => {
  return {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.5,
    },
    show: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: delay,
        ease: easeInOut,
      },
    },
    exit: {
      opacity: 0,
      y: 50,
      scale: 0.5,
      transition: {
        duration: 0.2,
        ease: easeInOut,
      },
    },
  };
};



const HeroSectionComponent = () => {

  const [activeData, setActiveData] = React.useState(headphoneData[0]);
  const handleActiveData = (data) => {
    setActiveData(data);
  };
  return (
    <section className="bg-black text-white">
      <div className="grid grid-cols-1 md:grid-cols-2 min-h-[700px] p-25">
        {/* Headphone Info  */}
        <div className="flex flex-col justify-center py-14 md:py-0 xl:max-w-[500px]">
          <div className="space-y-5 md:text-left text-center">
            <motion.h1
              key={activeData._id}
              variants={fadeUp(0.2)}
              initial="hidden"
              animate="show"
              exit="exit"
              className="text-3xl lg:text-6xl font-bold font-varela"
            >
              {activeData.title}
            </motion.h1>
            <p className="text-sm leading-loose text-white/80">
              {activeData.subtitle}
            </p>
            <button
              className="px-4 py-2 inline-block font-normal rounded-sm"
              style={{ backgroundColor: activeData.bgColor }}
            >
              Buy and Listen
            </button>
            {/* Headphone List Separator  */}

            <div className="flex items-center justify-center md:justify-start gap-4 !mt-24">
              <div className="w-20 h-[1px] bg-white"></div>
              <p className="uppercase text-sm">Top Headphones for you</p>
              <div className="w-20 h-[1px] bg-white"></div>
            </div>
            {/* Headphone List switcher  */}

            <div className="grid grid-cols-3 gap-10">
              {headphoneData.map((item) => {
                return (
                  <div
                    onClick={() => handleActiveData(item)}
                    key={item._id}
                    className="grid grid-cols-2 place-items-center cursor-pointer"
                  >
                    <div>
                      <img className="w-[200px]" src={item.image} alt="" />
                    </div>
                    <div className="space-y-2">
                      <p className="text-base font-bold">{item.price}</p>
                      <p className="text-xs font-normal text-nowrap">
                        {item.modal}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Hero İmage  */}
        <div className="flex flex-col justify-end items-center">
          <motion.img
            key={activeData._id}
            initial={{ opacity: 0, scale: 0.9, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-[300px] md:w-[400px] xl:w-[500px]"
            src={activeData.image}
            alt=""
          />
        </div>

        {/* WhatsApp Icon  */}
        <div className="text-3xl text-white fixed bottom-10 right-10 hover:rotate-[360deg] duration-500 z-[99999] mix-blend-difference">
          <a href="">
       
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSectionComponent;