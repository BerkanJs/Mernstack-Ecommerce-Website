import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCartStore } from "../stores/useCartStore";
import { toast } from "react-hot-toast";
import { useUserStore } from "../stores/useUserStore";
import { useProductStore } from "../stores/useProductStore";

const Product = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const { user } = useUserStore();
  const navigate = useNavigate();
  const addToCart = useCartStore((state) => state.addToCart);
  const { products, fetchAllProducts } = useProductStore();

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    const filteredProduct = products.find(
      (item) => String(item._id) === String(id)
    );
    setProduct(filteredProduct);

    if (filteredProduct) {
      if (filteredProduct.images && filteredProduct.images.length > 0) {
        setSelectedImage(filteredProduct.images[0]);
        setSelectedIndex(0);
      } else if (filteredProduct.image) {
        setSelectedImage(filteredProduct.image);
        setSelectedIndex(0);
      }
    }
  }, [products, id]);

  if (!product || !selectedImage) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // Thumbnail array (images varsa kullan, yoksa aynı resmi 4 kere çoğalt)
  const thumbnails =
    product.images && product.images.length > 0
      ? product.images
      : Array(4).fill(product.image);

  const handleThumbnailClick = (img, index) => {
    setSelectedImage(img);
    setSelectedIndex(index);
  };

  const handleAddToCart = async () => {
    try {
      if (!user) {
        navigate("/login");
        return;
      }
      await addToCart(product);
      toast.success("Product added to cart");
    } catch (error) {
      toast.error("An error occurred while adding to cart");
    }
  };

  return (
    <div className="min-h-[100vh] w-full mt-20 flex justify-center items-start">
      <div className="flex flex-col sm:flex-row px-4 sm:px-8 md:px-16 lg:px-24 py-8 space-y-8 sm:space-y-0 sm:space-x-10 w-full max-w-[1400px]">

        {/* Thumbnail Images */}
        <div className="flex sm:flex-col space-x-4 sm:space-x-0 sm:space-y-4 w-full sm:w-[120px] md:w-[140px]">
          {thumbnails.map((img, index) => {
            const isSelected = index === selectedIndex;
            return (
              <div
                key={index}
                onClick={() => handleThumbnailClick(img, index)}
                className={`relative h-[90px] sm:h-[110px] w-full border-2 rounded-md overflow-hidden hover:cursor-pointer ${
                  isSelected ? "border-black" : "border-gray-300"
                }`}
              >
                {/* Küçük sayı kutucuğu */}
                <div
                  className={`absolute top-1 left-1 w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${
                    isSelected ? "bg-black text-white" : "bg-gray-300 text-gray-700"
                  }`}
                >
                  {index + 1}
                </div>
                <img
                  className="object-cover w-full h-full"
                  src={img}
                  alt={`product-image-${index}`}
                />
              </div>
            );
          })}
        </div>

        {/* Main Image */}
        <div className="relative flex flex-col space-y-4 w-full sm:w-[55%]">
          <div className="h-[300px] sm:h-[400px] w-full bg-gray-100 rounded-md p-2 flex items-center justify-center">
            <img
              className="object-contain w-full h-full"
              src={selectedImage}
              alt="selected-product"
            />
          </div>
          {/* Seçilen fotoğrafın sıra numarası ana fotoğrafın üstünde */}
          <div className="absolute top-4 right-4 bg-black text-white px-3 py-1 rounded-md font-semibold select-none">
            {selectedIndex + 1}
          </div>
        </div>

        {/* Product Details */}
        <div className="flex flex-col justify-start space-y-6 w-full sm:w-[40%]">
          <div>
            <h1 className="text-2xl font-semibold mb-2">{product.name}</h1>
            <h3 className="text-lg font-medium text-gray-500 mb-1">
              {product.category}
            </h3>
            <p className="text-sm text-gray-600">
              {product.description || "No description provided."}
            </p>
          </div>

          <span className="text-2xl font-bold text-gray-800">
            {product.price} $
          </span>
          <button
            onClick={handleAddToCart}
            className="bg-black text-white w-full sm:w-[160px] h-[44px] rounded-lg hover:bg-gray-800 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-gray-600 cursor-pointer"
          >
            Add To Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
