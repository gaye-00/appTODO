// ========================= services/adminService.ts =========================
import type { AdminRequest } from "../../../services/types/models/AdminRequest";
import type { AdminResponse } from "../../../services/types/models/AdminResponse";
import { api } from "../api/config";
import { handleApiError } from "../api/errors";

/**
 * Récupérer un admin par ID
 */
export const getAdmin = async (id: number): Promise<AdminResponse> => {
  try {
    const response = await api.get<AdminResponse>(`/v1/admins/${id}`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

/**
 * Mettre à jour un admin
 */
export const updateAdmin = async (
  id: number,
  admin: Partial<AdminRequest>
): Promise<AdminResponse> => {
  try {
    const response = await api.put<AdminResponse>(`/v1/admins/${id}`, admin);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};
