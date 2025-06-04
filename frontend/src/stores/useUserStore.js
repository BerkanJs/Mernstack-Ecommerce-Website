import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const useUserStore = create((set, get) => ({
  user: null,
  loading: false,
  checkingAuth: true,

  signup: async ({ name, email, password, confirmPassword }) => {
    set({ loading: true });
    if (password !== confirmPassword) {
      set({ loading: false });
      return toast.error("Passwords do not match");
    }

    try {
      const res = await axios.post("/auth/signup", { name, email, password });

      // Diyelim res.data'da accessToken ve user var
      const { accessToken, user } = res.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      set({ user, loading: false });
      toast.success("Register is successful");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  login: async ({ email, password }) => {
    set({ loading: true });
    try {
      const res = await axios.post("/auth/login", { email, password });

      const { accessToken, user } = res.data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      set({ user, loading: false });
      toast.success("Login is successful");
    } catch (error) {
      set({ loading: false });
      toast.error(error.response?.data?.message || "An error occurred");
    }
  },

  checkAuth: async () => {
    set({ checkingAuth: true });

    const token = localStorage.getItem("token");
    if (token) {
      axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      try {
        const response = await axios.get("/auth/profile");
        set({ user: response.data, checkingAuth: false });
        return;
      } catch (error) {
        set({ user: null, checkingAuth: false });
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        delete axios.defaults.headers.common["Authorization"];
      }
    } else {
      set({ user: null, checkingAuth: false });
    }
  },

  logout: async () => {
    try {
      await axios.post("/auth/logout");
    } catch (error) {
      // logout isteği başarısız olsa da devam et
    }
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    delete axios.defaults.headers.common["Authorization"];
    set({ user: null });
    toast.success("Logout successful");
  },

  refreshToken: async () => {
    try {
      const res = await axios.post(
        "/auth/refresh-token",
        {},
        { withCredentials: true }
      );

      if (res.data.accessToken) {
        localStorage.setItem("token", res.data.accessToken);
        axios.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${res.data.accessToken}`;
      }

      const profile = await axios.get("/auth/profile", { withCredentials: true });
      set({ user: profile.data });
    } catch (error) {
      set({ user: null });
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      delete axios.defaults.headers.common["Authorization"];
      throw error;
    }
  },
}));


let refreshPromise = null;

axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        if (refreshPromise) {
          await refreshPromise;
          return axios(originalRequest);
        }

        refreshPromise = useUserStore.getState().refreshToken();
        await refreshPromise;
        refreshPromise = null;

        return axios(originalRequest);
      } catch (refreshError) {
        useUserStore.getState().logout();
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);
