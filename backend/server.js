import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./lib/db.js";
import cookieParser from 'cookie-parser';
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import couponRoutes from "./routes/coupon.route.js";
import paymentRoutes from "./routes/payment.route.js";
import analyticsRoutes from "./routes/analytics.route.js";
import path from "path"
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;
const __dirname=path.resolve()
// Middleware'ler
app.use(cookieParser());
app.use(express.json({ limit: '30mb' })); // İstek gövdesi limiti 1MB
app.use(express.urlencoded({ extended: true, limit: '30mb' })); // Form verisi limiti 1MB

// Rotalar
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupons", couponRoutes);
app.use("/api/payments", paymentRoutes);
app.use("/api/analytics", analyticsRoutes);

if(process.env.NODE_ENV === "production"){
    app.use(express.static(path.join(__dirname,"/frontend/dist")));
    app.get("*",(req,res)=>{
        res.sendFile(path.resolve(__dirname,"frontend","dist","index.html"))
    })
}







// Server başlat
app.listen(PORT, () => {
    console.log("Server is running on port : " + PORT);
    connectDB();
});
