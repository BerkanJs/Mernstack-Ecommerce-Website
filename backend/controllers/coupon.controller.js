import Coupon from "../models/coupon.model.js";

export const getCoupon = async (req, res) => {
  try {
    const coupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
    res.json(coupon || null);
  } catch (error) {
    console.log("Error in getCoupon controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

export const validateCoupon = async (req, res) => {
  try {
    const { code } = req.body;
    const coupon = await Coupon.findOne({
      code: code,
      userId: req.user._id,
      isActive: true,
    });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    if (coupon.expirationDate < new Date()) {
      coupon.isActive = false;
      await coupon.save();
      return res.status(404).json({ message: "Coupon expired" });
    }
    res.json({
      message: "Coupon is valid",
      code: coupon.code,
      discountPercentage: coupon.discountPercentage,
    });
  } catch (error) {
    console.log("Error in validateCoupon controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};





export const createCoupon = async (req, res) => {
  try {
 
    const existingCoupon = await Coupon.findOne({
      userId: req.user._id,
      isActive: true,
    });
    if (existingCoupon) {
      return res.status(400).json({ message: "User already has an active coupon." });
    }

    
    const code = "SAVE40-" + Math.random().toString(36).substring(2, 8).toUpperCase();

    const coupon = new Coupon({
      userId: req.user._id,
      code,
      discountPercentage: 40,
      expirationDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 gün geçerli
      isActive: true,
    });

    await coupon.save();

    res.status(201).json({ message: "Coupon created successfully", coupon });
  } catch (error) {
    console.log("Error in createCoupon controller", error.message);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
