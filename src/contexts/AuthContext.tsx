"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { AuthState } from "../types";
import {
  login as apiLogin,
  register as apiRegister,
  getUserProfile,
} from "../services/api";
import { toast } from "sonner";

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setState((prev) => ({ ...prev, loading: false }));
        return;
      }

      try {
        const user = await getUserProfile();
        setState({
          user,
          isAuthenticated: true,
          loading: false,
          error: null,
        });
      } catch (error) {
        localStorage.removeItem("token");
        setState({
          user: null,
          isAuthenticated: false,
          loading: false,
          error: "Authentication failed",
        });
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const { access_token } = await apiLogin(email, password);

      localStorage.setItem("token", access_token);
      const user = await getUserProfile();
      setState({
        user,
        isAuthenticated: true,
        loading: false,
        error: null,
      });
      toast.success("Logged in successfully");
    } catch (error) {
      setState({
        user: null,
        isAuthenticated: false,
        loading: false,
        error: "Invalid email or password",
      });
      toast.error("Invalid email or password");
    }
  };

  const register = async (name: string, email: string, password: string) => {
    setState((prev) => ({ ...prev, loading: true, error: null }));
    try {
      const avatar = `https://ui-avatars.com/api/?name=${name}&background=random`;
      await apiRegister({ name, email, password, avatar });

      // Automatically log in after registration
      await login(email, password);
      toast.success("Registration successful");
    } catch (error) {
      setState((prev) => ({
        ...prev,
        loading: false,
        error: "Registration failed",
      }));
      toast.error("Registration failed");
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setState({
      user: null,
      isAuthenticated: false,
      loading: false,
      error: null,
    });
    toast.success("Logged out successfully");
  };

  return (
    <AuthContext.Provider
      value={{
        ...state,
        login,
        register,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
