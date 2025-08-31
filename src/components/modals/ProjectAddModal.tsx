import React, { useState } from "react";
import { X, FolderPlus } from "lucide-react";

const ProjectAddModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !formData.description.trim()) {
      return;
    }

    setIsSubmitting(true);
    try {
      await onSubmit(formData);
      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
      });
    } catch (error) {
      console.error("Erreur lors de l'ajout du projet:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setFormData({
      title: "",
      description: "",
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={handleClose}
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
              onClick={handleClose}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group border border-white/20 backdrop-blur-sm"
            >
              <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
            </button>

            <div className="flex items-center space-x-3 pr-16">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <FolderPlus className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-2xl font-bold text-white">
                Créer un nouveau projet
              </h2>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-5">
            {/* Title */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Titre du projet <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
                placeholder="Entrez le titre du projet"
                required
                maxLength={100}
              />
              <p className="text-xs text-white/50 mt-1">
                {formData.title.length}/100 caractères
              </p>
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all resize-none"
                placeholder="Décrivez votre projet en détail..."
                rows={5}
                required
                maxLength={500}
              />
              <p className="text-xs text-white/50 mt-1">
                {formData.description.length}/500 caractères
              </p>
            </div>

            {/* Info Box */}
            <div className="bg-cyan-500/10 border border-cyan-500/20 rounded-2xl p-4">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-cyan-500/20 rounded-xl flex items-center justify-center flex-shrink-0 mt-0.5">
                  <FolderPlus className="w-4 h-4 text-cyan-400" />
                </div>
                <div>
                  <h4 className="text-sm font-medium text-cyan-200 mb-1">
                    À propos de votre projet
                  </h4>
                  <p className="text-xs text-cyan-300/80 leading-relaxed">
                    Une fois créé, vous pourrez ajouter des tâches, organiser
                    votre workflow et suivre l'avancement de votre projet.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 flex space-x-4">
            <button
              type="button"
              onClick={handleClose}
              disabled={isSubmitting}
              className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-2xl transition-all border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={
                isSubmitting ||
                !formData.title.trim() ||
                !formData.description.trim()
              }
              className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Création...</span>
                </div>
              ) : (
                "Créer le projet"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectAddModal;
