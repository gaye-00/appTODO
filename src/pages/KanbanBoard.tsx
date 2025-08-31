import React, { useState, useRef, useEffect } from "react";
import {
  Plus,
  MoreVertical,
  Filter,
  Search,
  Clock,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";
import TaskCard from "./TaskCard";
import type { TacheResponse } from "../types/models/TacheResponse";

interface KanbanColumn {
  id: "TODO" | "IN_PROGRESS" | "DONE";
  title: string;
  color: string;
  bgColor: string;
  tasks: TacheResponse[];
  icon: React.ReactNode;
}

interface KanbanBoardProps {
  taches: TacheResponse[];
  onTaskUpdate: (taskId: number, newStatus: TacheResponse["statut"]) => void;
  onTaskEdit?: (task: TacheResponse) => void;
  onTaskDelete?: (taskId: number) => void;
  onTaskView?: (task: TacheResponse) => void;
  onAddTask?: (status: TacheResponse["statut"]) => void;
  searchQuery?: string;
  filterPriority?: string;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({
  taches,
  onTaskUpdate,
  onTaskEdit,
  onTaskDelete,
  onTaskView,
  onAddTask,
  searchQuery = "",
  filterPriority = "ALL",
}) => {
  const [draggedTask, setDraggedTask] = useState<TacheResponse | null>(null);
  const [hoveredColumn, setHoveredColumn] = useState<string | null>(null);
  const [dragPreview, setDragPreview] = useState<{
    x: number;
    y: number;
  } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);

  // Filtrer les tâches
  const filteredTasks = taches.filter((tache) => {
    const matchesSearch =
      tache.titre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tache.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority =
      filterPriority === "ALL" || tache.priorite === filterPriority;
    return matchesSearch && matchesPriority;
  });

  // Grouper les tâches par statut
  const getTasksByStatus = (statut: TacheResponse["statut"]) =>
    filteredTasks.filter((tache) => tache.statut === statut);

  const columns: KanbanColumn[] = [
    {
      id: "TODO",
      title: "À Faire",
      color: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50/10",
      tasks: getTasksByStatus("TODO"),
      icon: <Clock className="w-5 h-5" />,
    },
    {
      id: "IN_PROGRESS",
      title: "En Cours",
      color: "from-blue-500 to-indigo-600",
      bgColor: "bg-blue-50/10",
      tasks: getTasksByStatus("IN_PROGRESS"),
      icon: <AlertCircle className="w-5 h-5" />,
    },
    {
      id: "DONE",
      title: "Terminé",
      color: "from-green-500 to-emerald-600",
      bgColor: "bg-green-50/10",
      tasks: getTasksByStatus("DONE"),
      icon: <CheckCircle2 className="w-5 h-5" />,
    },
  ];

  // Gestion du drag & drop
  const handleDragStart = (e: React.DragEvent, tache: TacheResponse) => {
    setDraggedTask(tache);
    e.dataTransfer.effectAllowed = "move";
    e.dataTransfer.setData("text/plain", ""); // Pour la compatibilité

    // Créer un élément de prévisualisation personnalisé
    const dragElement = document.createElement("div");
    dragElement.className =
      "bg-white rounded-xl p-3 shadow-2xl border-2 border-blue-400 max-w-64";
    dragElement.innerHTML = `
      <div class="font-semibold text-gray-800 text-sm">${tache.titre}</div>
      <div class="text-gray-600 text-xs mt-1">${tache.description.slice(
        0,
        50
      )}...</div>
    `;
    dragElement.style.position = "absolute";
    dragElement.style.top = "-1000px";
    document.body.appendChild(dragElement);
    e.dataTransfer.setDragImage(dragElement, 0, 0);

    setTimeout(() => {
      document.body.removeChild(dragElement);
    }, 0);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";

    // Mise à jour de la position de prévisualisation
    setDragPreview({ x: e.clientX, y: e.clientY });
  };

  const handleDragEnter = (columnId: string) => {
    setHoveredColumn(columnId);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    // Vérifier si on quitte vraiment la colonne
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setHoveredColumn(null);
    }
  };

  const handleDrop = (
    e: React.DragEvent,
    newStatut: TacheResponse["statut"]
  ) => {
    e.preventDefault();

    if (draggedTask && draggedTask.statut !== newStatut) {
      onTaskUpdate(draggedTask.id, newStatut);

      // Animation de succès
      const column = e.currentTarget;
      column.classList.add("animate-pulse");
      setTimeout(() => {
        column.classList.remove("animate-pulse");
      }, 500);
    }

    setDraggedTask(null);
    setHoveredColumn(null);
    setDragPreview(null);
  };

  const handleDragEnd = () => {
    setDraggedTask(null);
    setHoveredColumn(null);
    setDragPreview(null);
  };

  // Animations d'entrée pour les tâches
  useEffect(() => {
    const cards = document.querySelectorAll(".task-card");
    cards.forEach((card, index) => {
      (card as HTMLElement).style.animationDelay = `${index * 0.1}s`;
      card.classList.add("animate-slideInUp");
    });
  }, [filteredTasks]);

  return (
    <div ref={boardRef} className="relative">
      {/* Overlay de drag */}
      {draggedTask && (
        <div className="fixed inset-0 z-50 pointer-events-none">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-sm"></div>
          {dragPreview && (
            <div
              className="absolute z-60 transform -translate-x-1/2 -translate-y-1/2 transition-all duration-150"
              style={{ left: dragPreview.x, top: dragPreview.y }}
            >
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-2xl border-2 border-blue-400 max-w-64 transform rotate-3 scale-110">
                <div className="font-semibold text-gray-800 text-sm">
                  {draggedTask.titre}
                </div>
                <div className="text-gray-600 text-xs mt-1">
                  {draggedTask.description.slice(0, 50)}...
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Board Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white mb-2">Tableau Kanban</h2>
          <p className="text-white/70">
            Glissez-déposez vos tâches pour mettre à jour leur statut
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
            <input
              type="text"
              placeholder="Rechercher..."
              className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-10 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all w-64"
            />
          </div>

          <button className="p-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl text-white hover:bg-white/20 transition-all">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Kanban Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {columns.map((column) => (
          <div
            key={column.id}
            className={`
              relative min-h-96 transition-all duration-300 transform
              ${
                column.bgColor
              } backdrop-blur-sm rounded-3xl p-6 border border-white/10
              ${
                hoveredColumn === column.id
                  ? "ring-2 ring-cyan-400/50 scale-102 shadow-2xl"
                  : "hover:scale-101"
              }
              ${draggedTask ? "cursor-copy" : ""}
            `}
            onDragOver={handleDragOver}
            onDragEnter={() => handleDragEnter(column.id)}
            onDragLeave={handleDragLeave}
            onDrop={(e) => handleDrop(e, column.id)}
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div
                  className={`w-10 h-10 rounded-2xl bg-gradient-to-r ${column.color} flex items-center justify-center text-white transform group-hover:rotate-12 transition-transform duration-300`}
                >
                  {column.icon}
                </div>
                <div>
                  <h3 className="font-bold text-white text-lg">
                    {column.title}
                  </h3>
                  <div className="flex items-center space-x-2">
                    <span className="bg-white/20 text-white text-sm px-3 py-1 rounded-full font-medium">
                      {column.tasks.length}
                    </span>
                    {column.id === "DONE" && (
                      <span className="bg-green-500/20 text-green-300 text-xs px-2 py-1 rounded-full">
                        ✨ Bien joué !
                      </span>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => onAddTask?.(column.id)}
                  className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200"
                  title="Ajouter une tâche"
                >
                  <Plus className="w-4 h-4" />
                </button>
                <button className="p-2 rounded-xl bg-white/10 text-white hover:bg-white/20 hover:scale-110 transition-all duration-200">
                  <MoreVertical className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Drop Zone Indicator */}
            {hoveredColumn === column.id && draggedTask && (
              <div className="absolute inset-6 border-3 border-dashed border-cyan-400 rounded-2xl bg-cyan-400/10 flex items-center justify-center z-10">
                <div className="text-cyan-300 font-semibold text-lg animate-pulse">
                  Déposer ici
                </div>
              </div>
            )}

            {/* Tasks */}
            <div className="space-y-4 relative z-20">
              {column.tasks.map((tache, index) => (
                <div
                  key={tache.id}
                  className={`task-card transform transition-all duration-300 ${
                    draggedTask?.id === tache.id
                      ? "opacity-50 scale-95"
                      : "hover:-translate-y-1"
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <TaskCard
                    tache={tache}
                    onEdit={onTaskEdit}
                    onDelete={onTaskDelete}
                    onView={onTaskView}
                    onDragStart={handleDragStart}
                    isDragging={draggedTask?.id === tache.id}
                  />
                </div>
              ))}

              {/* Empty State */}
              {column.tasks.length === 0 && (
                <div
                  className="flex flex-col items-center justify-center h-32 border-2 border-dashed border-white/30 rounded-2xl text-white/40 hover:border-white/50 hover:text-white/60 transition-all group cursor-pointer"
                  onClick={() => onAddTask?.(column.id)}
                >
                  <Plus className="w-8 h-8 mb-2 group-hover:scale-110 transition-transform" />
                  <span className="text-sm font-medium">Ajouter une tâche</span>
                </div>
              )}
            </div>

            {/* Column Stats */}
            <div className="mt-6 pt-4 border-t border-white/20">
              <div className="flex items-center justify-between text-white/60 text-sm">
                <span>Total: {column.tasks.length}</span>
                {column.id === "DONE" && (
                  <span className="text-green-400">
                    🎉 {column.tasks.length} complétées
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Global Stats */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="text-white/60 text-sm">Total des tâches</div>
          <div className="text-2xl font-bold text-white">
            {filteredTasks.length}
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="text-white/60 text-sm">Taux de completion</div>
          <div className="text-2xl font-bold text-white">
            {filteredTasks.length > 0
              ? Math.round(
                  (getTasksByStatus("DONE").length / filteredTasks.length) * 100
                )
              : 0}
            %
          </div>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 border border-white/20">
          <div className="text-white/60 text-sm">En cours</div>
          <div className="text-2xl font-bold text-white">
            {getTasksByStatus("IN_PROGRESS").length}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KanbanBoard;
