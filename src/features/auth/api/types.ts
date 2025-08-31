// ========================= api/types.ts =========================
export interface User {
  id: number;
  role: string;
  firstName: string;
  lastName: string;
  email: string;
  active: boolean;
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  user: User;
  access_token: string;
  expiresIn?: number;
}

export interface RegisterRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ApiError {
  message: string;
  code?: string;
  field?: string;
  details?: any;
}
