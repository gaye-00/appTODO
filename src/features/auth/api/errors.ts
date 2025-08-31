import type { ApiError } from "./types";

// ========================= api/errors.ts =========================
export const handleApiError = (error: any): never => {
  if (error.response) {
    const { data, status } = error.response;

    let apiError: ApiError;

    switch (status) {
      case 400:
        apiError = {
          message: data.message || "Données invalides",
          code: "INVALID_DATA",
          field: data.field,
        };
        break;
      case 401:
        apiError = {
          message: "Email ou mot de passe incorrect",
          code: "INVALID_CREDENTIALS",
        };
        break;
      case 403:
        apiError = {
          message: "Compte désactivé ou accès refusé",
          code: "ACCESS_DENIED",
        };
        break;
      case 409:
        apiError = {
          message: "Cet email est déjà utilisé",
          code: "EMAIL_EXISTS",
        };
        break;
      case 429:
        apiError = {
          message: "Trop de tentatives, veuillez réessayer plus tard",
          code: "TOO_MANY_ATTEMPTS",
        };
        break;
      case 500:
        apiError = {
          message: "Erreur serveur, veuillez réessayer",
          code: "SERVER_ERROR",
        };
        break;
      default:
        apiError = {
          message: data.message || "Une erreur est survenue",
          code: "UNKNOWN_ERROR",
          details: data,
        };
    }
    throw apiError;
  } else if (error.request) {
    throw {
      message: "Impossible de contacter le serveur",
      code: "NETWORK_ERROR",
    };
  } else {
    throw {
      message: error.message || "Une erreur inattendue est survenue",
      code: "UNKNOWN_ERROR",
    };
  }
};
