import React from "react";
import BannerFoto from "../assets/IMG/BannerFoto.png";
const Hero = () => {
  return (
    <div className="h-screen w-full flex items-center justify-center flex-col sm:flex-row">
      {/* Left Side */}
      <div className="w-[700px] h-2/3 flex flex-col items-center justify-center space-y-5 border bg-white p-4">
        <h3 className="font-semibold text-2xl">OUR BEST SELLERS</h3>
        <h1 className="text-4xl font-light">Hot New Stocks</h1>
        <h3 className="font-semibold text-2xl">BUY NOW</h3>
      </div>

      {/* Right Side */}

      <div className="w-[700px] h-2/3 relative">
        <img className="object-cover w-full h-full " src={BannerFoto} alt="" />
      </div>
    </div>
  );
};

export default Hero;