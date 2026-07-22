import { createContext } from "react";
import Cookies from "js-cookie";
import axiosInstance from "../utils/axiosInstance";

export const AuthContext = createContext();

function AuthProvider({ children }) {
  const login = (userData, token) => {
    localStorage.setItem("user", JSON.stringify(userData));
    Cookies.set("token", token, { expires: 1 });
  };

  const logout = async () => {
    try {
      // Clear refresh token cookie from backend
      await axiosInstance.post("/user/logout");
    } catch (error) {
      console.error(error);
    } finally {
      // Clear access token and user data
      Cookies.remove("token");
      localStorage.removeItem("user");

      // Redirect to login
      window.location.replace("/login");
    }
  };

  return (
    <AuthContext.Provider value={{ login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
