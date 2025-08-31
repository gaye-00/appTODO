import React from "react";
import {
  Calendar,
  Eye,
  Edit3,
  Trash2,
  Clock,
  AlertCircle,
  CheckCircle2,
  User,
  Tag,
} from "lucide-react";
import type { TacheResponse } from "../../../services/types/models/TacheResponse";

interface TaskCardProps {
  tache: TacheResponse;
  onEdit?: (tache: TacheResponse) => void;
  onDelete?: (id: number) => void;
  onView?: (tache: TacheResponse) => void;
  onDragStart?: (e: React.DragEvent, tache: TacheResponse) => void;
  isDragging?: boolean;
}

const TaskCard: React.FC<TaskCardProps> = ({
  tache,
  onEdit,
  onDelete,
  onView,
  onDragStart,
  isDragging = false,
}) => {
  const getPriorityConfig = (priorite: string) => {
    switch (priorite) {
      case "HIGH":
        return {
          gradient: "from-red-500 to-pink-500",
          bg: "bg-red-100",
          text: "text-red-700",
          label: "Haute",
        };
      case "MEDIUM":
        return {
          gradient: "from-yellow-500 to-orange-500",
          bg: "bg-yellow-100",
          text: "text-yellow-700",
          label: "Moyenne",
        };
      case "LOW":
        return {
          gradient: "from-green-500 to-teal-500",
          bg: "bg-green-100",
          text: "text-green-700",
          label: "Basse",
        };
      default:
        return {
          gradient: "from-gray-500 to-gray-600",
          bg: "bg-gray-100",
          text: "text-gray-700",
          label: "Normale",
        };
    }
  };

  const getStatusIcon = (statut: string) => {
    switch (statut) {
      case "TODO":
        return <Clock className="w-4 h-4 text-slate-600" />;
      case "IN_PROGRESS":
        return <AlertCircle className="w-4 h-4 text-blue-600" />;
      case "DONE":
        return <CheckCircle2 className="w-4 h-4 text-green-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-600" />;
    }
  };

  const getStatusColor = (statut: string) => {
    switch (statut) {
      case "TODO":
        return "border-l-slate-500";
      case "IN_PROGRESS":
        return "border-l-blue-500";
      case "DONE":
        return "border-l-green-500";
      default:
        return "border-l-gray-500";
    }
  };

  const priorityConfig = getPriorityConfig(tache.priorite);
  const isOverdue =
    tache.dateEcheance && new Date(tache.dateEcheance) < new Date();

  return (
    <div
      draggable
      onDragStart={(e) => onDragStart?.(e, tache)}
      className={`
        group relative bg-white backdrop-blur-sm rounded-2xl p-5 shadow-lg hover:shadow-2xl 
        transform hover:-translate-y-2 transition-all duration-300 cursor-grab active:cursor-grabbing
        border-l-4 ${getStatusColor(tache.statut)}
        ${isDragging ? "opacity-50 rotate-3 scale-105" : ""}
        ${isOverdue ? "ring-2 ring-red-300 ring-opacity-50" : ""}
      `}
    >
      {/* Badge de priorité animé */}
      <div className="absolute -top-2 -right-2 z-10">
        <div
          className={`w-6 h-6 rounded-full bg-gradient-to-r ${priorityConfig.gradient} flex items-center justify-center animate-pulse`}
        >
          <div className="w-2 h-2 bg-white rounded-full"></div>
        </div>
      </div>

      {/* En-tête de la carte */}
      <div className="flex items-start justify-between mb-4">
        <div
          className={`w-10 h-10 rounded-2xl bg-gradient-to-r ${priorityConfig.gradient} flex items-center justify-center text-white font-bold transform rotate-12 group-hover:rotate-0 transition-transform duration-300`}
        >
          {getStatusIcon(tache.statut)}
        </div>

        <div className="flex space-x-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={() => onView?.(tache)}
            className="p-2 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:scale-110 transition-all duration-200"
            title="Voir détails"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={() => onEdit?.(tache)}
            className="p-2 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 hover:scale-110 transition-all duration-200"
            title="Modifier"
          >
            <Edit3 className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete?.(tache.id)}
            className="p-2 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:scale-110 transition-all duration-200"
            title="Supprimer"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="mb-4">
        <h4 className="font-bold text-gray-800 mb-2 text-lg group-hover:text-blue-600 transition-colors">
          {tache.titre}
        </h4>
        <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
          {tache.description}
        </p>
      </div>

      {/* Tags et métadonnées */}
      <div className="flex flex-wrap gap-2 mb-4">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${priorityConfig.bg} ${priorityConfig.text}`}
        >
          <Tag className="w-3 h-3 inline mr-1" />
          {priorityConfig.label}
        </span>

        {tache.dateEcheance && (
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              isOverdue
                ? "bg-red-100 text-red-700 animate-pulse"
                : "bg-blue-100 text-blue-700"
            }`}
          >
            <Calendar className="w-3 h-3 inline mr-1" />
            {new Date(tache.dateEcheance).toLocaleDateString("fr-FR")}
          </span>
        )}
      </div>

      {/* Barre de progression (si en cours) */}
      {tache.statut === "IN_PROGRESS" && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
            <span>Progression</span>
            <span>65%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div className="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full w-2/3 relative">
              <div className="absolute right-0 top-0 w-2 h-2 bg-white rounded-full transform translate-x-1 animate-pulse"></div>
            </div>
          </div>
        </div>
      )}

      {/* Pied de carte */}
      <div className="flex items-center justify-between text-xs text-gray-500">
        <div className="flex items-center space-x-2">
          <User className="w-3 h-3" />
          <span>
            Créé le {new Date(tache.dateCreation).toLocaleDateString("fr-FR")}
          </span>
        </div>

        <div className="flex space-x-1">
          {/* Indicateurs d'activité */}
          <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-ping"></div>
          <div
            className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-ping"
            style={{ animationDelay: "0.2s" }}
          ></div>
          <div
            className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-ping"
            style={{ animationDelay: "0.4s" }}
          ></div>
        </div>
      </div>

      {/* Effet de survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-purple-500/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

      {/* Animation de bordure */}
      <div className="absolute inset-0 rounded-2xl border-2 border-transparent bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  );
};

export default TaskCard;
