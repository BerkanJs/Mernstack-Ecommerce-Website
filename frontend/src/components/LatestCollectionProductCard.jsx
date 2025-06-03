import React from "react";
import { Link } from "react-router-dom";
const LatestCollectionProductCard = ({ _id, name, price, img }) => {

  return (
    <Link to={`/product/${_id}`}>
      <div className="flex flex-col items-center justify-center bg-white shadow-lg hover:shadow-2xl transition-all duration-300 p-4 rounded-lg hover:scale-105 cursor-pointer w-[250px] h-[400px]">
        <div className="w-[200px] h-[200px] mb-4">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={img}
            alt={name}
          />
        </div>

        <div className="flex flex-col items-start justify-center space-y-2">
          <h4 className="text-xl font-semibold text-gray-800 hover:text-blue-500 transition-colors duration-300">
            {name}
          </h4>
          <h5 className="text-lg font-medium text-gray-600">{price}$</h5>
        </div>
      </div>
    </Link>
  );
};

export default LatestCollectionProductCard;