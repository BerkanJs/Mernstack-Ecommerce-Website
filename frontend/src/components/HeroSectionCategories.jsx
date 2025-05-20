import React from 'react'
import { categories } from "../assets/IMG/MockData";
import CategoryItem from "../components/CategoryItem";
const HeroSectionCategories = () => {
     
  return (
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 bg-gray-100 rounded-2xl">
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <h1 className="text-center text-5xl sm:text-6xl font-bold text-[#1c1c1e] mb-4 tracking-wide">
            Explore Our Categories
          </h1>
          <p className="text-center text-xl text-gray-600 mb-12">
            Discover the latest trends in eco-friendly fashion
          </p>
          <div className="grid grid-col-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {categories.map((category) => (
              <CategoryItem category={category} key={category._id} />
            ))}
          </div>
        </div>
      </div>
  )
}

export default HeroSectionCategories