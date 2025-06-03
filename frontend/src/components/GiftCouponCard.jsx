import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useCartStore } from "../stores/useCartStore";

const GiftCouponCard = () => {
	const [userInputCode, setUserInputCode] = useState("");
	const { coupon, isCouponApplied, applyCoupon, getMyCoupon, removeCoupon } = useCartStore();

	useEffect(() => {
		getMyCoupon();
	}, [getMyCoupon]);

	useEffect(() => {
		if (coupon) setUserInputCode(coupon.code);
	}, [coupon]);

	const handleApplyCoupon = () => {
		if (!userInputCode) return;
		applyCoupon(userInputCode);
	};

	const handleRemoveCoupon = async () => {
		await removeCoupon();
		setUserInputCode("");
	};

	return (
<motion.div
  className="space-y-4 rounded-xl border border-slate-300 bg-slate-100 p-6 shadow-md sm:p-8"
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
>
  <div className="space-y-4">
    <div>
      <label htmlFor="voucher" className="mb-2 block text-sm font-medium text-[#1c1c1e]">
        Do you have a voucher or gift card?
      </label>
      <input
        type="text"
        id="voucher"
        className="block w-full rounded-md border border-slate-300 bg-white 
        p-2.5 text-sm text-slate-900 placeholder-slate-400 focus:border-slate-900 
        focus:ring-slate-900"
        placeholder="Enter code here"
        value={userInputCode}
        onChange={(e) => setUserInputCode(e.target.value)}
        required
      />
    </div>

    <motion.button
      type="button"
      className="flex w-full items-center justify-center rounded-md bg-[#1c1c1e] px-5 py-2.5 
      text-sm font-medium text-white hover:bg-black focus:outline-none focus:ring-2 focus:ring-slate-500"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={handleApplyCoupon}
    >
      Apply Code
    </motion.button>
  </div>

  {isCouponApplied && coupon && (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-slate-800">Applied Coupon</h3>
      <p className="mt-2 text-sm text-slate-600">
        {coupon.code} – {coupon.discountPercentage}% off
      </p>

      <motion.button
        type="button"
        className="mt-2 flex w-full items-center justify-center rounded-md bg-red-600 
        px-5 py-2.5 text-sm font-medium text-white hover:bg-red-700 focus:outline-none
        focus:ring-2 focus:ring-red-400"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleRemoveCoupon}
      >
        Remove Coupon
      </motion.button>
    </div>
  )}

  {coupon && (
    <div className="mt-4">
      <h3 className="text-lg font-medium text-slate-800">Your Available Coupon:</h3>
      <p className="mt-2 text-sm text-slate-600">
        {coupon.code} – {coupon.discountPercentage}% off
      </p>
    </div>
  )}
</motion.div>

	);
};
export default GiftCouponCard;
