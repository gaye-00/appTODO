// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './index.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";

// Configuration globale (optionnelle)
const isDevelopment = import.meta.env.DEV;

// Log de démarrage en développement
if (isDevelopment) {
  console.log("🚀 TaskFlow Pro - Mode Développement");
  console.log("📦 Version:", import.meta.env.VITE_APP_VERSION || "1.0.0");
}

// Gestion des erreurs globales
window.addEventListener("unhandledrejection", (event) => {
  console.error("Erreur Promise non gérée:", event.reason);
  // En production, vous pourriez envoyer cela à un service de monitoring
});

window.addEventListener("error", (event) => {
  console.error("Erreur JavaScript:", event.error);
  // En production, vous pourriez envoyer cela à un service de monitoring
});

// Rendu de l'application
const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Element racine "root" non trouvé dans le DOM');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Hot Module Replacement pour le développement
if (isDevelopment && import.meta.hot) {
  import.meta.hot.accept();
}
