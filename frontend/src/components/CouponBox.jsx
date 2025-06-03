import React, { useState } from "react";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";
import { useCartStore } from "../stores/useCartStore";
import { useUserStore } from "../stores/useUserStore";

const CouponBox = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const createCoupon = useCartStore((state) => state.createCoupon);
  const user = useUserStore((state) => state.user);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email");
      return;
    }

    if (!user) {
      toast.error("Please log in to get a coupon.");
      return;
    }

    setLoading(true);

    try {
      const data = await createCoupon();
      toast.success(data.message || "Coupon created successfully!");
    } catch (error) {
      console.log("Error" ,error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full h-auto p-6 bg-[#1c1c1e] rounded-lg shadow-md max-w-full mt-15 text-center">
      <h1 className="text-3xl sm:text-4xl font-semibold text-white mb-4">
        Subscribe now and get 40% off
      </h1>
      <h3 className="text-lg sm:text-xl text-white mb-6">
        Sign up today and enjoy an exclusive 40% discount on your first purchase.
        Don't miss out on this limited-time offer to save big!
      </h3>
      <form
        onSubmit={onSubmitHandler}
        className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-x-4 sm:space-y-0"
      >
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="p-2 border-2 border-gray-300 rounded-md text-white w-64 sm:w-80 md:w-96 lg:w-[400px]"
          disabled={loading}
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-white text-[#1c1c1e] px-6 py-2 rounded-md hover:bg-[#1c1c1e] hover:text-white transition duration-300 hover:cursor-pointer w-full sm:w-auto"
        >
          {loading ? "Processing..." : "Subscribe"}
        </button>
      </form>
    </div>
  );
};

export default CouponBox;
