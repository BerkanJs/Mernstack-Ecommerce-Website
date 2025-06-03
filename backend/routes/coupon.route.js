import express from "express";
import{protectedRoute} from "../middleware/auth.middleware.js"
import { createCoupon, getCoupon,validateCoupon } from "../controllers/coupon.controller.js";

const router = express.Router();

router.get("/",protectedRoute,getCoupon)
router.post("/validate",protectedRoute,validateCoupon)
router.post("/create", protectedRoute, createCoupon);

export default router;