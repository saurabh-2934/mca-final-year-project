import axios from "axios";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: "https://mca-final-year-project.onrender.com",
  withCredentials: true,
});

// ================= REQUEST INTERCEPTOR =================
axiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("token");

    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// ================= RESPONSE INTERCEPTOR =================
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Don't try to refresh if:
    // 1. Already retried
    // 2. No access token exists
    // 3. Refresh endpoint itself failed
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      Cookies.get("token") &&
      !originalRequest.url.includes("/user/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await axiosInstance.post("/user/refresh");

        const newAccessToken = res.data.accessToken;

        Cookies.set("token", newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.log("Refresh token expired or invalid");

        Cookies.remove("token");
        localStorage.removeItem("user");

        window.location.replace("/login");

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
