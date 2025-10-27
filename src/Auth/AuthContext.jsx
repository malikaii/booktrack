import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    
    if(storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
    console.log(storedUser);
    

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


  if(loading) return <div>Loading....</div>

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
