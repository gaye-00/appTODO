// AdminResponse.ts
// ✅ Type représentant les données reçues du backend pour un administrateur

export interface AdminResponse {
  id: number; // Identifiant unique
  firstName: string; // Prénom
  lastName: string; // Nom de famille
  email: string; // Adresse email
  isBlocked: boolean; // Statut de blocage
}
