const PRIORITY = {
  BASSE: "BASSE",
  MOYENNE: "MOYENNE",
  HAUTE: "HAUTE",
  URGENTE: "URGENTE",
} as const;

export type PRIORITY = (typeof PRIORITY)[keyof typeof PRIORITY];
export { PRIORITY };
