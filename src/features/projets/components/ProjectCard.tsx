import React from "react";
import {
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  Star,
  TrendingUp,
  Activity,
  Edit,
  Trash,
  Eye,
} from "lucide-react";
import type { ProjetResponse } from "../../../services/types/models/ProjetResponse";

interface ProjectCardProps {
  projet: ProjetResponse;
  isActive?: boolean;
  onClick?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onView?: () => void;
}

const ProjectCard: React.FC<ProjectCardProps> = ({
  projet,
  isActive = false,
  onClick,
  onEdit,
  onDelete,
  onView,
}) => {
  // Calcul des statistiques du projet
  const totalTaches = projet.taches?.length || 0;
  const tachesTerminees =
    projet.taches?.filter((t) => t.statut === "DONE").length || 0;
  const tachesEnCours =
    projet.taches?.filter((t) => t.statut === "IN_PROGRESS").length || 0;
  const tachesEnAttente =
    projet.taches?.filter((t) => t.statut === "TODO").length || 0;
  const progression =
    totalTaches > 0 ? Math.round((tachesTerminees / totalTaches) * 100) : 0;

  // Déterminer la couleur du gradient
  const getGradientColor = () => {
    if (projet.couleur) return projet.couleur;

    // Couleurs par défaut basées sur la progression
    if (progression >= 80) return "from-green-500 to-emerald-600";
    if (progression >= 60) return "from-blue-500 to-indigo-600";
    if (progression >= 40) return "from-yellow-500 to-orange-600";
    if (progression >= 20) return "from-purple-500 to-violet-600";
    return "from-gray-500 to-slate-600";
  };

  const getStatusIcon = (count: number, type: "done" | "progress" | "todo") => {
    const iconProps = { className: "w-4 h-4" };
    switch (type) {
      case "done":
        return (
          <CheckCircle {...iconProps} className="w-4 h-4 text-green-500" />
        );
      case "progress":
        return <AlertCircle {...iconProps} className="w-4 h-4 text-blue-500" />;
      case "todo":
        return <Clock {...iconProps} className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div
      onClick={onClick}
      className={`
        group relative cursor-pointer transition-all duration-500 transform hover:scale-105
        ${
          isActive
            ? `bg-gradient-to-br ${getGradientColor()} shadow-2xl shadow-blue-500/25 scale-105`
            : "bg-white/10 hover:bg-white/15 backdrop-blur-xl"
        }
        rounded-3xl p-6 border border-white/20 hover:border-white/40
        overflow-hidden
      `}
    >
      {/* Effet de particules animées */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className={`absolute w-2 h-2 ${
              isActive ? "bg-white/30" : "bg-blue-400/20"
            } rounded-full animate-float`}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Badge de statut */}
      <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex space-x-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onView?.();
            }}
            className="p-2 rounded-xl bg-white/20 text-white hover:bg-white/30 hover:scale-110 transition-all duration-200"
            title="Voir détails"
          >
            <Eye className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onEdit?.();
            }}
            className="p-2 rounded-xl bg-white/20 text-white hover:bg-white/30 hover:scale-110 transition-all duration-200"
            title="Modifier"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.();
            }}
            className="p-2 rounded-xl bg-white/20 text-white hover:bg-white/30 hover:scale-110 transition-all duration-200"
            title="Supprimer"
          >
            <Trash className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Icône de projet */}
      <div className="relative mb-4">
        <div
          className={`w-16 h-16 rounded-3xl ${
            isActive ? "bg-white/20" : "bg-gradient-to-br " + getGradientColor()
          } flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300`}
        >
          <Star
            className={`w-8 h-8 ${isActive ? "text-white" : "text-white"}`}
          />
        </div>

        {/* Indicateur de progression circulaire */}
        <div className="absolute -top-1 -right-1">
          <div className="relative w-8 h-8">
            <svg className="w-8 h-8 transform -rotate-90" viewBox="0 0 32 32">
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                className="text-white/20"
              />
              <circle
                cx="16"
                cy="16"
                r="14"
                stroke="currentColor"
                strokeWidth="2"
                fill="transparent"
                strokeDasharray={`${progression * 0.88} 88`}
                className={isActive ? "text-white" : "text-green-400"}
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span
                className={`text-xs font-bold ${
                  isActive ? "text-white" : "text-green-400"
                }`}
              >
                {progression}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Contenu principal */}
      <div className="relative z-10">
        <h3
          className={`font-bold text-xl mb-2 ${
            isActive ? "text-white" : "text-white"
          } group-hover:text-yellow-200 transition-colors`}
        >
          {projet.nom}
        </h3>

        <p
          className={`text-sm mb-4 leading-relaxed ${
            isActive ? "text-white/80" : "text-white/70"
          } line-clamp-2`}
        >
          {projet.description}
        </p>

        {/* Statistiques visuelles */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          <div
            className={`p-3 rounded-2xl ${
              isActive ? "bg-white/10" : "bg-white/5"
            } backdrop-blur-sm`}
          >
            <div className="flex items-center space-x-2">
              {getStatusIcon(tachesTerminees, "done")}
              <div>
                <div
                  className={`text-lg font-bold ${
                    isActive ? "text-white" : "text-white"
                  }`}
                >
                  {tachesTerminees}
                </div>
                <div
                  className={`text-xs ${
                    isActive ? "text-white/70" : "text-white/60"
                  }`}
                >
                  Terminées
                </div>
              </div>
            </div>
          </div>

          <div
            className={`p-3 rounded-2xl ${
              isActive ? "bg-white/10" : "bg-white/5"
            } backdrop-blur-sm`}
          >
            <div className="flex items-center space-x-2">
              {getStatusIcon(tachesEnCours, "progress")}
              <div>
                <div
                  className={`text-lg font-bold ${
                    isActive ? "text-white" : "text-white"
                  }`}
                >
                  {tachesEnCours}
                </div>
                <div
                  className={`text-xs ${
                    isActive ? "text-white/70" : "text-white/60"
                  }`}
                >
                  En cours
                </div>
              </div>
            </div>
          </div>

          <div
            className={`p-3 rounded-2xl ${
              isActive ? "bg-white/10" : "bg-white/5"
            } backdrop-blur-sm`}
          >
            <div className="flex items-center space-x-2">
              {getStatusIcon(tachesEnAttente, "todo")}
              <div>
                <div
                  className={`text-lg font-bold ${
                    isActive ? "text-white" : "text-white"
                  }`}
                >
                  {tachesEnAttente}
                </div>
                <div
                  className={`text-xs ${
                    isActive ? "text-white/70" : "text-white/60"
                  }`}
                >
                  À faire
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Barre de progression */}
        <div className="mb-4">
          <div
            className={`flex items-center justify-between text-sm mb-2 ${
              isActive ? "text-white/80" : "text-white/70"
            }`}
          >
            <span className="flex items-center space-x-1">
              <TrendingUp className="w-4 h-4" />
              <span>Progression</span>
            </span>
            <span className="font-semibold">{progression}%</span>
          </div>
          <div
            className={`w-full ${
              isActive ? "bg-white/20" : "bg-white/10"
            } rounded-full h-3 overflow-hidden`}
          >
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                isActive
                  ? "bg-white shadow-lg"
                  : "bg-gradient-to-r from-green-400 to-blue-500"
              }`}
              style={{ width: `${progression}%` }}
            >
              <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>
        </div>

        {/* Métadonnées */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div
              className={`flex items-center space-x-1 text-xs ${
                isActive ? "text-white/70" : "text-white/60"
              }`}
            >
              <Calendar className="w-3 h-3" />
              <span>
                {projet.dateCreation
                  ? new Date(projet.dateCreation).toLocaleDateString("fr-FR")
                  : "N/A"}
              </span>
            </div>

            <div
              className={`flex items-center space-x-1 text-xs ${
                isActive ? "text-white/70" : "text-white/60"
              }`}
            >
              <Activity className="w-3 h-3" />
              <span>{totalTaches} tâches</span>
            </div>
          </div>

          {/* Indicateur d'activité */}
          <div className="flex space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-white" : "bg-green-400"
              } animate-pulse`}
            ></div>
            <div
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-white/60" : "bg-blue-400"
              } animate-pulse`}
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className={`w-2 h-2 rounded-full ${
                isActive ? "bg-white/40" : "bg-purple-400"
              } animate-pulse`}
              style={{ animationDelay: "1s" }}
            ></div>
          </div>
        </div>
      </div>

      {/* Effet de survol */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

      {/* Bordure animée */}
      <div
        className={`absolute inset-0 rounded-3xl border-2 transition-all duration-300 ${
          isActive
            ? "border-white/40 shadow-2xl"
            : "border-transparent group-hover:border-white/30"
        }`}
      ></div>
    </div>
  );
};

export default ProjectCard;
