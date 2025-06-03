import React from "react";

import HeroSectionCategories from "../components/HeroSectionCategories";
import HeroSectionComponent from "../components/HeroSectionComponent";
import BestSellerSlider from "../components/BestSellerSlider";
import CouponBox from "../components/CouponBox";
import LatestCollections from "../components/LatestCollection";
import FeaturedProductSlider from "../components/FeaturedProductSlider"
import Footer from "../components/Footer";
import Slider from "../components/Slider";
const HomePage = () => {
  
  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <HeroSectionComponent />
      <HeroSectionCategories />
      




      <CouponBox />
      <BestSellerSlider />
      <FeaturedProductSlider/>
      <LatestCollections />
   
    </div>
  );
};

export default HomePage;
