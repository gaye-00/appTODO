// Fonction pour formater une date au format local
export const formatDate = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Fonction pour formater une date avec l'heure
export const formatDateTime = (date: string | Date): string => {
  return new Date(date).toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

// Fonction pour calculer si une date est dépassée
export const isOverdue = (date: string | Date): boolean => {
  const dueDate = new Date(date);
  const now = new Date();
  return dueDate < now;
};
