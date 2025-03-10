import { createContext, useContext, useEffect, useState } from "react";
import loginUser from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const TOKEN = "token";
  const USER = "user"

  const login = async (email, password) => {
    setLoading(true);
    try {
      const data = await loginUser(email, password);
      console.log("AuthContext - Login success:", data);
      setUser(data.user);
      localStorage.setItem(TOKEN, data.token);
      localStorage.setItem(USER, JSON.stringify(data.user));
      setError(null);
    } catch (err) {
      setError("Login failed, please try again.");
    }
    setLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(TOKEN);
    localStorage.removeItem(USER);
  };

  useEffect(() => {
    const token = localStorage.getItem(TOKEN);
    const storedUser = localStorage.getItem(USER);

    if (token && storedUser) {
      setUser(JSON.parse(storedUser)); 
    }
    setLoading(false);
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
