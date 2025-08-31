import React, { useState, useEffect, useCallback } from "react";
import {
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Star,
  Calendar,
  MoreVertical,
  Edit3,
  Trash2,
  Eye,
  Loader2,
  FolderPlus,
  Sparkles,
  RefreshCw,
  Search,
  ChevronDown,
  ChevronUp,
  X,
  Tag,
  FileText,
  AlertTriangle,
} from "lucide-react";
import { useAuth } from "../features/auth/hooks/useAuth";
import TaskForm from "../features/taches/components/TaskForm";
import type { TacheRequest } from "../services/types/models/TacheRequest";
import type { ProjetResponse } from "../services/types/models/ProjetResponse";
import {
  createProjet,
  createTache,
  deleteTache,
  getProjetsByDeveloper,
  updateTache,
  updateTacheStatut,
} from "../features/auth/api";
import { useNavigate } from "react-router-dom";
import ProjectAddModal from "../components/modals/ProjectAddModal";

// Types adaptés à votre API
interface Tache {
  id: number;
  title: string;
  description: string;
  etat: "EN_ATTENTE" | "EN_COURS" | "TERMINEE";
  priority: "BASSE" | "MOYENNE" | "HAUTE" | "URGENTE";
  createdAt: string;
  dueDate?: string;
}

// Modal de visualisation de tâche
const TaskViewModal = ({ task, isOpen, onClose }) => {
  if (!isOpen) return null;

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "URGENTE":
        return "from-red-500 to-red-600";
      case "HAUTE":
        return "from-orange-500 to-orange-600";
      case "MOYENNE":
        return "from-yellow-500 to-yellow-600";
      case "BASSE":
        return "from-green-500 to-green-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getStatusColor = (etat) => {
    switch (etat) {
      case "EN_ATTENTE":
        return "from-slate-500 to-slate-600";
      case "EN_COURS":
        return "from-blue-500 to-indigo-600";
      case "TERMINEE":
        return "from-green-500 to-emerald-600";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-xl rounded-3xl max-w-2xl w-full shadow-2xl border border-white/20 transform transition-all animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        {/* <div className="relative p-6 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group"
          >
            <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="flex items-start space-x-4">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${getPriorityColor(
                task.priority
              )} flex items-center justify-center shadow-lg`}
            >
              <AlertCircle className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                {task.title}
              </h2>
              <div className="flex items-center space-x-3">
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(
                    task.etat
                  )} text-white shadow-md`}
                >
                  {task.etat === "EN_ATTENTE" && (
                    <Clock className="w-3 h-3 mr-1" />
                  )}
                  {task.etat === "EN_COURS" && (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  )}
                  {task.etat === "TERMINEE" && (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  )}
                  {task.etat.replace(/_/g, " ")}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPriorityColor(
                    task.priority
                  )} text-white shadow-md`}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {task.priority}
                </span>
              </div>
            </div>
          </div>
        </div> */}

        {/* header */}
        <div className="relative p-6 border-b border-white/10">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group border border-white/20 backdrop-blur-sm"
            style={{ zIndex: 999 }} // Force un z-index élevé
          >
            <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
          </button>

          <div className="flex items-start space-x-4 pr-16">
            {" "}
            {/* Ajout de pr-16 pour éviter le chevauchement */}
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${getPriorityColor(
                task.priority
              )} flex items-center justify-center shadow-lg`}
            >
              <AlertCircle className="w-7 h-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white mb-2">
                {task.title}
              </h2>
              <div className="flex items-center space-x-3 flex-wrap">
                {" "}
                {/* Ajout de flex-wrap */}
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(
                    task.etat
                  )} text-white shadow-md`}
                >
                  {task.etat === "EN_ATTENTE" && (
                    <Clock className="w-3 h-3 mr-1" />
                  )}
                  {task.etat === "EN_COURS" && (
                    <AlertCircle className="w-3 h-3 mr-1" />
                  )}
                  {task.etat === "TERMINEE" && (
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                  )}
                  {task.etat.replace(/_/g, " ")}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPriorityColor(
                    task.priority
                  )} text-white shadow-md`}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  {task.priority}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Description */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <div className="flex items-center mb-3">
              <FileText className="w-5 h-5 text-cyan-400 mr-2" />
              <h3 className="text-lg font-semibold text-white">Description</h3>
            </div>
            <p className="text-white/80 leading-relaxed">
              {task.description || "Aucune description disponible"}
            </p>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <div className="flex items-center mb-2">
                <Calendar className="w-5 h-5 text-green-400 mr-2" />
                <h4 className="text-sm font-medium text-white/70">
                  Date de création
                </h4>
              </div>
              <p className="text-white font-semibold">
                {new Date(task.createdAt).toLocaleDateString("fr-FR", {
                  day: "numeric",
                  month: "long",
                  year: "numeric",
                })}
              </p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <div className="flex items-center mb-2">
                <AlertTriangle className="w-5 h-5 text-orange-400 mr-2" />
                <h4 className="text-sm font-medium text-white/70">
                  Date d'échéance
                </h4>
              </div>
              <p className="text-white font-semibold">
                {task.dueDate
                  ? new Date(task.dueDate).toLocaleDateString("fr-FR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })
                  : "Non définie"}
              </p>
            </div>
          </div>

          {/* Progress indicator */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
            <h4 className="text-sm font-medium text-white/70 mb-3">
              Progression
            </h4>
            <div className="flex items-center justify-between">
              <div className="flex space-x-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    task.etat === "EN_ATTENTE" ||
                    task.etat === "EN_COURS" ||
                    task.etat === "TERMINEE"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                />
                <div
                  className={`w-3 h-3 rounded-full ${
                    task.etat === "EN_COURS" || task.etat === "TERMINEE"
                      ? "bg-green-500"
                      : "bg-gray-500"
                  }`}
                />
                <div
                  className={`w-3 h-3 rounded-full ${
                    task.etat === "TERMINEE" ? "bg-green-500" : "bg-gray-500"
                  }`}
                />
              </div>
              <span className="text-white/70 text-sm">
                {task.etat === "EN_ATTENTE" && "0%"}
                {task.etat === "EN_COURS" && "50%"}
                {task.etat === "TERMINEE" && "100%"}
              </span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-white/10">
          <button
            onClick={onClose}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
          >
            Fermer
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal de modification de tâche
const TaskEditModal = ({ task, isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: task?.title || "",
    description: task?.description || "",
    priority: task?.priority || "MOYENNE",
    etat: task?.etat || "EN_ATTENTE",
    dueDate: task?.dueDate || "",
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        priority: task.priority,
        etat: task.etat,
        dueDate: task.dueDate || "",
      });
    }
  }, [task]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-xl rounded-3xl max-w-2xl w-full shadow-2xl border border-white/20 transform transition-all animate-in fade-in zoom-in duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        <form onSubmit={handleSubmit}>
          {/* Header */}
          <div className="relative p-6 border-b border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group"
            >
              <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <Edit3 className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Modifier la tâche
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Titre
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                placeholder="Entrez le titre de la tâche"
                required
              />
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all resize-none"
                placeholder="Décrivez la tâche..."
                rows={4}
                required
              />
            </div>

            {/* Priority and Status */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Priorité
                </label>
                <select
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value })
                  }
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                >
                  <option value="BASSE" className="bg-gray-800">
                    Basse
                  </option>
                  <option value="MOYENNE" className="bg-gray-800">
                    Moyenne
                  </option>
                  <option value="HAUTE" className="bg-gray-800">
                    Haute
                  </option>
                  <option value="URGENTE" className="bg-gray-800">
                    Urgente
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-white/80 mb-2">
                  Statut
                </label>
                <select
                  value={formData.etat}
                  onChange={(e) =>
                    setFormData({ ...formData, etat: e.target.value })
                  }
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                >
                  <option value="EN_ATTENTE" className="bg-gray-800">
                    En attente
                  </option>
                  <option value="EN_COURS" className="bg-gray-800">
                    En cours
                  </option>
                  <option value="TERMINEE" className="bg-gray-800">
                    Terminée
                  </option>
                </select>
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Date d'échéance
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) =>
                  setFormData({ ...formData, dueDate: e.target.value })
                }
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 flex space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-2xl transition-all border border-white/20"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

const Home = () => {
  const [projets, setProjets] = useState<ProjetResponse[]>([]);
  const [projetActif, setProjetActif] = useState<ProjetResponse | null>(null);
  const [draggedTask, setDraggedTask] = useState<Tache | null>(null);
  const [showTaskModal, setShowTaskModal] = useState(false);

  const [showProjectModal, setShowProjectModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { logout } = useAuth();
  const navigate = useNavigate();

  // Modal states
  const [viewModalTask, setViewModalTask] = useState<Tache | null>(null);
  const [editModalTask, setEditModalTask] = useState<Tache | null>(null);

  // Sidebar states
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [projectSearchQuery, setProjectSearchQuery] = useState("");

  // Task filtering states
  const [taskSearchQuery, setTaskSearchQuery] = useState("");
  // const [showFilters, setShowFilters] = useState(false);
  // const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("recent");

  // Animation states
  const [mounted, setMounted] = useState(false);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    setMounted(true);
  }, []);

  const loadProjets = useCallback(async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);
      setError(null);
      const data = await getProjetsByDeveloper(user.id);

      // Trier les projets par date de création (plus récents en premier)
      const sortedData = data.sort((a, b) => {
        const dateA = new Date(a.creatAt);
        const dateB = new Date(b.creatAt);
        return dateB.getTime() - dateA.getTime(); // Ordre décroissant (plus récent en premier)
      });

      setProjets(sortedData);

      // Sélectionner le premier projet par défaut seulement si aucun projet n'est sélectionné
      setProjets((prevProjets) => {
        // Utilisez setProjetActif avec une fonction pour éviter la dépendance
        setProjetActif((prevProjetActif) => {
          if (!prevProjetActif && sortedData.length > 0) {
            return sortedData[0]; // Le plus récent sera maintenant le premier
          }
          return prevProjetActif;
        });
        return sortedData;
      });
    } catch (err) {
      setError("Erreur lors du chargement des projets");
      await logout();
      navigate("/logout");
      console.error("Erreur:", err);
    } finally {
      setIsLoading(false);
    }
  }, [user?.id]); // Seulement user?.id dans les dépendances

  // 2. Gardez un seul useEffect
  useEffect(() => {
    if (user?.id) {
      loadProjets();
    }
  }, [user?.id, loadProjets]);

  useEffect(() => {
    if (user?.id) {
      loadProjets();
    }
  }, [loadProjets, user?.id]);

  const refreshProjets = async () => {
    setIsRefreshing(true);
    await loadProjets();
    setIsRefreshing(false);
  };

  // Filter projects based on search
  const filteredProjets = projets.filter(
    (projet) =>
      projet.title.toLowerCase().includes(projectSearchQuery.toLowerCase()) ||
      projet.description
        .toLowerCase()
        .includes(projectSearchQuery.toLowerCase())
  );

  // const loadProjets = async () => {
  //   if (!user?.id) return;

  //   try {
  //     setIsLoading(true);
  //     setError(null);
  //     const data = await getProjetsByDeveloper(user.id);
  //     setProjets(data);

  //     // Sélectionner le premier projet par défaut
  //     if (data.length > 0 && !projetActif) {
  //       setProjetActif(data[0]);
  //     }
  //   } catch (err) {
  //     setError("Erreur lors du chargement des projets");
  //     console.error("Erreur:", err);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // Show limited projects initially
  const displayedProjects = showAllProjects
    ? filteredProjets
    : filteredProjets.slice(0, 3);

  // Filter tasks based on search
  const filterTasks = (tasks: Tache[]) => {
    if (!taskSearchQuery) return tasks;
    return tasks.filter(
      (task) =>
        task.title.toLowerCase().includes(taskSearchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(taskSearchQuery.toLowerCase())
    );
  };

  // Sort tasks
  const sortTasks = (tasks: Tache[]) => {
    const sorted = [...tasks];
    switch (sortBy) {
      case "name":
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      case "priority":
        const priorityOrder = { URGENTE: 4, HAUTE: 3, MOYENNE: 2, BASSE: 1 };
        return sorted.sort(
          (a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]
        );
      case "dueDate":
        return sorted.sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
        });
      case "recent":
      default:
        return sorted.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
    }
  };

  const handleDragStart = (e: React.DragEvent, tache: Tache) => {
    setDraggedTask(tache);
    e.dataTransfer.effectAllowed = "move";
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
  };

  const handleDrop = async (e: React.DragEvent, newEtat: Tache["etat"]) => {
    e.preventDefault();
    if (draggedTask && projetActif) {
      try {
        // Appel API pour mettre à jour le statut
        const updatedTask = await updateTacheStatut(draggedTask.id, newEtat);

        // Mise à jour de l'état local
        const updatedTaches = projetActif.taches.map((tache) =>
          tache.id === draggedTask.id ? { ...tache, etat: newEtat } : tache
        );

        const updatedProjet = { ...projetActif, taches: updatedTaches };
        setProjetActif(updatedProjet);

        const updatedProjets = projets.map((p) =>
          p.id === projetActif.id ? updatedProjet : p
        );
        setProjets(updatedProjets);
      } catch (error) {
        console.error("Erreur lors de la mise à jour du statut:", error);
        setError("Erreur lors de la mise à jour du statut de la tâche");
      }
    }
    setDraggedTask(null);
    setHoveredColumn(null);
  };

  const handleCreateProject = async (projectData) => {
    if (!user?.id) return;

    try {
      const newProjectData = {
        ...projectData,
        developerId: user.id,
      };

      const newProject = await createProjet(newProjectData);

      // Mettre à jour la liste des projets
      setProjets((prevProjets) => [...prevProjets, newProject]);

      // Sélectionner automatiquement le nouveau projet
      // setProjetActif(newProject);

      // Fermer le modal
      setShowProjectModal(false);

      console.log("Projet créé avec succès:", newProject);
    } catch (error) {
      console.error("Erreur lors de la création du projet:", error);
      setError("Erreur lors de la création du projet");
    }
  };

  const handleDeleteTask = async (taskId: number) => {
    if (!projetActif) return;

    if (window.confirm("Êtes-vous sûr de vouloir supprimer cette tâche ?")) {
      try {
        await deleteTache(taskId);

        // Mise à jour de l'état local
        const updatedTaches = projetActif.taches.filter((t) => t.id !== taskId);
        const updatedProjet = { ...projetActif, taches: updatedTaches };
        setProjetActif(updatedProjet);

        const updatedProjets = projets.map((p) =>
          p.id === projetActif.id ? updatedProjet : p
        );
        setProjets(updatedProjets);
      } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        setError("Erreur lors de la suppression de la tâche");
      }
    }
  };

  const handleEditTask = async (taskData: any) => {
    if (!editModalTask || !projetActif) return;

    try {
      const updatedTask = await updateTache(editModalTask.id, taskData);

      // Mise à jour de l'état local
      const updatedTaches = projetActif.taches.map((t) =>
        t.id === editModalTask.id ? { ...t, ...taskData } : t
      );
      const updatedProjet = { ...projetActif, taches: updatedTaches };
      setProjetActif(updatedProjet);

      const updatedProjets = projets.map((p) =>
        p.id === projetActif.id ? updatedProjet : p
      );
      setProjets(updatedProjets);

      setEditModalTask(null);
    } catch (error) {
      console.error("Erreur lors de la modification:", error);
      setError("Erreur lors de la modification de la tâche");
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "URGENTE":
        return "from-red-600 to-red-500";
      case "HAUTE":
        return "from-red-500 to-pink-500";
      case "MOYENNE":
        return "from-yellow-500 to-orange-500";
      case "BASSE":
        return "from-green-500 to-teal-500";
      default:
        return "from-gray-500 to-gray-600";
    }
  };

  const getStatusIcon = (etat: string) => {
    switch (etat) {
      case "EN_ATTENTE":
        return <Clock className="w-4 h-4" />;
      case "EN_COURS":
        return <AlertCircle className="w-4 h-4" />;
      case "TERMINEE":
        return <CheckCircle2 className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const getTasksByStatus = (etat: Tache["etat"]) => {
    if (!projetActif) return [];
    const tasks = projetActif.taches.filter((tache) => tache.etat === etat);
    const filteredTasks = filterTasks(tasks);
    return sortTasks(filteredTasks);
  };

  const columns = [
    {
      id: "EN_ATTENTE",
      title: "En Attente",
      tasks: getTasksByStatus("EN_ATTENTE"),
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50",
    },
    {
      id: "EN_COURS",
      title: "En Cours",
      tasks: getTasksByStatus("EN_COURS"),
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "TERMINEE",
      title: "Terminées",
      tasks: getTasksByStatus("TERMINEE"),
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50",
    },
  ];

  const handleCreateTask = async (taskData: TacheRequest) => {
    try {
      const newTask = await createTache(taskData);

      // Mettre à jour l'état local
      if (projetActif && projetActif.id === taskData.projetId) {
        const updatedProjet = {
          ...projetActif,
          taches: [...projetActif.taches, newTask],
        };
        setProjetActif(updatedProjet);

        const updatedProjets = projets.map((p) =>
          p.id === projetActif.id ? updatedProjet : p
        );
        setProjets(updatedProjets);
      }

      setShowTaskModal(false);
    } catch (error) {
      console.error("Erreur lors de la création de la tâche:", error);
    }
  };

  const openTaskModal = () => {
    if (projetActif) {
      setShowTaskModal(true);
    }
  };

  if (!mounted) return null;

  return (
    <div className="bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 w-full">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-purple-900/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(50)].map((_, i) => (
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
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Add Button */}
      {projetActif && (
        <button
          onClick={openTaskModal}
          className="fixed bottom-8 right-8 z-50 w-16 h-16 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
          title="Ajouter une nouvelle tâche"
        >
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 animate-ping opacity-20 group-hover:opacity-30"></div>
          <Plus className="w-8 h-8 relative z-10 group-hover:rotate-90 transition-transform duration-300" />
          <div className="absolute inset-0 overflow-hidden rounded-full pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {[...Array(4)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-ping"
                style={{
                  left: `${20 + i * 20}%`,
                  top: `${20 + i * 20}%`,
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: "0.8s",
                }}
              />
            ))}
          </div>
        </button>
      )}

      {/* Refresh Button */}
      <button
        onClick={refreshProjets}
        disabled={isRefreshing}
        className="fixed bottom-8 left-8 z-50 w-12 h-12 bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 flex items-center justify-center group"
        title="Actualiser les projets"
      >
        <RefreshCw
          className={`w-5 h-5 transition-transform duration-300 ${
            isRefreshing ? "animate-spin" : "group-hover:rotate-180"
          }`}
        />
      </button>

      {/* Loading State */}
      {isLoading && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center">
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 text-center border border-white/20">
            <Loader2 className="w-12 h-12 text-cyan-400 animate-spin mx-auto mb-4" />
            <h3 className="text-xl font-bold text-white mb-2">
              Chargement des projets
            </h3>
            <p className="text-white/70">Veuillez patienter...</p>
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="fixed top-24 right-8 z-50 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl p-4 max-w-sm">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-10 flex">
        {/* Sidebar Projects */}
        <div className="w-80 backdrop-blur-xl bg-white/5 border-r border-white/10 min-h-screen p-6">
          <div className="mb-8">
            {/* New Project Button - En haut */}
            {/* <div className="mb-6">
              <button className="w-full p-6 border-2 border-dashed border-white/30 rounded-3xl text-white/60 hover:text-white hover:border-white/50 transition-all duration-300 flex flex-col items-center justify-center space-y-3 group hover:bg-white/5 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
                <div className="relative z-10 w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <FolderPlus className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
                </div>
                <div className="relative z-10 text-center">
                  <span className="font-semibold">Nouveau Projet</span>
                  <div className="flex items-center justify-center space-x-1 mt-1">
                    <Sparkles className="w-3 h-3 animate-pulse" />
                    <span className="text-xs">
                      Créer quelque chose d'incroyable
                    </span>
                    <Sparkles className="w-3 h-3 animate-pulse" />
                  </div>
                </div>
                <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.2}s`,
                        animationDuration: "1s",
                      }}
                    />
                  ))}
                </div>
              </button>
            </div> */}
            <button
              onClick={() => setShowProjectModal(true)}
              className="w-full p-6 border-2 border-dashed border-white/30 rounded-3xl text-white/60 hover:text-white hover:border-white/50 transition-all duration-300 flex flex-col items-center justify-center space-y-3 group hover:bg-white/5 relative overflow-hidden"
            >
              {/* Le contenu du bouton reste identique */}
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
              <div className="relative z-10 w-12 h-12 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <FolderPlus className="w-6 h-6 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div className="relative z-10 text-center">
                <span className="font-semibold">Nouveau Projet</span>
                <div className="flex items-center justify-center space-x-1 mt-1">
                  <Sparkles className="w-3 h-3 animate-pulse" />
                  <span className="text-xs">
                    Créer quelque chose d'incroyable
                  </span>
                  <Sparkles className="w-3 h-3 animate-pulse" />
                </div>
              </div>
            </button>

            {/* Projects Header with Search */}
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-white flex items-center">
                <Star className="w-5 h-5 mr-2 text-yellow-400" />
                Mes Projets
              </h2>
              <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                {filteredProjets.length}
              </span>
            </div>

            {/* Project Search */}
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
              <input
                type="text"
                placeholder="Rechercher un projet..."
                value={projectSearchQuery}
                onChange={(e) => setProjectSearchQuery(e.target.value)}
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-10 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all text-sm"
              />
            </div>

            {/* Projects List */}
            {filteredProjets.length === 0 && !isLoading ? (
              <div className="text-center py-8">
                <FolderPlus className="w-12 h-12 text-white/40 mx-auto mb-4" />
                <p className="text-white/60 text-sm">
                  {projectSearchQuery ? "Aucun projet trouvé" : "Aucun projet"}
                </p>
              </div>
            ) : (
              <>
                {displayedProjects.map((projet) => (
                  <div
                    key={projet.id}
                    onClick={() => setProjetActif(projet)}
                    className={`p-4 rounded-2xl mb-3 cursor-pointer transition-all transform hover:scale-102 ${
                      projetActif?.id === projet.id
                        ? "bg-gradient-to-r from-blue-500 to-purple-600 shadow-xl"
                        : "bg-white/10 hover:bg-white/15"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-white">
                          {projet.title}
                        </h3>
                        <p className="text-white/60 text-sm line-clamp-2">
                          {projet.description}
                        </p>
                        <div className="flex mt-2 space-x-2">
                          <span className="text-xs bg-white/20 text-white px-2 py-1 rounded-full">
                            {projet.taches.length} tâches
                          </span>
                          <span className="text-xs bg-green-500/20 text-green-300 px-2 py-1 rounded-full">
                            {
                              projet.taches.filter((t) => t.etat === "TERMINEE")
                                .length
                            }{" "}
                            terminées
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Show More/Less Button */}
                {filteredProjets.length > 3 && (
                  <button
                    onClick={() => setShowAllProjects(!showAllProjects)}
                    className="w-full p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-white/70 hover:text-white transition-all border border-white/10 flex items-center justify-center space-x-2"
                  >
                    {showAllProjects ? (
                      <>
                        <ChevronUp className="w-4 h-4" />
                        <span>Voir moins</span>
                      </>
                    ) : (
                      <>
                        <ChevronDown className="w-4 h-4" />
                        <span>Voir plus ({filteredProjets.length - 3})</span>
                      </>
                    )}
                  </button>
                )}
              </>
            )}
          </div>
        </div>

        {/* Kanban Board */}
        <div className="flex-1 p-6">
          {projetActif ? (
            <>
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {projetActif.title}
                </h2>
                <p className="text-white/60">{projetActif.description}</p>
              </div>

              {/* Task Search and Filters */}
              <div className="mb-6">
                <div className="flex flex-col lg:flex-row items-center justify-between space-y-4 lg:space-y-0 lg:space-x-6">
                  <div className="flex items-center space-x-4 w-full lg:w-auto">
                    <div className="relative flex-1 lg:w-96">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                      <input
                        type="text"
                        placeholder="Rechercher une tâche..."
                        value={taskSearchQuery}
                        onChange={(e) => setTaskSearchQuery(e.target.value)}
                        className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-12 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    {/* Sort Dropdown */}
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                    >
                      <option value="recent">Plus récents</option>
                      <option value="name">Nom A-Z</option>
                      <option value="priority">Priorité</option>
                      <option value="dueDate">Date d'échéance</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Board */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-full">
                {columns.map((column) => (
                  <div
                    key={column.id}
                    className={`${
                      column.bgColor
                    }/10 backdrop-blur-sm rounded-3xl p-6 border border-white/10 transition-all ${
                      hoveredColumn === column.id
                        ? "ring-2 ring-cyan-400/50 transform scale-102"
                        : ""
                    }`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, column.id as Tache["etat"])}
                    onDragEnter={() => setHoveredColumn(column.id)}
                    onDragLeave={() => setHoveredColumn(null)}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center space-x-3">
                        <div
                          className={`w-3 h-3 rounded-full bg-gradient-to-r ${column.color}`}
                        ></div>
                        <h3 className="font-semibold text-white">
                          {column.title}
                        </h3>
                        <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                          {column.tasks.length}
                        </span>
                      </div>
                      <MoreVertical className="w-4 h-4 text-white/40" />
                    </div>

                    <div className="space-y-4 min-h-96">
                      {column.tasks.map((tache, index) => (
                        <div
                          key={tache.id}
                          draggable
                          onDragStart={(e) => handleDragStart(e, tache)}
                          className={`bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all cursor-grab active:cursor-grabbing ${
                            draggedTask?.id === tache.id ? "opacity-50" : ""
                          }`}
                          style={{
                            animationDelay: `${index * 0.1}s`,
                          }}
                        >
                          <div className="flex items-start justify-between mb-3">
                            <div
                              className={`w-8 h-8 rounded-xl bg-gradient-to-r ${getPriorityColor(
                                tache.priority
                              )} flex items-center justify-center text-white text-xs font-bold`}
                            >
                              {getStatusIcon(tache.etat)}
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => setViewModalTask(tache)}
                                className="text-gray-400 hover:text-blue-500 transition-colors"
                              >
                                <Eye className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => setEditModalTask(tache)}
                                className="text-gray-400 hover:text-green-500 transition-colors"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => handleDeleteTask(tache.id)}
                                className="text-gray-400 hover:text-red-500 transition-colors"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>

                          <h4 className="font-semibold text-gray-800 mb-2">
                            {tache.title}
                          </h4>
                          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                            {tache.description}
                          </p>

                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Calendar className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">
                                {tache.dueDate
                                  ? new Date(tache.dueDate).toLocaleDateString(
                                      "fr-FR"
                                    )
                                  : "Pas d'échéance"}
                              </span>
                            </div>
                            <div
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                tache.priority === "URGENTE"
                                  ? "bg-red-100 text-red-700"
                                  : tache.priority === "HAUTE"
                                  ? "bg-orange-100 text-orange-700"
                                  : tache.priority === "MOYENNE"
                                  ? "bg-yellow-100 text-yellow-700"
                                  : "bg-green-100 text-green-700"
                              }`}
                            >
                              {tache.priority === "URGENTE"
                                ? "Urgente"
                                : tache.priority === "HAUTE"
                                ? "Haute"
                                : tache.priority === "MOYENNE"
                                ? "Moyenne"
                                : "Basse"}
                            </div>
                          </div>
                        </div>
                      ))}

                      {column.tasks.length === 0 && (
                        <div className="flex items-center justify-center h-32 border-2 border-dashed border-white/30 rounded-2xl">
                          <p className="text-white/40">Aucune tâche</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <FolderPlus className="w-16 h-16 text-white/40 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Sélectionnez un projet
                </h3>
                <p className="text-white/60">
                  Choisissez un projet dans la sidebar pour voir ses tâches
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Task Form Modal */}
      {showTaskModal && projetActif && (
        <TaskForm
          isOpen={showTaskModal}
          onClose={() => setShowTaskModal(false)}
          onSubmit={handleCreateTask}
          projetId={projetActif.id}
        />
      )}

      {/* Task View Modal */}
      <TaskViewModal
        task={viewModalTask}
        isOpen={!!viewModalTask}
        onClose={() => setViewModalTask(null)}
      />

      {/* Task Edit Modal */}
      <TaskEditModal
        task={editModalTask}
        isOpen={!!editModalTask}
        onClose={() => setEditModalTask(null)}
        onSubmit={handleEditTask}
      />

      {/* Project Add Modal */}
      <ProjectAddModal
        isOpen={showProjectModal}
        onClose={() => setShowProjectModal(false)}
        onSubmit={handleCreateProject}
      />
    </div>
  );
};

export default Home;
