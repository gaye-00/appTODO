import React, { useState, useEffect } from "react";
import {
  Plus,
  Search,
  Filter,
  Grid,
  List,
  Clock,
  AlertCircle,
  CheckCircle2,
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
  Flag,
  Tag,
  Timer,
  Target,
  Zap,
  Star,
  Activity,
} from "lucide-react";
// import TaskCard from "../components/TaskCard";
import type { TacheResponse } from "../../../services/types/models/TacheResponse";
import TaskCard from "../../taches/components/TaskCard";

// Données de démonstration étendues
const tachesDemo: TacheResponse[] = [
  {
    id: 1,
    titre: "Design système de navigation",
    description:
      "Créer un système de navigation cohérent avec animations fluides et micro-interactions pour améliorer l'expérience utilisateur",
    statut: "IN_PROGRESS",
    priorite: "HIGH",
    dateCreation: "2025-01-10",
    dateEcheance: "2025-01-20",
    projetId: 1,
  },
  {
    id: 2,
    titre: "Implémentation API authentification",
    description:
      "Développer l'API REST pour l'authentification avec JWT, OAuth2 et gestion des rôles utilisateurs",
    statut: "TODO",
    priorite: "HIGH",
    dateCreation: "2025-01-08",
    dateEcheance: "2025-01-25",
    projetId: 1,
  },
  {
    id: 3,
    titre: "Tests unitaires composants React",
    description:
      "Écrire les tests unitaires complets pour tous les composants React avec Jest et Testing Library",
    statut: "TODO",
    priorite: "MEDIUM",
    dateCreation: "2025-01-05",
    dateEcheance: "2025-01-30",
    projetId: 1,
  },
  {
    id: 4,
    titre: "Optimisation performances frontend",
    description:
      "Analyser et optimiser les performances du frontend : lazy loading, code splitting, optimisation des images",
    statut: "DONE",
    priorite: "MEDIUM",
    dateCreation: "2024-12-20",
    dateEcheance: "2025-01-15",
    projetId: 2,
  },
  {
    id: 5,
    titre: "Documentation API complète",
    description:
      "Rédiger la documentation complète de l'API avec exemples, schémas OpenAPI et guides d'intégration",
    statut: "IN_PROGRESS",
    priorite: "LOW",
    dateCreation: "2024-12-15",
    dateEcheance: "2025-02-01",
    projetId: 2,
  },
  {
    id: 6,
    titre: "Migration base de données",
    description:
      "Planifier et exécuter la migration de MySQL vers PostgreSQL avec scripts de migration et tests",
    statut: "TODO",
    priorite: "HIGH",
    dateCreation: "2025-01-12",
    dateEcheance: "2025-01-18",
    projetId: 3,
  },
  {
    id: 7,
    titre: "Intégration système de paiement",
    description:
      "Intégrer Stripe pour les paiements avec webhooks, gestion des abonnements et facturation automatique",
    statut: "IN_PROGRESS",
    priorite: "HIGH",
    dateCreation: "2025-01-01",
    dateEcheance: "2025-01-22",
    projetId: 3,
  },
  {
    id: 8,
    titre: "Dashboard analytics temps réel",
    description:
      "Développer un dashboard avec graphiques interactifs, métriques temps réel et exports de données",
    statut: "DONE",
    priorite: "MEDIUM",
    dateCreation: "2024-11-25",
    dateEcheance: "2025-01-10",
    projetId: 4,
  },
  {
    id: 9,
    titre: "Système de notifications push",
    description:
      "Implémenter les notifications push web et mobiles avec personnalisation et gestion des préférences",
    statut: "TODO",
    priorite: "LOW",
    dateCreation: "2025-01-06",
    dateEcheance: "2025-02-10",
    projetId: 4,
  },
  {
    id: 10,
    titre: "Audit sécurité application",
    description:
      "Effectuer un audit de sécurité complet : vulnérabilités, tests de pénétration et recommandations",
    statut: "DONE",
    priorite: "HIGH",
    dateCreation: "2024-12-01",
    dateEcheance: "2024-12-31",
    projetId: 5,
  },
];

const TaskListPage: React.FC = () => {
  const [taches, setTaches] = useState<TacheResponse[]>(tachesDemo);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recent");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterPriority, setFilterPriority] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [selectedTasks, setSelectedTasks] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Filtrage et tri des tâches
  const filteredTasks = taches
    .filter((tache) => {
      const matchesSearch =
        tache.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        tache.description.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesStatus =
        filterStatus === "all" || tache.statut === filterStatus;
      const matchesPriority =
        filterPriority === "all" || tache.priorite === filterPriority;

      return matchesSearch && matchesStatus && matchesPriority;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "title":
          return a.titre.localeCompare(b.titre);
        case "priority":
          const priorityOrder = { HIGH: 3, MEDIUM: 2, LOW: 1 };
          return priorityOrder[b.priorite] - priorityOrder[a.priorite];
        case "dueDate":
          if (!a.dateEcheance && !b.dateEcheance) return 0;
          if (!a.dateEcheance) return 1;
          if (!b.dateEcheance) return -1;
          return (
            new Date(a.dateEcheance).getTime() -
            new Date(b.dateEcheance).getTime()
          );
        case "status":
          return a.statut.localeCompare(b.statut);
        case "recent":
        default:
          return (
            new Date(b.dateCreation).getTime() -
            new Date(a.dateCreation).getTime()
          );
      }
    });

  // Statistiques
  const totalTasks = taches.length;
  const todoTasks = taches.filter((t) => t.statut === "TODO").length;
  const inProgressTasks = taches.filter(
    (t) => t.statut === "IN_PROGRESS"
  ).length;
  const doneTasks = taches.filter((t) => t.statut === "DONE").length;
  const overdueTasks = taches.filter(
    (t) =>
      t.dateEcheance &&
      new Date(t.dateEcheance) < new Date() &&
      t.statut !== "DONE"
  ).length;

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "TODO":
        return {
          color: "from-slate-500 to-slate-600",
          bgColor: "bg-slate-100",
          textColor: "text-slate-700",
          icon: Clock,
        };
      case "IN_PROGRESS":
        return {
          color: "from-blue-500 to-indigo-600",
          bgColor: "bg-blue-100",
          textColor: "text-blue-700",
          icon: AlertCircle,
        };
      case "DONE":
        return {
          color: "from-green-500 to-emerald-600",
          bgColor: "bg-green-100",
          textColor: "text-green-700",
          icon: CheckCircle2,
        };
      default:
        return {
          color: "from-gray-500 to-gray-600",
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
          icon: Clock,
        };
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case "HIGH":
        return {
          color: "from-red-500 to-pink-500",
          bgColor: "bg-red-100",
          textColor: "text-red-700",
        };
      case "MEDIUM":
        return {
          color: "from-yellow-500 to-orange-500",
          bgColor: "bg-yellow-100",
          textColor: "text-yellow-700",
        };
      case "LOW":
        return {
          color: "from-green-500 to-teal-500",
          bgColor: "bg-green-100",
          textColor: "text-green-700",
        };
      default:
        return {
          color: "from-gray-500 to-gray-600",
          bgColor: "bg-gray-100",
          textColor: "text-gray-700",
        };
    }
  };

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
                  Mes Tâches
                </h1>
                <p className="text-white/70 text-lg mt-2">
                  Gérez et organisez toutes vos tâches en un seul endroit
                </p>
              </div>

              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 hover:shadow-2xl flex items-center space-x-3">
                <Plus className="w-5 h-5" />
                <span>Nouvelle Tâche</span>
              </button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {totalTasks}
                    </div>
                    <div className="text-white/60 text-sm">Total</div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {todoTasks}
                    </div>
                    <div className="text-white/60 text-sm">À faire</div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-slate-500 to-slate-600 rounded-2xl flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {inProgressTasks}
                    </div>
                    <div className="text-white/60 text-sm">En cours</div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center">
                    <Activity className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {doneTasks}
                    </div>
                    <div className="text-white/60 text-sm">Terminées</div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5 text-white" />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-2xl font-bold text-white">
                      {overdueTasks}
                    </div>
                    <div className="text-white/60 text-sm">En retard</div>
                  </div>
                  <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center">
                    <Timer className="w-5 h-5 text-white" />
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
                    placeholder="Rechercher une tâche..."
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
                  <option value="recent">Plus récentes</option>
                  <option value="title">Titre A-Z</option>
                  <option value="priority">Priorité</option>
                  <option value="dueDate">Échéance</option>
                  <option value="status">Statut</option>
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
                      <option value="all">Tous les statuts</option>
                      <option value="TODO">À faire</option>
                      <option value="IN_PROGRESS">En cours</option>
                      <option value="DONE">Terminées</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Priorité
                    </label>
                    <select
                      value={filterPriority}
                      onChange={(e) => setFilterPriority(e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                    >
                      <option value="all">Toutes les priorités</option>
                      <option value="HIGH">Haute</option>
                      <option value="MEDIUM">Moyenne</option>
                      <option value="LOW">Basse</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-white/70 text-sm font-medium mb-2">
                      Échéance
                    </label>
                    <select className="w-full bg-white/10 border border-white/20 rounded-2xl px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50">
                      <option value="all">Toutes les échéances</option>
                      <option value="overdue">En retard</option>
                      <option value="today">Aujourd'hui</option>
                      <option value="week">Cette semaine</option>
                      <option value="month">Ce mois</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-6 py-8">
          {/* Bulk Actions */}
          {selectedTasks.length > 0 && (
            <div className="mb-6 p-4 bg-blue-500/10 backdrop-blur-sm rounded-2xl border border-blue-500/20">
              <div className="flex items-center justify-between">
                <span className="text-white">
                  {selectedTasks.length} tâche(s) sélectionnée(s)
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

          {/* Tasks Grid/List */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredTasks.map((tache, index) => (
                <div
                  key={tache.id}
                  className="animate-slideInUp"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TaskCard
                    tache={tache}
                    onEdit={() => console.log("Edit task", tache.id)}
                    onDelete={() => console.log("Delete task", tache.id)}
                    onView={() => console.log("View task details", tache.id)}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((tache, index) => {
                const statusConfig = getStatusConfig(tache.statut);
                const priorityConfig = getPriorityConfig(tache.priorite);
                const isOverdue =
                  tache.dateEcheance &&
                  new Date(tache.dateEcheance) < new Date() &&
                  tache.statut !== "DONE";

                return (
                  <div
                    key={tache.id}
                    className={`bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 animate-slideInUp ${
                      isOverdue ? "ring-2 ring-red-400/50" : ""
                    }`}
                    style={{ animationDelay: `${index * 0.05}s` }}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 flex-1">
                        <input
                          type="checkbox"
                          checked={selectedTasks.includes(tache.id)}
                          onChange={(e) => {
                            if (e.target.checked) {
                              setSelectedTasks([...selectedTasks, tache.id]);
                            } else {
                              setSelectedTasks(
                                selectedTasks.filter((id) => id !== tache.id)
                              );
                            }
                          }}
                          className="w-4 h-4 rounded border-white/20 bg-white/10 text-blue-500 focus:ring-2 focus:ring-blue-500/50"
                        />

                        <div
                          className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${statusConfig.color} flex items-center justify-center`}
                        >
                          <statusConfig.icon className="w-6 h-6 text-white" />
                        </div>

                        <div className="flex-1">
                          <h3 className="font-bold text-white text-lg">
                            {tache.titre}
                          </h3>
                          <p className="text-white/60 text-sm line-clamp-2">
                            {tache.description}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${priorityConfig.bgColor} ${priorityConfig.textColor}`}
                            >
                              <Flag className="w-3 h-3 inline mr-1" />
                              {tache.priorite === "HIGH"
                                ? "Haute"
                                : tache.priorite === "MEDIUM"
                                ? "Moyenne"
                                : "Basse"}
                            </span>
                            <span className="text-white/40 text-xs flex items-center">
                              <Calendar className="w-3 h-3 mr-1" />
                              {tache.dateEcheance
                                ? new Date(
                                    tache.dateEcheance
                                  ).toLocaleDateString("fr-FR")
                                : "Pas d'échéance"}
                            </span>
                            {isOverdue && (
                              <span className="text-red-400 text-xs flex items-center animate-pulse">
                                <Timer className="w-3 h-3 mr-1" />
                                En retard
                              </span>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-medium ${statusConfig.bgColor} ${statusConfig.textColor}`}
                        >
                          {tache.statut === "TODO"
                            ? "À faire"
                            : tache.statut === "IN_PROGRESS"
                            ? "En cours"
                            : "Terminée"}
                        </span>

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
          {filteredTasks.length === 0 && (
            <div className="text-center py-16">
              <div className="w-32 h-32 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-16 h-16 text-white/40" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">
                Aucune tâche trouvée
              </h3>
              <p className="text-white/60 mb-6">
                {searchQuery
                  ? `Aucune tâche ne correspond à "${searchQuery}"`
                  : "Créez votre première tâche pour commencer"}
              </p>
              <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-3 rounded-2xl font-medium transition-all transform hover:scale-105">
                <Plus className="w-5 h-5 inline mr-2" />
                Nouvelle Tâche
              </button>
            </div>
          )}

          {/* Pagination */}
          {filteredTasks.length > 12 && (
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

          {/* Quick Stats Summary */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Productivité
                </h3>
                <p className="text-white/70 text-sm">
                  {doneTasks > 0
                    ? Math.round((doneTasks / totalTasks) * 100)
                    : 0}
                  % des tâches terminées
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  Performance
                </h3>
                <p className="text-white/70 text-sm">
                  {inProgressTasks} tâches en cours d'exécution
                </p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
              <div className="text-center">
                <div
                  className={`w-16 h-16 bg-gradient-to-r ${
                    overdueTasks > 0
                      ? "from-red-500 to-pink-500"
                      : "from-green-500 to-emerald-600"
                  } rounded-full flex items-center justify-center mx-auto mb-4`}
                >
                  {overdueTasks > 0 ? (
                    <Timer className="w-8 h-8 text-white" />
                  ) : (
                    <Star className="w-8 h-8 text-white" />
                  )}
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Planning</h3>
                <p className="text-white/70 text-sm">
                  {overdueTasks > 0
                    ? `${overdueTasks} tâche(s) en retard`
                    : "Aucune tâche en retard"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskListPage;
