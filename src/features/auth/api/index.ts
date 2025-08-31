// ========================= api/index.ts (Point d'entrée principal) =========================
// Configuration
export { api, setupAxiosInterceptors, clearAxiosInterceptors } from "./config";

// Services
export { default as authService } from "../services/authService";
export * from "../services/adminService";
export * from "../services/projetService";
export * from "../services/tacheService";

// Utilitaires
export * from "../../../utils/health";

// Types
export type * from "./types";
export type * from "./errors";
