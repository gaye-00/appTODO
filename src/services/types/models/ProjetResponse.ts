// ProjetResponse.ts
// ✅ Type représentant les données reçues du backend pour un projet

interface Tache {
  id: number;
  title: string;
  description: string;
  etat: "EN_ATTENTE" | "EN_COURS" | "TERMINEE";
  priority: "BASSE" | "MOYENNE" | "HAUTE" | "URGENTE";
  createdAt: string;
  dueDate?: string;
}

export interface ProjetResponse {
  id: number; // Identifiant unique
  creatAt: string; // Date de création (ISO string)
  lastModifiedAt: string; // Date de dernière modification (ISO string)
  title: string; // Titre du projet
  description: string; // Description du projet
  adminId: number; // ID de l'administrateur lié au projet
  taches: Tache[];
}
