// src/features/auth/context/AuthContext.tsx
import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  ReactNode,
} from "react";
import { authService } from "../services/authService";
import { setupAxiosInterceptors, clearAxiosInterceptors } from "../api/config";
import type { LoginRequest, User } from "../api/types";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (credentials: LoginRequest) => Promise<any>;
  logout: () => Promise<void>;
  register: (data: any) => Promise<any>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = authService.getStoredUser();
      const storedToken = authService.getStoredToken();

      if (storedUser && storedToken) {
        setUser(storedUser);
        setIsAuthenticated(true);
        setupAxiosInterceptors(storedToken, handleLogout);
      }
      setLoading(false);
    };

    initAuth();
  }, []);

  const handleLogin = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    setUser(response.user);
    setIsAuthenticated(true);
    setupAxiosInterceptors(response.access_token, handleLogout);
    return response;
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    clearAxiosInterceptors();
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login: handleLogin,
    logout: handleLogout,
    register: authService.register.bind(authService),
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Hook pour rediriger les invités
export const useGuestRedirect = (redirectTo: string = "/") => {
  const { isAuthenticated, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && isAuthenticated) {
      navigate(redirectTo);
    }
  }, [isAuthenticated, loading, navigate, redirectTo]);

  return { isAuthenticated, loading };
};

export default AuthContext;
