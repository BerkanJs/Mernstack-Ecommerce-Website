import React from "react";
import BannerFoto from "../assets/IMG/BannerFoto.png";
import { Link } from "react-router-dom";
const Hero = () => {
  return (
    <div className="min-h-[60vh] w-full flex items-center justify-center flex-col sm:flex-row">
      {/* Left Side */}
      <div className="w-[700px] h-2/3 flex flex-col items-center justify-center space-y-5 border bg-white p-4">
        <h3 className="font-semibold text-2xl">OUR BEST SELLERS</h3>
        <h1 className="text-4xl font-light">Hot New Stocks</h1>
        <Link
          to="/collections"
          className="font-semibold text-2xl text-gray-800 cursor-pointer 
             transition-transform duration-300 ease-in-out 
             hover:text-gray-900 hover:underline hover:scale-105 
             animate-bounce
             focus:outline-none focus:ring-2 focus:ring-gray-600"
        >
          BUY NOW
        </Link>
      </div>

      {/* Right Side */}

      <div className="w-[700px] h-2/3 relative">
        <img className="object-cover w-full h-full " src={BannerFoto} alt="" />
      </div>
    </div>
  );
};

export default Hero;
