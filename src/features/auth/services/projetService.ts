// ========================= services/projetService.ts =========================
import type { ProjetRequest } from "../../../services/types/models/ProjetRequest";
import type { ProjetResponse } from "../../../services/types/models/ProjetResponse";
import { api } from "../api/config";
import { handleApiError } from "../api/errors";

/**
 * Récupérer tous les projets
 */
export const getProjets = async (): Promise<ProjetResponse[]> => {
  try {
    const response = await api.get<ProjetResponse[]>("/v1/projets");
    return response.data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

/**
 * Récupérer les projets d'un développeur
 */
export const getProjetsByDeveloper = async (
  developerId: number
): Promise<ProjetResponse[]> => {
  try {
    const response = await api.get<ProjetResponse[]>(
      `/v1/projets/developer/${developerId}`
    );
    return response.data;
  } catch (error) {
    handleApiError(error);
    return [];
  }
};

/**
 * Récupérer un projet par ID
 */
export const getProjet = async (id: number): Promise<ProjetResponse> => {
  try {
    const response = await api.get<ProjetResponse>(`/v1/projets/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return {} as ProjetResponse;
  }
};

/**
 * Créer un nouveau projet
 */
export const createProjet = async (
  projet: Omit<ProjetRequest, "id">
): Promise<ProjetResponse> => {
  try {
    const response = await api.post<ProjetResponse>("/v1/projets", projet);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return {} as ProjetResponse;
  }
};

/**
 * Mettre à jour un projet
 */
export const updateProjet = async (
  id: number,
  projet: Partial<ProjetRequest>
): Promise<ProjetResponse> => {
  try {
    const response = await api.put<ProjetResponse>(`/v1/projets/${id}`, projet);
    return response.data;
  } catch (error) {
    handleApiError(error);
    return {} as ProjetResponse;
  }
};

/**
 * Supprimer un projet
 */
export const deleteProjet = async (id: number): Promise<void> => {
  try {
    await api.delete(`/v1/projets/${id}`);
  } catch (error) {
    handleApiError(error);
  }
};
