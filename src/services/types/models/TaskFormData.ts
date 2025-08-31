export type TaskFormData = {
  title: string;
  description: string;
  priority: "BASSE" | "MOYENNE" | "HAUTE" | "URGENTE";
  etat: "EN_ATTENTE" | "EN_COURS" | "TERMINEE";
  dueDate?: string;
};
