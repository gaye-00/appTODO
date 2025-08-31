// ========================= services/tacheService.ts =========================
import type { TacheRequest } from "../../../services/types/models/TacheRequest";
import type { TacheResponse } from "../../../services/types/models/TacheResponse";
import { api } from "../api/config";
import { handleApiError } from "../api/errors";

/**
 * Récupérer toutes les tâches
 */
export const getAllTaches = async (): Promise<TacheResponse[]> => {
  try {
    const response = await api.get<TacheResponse[]>("/v1/taches");
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Récupérer les tâches d'un projet
 */
export const getTachesByProjet = async (
  projetId: number
): Promise<TacheResponse[]> => {
  try {
    const response = await api.get<TacheResponse[]>(
      `/v1/projets/${projetId}/taches`
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Récupérer une tâche par ID
 */
export const getTache = async (id: number): Promise<TacheResponse> => {
  try {
    const response = await api.get<TacheResponse>(`/v1/taches/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Créer une nouvelle tâche
 */
export const createTache = async (
  tache: TacheRequest
): Promise<TacheResponse> => {
  try {
    const response = await api.post<TacheResponse>(`/v1/taches`, tache);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Mettre à jour une tâche
 */
export const updateTache = async (
  id: number,
  tache: Partial<TacheRequest>
): Promise<TacheResponse> => {
  try {
    const response = await api.put<TacheResponse>(`/v1/taches/${id}`, tache);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Supprimer une tâche
 */
export const deleteTache = async (id: number): Promise<void> => {
  try {
    await api.delete(`/v1/taches/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Mettre à jour le statut d'une tâche
 */
export const updateTacheStatut = async (
  id: number,
  statut: "EN_ATTENTE" | "EN_COURS" | "TERMINEE" | "ANNULEE"
): Promise<TacheResponse> => {
  try {
    const response = await api.put<TacheResponse>(
      `/v1/taches/${id}/statut/${statut}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
