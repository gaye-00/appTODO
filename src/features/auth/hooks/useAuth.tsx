import { useState, useEffect } from "react";
import { authService } from "../services/authService";
import { setupAxiosInterceptors, clearAxiosInterceptors } from "../api/config";
import type { LoginRequest, User } from "../api/types";
import { useNavigate } from "react-router-dom";

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true); // Renommé loading en isLoading

  useEffect(() => {
    const initAuth = async () => {
      const storedUser = authService.getStoredUser();
      const storedToken = authService.getStoredToken();

      if (storedUser && storedToken) {
        const isValid = await authService.validateToken();
        if (isValid) {
          setUser(storedUser);
          setIsAuthenticated(true);
          setupAxiosInterceptors(storedToken, handleLogout);
        } else {
          authService.logout();
        }
      }
      setIsLoading(false); // Utilisez setIsLoading au lieu de setLoading
    };

    initAuth();
  }, []);

  const handleLogin = async (credentials: LoginRequest) => {
    const response = await authService.login(credentials);
    setUser(response.user);
    setIsAuthenticated(true);
    console.log("\nsetIsAuthenticated true");
    setupAxiosInterceptors(response.access_token, handleLogout);
    return response;
  };

  const handleLogout = async () => {
    await authService.logout();
    setUser(null);
    setIsAuthenticated(false);
    clearAxiosInterceptors();
  };

  const useGuestRedirect = (redirectTo: string = "/") => {
    const { isAuthenticated, isLoading } = useAuth(); // Utilisez isLoading
    const navigate = useNavigate();

    useEffect(() => {
      if (!isLoading && isAuthenticated) {
        navigate(redirectTo);
      }
    }, [isAuthenticated, isLoading, navigate, redirectTo]);

    return { isAuthenticated, isLoading }; // Retournez isLoading
  };

  return {
    user,
    isAuthenticated,
    isLoading, // Exportez isLoading au lieu de loading
    useGuestRedirect: useGuestRedirect,
    login: handleLogin,
    logout: handleLogout,
    register: authService.register.bind(authService),
  };
};

export default useAuth;
