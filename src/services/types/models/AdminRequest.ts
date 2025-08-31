// AdminRequest.ts
// ✅ Type représentant les données envoyées au backend pour créer ou mettre à jour un administrateur

export interface AdminRequest {
  firstName: string; // Prénom de l'administrateur
  lastName: string; // Nom de famille de l'administrateur
  email: string; // Adresse email de l'administrateur
  password: string; // Mot de passe de l'administrateur
}
