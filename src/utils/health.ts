// ========================= utils/health.ts =========================

import { api } from "../features/auth/api";

/**
 * Vérifier la santé de l'API
 */
export const healthCheck = async (): Promise<{
  status: string;
  timestamp: string;
}> => {
  try {
    const response = await api.get("/health");
    return response.data;
  } catch (error) {
    return {
      status: "DOWN",
      timestamp: new Date().toISOString(),
    };
  }
};

/**
 * Configuration pour les uploads de fichiers
 */
export const createFormDataConfig = () => ({
  headers: {
    "Content-Type": "multipart/form-data",
  },
});
