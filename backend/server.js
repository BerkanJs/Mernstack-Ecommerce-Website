import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import path from "path";
import { fileURLToPath } from "url";

// ESM uyumlu __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ortam değişkenlerini yükle
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- GÜNCELLENMİŞ CORS AYARI ---
const allowedOrigins = [
  "https://mernstack-ecommerce-website-1.onrender.com",  // production frontend
  "http://localhost:3000",                                // local frontend
  "http://127.0.0.1:3000"
];

app.use(cors({
  origin: function (origin, callback) {
    // Postman gibi CORS istemeyen ortamlarda origin 'undefined' olabilir
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("CORS hatası: Bu origin'e izin verilmiyor -> " + origin));
    }
  },
  credentials: true
}));

// Middleware
app.use(cookieParser());
app.use(express.json({ limit: "30mb" }));
app.use(express.urlencoded({ extended: true, limit: "30mb" }));

// Rotalar
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

// Production için statik frontend dosyaları (eğer aynı repoda frontend varsa)
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "/frontend/dist")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "dist", "index.html"));
  });
}

// Veritabanına bağlan ve sunucuyu başlat
connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(` Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error(" DB connection failed:", err);
  });
