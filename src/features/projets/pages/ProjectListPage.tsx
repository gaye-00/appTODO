import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Star,
  Calendar,
  TrendingUp,
  Users,
  MoreVertical,
  Eye,
  Edit,
  Trash,
  Archive,
  Share2,
  Bookmark,
} from "lucide-react";
import ProjectCard from "../components/ProjectCard";
import type { ProjetResponse } from "../types/models/ProjetResponse";

// Données de démonstration étendues
const projetsDemo: ProjetResponse[] = [
  {
    id: 1,
    nom: "Application Mobile E-commerce",
    description:
      "Développement d'une application mobile complète avec panier, paiement et suivi des commandes",
    couleur: "from-blue-500 to-purple-600",
    dateCreation: "2024-12-01",
    taches: [
      {
        id: 1,
        titre: "Design UI/UX",
        statut: "DONE",
        priorite: "HIGH",
        dateCreation: "2024-12-01",
        projetId: 1,
      },
      {
        id: 2,
        titre: "Authentification",
        statut: "DONE",
        priorite: "HIGH",
        dateCreation: "2024-12-05",
        projetId: 1,
      },
      {
        id: 3,
        titre: "Catalogue produits",
        statut: "IN_PROGRESS",
        priorite: "HIGH",
        dateCreation: "2024-12-10",
        projetId: 1,
      },
      {
        id: 4,
        titre: "Panier d'achat",
        statut: "IN_PROGRESS",
        priorite: "MEDIUM",
        dateCreation: "2024-12-15",
        projetId: 1,
      },
      {
        id: 5,
        titre: "Système de paiement",
        statut: "TODO",
        priorite: "HIGH",
        dateCreation: "2024-12-20",
        projetId: 1,
      },
      {
        id: 6,
        titre: "Tests utilisateurs",
        statut: "TODO",
        priorite: "MEDIUM",
        dateCreation: "2024-12-25",
        projetId: 1,
      },
    ],
  },
  {
    id: 2,
    nom: "API Backend Microservices",
    description:
      "Architecture microservices avec Docker, Kubernetes et monitoring avancé",
    couleur: "from-green-500 to-teal-600",
    dateCreation: "2024-11-15",
    taches: [
      {
        id: 7,
        titre: "Architecture système",
        statut: "DONE",
        priorite: "HIGH",
        dateCreation: "2024-11-15",
        projetId: 2,
      },
      {
        id: 8,
        titre: "Service utilisateurs",
        statut: "DONE",
        priorite: "HIGH",
        dateCreation: "2024-11-20",
        projetId: 2,
      },
      {
        id: 9,
        titre: "Service produits",
        statut: "IN_PROGRESS",
        priorite: "MEDIUM",
        dateCreation: "2024-11-25",
        projetId: 2,
      },
      {
        id: 10,
        titre: "Gateway API",
        statut: "TODO",
        priorite: "HIGH",
        dateCreation: "2024-12-01",
        projetId: 2,
      },
    ],
  },
  {
    id: 3,
    nom: "Dashboard Analytics",
    description:
      "Tableau de bord interactif avec graphiques en temps réel et exports",
    couleur: "from-orange-500 to-red-500",
    dateCreation: "2025-01-01",
    taches: [
      {
        id: 11,
        titre: "Maquettes design",
        statut: "DONE",
        priorite: "HIGH",
        dateCreation: "2025-01-01",
        projetId: 3,
      },
      {
        id: 12,
        titre: "Intégration charts",
        statut: "IN_PROGRESS",
        priorite: "MEDIUM",
        dateCreation: "2025-01-05",
        projetId: 3,
      },
      {
        id: 13,
        titre: "Filtres avancés",
        statut: "TODO",
        priorite: "LOW",
        dateCreation: "2025-01-10",
        projetId: 3,
      },
    ],
  },
  {
    id: 4,
    nom: "Site Web Corporate",
    description: "Site vitrine moderne avec CMS intégré et optimisation SEO",
    couleur: "from-purple-500 to-pink-500",
    dateCreation: "2024-10-15",
    taches: [
      {
        id: 14,
        titre: "Analyse des besoins",
        statut: "DONE",
        priorite: "HIGH",
        dateCreation: "2024-10-15",
        projetId: 4,
      },
      {
        id: 15,
        titre: "Design responsive",
        statut: "DONE",
        priorite: "HIGH",
        dateCreation: "2024-10-20",
        projetId: 4,
      },
      {
        id: 16,
        titre: "Développement frontend",
        statut: "DONE",
        priorite: "MEDIUM",
        dateCreation: "2024-10-25",
        projetId: 4,
      },
      {
        id: 17,
        titre: "CMS Strapi",
        statut: "DONE",
        priorite: "MEDIUM",
        dateCreation: "2024-11-01",
        projetId: 4,
      },
      {
        id: 18,
        titre: "Optimisation SEO",
        statut: "DONE",
        priorite: "LOW",
        dateCreation: "2024-11-10",
        projetId: 4,
      },
    ],
  },
  {
    id: 5,
    nom: "Application IA Chatbot",
    description:
      "Chatbot intelligent avec traitement du langage naturel et apprentissage automatique",
    couleur: "from-cyan-500 to-blue-500",
    dateCreation: "2025-01-05",
    taches: [
      {
        id: 19,
        titre: "Recherche & veille techno",
        statut: "IN_PROGRESS",
        priorite: "HIGH",
        dateCreation: "2025-01-05",
        projetId: 5,
      },
      {
        id: 20,
        titre: "Modèle de base",
        statut: "TODO",
        priorite: "HIGH",
        dateCreation: "2025-01-08",
        projetId: 5,
      },
      {
        id: 21,
        titre: "Interface conversationnelle",
        statut: "TODO",
        priorite: "MEDIUM",
        dateCreation: "2025-01-12",
        projetId: 5,
      },
    ],
  },
  {
    id: 6,
    nom: "Système de Gestion RH",
    description:
      "Plateforme complète de gestion des ressources humaines avec workflow d'approbation",
    couleur: "from-indigo-500 to-purple-500",
    dateCreation: "2024-09-01",
    taches: [
      {
        id: 22,
        titre: "Gestion des employés",
        statut: "DONE",
        priorite: "HIGH",
        dateCreation: "2024-09-01",
        projetId: 6,
      },
      {
        id: 23,
        titre: "Système de congés",
        statut: "DONE",
        priorite: "MEDIUM",
        dateCreation: "2024-09-15",
        projetId: 6,
      },
      {
        id: 24,
        titre: "Évaluations annuelles",
        statut: "IN_PROGRESS",
        priorite: "MEDIUM",
        dateCreation: "2024-10-01",
        projetId: 6,
      },
      {
        id: 25,
        titre: "Rapports RH",
        statut: "TODO",
        priorite: "LOW",
        dateCreation: "2024-10-15",
        projetId: 6,
      },
    ],
  },
];

const ProjectListPage: React.FC = () => {
  const [projets, setProjets] = useState<ProjetResponse[]>(projetsDemo);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterStatus, setFilterStatus] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedProjects, setSelectedProjects] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filtrage et tri des projets
  const filteredProjects = projets
    .filter((projet) => {
      const matchesSearch =
        projet.nom.toLowerCase().includes(searchQuery.toLowerCase()) ||
        projet.description.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesStatus = true;
      if (filterStatus === "active") {
        const progression =
          projet.taches.length > 0
            ? (projet.taches.filter((t) => t.statut === "DONE").length /
                projet.taches.length) *
              100
            : 0;
        matchesStatus = progression < 100;
      } else if (filterStatus === "completed") {
        const progression =
          projet.taches.length > 0
            ? (projet.taches.filter((t) => t.statut === "DONE").length /
                projet.taches.length) *
              100
            : 0;
        matchesStatus = progression === 100;
      }

      return matchesSearch && matchesStatus;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.nom.localeCompare(b.nom);
        case "progress":
          const progressA =
            a.taches.length > 0
              ? (a.taches.filter((t) => t.statut === "DONE").length /
                  a.taches.length) *
                100
              : 0;
          const progressB =
            b.taches.length > 0
              ? (b.taches.filter((t) => t.statut === "DONE").length /
                  b.taches.length) *
                100
              : 0;
          return progressB - progressA;
        case "tasks":
          return b.taches.length - a.taches.length;
        case "recent":
        default:
          return (
            new Date(b.dateCreation).getTime() -
            new Date(a.dateCreation).getTime()
          );
      }
    });

  // Statistiques
  const totalProjects = projets.length;
  const activeProjects = projets.filter((p) => {
    const progression =
      p.taches.length > 0
        ? (p.taches.filter((t) => t.statut === "DONE").length /
            p.taches.length) *
          100
        : 0;
    return progression < 100;
  }).length;
  const completedProjects = totalProjects - activeProjects;
  const totalTasks = projets.reduce((sum, p) => sum + p.taches.length, 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-purple-900/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            >
              <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Header */}
        <div className="backdrop-blur-xl bg-white/10 border-b border-white/20">
          <div className="max-w-7xl mx-auto px-6 py-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                  Mes Projets
                </h1>
                <p className="text-white/70 text-lg mt-2">
                  Gérez et suivez l'avancement de tous vos projets
                </p>
              </div>

              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3">
                <Plus className="w-5 h-5" />
                <span>Nouveau Projet</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">
                      {totalProjects}
                    </div>
                    <div className="text-white/60 text-sm">Projets totaux</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">
                      {activeProjects}
                    </div>
                    <div className="text-white/60 text-sm">En cours</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">
                      {completedProjects}
                    </div>
                    <div className="text-white/60 text-sm">Terminés</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <Calendar className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-3xl font-bold text-white">
                      {totalTasks}
                    </div>
                    <div className="text-white/60 text-sm">Tâches totales</div>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                    <Users className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            </div>

            {/* Search and Filters */}
            <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-6">
              <div className="flex items-center space-x-4 w-full lg:w-auto">
                <div className="relative flex-1 lg:w-96">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Rechercher un projet..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                  />
                </div>

                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={`p-3 rounded-2xl border border-white/20 text-white transition-all ${
                    showFilters
                      ? "bg-white/20"
                      : "bg-white/10 hover:bg-white/15"
                  }`}
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-white/10 rounded-2xl p-1 border border-white/20">
                  <button
                    onClick={() => setViewMode("grid")}
                    className={`p-2 rounded-xl transition-all ${
                      viewMode === "grid"
                        ? "bg-white/20 text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode("list")}
                    className={`p-2 rounded-xl transition-all ${
                      viewMode === "list"
                        ? "bg-white/20 text-white"
                        : "text-white/60 hover:text-white"
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>

                {/* Sort Dropdown */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                >
                  <option value="recent">Plus récents</option>
                  <option value="name">Nom A-Z</option>
                  <option value="progress">Progression</option>
                  <option value="tasks">Nombre de tâches</option>
                </select>
              </div>
            </div>

            {/* Advanced Filters */}
            {showFilters && (
              <div className="mt-6 p-6 bg-white/5 backdrop-blur-sm rounded-3xl border border-white/20">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Statut
                    </label>
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                    >
                      <option value="all">Tous les projets</option>
                      <option value="active">En cours</option>
                      <option value="completed">Terminés</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Date de création
                    </label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50">
                      <option value="all">Toutes les dates</option>
                      <option value="week">Cette semaine</option>
                      <option value="month">Ce mois</option>
                      <option value="quarter">Ce trimestre</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Équipe
                    </label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50">
                      <option value="all">Toutes les équipes</option>
                      <option value="frontend">Frontend</option>
                      <option value="backend">Backend</option>
                      <option value="design">Design</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Bulk Actions (if projects selected) */}
          {selectedProjects.length > 0 && (
            <div className="mb-6 p-4 bg-blue-500/10 backdrop-blur-sm rounded-2xl border border-blue-500/20">
              <div className="flex items-center justify-between">
                <span className="text-white">
                  {selectedProjects.length} projet(s) sélectionné(s)
                </span>
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-blue-500/20 text-blue-300 rounded-xl hover:bg-blue-500/30 transition-all">
                    <Archive className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-green-500/20 text-green-300 rounded-xl hover:bg-green-500/30 transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                  <button className="p-2 bg-red-500/20 text-red-300 rounded-xl hover:bg-red-500/30 transition-all">
                    <Trash className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Projects Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((projet, index) => (
                <div
                  key={projet.id}
                  className="animate-slideInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <ProjectCard
                    projet={projet}
                    onClick={() =>
                      console.log("Navigate to project", projet.id)
                    }
                    onEdit={() => console.log("Edit project", projet.id)}
                    onDelete={() => console.log("Delete project", projet.id)}
                    onView={() =>
                      console.log("View project details", projet.id)
                    }
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredProjects.map((projet, index) => {
                const progression =
                  projet.taches.length > 0
                    ? Math.round(
                        (projet.taches.filter((t) => t.statut === "DONE")
                          .length /
                          projet.taches.length) *
                          100
                      )
                    : 0;

                return (
                  <div
                    key={projet.id}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 animate-slideInUp"
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <input
                          type="checkbox"
                          checked={selectedProjects.includes(projet.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedProjects([
                                ...selectedProjects,
                                projet.id,
                              ]);
                            } else {
                              setSelectedProjects(
                                selectedProjects.filter(
                                  (id) => id !== projet.id
                                )
                              );
                            }
                          }}
                          className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        />

                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${projet.couleur} flex items-center justify-center`}
                        >
                          <Star className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg">
                            {projet.nom}
                          </h3>
                          <p className="text-white/60 text-sm">
                            {projet.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span className="text-white/40 text-xs flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {new Date(projet.dateCreation).toLocaleDateString(
                                "fr-FR"
                              )}
                            </span>
                            <span className="text-white/40 text-xs flex items-center">
                              <Users className="w-3 h-3 mr-1" />
                              {projet.taches.length} tâches
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-6">
                        <div className="text-right">
                          <div className="text-white font-semibold">
                            {progression}%
                          </div>
                          <div className="w-24 bg-white/20 rounded-full h-2 mt-1">
                            <div
                              className={`bg-gradient-to-r ${projet.couleur} h-2 rounded-full transition-all duration-500`}
                              style={{ width: `${progression}%` }}
                            ></div>
                          </div>
                        </div>

                        <div className="flex items-center space-x-1">
                          <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                            <Bookmark className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-xl transition-all">
                            <MoreVertical className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Empty State */}
          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-16 h-16 text-white/40" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Aucun projet trouvé
              </h3>
              <p className="text-white/60 mb-6">
                {searchQuery
                  ? `Aucun projet ne correspond à "${searchQuery}"`
                  : "Créez votre premier projet pour commencer"}
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-2xl font-medium transition-all transform hover:scale-105">
                <Plus className="w-5 h-5 inline mr-2" />
                Nouveau Projet
              </button>
            </div>
          )}

          {/* Pagination (if needed) */}
          {filteredProjects.length > 12 && (
            <div className="flex items-center justify-center mt-12 space-x-2">
              <button className="p-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all">
                Précédent
              </button>
              <div className="flex space-x-1">
                {[1, 2, 3].map((page) => (
                  <button
                    key={page}
                    className={`w-12 h-12 rounded-2xl font-medium transition-all ${
                      page === 1
                        ? "bg-blue-500 text-white"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              <button className="p-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition-all">
                Suivant
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProjectListPage;
