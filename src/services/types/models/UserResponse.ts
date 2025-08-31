// UserResponse.ts
// ✅ Type représentant les données reçues du backend pour un utilisateur

export interface UserResponse {
  id: number; // Identifiant unique
  role: string; // Rôle de l'utilisateur (ex: ADMIN, USER)
  firstName: string; // Prénom
  lastName: string; // Nom de famille
  email: string; // Adresse email
  active: boolean; // Statut actif/inactif
}
