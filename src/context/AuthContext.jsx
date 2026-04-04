import { createContext, useContext, useState } from "react";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [isLogin, setIsLogin] = useState(() => {
    return !!localStorage.getItem("access_token");
  });

  function login(token, refreshToken) {
    localStorage.setItem("access_token", token);
    localStorage.setItem("refresh_token", refreshToken);
    setIsLogin(true);
  }

  function logout() {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setIsLogin(false);
  }

  return (
    <AuthContext.Provider value={{ isLogin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
