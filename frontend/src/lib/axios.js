import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://mernstack-ecommerce-website.onrender.com/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance;