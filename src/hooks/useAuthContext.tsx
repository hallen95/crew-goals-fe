import React, { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useHistory } from "react-router-dom";

interface AuthContextType {
  user: any;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setUser(jwtDecode(token));
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    setUser(jwtDecode(token));
    history.push("/goals");
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    history.push("/auth/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
