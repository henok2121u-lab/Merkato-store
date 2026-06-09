import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  const login = (email, password) => {
    // Demo login

    if (
      email === "admin@kemerkato.com" &&
      password === "admin123"
    ) {
      setUser({
        role: "admin",
        email,
      });

      return true;
    }

    setUser({
      role: "customer",
      email,
    });

    return true;
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);