const ETAT = {
  EN_ATTENTE: "EN_ATTENTE",
  EN_COURS: "EN_COURS",
  TERMINEE: "TERMINEE",
  ANNULEE: "ANNULEE",
} as const;

export type ETAT = (typeof ETAT)[keyof typeof ETAT];
export { ETAT };
