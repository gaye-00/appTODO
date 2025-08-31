// ========================= services/authService.ts =========================
import { api, publicApi } from "../api/config";
import { handleApiError } from "../api/errors";
import type {
  LoginRequest,
  LoginResponse,
  RegisterRequest,
  User,
} from "../api/types";

class AuthService {
  private readonly STORAGE_KEYS = {
    ACCESS_TOKEN: "access_token",
    USER: "user",
  } as const;

  /**
   * Connexion utilisateur
   */
  async login(credentials: LoginRequest): Promise<LoginResponse> {
    try {
      const response = await publicApi.post<LoginResponse>(
        "/v1/auth/login",
        credentials
      );

      const { user, access_token } = response.data;
      this.storeAuthData(access_token, user);

      return response.data;
    } catch (error) {
      handleApiError(error);
      return {} as LoginResponse;
    }
  }

  /**
   * Inscription utilisateur
   */
  async register(userData: RegisterRequest): Promise<LoginResponse> {
    try {
      this.validateRegistrationData(userData);

      const { confirmPassword, ...requestData } = userData;
      const response = await api.post<LoginResponse>(
        "/v1/auth/register",
        requestData
      );

      const { user, access_token } = response.data;
      this.storeAuthData(access_token, user);

      return response.data;
    } catch (error) {
      handleApiError(error);
    }
  }

  /**
   * Déconnexion utilisateur
   */
  async logout(): Promise<void> {
    try {
      // Suppression des données d'authentification
      console.log("\nDéconnexion: Suppression des données d'authentification");

      localStorage.removeItem(this.STORAGE_KEYS.ACCESS_TOKEN);
      localStorage.removeItem(this.STORAGE_KEYS.USER);

      const token = this.getStoredToken();
      if (token) {
        await api.post("/v1/auth/logout");
      }
    } catch (error) {
      console.warn("Erreur lors de la déconnexion côté serveur:", error);
    } finally {
      this.clearAuthData();
    }
  }

  /**
   * Validation du token
   * Ne doit être utilisée que lors d'opérations critiques nécessitant une validation stricte
   */
  async validateToken(): Promise<boolean> {
    const token = this.getStoredToken();
    const user = this.getStoredUser();

    if (!token || !user) {
      return false;
    }

    return true;
  }

  /**
   * Refresh du token
   */
  async refreshToken(): Promise<string | null> {
    try {
      const response = await api.post("/v1/auth/refresh-token");
      const { access_token } = response.data;

      localStorage.setItem(this.STORAGE_KEYS.ACCESS_TOKEN, access_token);
      return access_token;
    } catch (error) {
      return null;
    }
  }

  // =============== MÉTHODES UTILITAIRES ===============

  /**
   * Récupérer le token stocké
   */
  getStoredToken(): string | null {
    return localStorage.getItem(this.STORAGE_KEYS.ACCESS_TOKEN);
  }

  /**
   * Récupérer l'utilisateur stocké
   */
  getStoredUser(): User | null {
    const userStr = localStorage.getItem(this.STORAGE_KEYS.USER);
    return userStr ? JSON.parse(userStr) : null;
  }

  /**
   * Vérifier si l'utilisateur est connecté
   */
  isAuthenticated(): boolean {
    const token = this.getStoredToken();
    const user = this.getStoredUser();
    return !!(token && user);
  }

  /**
   * Stocker les données d'authentification
   */
  private storeAuthData(token: string, user: User): void {
    localStorage.setItem(this.STORAGE_KEYS.ACCESS_TOKEN, token);
    localStorage.setItem(this.STORAGE_KEYS.USER, JSON.stringify(user));
  }

  /**
   * Nettoyer les données d'authentification
   */
  private clearAuthData(): void {
    localStorage.removeItem(this.STORAGE_KEYS.ACCESS_TOKEN);
    localStorage.removeItem(this.STORAGE_KEYS.USER);
  }

  /**
   * Validation des données d'inscription
   */
  private validateRegistrationData(userData: RegisterRequest): void {
    if (userData.password !== userData.confirmPassword) {
      throw {
        message: "Les mots de passe ne correspondent pas",
        code: "PASSWORD_MISMATCH",
        field: "confirmPassword",
      };
    }

    if (userData.password.length < 6) {
      throw {
        message: "Le mot de passe doit contenir au moins 6 caractères",
        code: "PASSWORD_TOO_SHORT",
        field: "password",
      };
    }
  }
}

// Instance singleton
export const authService = new AuthService();
export default authService;
