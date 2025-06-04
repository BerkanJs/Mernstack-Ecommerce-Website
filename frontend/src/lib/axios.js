import axios from "axios";

const baseURL = import.meta.env.VITE_API_BASE_URL || "https://mernstack-ecommerce-website.onrender.com/api";

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,  // Eğer cookie kullanıyorsan kalabilir, JWT için zorunlu değil
});

// Her isteğe token eklemek için interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");  // token'ı localStorage'dan al
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // Authorization header ekle
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
