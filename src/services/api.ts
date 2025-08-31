// import axios from "axios";
// import type { AdminResponse } from "./types/models/AdminResponse";
// import type { AdminRequest } from "./types/models/AdminRequest";
// import type { ProjetResponse } from "./types/models/ProjetResponse";
// import type { TacheResponse } from "./types/models/TacheResponse";
// import type { TacheRequest } from "./types/models/TacheRequest";
// import type { ProjetRequest } from "./types/models/ProjetRequest";

// // Configuration de base
// const BASE_URL = "http://localhost:8087/api";

// // Instance Axios préconfigurée
// const api = axios.create({
//   baseURL: BASE_URL,
//   headers: {
//     "Content-Type": "application/json",
//   },
//   withCredentials: true,
//   timeout: 10000, // 10 secondes de timeout
// });

// // Variables pour la gestion des intercepteurs et du refresh token
// let authInterceptor: number | null = null;
// let refreshTokenPromise: Promise<any> | null = null;

// /**
//  * Configuration des intercepteurs Axios pour l'authentification
//  * @param accessToken Token d'accès actuel
//  * @param logout Fonction de déconnexion
//  */
// // export const setupAxiosInterceptors = (
// //   accessToken: string | null,
// //   logout: () => void
// // ) => {
// //   // Supprimer l'intercepteur précédent s'il existe
// //   if (authInterceptor !== null) {
// //     api.interceptors.request.eject(authInterceptor);
// //   }

// //   // Ajouter l'intercepteur de requête pour inclure le token
// //   authInterceptor = api.interceptors.request.use(
// //     (config: any) => {
// //       if (accessToken && config.headers) {
// //         config.headers.Authorization = `Bearer ${accessToken}`;
// //       }
// //       return config;
// //     },
// //     (error) => {
// //       return Promise.reject(error);
// //     }
// //   );

// //   // Intercepteur de réponse pour gérer le refresh token
// //   api.interceptors.response.use(
// //     (response) => response,
// //     async (error) => {
// //       const originalRequest = error.config;

// //       if (error.response?.status === 401 && !originalRequest._retry) {
// //         originalRequest._retry = true;

// //         try {
// //           // Vérifier si un refresh token est déjà en cours
// //           if (!refreshTokenPromise) {
// //             refreshTokenPromise = axios.post(
// //               `${BASE_URL}/v1/auth/refresh-token`,
// //               {}, // Corps vide car le refresh token est dans le cookie
// //               {
// //                 withCredentials: true,
// //                 headers: {
// //                   Authorization: `Bearer ${accessToken}`,
// //                 },
// //               }
// //             );
// //           }

// //           const response = await refreshTokenPromise;
// //           refreshTokenPromise = null;

// //           const { token } = response.data;

// //           // Mettre à jour la requête originale avec le nouveau token
// //           if (originalRequest.headers) {
// //             originalRequest.headers.Authorization = `Bearer ${token}`;
// //           }

// //           // Retourner la requête originale avec le nouveau token
// //           return api(originalRequest);
// //         } catch (refreshError) {
// //           refreshTokenPromise = null;

// //           // Si le refresh token échoue, déconnecter l'utilisateur
// //           if (logout) {
// //             logout();
// //           }

// //           return Promise.reject(refreshError);
// //         }
// //       }

// //       return Promise.reject(error);
// //     }
// //   );
// // };

// export const setupAxiosInterceptors = (
//   accessToken: string | null,
//   logout: () => void
// ) => {
//   // Supprimer l'intercepteur précédent
//   if (authInterceptor !== null) {
//     api.interceptors.request.eject(authInterceptor);
//   }

//   // Intercepteur de requête → ajoute Authorization
//   authInterceptor = api.interceptors.request.use(
//     (config) => {
//       if (accessToken && config.headers) {
//         config.headers.Authorization = `Bearer ${accessToken}`;
//       }
//       return config;
//     },
//     (error) => Promise.reject(error)
//   );

//   // Intercepteur de réponse → refresh token si 401
//   api.interceptors.response.use(
//     (response) => response,
//     async (error) => {
//       const originalRequest = error.config;

//       if (error.response?.status === 401 && !originalRequest._retry) {
//         originalRequest._retry = true;

//         try {
//           // Évite plusieurs refresh en même temps
//           if (!refreshTokenPromise) {
//             refreshTokenPromise = axios.post(
//               `${BASE_URL}/v1/auth/refresh-token`,
//               {}, // corps vide car refresh token dans cookie
//               { withCredentials: true }
//               // {
//               //   withCredentials: true,
//               //   headers: {
//               //     Authorization: `Bearer ${accessToken}`,
//               //   },
//               // }
//             );
//           }

//           const response = await refreshTokenPromise;
//           refreshTokenPromise = null;

//           const { access_token } = response.data;

//           // Met à jour le header de la requête originale
//           if (originalRequest.headers) {
//             originalRequest.headers.Authorization = `Bearer ${access_token}`;
//           }

//           // Rejoue la requête originale avec le nouveau token
//           return api(originalRequest);
//         } catch (refreshError) {
//           refreshTokenPromise = null;
//           logout();
//           return Promise.reject(refreshError);
//         }
//       }

//       return Promise.reject(error);
//     }
//   );
// };

// /**
//  * Fonction pour nettoyer les intercepteurs
//  */
// export const clearAxiosInterceptors = () => {
//   if (authInterceptor !== null) {
//     api.interceptors.request.eject(authInterceptor);
//     authInterceptor = null;
//   }
//   refreshTokenPromise = null;
// };

// /* ----------------------- TYPES POUR LES RÉPONSES ----------------------- */
// interface LoginResponse {
//   token: string;
//   refreshToken?: string;
//   user?: AdminResponse;
//   expiresIn?: number;
// }

// interface ApiError {
//   message: string;
//   code?: string;
//   details?: any;
// }

// /* ----------------------- GESTION D'ERREURS ----------------------- */
// const handleApiError = (error: any): never => {
//   if (error.response) {
//     // Erreur de réponse du serveur
//     const apiError: ApiError = {
//       message: error.response.data?.message || "Une erreur est survenue",
//       code: error.response.status.toString(),
//       details: error.response.data,
//     };
//     throw apiError;
//   } else if (error.request) {
//     // Erreur de réseau
//     throw {
//       message: "Erreur de connexion au serveur",
//       code: "NETWORK_ERROR",
//     };
//   } else {
//     // Autre erreur
//     throw {
//       message: error.message || "Une erreur inattendue est survenue",
//       code: "UNKNOWN_ERROR",
//     };
//   }
// };

// /* ----------------------- AUTHENTIFICATION ----------------------- */

// /**
//  * Connexion utilisateur
//  * @param username Nom d'utilisateur ou email
//  * @param password Mot de passe
//  * @returns Informations de connexion avec token
//  */
// export const login = async (
//   username: string,
//   password: string
// ): Promise<LoginResponse> => {
//   try {
//     const response = await api.post<LoginResponse>("/v1/auth/login", {
//       username,
//       password,
//     });
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return {} as LoginResponse; // Retourne un objet vide en cas d'erreur
//   }
// };

// /**
//  * Inscription utilisateur
//  * @param user Données utilisateur
//  * @returns Utilisateur créé
//  */
// export const register = async (
//   user: Partial<AdminRequest>
// ): Promise<AdminResponse> => {
//   try {
//     const response = await api.post<AdminResponse>("/v1/auth/register", user);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return {} as AdminResponse; // Retourne un objet vide en cas d'erreur
//   }
// };

// /**
//  * Déconnexion utilisateur
//  */
// export const logout = async (): Promise<void> => {
//   try {
//     await api.post("/v1/auth/logout");
//     clearAxiosInterceptors();
//   } catch (error) {
//     // En cas d'erreur, on nettoie quand même les intercepteurs
//     clearAxiosInterceptors();
//     console.warn("Erreur lors de la déconnexion:", error);
//   }
// };

// /* ----------------------- GESTION DES ADMINS ----------------------- */

// /**
//  * Récupérer un admin par ID
//  * @param id ID de l'admin
//  * @returns Données de l'admin
//  */
// export const getAdmin = async (id: number): Promise<AdminResponse> => {
//   try {
//     const response = await api.get<AdminResponse>(`/v1/admins/${id}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return {} as AdminResponse; // Retourne un objet vide en cas d'erreur
//   }
// };

// /**
//  * Mettre à jour un admin
//  * @param id ID de l'admin
//  * @param admin Données à mettre à jour
//  * @returns Admin mis à jour
//  */
// export const updateAdmin = async (
//   id: number,
//   admin: Partial<AdminRequest>
// ): Promise<AdminResponse> => {
//   try {
//     const response = await api.put<AdminResponse>(`/v1/admins/${id}`, admin);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return {} as AdminResponse; // Retourne un objet vide en cas d'erreur
//   }
// };

// /* ----------------------- GESTION DES PROJETS ----------------------- */

// /**
//  * Récupérer tous les projets
//  * @returns Liste des projets
//  */
// export const getProjets = async (): Promise<ProjetResponse[]> => {
//   try {
//     const response = await api.get<ProjetResponse[]>("/v1/projets");
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return []; // Retourne un tableau vide en cas d'erreur};
//   }
// };

// // Recuper les projets d'un developpeur
// export const getProjetsByDeveloper = async (
//   developerId: number
// ): Promise<ProjetResponse[]> => {
//   try {
//     const response = await api.get<ProjetResponse[]>(
//       `/v1/projets/developer/${developerId}`
//     );
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return []; // Retourne un tableau vide en cas d'erreur
//   }
// };

// /**
//  * Récupérer un projet par ID
//  * @param id ID du projet
//  * @returns Données du projet
//  */
// export const getProjet = async (id: number): Promise<ProjetResponse> => {
//   try {
//     const response = await api.get<ProjetResponse>(`/v1/projets/${id}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return {} as ProjetResponse; // Retourne un objet vide en cas d'erreur
//   }
// };

// /**
//  * Créer un nouveau projet
//  * @param projet Données du projet
//  * @returns Projet créé
//  */
// export const createProjet = async (
//   projet: Omit<ProjetRequest, "id">
// ): Promise<ProjetResponse> => {
//   try {
//     const response = await api.post<ProjetResponse>("/v1/projets", projet);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return {} as ProjetResponse; // Retourne un objet vide en cas d'erreur
//   }
// };

// /**
//  * Mettre à jour un projet
//  * @param id ID du projet
//  * @param projet Données à mettre à jour
//  * @returns Projet mis à jour
//  */
// export const updateProjet = async (
//   id: number,
//   projet: Partial<ProjetRequest>
// ): Promise<ProjetResponse> => {
//   try {
//     const response = await api.put<ProjetResponse>(`/v1/projets/${id}`, projet);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return {} as ProjetResponse; // Retourne un objet vide en cas d'erreur
//   }
// };

// /**
//  * Supprimer un projet
//  * @param id ID du projet
//  */
// export const deleteProjet = async (id: number): Promise<void> => {
//   try {
//     await api.delete(`/v1/projets/${id}`);
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// /* ----------------------- GESTION DES TÂCHES ----------------------- */

// /**
//  * Récupérer toutes les tâches
//  * @returns Liste de toutes les tâches
//  */
// export const getAllTaches = async (): Promise<TacheResponse[]> => {
//   try {
//     const response = await api.get<TacheResponse[]>("/v1/taches");
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return []; // Retourne un tableau vide en cas d'erreur
//   }
// };

// /**
//  * Récupérer les tâches d'un projet
//  * @param projetId ID du projet
//  * @returns Liste des tâches du projet
//  */
// export const getTachesByProjet = async (
//   projetId: number
// ): Promise<TacheResponse[]> => {
//   try {
//     const response = await api.get<TacheResponse[]>(
//       `/v1/projets/${projetId}/taches`
//     );
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return []; // Retourne un tableau vide en cas d'erreur
//   }
// };

// /**
//  * Récupérer une tâche par ID
//  * @param id ID de la tâche
//  * @returns Données de la tâche
//  */
// export const getTache = async (id: number): Promise<TacheResponse> => {
//   try {
//     const response = await api.get<TacheResponse>(`/v1/taches/${id}`);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return {} as TacheResponse; // Retourne un objet vide en cas d'erreur
//   }
// };

// /**
//  * Créer une nouvelle tâche
//  * @param projetId ID du projet
//  * @param tache Données de la tâche
//  * @returns Tâche créée
//  */
// export const createTache = async (
//   tache: TacheRequest
// ): Promise<TacheResponse> => {
//   try {
//     const response = await api.post<TacheResponse>(`/v1/taches`, tache);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return {} as TacheResponse; // Retourne un objet vide en cas d'erreur
//   }
// };

// /**
//  * Mettre à jour une tâche
//  * @param id ID de la tâche
//  * @param tache Données à mettre à jour
//  * @returns Tâche mise à jour
//  */
// export const updateTache = async (
//   id: number,
//   tache: Partial<TacheRequest>
// ): Promise<TacheResponse> => {
//   try {
//     const response = await api.put<TacheResponse>(`/v1/taches/${id}`, tache);
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return {} as TacheResponse; // Retourne un objet vide en cas d'erreur
//   }
// };

// /**
//  * Supprimer une tâche
//  * @param id ID de la tâche
//  */
// export const deleteTache = async (id: number): Promise<void> => {
//   try {
//     await api.delete(`/v1/taches/${id}`);
//   } catch (error) {
//     handleApiError(error);
//   }
// };

// /**
//  * Mettre à jour le statut d'une tâche
//  * @param id ID de la tâche
//  * @param statut Nouveau statut
//  * @returns Tâche mise à jour
//  */
// // export const updateTacheStatut = async (
// //   id: number,
// //   statut: "EN_ATTENTE" | "EN_COURS" | "TERMINEE" | "ANNULEE"
// // ): Promise<TacheResponse> => {
// //   try {
// //     const response = await api.patch<TacheResponse>(`/v1/taches/${id}/statut`, {
// //       statut,
// //     });
// //     return response.data;
// //   } catch (error) {
// //     handleApiError(error);
// //     return {} as TacheResponse; // Retourne un objet vide en cas d'erreur
// //   }
// // };

// export const updateTacheStatut = async (
//   id: number,
//   statut: "EN_ATTENTE" | "EN_COURS" | "TERMINEE" | "ANNULEE"
// ): Promise<TacheResponse> => {
//   try {
//     const response = await api.put<TacheResponse>(
//       `/v1/taches/${id}/statut/${statut}`
//     );
//     return response.data;
//   } catch (error) {
//     handleApiError(error);
//     return {} as TacheResponse; // Retourne un objet vide en cas d'erreur
//   }
// };

// /* ----------------------- UTILITAIRES ----------------------- */

// /**
//  * Vérifier la santé de l'API
//  * @returns Statut de l'API
//  */
// export const healthCheck = async (): Promise<{
//   status: string;
//   timestamp: string;
// }> => {
//   try {
//     const response = await api.get("/health");
//     // return response.data;
//     // Simuler une réponse pour l'exemple
//     return {
//       status: "UP",
//       timestamp: new Date().toISOString(),
//     };
//   } catch (error) {
//     handleApiError(error);
//     return {
//       status: "DOWN",
//       timestamp: new Date().toISOString(),
//     };
//   }
// };

// /**
//  * Configuration pour les uploads de fichiers
//  */
// export const createFormDataConfig = () => ({
//   headers: {
//     "Content-Type": "multipart/form-data",
//   },
// });

// // Export de l'instance API pour des utilisations avancées
// export { api };

// // Export par défaut
// export default api;
