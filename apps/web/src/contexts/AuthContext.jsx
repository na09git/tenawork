import { createContext, useContext, useMemo, useState } from "react";
import { getUser, setToken } from "@/utils/token";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(getUser());

  const login = (nextUser, token) => {
    setUser(nextUser);
    setToken(token);
    localStorage.setItem("user", JSON.stringify(nextUser));
  };

  const value = useMemo(() => ({ user, login }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}
