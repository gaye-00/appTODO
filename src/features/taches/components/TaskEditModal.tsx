// import React, { useState, useEffect } from "react";
// import { X, Edit3 } from "lucide-react";

// interface TaskEditModalProps {
//   task: {
//     id: number;
//     title: string;
//     description: string;
//     priority: "BASSE" | "MOYENNE" | "HAUTE" | "URGENTE";
//     etat: "EN_ATTENTE" | "EN_COURS" | "TERMINEE";
//     dueDate?: string;
//   } | null;
//   isOpen: boolean;
//   onClose: () => void;
//   onSubmit: (formData: any) => void;
// }

// export const TaskEditModal: React.FC<TaskEditModalProps> = ({
//   task,
//   isOpen,
//   onClose,
//   onSubmit,
// }) => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     priority: "MOYENNE",
//     etat: "EN_ATTENTE",
//     dueDate: "",
//   });

//   useEffect(() => {
//     if (task) {
//       setFormData({
//         title: task.title,
//         description: task.description,
//         priority: task.priority,
//         etat: task.etat,
//         dueDate: task.dueDate || "",
//       });
//     }
//   }, [task]);

//   if (!isOpen) return null;

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     onSubmit(formData);
//   };

//   return (
//     <div
//       className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
//       onClick={onClose}
//     >
//       <div
//         className="bg-gradient-to-br from-purple-900/90 via-blue-900/90 to-indigo-900/90 backdrop-blur-xl rounded-3xl max-w-2xl w-full shadow-2xl border border-white/20 transform transition-all animate-in fade-in zoom-in duration-300"
//         onClick={(e) => e.stopPropagation()}
//       >
//         <form onSubmit={handleSubmit}>
//           {/* Header */}
//           <div className="relative p-6 border-b border-white/10">
//             <button
//               type="button"
//               onClick={onClose}
//               className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group"
//             >
//               <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
//             </button>

//             <div className="flex items-center space-x-3">
//               <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
//                 <Edit3 className="w-6 h-6 text-white" />
//               </div>
//               <h2 className="text-2xl font-bold text-white">
//                 Modifier la tâche
//               </h2>
//             </div>
//           </div>

//           {/* Content */}
//           <div className="p-6 space-y-5">
//             {/* Title */}
//             <div>
//               <label className="block text-sm font-medium text-white/80 mb-2">
//                 Titre
//               </label>
//               <input
//                 type="text"
//                 value={formData.title}
//                 onChange={(e) =>
//                   setFormData({ ...formData, title: e.target.value })
//                 }
//                 className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
//                 placeholder="Entrez le titre de la tâche"
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div>
//               <label className="block text-sm font-medium text-white/80 mb-2">
//                 Description
//               </label>
//               <textarea
//                 value={formData.description}
//                 onChange={(e) =>
//                   setFormData({ ...formData, description: e.target.value })
//                 }
//                 className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all resize-none"
//                 placeholder="Décrivez la tâche..."
//                 rows={4}
//                 required
//               />
//             </div>

//             {/* Priority and Status */}
//             <div className="grid grid-cols-2 gap-4">
//               <div>
//                 <label className="block text-sm font-medium text-white/80 mb-2">
//                   Priorité
//                 </label>
//                 <select
//                   value={formData.priority}
//                   onChange={(e) =>
//                     setFormData({ ...formData, priority: e.target.value })
//                   }
//                   className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
//                 >
//                   <option value="BASSE" className="bg-gray-800">
//                     Basse
//                   </option>
//                   <option value="MOYENNE" className="bg-gray-800">
//                     Moyenne
//                   </option>
//                   <option value="HAUTE" className="bg-gray-800">
//                     Haute
//                   </option>
//                   <option value="URGENTE" className="bg-gray-800">
//                     Urgente
//                   </option>
//                 </select>
//               </div>

//               <div>
//                 <label className="block text-sm font-medium text-white/80 mb-2">
//                   Statut
//                 </label>
//                 <select
//                   value={formData.etat}
//                   onChange={(e) =>
//                     setFormData({ ...formData, etat: e.target.value })
//                   }
//                   className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
//                 >
//                   <option value="EN_ATTENTE" className="bg-gray-800">
//                     En attente
//                   </option>
//                   <option value="EN_COURS" className="bg-gray-800">
//                     En cours
//                   </option>
//                   <option value="TERMINEE" className="bg-gray-800">
//                     Terminée
//                   </option>
//                 </select>
//               </div>
//             </div>

//             {/* Due Date */}
//             <div>
//               <label className="block text-sm font-medium text-white/80 mb-2">
//                 Date d'échéance
//               </label>
//               <input
//                 type="date"
//                 value={formData.dueDate}
//                 onChange={(e) =>
//                   setFormData({ ...formData, dueDate: e.target.value })
//                 }
//                 className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all"
//               />
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="p-6 border-t border-white/10 flex space-x-4">
//             <button
//               type="button"
//               onClick={onClose}
//               className="flex-1 bg-white/10 hover:bg-white/20 text-white font-semibold py-3 px-6 rounded-2xl transition-all border border-white/20"
//             >
//               Annuler
//             </button>
//             <button
//               type="submit"
//               className="flex-1 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
//             >
//               Enregistrer
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

import React, { useState, useEffect } from "react";
import { X, Edit3 } from "lucide-react";

interface TaskEditModalProps {
  task: {
    id: number;
    title: string;
    description: string;
    priority: "BASSE" | "MOYENNE" | "HAUTE" | "URGENTE";
    etat: "EN_ATTENTE" | "EN_COURS" | "TERMINEE";
    dueDate?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: {
    title: string;
    description: string;
    priority: string;
    etat: string;
    dueDate: string;
  }) => void;
}

export const TaskEditModal: React.FC<TaskEditModalProps> = ({
  task,
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "MOYENNE",
    etat: "EN_ATTENTE",
    dueDate: "",
  });

  const [errors, setErrors] = useState({
    title: "",
    description: "",
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
      setErrors({ title: "", description: "" });
    }
  }, [task]);

  if (!isOpen || !task) return null;

  const validateForm = () => {
    let isValid = true;
    const newErrors = { title: "", description: "" };

    if (!formData.title.trim()) {
      newErrors.title = "Le titre est requis";
      isValid = false;
    }

    if (!formData.description.trim()) {
      newErrors.description = "La description est requise";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  const handleClose = () => {
    setErrors({ title: "", description: "" });
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
                Titre <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => {
                  setFormData({ ...formData, title: e.target.value });
                  if (errors.title) setErrors({ ...errors, title: "" });
                }}
                className={`w-full bg-white/10 backdrop-blur-sm border ${
                  errors.title ? "border-red-500" : "border-white/20"
                } rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 ${
                  errors.title
                    ? "focus:ring-red-500/50"
                    : "focus:ring-cyan-400/50"
                } transition-all`}
                placeholder="Entrez le titre de la tâche"
              />
              {errors.title && (
                <p className="mt-1 text-sm text-red-400">{errors.title}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="block text-sm font-medium text-white/80 mb-2">
                Description <span className="text-red-400">*</span>
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => {
                  setFormData({ ...formData, description: e.target.value });
                  if (errors.description)
                    setErrors({ ...errors, description: "" });
                }}
                className={`w-full bg-white/10 backdrop-blur-sm border ${
                  errors.description ? "border-red-500" : "border-white/20"
                } rounded-2xl px-4 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 ${
                  errors.description
                    ? "focus:ring-red-500/50"
                    : "focus:ring-cyan-400/50"
                } transition-all resize-none`}
                placeholder="Décrivez la tâche..."
                rows={4}
              />
              {errors.description && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.description}
                </p>
              )}
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
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.5em",
                  }}
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
                  className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-cyan-400/50 transition-all appearance-none cursor-pointer"
                  style={{
                    backgroundImage: `url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e")`,
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "right 1rem center",
                    backgroundSize: "1.5em",
                  }}
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
                style={{
                  colorScheme: "dark",
                }}
              />
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-white/10 flex space-x-4">
            <button
              type="button"
              onClick={handleClose}
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

export default TaskEditModal;
