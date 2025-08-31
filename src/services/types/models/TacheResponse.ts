// TacheResponse.ts
// ✅ Type représentant les données reçues du backend pour une tâche

import { ETAT } from "../enum/ETAT";
import { PRIORITY } from "../enum/PRIORITY";

export interface TacheResponse {
  id: number; // Identifiant unique
  title: string; // Titre de la tâche
  creatAt: string; // Date de création (ISO string)
  lastModifiedAt: string; // Date de dernière modification (ISO string)
  description: string; // Description de la tâche
  etat: ETAT; // État de la tâche
  priority?: PRIORITY; // Priorité de la tâche (optionnelle)
  dueDate?: string; // Date d'échéance de la tâche (optionnelle)
  projetId: number; // ID du projet lié
}
