// ========================= api/config.ts =========================
import axios from "axios";

export const BASE_URL = "http://localhost:8087/api";

// Instance Axios préconfigurée
export const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
  timeout: 10000,
});

// Variables pour la gestion des intercepteurs
let authInterceptor: number | null = null;
let refreshTokenPromise: Promise<any> | null = null;

// instance sans auth
export const publicApi = axios.create({
  baseURL: "http://localhost:8087/api",
});

/**
 * Configuration des intercepteurs Axios pour l'authentification
 */
export const setupAxiosInterceptors = (
  accessToken: string | null,
  logout: () => void
) => {
  // Supprimer l'intercepteur précédent
  if (authInterceptor !== null) {
    api.interceptors.request.eject(authInterceptor);
  }

  // Intercepteur de requête → ajoute Authorization
  authInterceptor = api.interceptors.request.use(
    (config) => {
      if (accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Intercepteur de réponse → refresh token si 401
  api.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          if (!refreshTokenPromise) {
            refreshTokenPromise = axios.post(
              `${BASE_URL}/v1/auth/refresh-token`,
              {},
              { withCredentials: true }
            );
          }

          const response = await refreshTokenPromise;
          refreshTokenPromise = null;

          const { access_token } = response.data;

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${access_token}`;
          }

          return api(originalRequest);
        } catch (refreshError) {
          refreshTokenPromise = null;
          logout();
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};

/**
 * Nettoyer les intercepteurs
 */
export const clearAxiosInterceptors = () => {
  if (authInterceptor !== null) {
    api.interceptors.request.eject(authInterceptor);
    authInterceptor = null;
  }
  refreshTokenPromise = null;
};
