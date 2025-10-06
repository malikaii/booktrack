import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    
    if(storedUser) {
      setUser(JSON.parse(storedUser))
    }

  }, [])

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    navigate("/explore");
  };
  const logout = () => {
    setUser(null);
    localStorage.removeItem("userData");
    navigate("/");
  };


  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
