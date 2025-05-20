import React from 'react'
import { useEffect } from "react";
import { useProductStore } from "../stores/useProductStore";
import FeaturedProducts from "./FeaturedProdcuts";

const FeaturedProductSlider = () => {
  const { fetchFeaturedProducts, featuredProducts, loading } = useProductStore();

  useEffect(() => {
    fetchFeaturedProducts();
  }, [fetchFeaturedProducts]);

  console.log(featuredProducts);

  return (
    <div className='relative min-h-screen text-black overflow-hidden'>
      <div className='relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
        {!loading && featuredProducts.length > 0 && (
          <FeaturedProducts featuredProducts={featuredProducts} />
        )}
      </div>
    </div>
  );
};

export default FeaturedProductSlider