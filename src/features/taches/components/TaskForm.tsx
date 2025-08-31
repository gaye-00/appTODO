import React, { useState, useEffect } from "react";
import {
  X,
  Save,
  Calendar,
  Flag,
  FileText,
  Tag,
  Clock,
  AlertCircle,
  Sparkles,
} from "lucide-react";
import type { TacheRequest } from "../../../services/types/models/TacheRequest";
import type { TacheResponse } from "../../../services/types/models/TacheResponse";
import { ETAT } from "../../../services/types/enum/ETAT";
import { PRIORITY } from "../../../services/types/enum/PRIORITY";

interface TaskFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (tache: TacheRequest) => Promise<void>;
  editingTask?: TacheResponse | null;
  projetId: number;
}

const TaskForm: React.FC<TaskFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingTask,
  projetId,
}) => {
  const [formData, setFormData] = useState<TacheRequest>({
    title: "", // Titre de la tâche
    description: "", // Description de la tâche
    etat: ETAT.EN_ATTENTE,
    priority: PRIORITY.MOYENNE,
    dueDate: "",
    projetId: projetId,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  // Reset form when modal opens/closes or editing task changes
  useEffect(() => {
    if (isOpen) {
      if (editingTask) {
        setFormData({
          title: editingTask.title,
          description: editingTask.description,
          etat: editingTask.etat,
          priority: editingTask.priority,
          dueDate: editingTask.dueDate ? editingTask.dueDate.split("T")[0] : "",
          projetId: editingTask.projetId,
        });
      } else {
        setFormData({
          title: "",
          description: "",
          etat: ETAT.EN_ATTENTE,
          priority: PRIORITY.MOYENNE,
          dueDate: "",
          projetId: projetId,
        });
      }
      setErrors({});
      setIsSubmitting(false);
    }
  }, [isOpen, editingTask, projetId]);

  const handleInputChange = (field: keyof TacheRequest, value: string) => {
    let processedValue = value;

    // Si c'est le champ dueDate, convertir la date en LocalDateTime
    if (field === "dueDate" && value) {
      // Ajouter l'heure par défaut (00:00:00) pour créer un LocalDateTime valide
      processedValue = `${value}T00:00:00`;
    }

    setFormData((prev) => ({ ...prev, [field]: processedValue }));
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) {
      newErrors.title = "Le titre est obligatoire";
    } else if (formData.title.length < 3) {
      newErrors.title = "Le titre doit contenir au moins 3 caractères";
    }

    if (!formData.description.trim()) {
      newErrors.description = "La description est obligatoire";
    } else if (formData.description.length < 10) {
      newErrors.description =
        "La description doit contenir au moins 10 caractères";
    }

    if (formData.dueDate) {
      const today = new Date();
      today.setHours(0, 0, 0, 0); // Reset time to start of day for comparison
      const echeance = new Date(formData.dueDate.split("T")[0]);
      if (echeance < today) {
        newErrors.dueDate = "La date d'échéance ne peut pas être dans le passé";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await onSubmit(formData);
      onClose();
    } catch (error) {
      console.error("Erreur lors de la soumission:", error);
      setErrors({
        submit: "Erreur lors de la sauvegarde. Veuillez réessayer.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const getPriorityConfig = (priority: string) => {
    switch (priority) {
      case PRIORITY.URGENTE:
        return {
          color: "from-red-600 to-red-700",
          label: "Urgente",
          icon: "🚨",
        };
      case PRIORITY.HAUTE:
        return {
          color: "from-red-500 to-pink-500",
          label: "Haute",
          icon: "🔥",
        };
      case PRIORITY.MOYENNE:
        return {
          color: "from-yellow-500 to-orange-500",
          label: "Moyenne",
          icon: "⚡",
        };
      case PRIORITY.BASSE:
        return {
          color: "from-green-500 to-teal-500",
          label: "Basse",
          icon: "🌱",
        };
      default:
        return {
          color: "from-gray-500 to-gray-600",
          label: "Moyenne",
          icon: "📝",
        };
    }
  };

  const getStatusConfig = (status: string) => {
    switch (status) {
      case ETAT.EN_ATTENTE:
        return {
          color: "from-slate-500 to-slate-600",
          label: "En Attente",
          icon: <Clock className="w-4 h-4" />,
        };
      case ETAT.EN_COURS:
        return {
          color: "from-blue-500 to-indigo-600",
          label: "En Cours",
          icon: <AlertCircle className="w-4 h-4" />,
        };
      case ETAT.TERMINEE:
        return {
          color: "from-green-500 to-emerald-600",
          label: "Terminée",
          icon: <Sparkles className="w-4 h-4" />,
        };
      case ETAT.ANNULEE:
        return {
          color: "from-red-500 to-red-600",
          label: "Annulée",
          icon: <X className="w-4 h-4" />,
        };
      default:
        return {
          color: "from-gray-500 to-gray-600",
          label: "En Attente",
          icon: <Clock className="w-4 h-4" />,
        };
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-3xl bg-white shadow-2xl transition-all">
          {/* Header */}
          <div className="relative bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 px-8 py-6">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-sm"></div>
            <div className="relative flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-white">
                  {editingTask ? "Modifier la tâche" : "Nouvelle tâche"}
                </h3>
                <p className="text-white/80 mt-1">
                  {editingTask
                    ? "Mettez à jour les informations"
                    : "Créez une nouvelle tâche pour votre projet"}
                </p>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-2xl bg-white/20 text-white hover:bg-white/30 transition-all duration-200 hover:scale-110"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Title Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                Titre de la tâche *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange("title", e.target.value)}
                className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-200 focus:outline-none ${
                  errors.title
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-blue-500 bg-gray-50"
                } hover:border-gray-300`}
                placeholder="Ex: Implémenter l'authentification utilisateur"
              />
              {errors.title && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.title}
                </p>
              )}
            </div>

            {/* Description Field */}
            <div className="space-y-2">
              <label className="flex items-center text-sm font-semibold text-gray-700">
                <Tag className="w-4 h-4 mr-2 text-purple-500" />
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  handleInputChange("description", e.target.value)
                }
                rows={4}
                className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-200 focus:outline-none resize-none ${
                  errors.description
                    ? "border-red-300 focus:border-red-500 bg-red-50"
                    : "border-gray-200 focus:border-blue-500 bg-gray-50"
                } hover:border-gray-300`}
                placeholder="Décrivez en détail ce qui doit être fait..."
              />
              {errors.description && (
                <p className="text-red-500 text-sm flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  {errors.description}
                </p>
              )}
            </div>

            {/* Priority and Status Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Priority */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <Flag className="w-4 h-4 mr-2 text-orange-500" />
                  Priorité
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    PRIORITY.BASSE,
                    PRIORITY.MOYENNE,
                    PRIORITY.HAUTE,
                    PRIORITY.URGENTE,
                  ].map((priority) => {
                    const config = getPriorityConfig(priority);
                    return (
                      <button
                        key={priority}
                        type="button"
                        onClick={() => handleInputChange("priority", priority)}
                        className={`p-3 rounded-2xl border-2 transition-all duration-200 transform hover:scale-105 ${
                          formData.priority === priority
                            ? `bg-gradient-to-r ${config.color} text-white border-transparent shadow-lg`
                            : "border-gray-200 hover:border-gray-300 bg-white"
                        }`}
                      >
                        <div className="text-center">
                          <div className="text-lg mb-1">{config.icon}</div>
                          <div className="text-xs font-medium">
                            {config.label}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <label className="flex items-center text-sm font-semibold text-gray-700">
                  <AlertCircle className="w-4 h-4 mr-2 text-blue-500" />
                  État
                </label>
                <div className="space-y-2">
                  {[
                    ETAT.EN_ATTENTE,
                    ETAT.EN_COURS,
                    ETAT.TERMINEE,
                    ETAT.ANNULEE,
                  ].map((etat) => {
                    const config = getStatusConfig(etat);
                    return (
                      <button
                        key={etat}
                        type="button"
                        onClick={() => handleInputChange("etat", etat)}
                        className={`w-full p-3 rounded-2xl border-2 transition-all duration-200 flex items-center space-x-3 ${
                          formData.etat === etat
                            ? `bg-gradient-to-r ${config.color} text-white border-transparent shadow-lg`
                            : "border-gray-200 hover:border-gray-300 bg-white hover:bg-gray-50"
                        }`}
                      >
                        {config.icon}
                        <span className="font-medium">{config.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Advanced Options Toggle */}
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 font-medium transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              <span>
                {showAdvanced ? "Masquer" : "Afficher"} les options avancées
              </span>
            </button>

            {/* Advanced Options */}
            {showAdvanced && (
              <div className="space-y-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl border border-blue-100">
                {/* Due Date */}
                <div className="space-y-2">
                  <label className="flex items-center text-sm font-semibold text-gray-700">
                    <Calendar className="w-4 h-4 mr-2 text-green-500" />
                    Date d'échéance
                  </label>
                  <input
                    type="date"
                    value={
                      formData.dueDate ? formData.dueDate.split("T")[0] : ""
                    }
                    onChange={(e) =>
                      handleInputChange("dueDate", e.target.value)
                    }
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-3 rounded-2xl border-2 transition-all duration-200 focus:outline-none ${
                      errors.dueDate
                        ? "border-red-300 focus:border-red-500 bg-red-50"
                        : "border-gray-200 focus:border-blue-500 bg-white"
                    } hover:border-gray-300`}
                  />
                  {errors.dueDate && (
                    <p className="text-red-500 text-sm flex items-center">
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.dueDate}
                    </p>
                  )}
                </div>

                {/* Estimated Time */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <Clock className="w-4 h-4 mr-2 text-blue-500" />
                      Temps estimé
                    </label>
                    <select className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 bg-white focus:outline-none transition-all duration-200">
                      <option value="">Sélectionner...</option>
                      <option value="1h">1 heure</option>
                      <option value="2h">2 heures</option>
                      <option value="4h">4 heures</option>
                      <option value="1d">1 jour</option>
                      <option value="3d">3 jours</option>
                      <option value="1w">1 semaine</option>
                    </select>
                  </div>

                  <div className="space-y-2">
                    <label className="flex items-center text-sm font-semibold text-gray-700">
                      <Tag className="w-4 h-4 mr-2 text-purple-500" />
                      Étiquettes
                    </label>
                    <input
                      type="text"
                      placeholder="frontend, urgent, bug..."
                      className="w-full px-4 py-3 rounded-2xl border-2 border-gray-200 focus:border-blue-500 bg-white focus:outline-none transition-all duration-200"
                    />
                  </div>
                </div>
              </div>
            )}

            {/* Submit Error */}
            {errors.submit && (
              <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                <p className="text-red-600 flex items-center">
                  <AlertCircle className="w-5 h-5 mr-2" />
                  {errors.submit}
                </p>
              </div>
            )}

            {/* Form Actions */}
            <div className="flex items-center justify-end space-x-4 pt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 rounded-2xl border-2 border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-all duration-200"
              >
                Annuler
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-3 rounded-2xl font-medium transition-all duration-200 flex items-center space-x-2 ${
                  isSubmitting
                    ? "bg-gray-400 text-white cursor-not-allowed"
                    : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transform hover:scale-105"
                }`}
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Sauvegarde...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    <span>
                      {editingTask ? "Mettre à jour" : "Créer la tâche"}
                    </span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TaskForm;
