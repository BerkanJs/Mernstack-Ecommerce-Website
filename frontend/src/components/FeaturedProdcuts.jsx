import { useEffect, useState } from "react";
import { ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from "framer-motion"; // <-- eklendi

const FeaturedProducts = ({ featuredProducts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [direction, setDirection] = useState(0); // <-- animasyon yönü
  const { addToCart } = useCartStore();
  const { user } = useUserStore();
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsPerPage(1);
      else if (window.innerWidth < 1024) setItemsPerPage(2);
      else if (window.innerWidth < 1280) setItemsPerPage(3);
      else setItemsPerPage(4);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = () => {
    if (currentIndex + itemsPerPage < featuredProducts.length) {
      setDirection(1); // sağa
      setCurrentIndex(currentIndex + itemsPerPage);
    }
  };

  const prevSlide = () => {
    if (currentIndex - itemsPerPage >= 0) {
      setDirection(-1); // sola
      setCurrentIndex(currentIndex - itemsPerPage);
    }
  };

  const handleAddToCart = (product) => {
    if (!user) {
      toast.error("Lütfen önce giriş yapınız.");
      navigate("/login");
      return;
    }
    addToCart(product);
  };

  const visibleProducts = featuredProducts.slice(currentIndex, currentIndex + itemsPerPage);

  const isStartDisabled = currentIndex === 0;
  const isEndDisabled = currentIndex + itemsPerPage >= featuredProducts.length;

  const variants = {
    enter: (direction) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction) => ({
      x: direction > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className='py-12 bg-[#181819] w-full'>
      <div className='container mx-auto px-4'>
        <h2 className='text-center text-5xl sm:text-6xl font-bold text-white mb-4'>
          Featured Products
        </h2>
        <div className='relative'>
          <div className='overflow-hidden'>
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                className='flex gap-4'
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.5 }}
              >
                {visibleProducts.map((product) => (
                  <div
                    key={product._id}
                    className='w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 flex-shrink-0 px-2 flex flex-col'
                  >
                    <div className='bg-[#2a2a2a] rounded-lg shadow-lg overflow-hidden h-full transition-all duration-300 hover:shadow-xl border border-[#3a3a3a] flex flex-col'>
                      <div className='overflow-hidden'>
                        <img
                          src={product.image}
                          alt={product.name}
                          className='w-full h-48 object-cover transition-transform duration-300 ease-in-out hover:scale-110'
                        />
                      </div>
                      <div className='p-4 flex flex-col flex-grow'>
                        <h3 className='text-lg font-semibold mb-2 text-white'>{product.name}</h3>
                        <p className='text-[#c1c1c1] font-medium mb-4'>${product.price.toFixed(2)}</p>
                        <button
                          onClick={() => handleAddToCart(product)}
                          className='w-full bg-[#1c1c1e] hover:bg-[#333] text-white font-semibold py-2 px-4 rounded transition-colors duration-300 flex items-center justify-center mt-auto'
                        >
                          <ShoppingCart className='w-5 h-5 mr-2' />
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Prev Button */}
          <button
            onClick={prevSlide}
            disabled={isStartDisabled}
            className={`absolute top-1/2 -left-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
              isStartDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-[#1c1c1e] hover:bg-[#333]"
            }`}
          >
            <ChevronLeft className='w-6 h-6 text-white' />
          </button>

          {/* Next Button */}
          <button
            onClick={nextSlide}
            disabled={isEndDisabled}
            className={`absolute top-1/2 -right-4 transform -translate-y-1/2 p-2 rounded-full transition-colors duration-300 ${
              isEndDisabled ? "bg-gray-500 cursor-not-allowed" : "bg-[#1c1c1e] hover:bg-[#333]"
            }`}
          >
            <ChevronRight className='w-6 h-6 text-white' />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeaturedProducts;
