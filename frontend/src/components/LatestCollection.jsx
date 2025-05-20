import React, { useEffect, useState } from "react";
import LatestCollectionProductCard from "./LatestCollectionProductCard";
import { useProductStore } from "../stores/useProductStore";

const LatestCollections = () => {
  const [latestProducts, setLatestProducts] = useState([]);
  const { products, fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const filtered = products
      .filter((item) => item.isNewest === true)
      .slice(0, 6); // İlk 6 tanesini alıyoruz
    setLatestProducts(filtered);
  }, [products]);


  return (
    <div className="w-full min-h-[75vh] flex flex-col space-y-8 sm:space-y-12 items-center justify-center mb-8 sm:mb-12 px-4 sm:px-8">
      {/* Header Section */}
      <h1 className="text-center text-5xl sm:text-6xl font-bold text-[#1c1c1e] mb-4 tracking-wide">
        Our New Collection.
      </h1>

      {/* Desc. Section */}
      <h3 className="text-lg sm:text-2xl font-extralight text-gray-500 tracking-tighter text-center leading-snug sm:leading-normal max-w-3xl">
        Discover our new collection featuring the latest in tech, fashion, and
        accessories. Elevate your style with premium quality products designed
        for every occasion.
      </h3>

      {/* Products Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-5 w-full max-w-7xl justify-center">
        {latestProducts.map((data) => (
          <LatestCollectionProductCard
            key={data._id}
            name={data.name}
            _id={data._id}
            price={data.price}
            img={data.image}
          />
        ))}
      </div>
    </div>
  );
};

export default LatestCollections;
