import React, { useEffect, useState } from "react";
import BestSellersSliderCard from "./BestSellersSliderCard";
import AnimatedBackground from "./AnimatedBackground";
import { useProductStore } from "../stores/useProductStore";

const BestSellersSlider = () => {
  const [bestProducts, setBestProducts] = useState([]);
  const { products, fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const best = products.filter((product) => product.isBest === true);
    setBestProducts(best.slice(0, 3));
  }, [products]);

  return (
    <div className="relative w-full min-h-screen flex flex-col space-y-12 items-center justify-start pt-10 mt-24 mb-12 px-4 sm:px-8 overflow-hidden bg-gray">
      <AnimatedBackground />

      <div className="relative z-10 text-center">
        <h1 className="text-center text-5xl sm:text-6xl font-bold text-[#1c1c1e] mb-4 tracking-wide">
          Best Products at the Best Price
        </h1>
        <h3 className="text-lg sm:text-2xl font-extralight text-gray-900 tracking-tighter leading-snug sm:leading-normal mt-2">
          Discover our top-rated products, <br className="hidden sm:block" />
          selected to bring you the best in quality, style, and performance.
        </h3>
      </div>

      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full p-6 sm:p-12">
        <BestSellersSliderCard {...bestProducts[0]} index={0} />
        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>

        <div className="hidden md:block"></div>
        <BestSellersSliderCard {...bestProducts[1]} index={1} />
        <div className="hidden md:block"></div>

        <div className="hidden md:block"></div>
        <div className="hidden md:block"></div>
        <BestSellersSliderCard {...bestProducts[2]} index={2} />
      </div>
    </div>
  );
};

export default BestSellersSlider;
