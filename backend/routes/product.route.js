import express from "express"
import { getAllProducts,getAllFeaturedProducts, createProduct,deleteProduct,getRecommendedProducts,getProductsByCategory,toggleFeaturedProduct } from "../controllers/product.controller.js";
import { protectedRoute } from "../middleware/auth.middleware.js";
import { adminRoute } from "../middleware/auth.middleware.js";
const router = express.Router();
router.get("/",getAllProducts)
router.get("/featured",getAllFeaturedProducts)
router.get("/category/:category",getProductsByCategory)
router.get("/recommendations",getRecommendedProducts)
router.post("/",protectedRoute,adminRoute,createProduct)
router.patch("/:id",protectedRoute,adminRoute,toggleFeaturedProduct)
router.delete("/:id",protectedRoute,adminRoute,deleteProduct)
export default router