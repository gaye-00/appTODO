// ProjetRequest.ts
// ✅ Type représentant les données envoyées au backend pour créer ou mettre à jour un projet

export interface ProjetRequest {
  title: string; // Titre du projet
  description: string; // Description du projet
  developerId: number; // ID de l'administrateur lié au projet
}
