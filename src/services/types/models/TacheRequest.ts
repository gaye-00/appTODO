// TacheRequest.ts
// ✅ Type représentant les données envoyées au backend pour créer ou mettre à jour une tâche

import { ETAT } from "../enum/ETAT";
import { PRIORITY } from "../enum/PRIORITY";

export interface TacheRequest {
  title: string; // Titre de la tâche
  description: string; // Description de la tâche
  etat: ETAT; // État de la tâche
  priority?: PRIORITY; // Priorité de la tâche (optionnelle)
  dueDate?: string; // Date d'échéance de la tâche (optionnelle)
  projetId: number; // ID du projet auquel la tâche appartient
}
