"use client";

import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { testAuth } from "@/utils/api-calls";

interface AuthContextType {
  login: () => void;
  logout: () => void;
  loggedIn: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider(props: { readonly children: ReactNode }) {
  const [loggedIn, setLoggedIn] = useState<string>("");

  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await testAuth();
        if (response.ok) {
          const res = await response.json();
          setLoggedIn(res.username);
        } else {
          setLoggedIn("");
        }
      } catch (error) {
        console.error(error);
      }
    };

    checkAuthStatus();
  }, []);

  const login = async () => {
    try {
      const response = await testAuth();
      if (response.ok) {
        const res = await response.json();
        setLoggedIn(res.username);
      } else {
        setLoggedIn("");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setLoggedIn("");
  };

  const contextValue = useMemo(() => ({ login, logout, loggedIn }), [loggedIn]);
  return (
    <AuthContext.Provider value={contextValue}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
