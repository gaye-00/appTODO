// import React from "react";
// import {
//   AlertCircle,
//   X,
//   FileText,
//   Calendar,
//   AlertTriangle,
// } from "lucide-react";

// interface TaskViewModalProps {
//   task: {
//     id: number;
//     title: string;
//     description: string;
//     etat: "EN_ATTENTE" | "EN_COURS" | "TERMINEE";
//     priority: "BASSE" | "MOYENNE" | "HAUTE" | "URGENTE";
//     createdAt: string;
//     dueDate?: string;
//   } | null;
//   isOpen: boolean;
//   onClose: () => void;
// }

// export const TaskViewModal: React.FC<TaskViewModalProps> = ({
//   task,
//   isOpen,
//   onClose,
// }) => {
//   if (!isOpen || !task) return null;

//   const getPriorityColor = (priority: string) => {
//     switch (priority) {
//       case "URGENTE":
//         return "from-red-500 to-red-600";
//       case "HAUTE":
//         return "from-orange-500 to-orange-600";
//       case "MOYENNE":
//         return "from-yellow-500 to-yellow-600";
//       case "BASSE":
//         return "from-green-500 to-green-600";
//       default:
//         return "from-gray-500 to-gray-600";
//     }
//   };

//   const getStatusColor = (etat: string) => {
//     switch (etat) {
//       case "EN_ATTENTE":
//         return "from-slate-500 to-slate-600";
//       case "EN_COURS":
//         return "from-blue-500 to-indigo-600";
//       case "TERMINEE":
//         return "from-green-500 to-emerald-600";
//       default:
//         return "from-gray-500 to-gray-600";
//     }
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
//         {/* Header */}
//         <div className="relative p-6 border-b border-white/10">
//           <button
//             onClick={onClose}
//             className="absolute top-6 right-6 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-all group"
//           >
//             <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
//           </button>

//           <div className="flex items-start space-x-4">
//             <div
//               className={`w-14 h-14 rounded-2xl bg-gradient-to-r ${getPriorityColor(
//                 task.priority
//               )} flex items-center justify-center shadow-lg`}
//             >
//               <AlertCircle className="w-7 h-7 text-white" />
//             </div>
//             <div className="flex-1">
//               <h2 className="text-2xl font-bold text-white">{task.title}</h2>
//               <span
//                 className={`text-sm bg-gradient-to-r ${getStatusColor(
//                   task.etat
//                 )} text-white px-3 py-1 rounded-full inline-block mt-2`}
//               >
//                 {task.etat}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 space-y-6">
//           {/* Description */}
//           <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
//             <div className="flex items-center mb-3">
//               <FileText className="w-5 h-5 text-cyan-400 mr-2" />
//               <h3 className="text-lg font-semibold text-white">Description</h3>
//             </div>
//             <p className="text-white/80 leading-relaxed">
//               {task.description || "Aucune description disponible"}
//             </p>
//           </div>

//           {/* Dates */}
//           <div className="grid grid-cols-2 gap-4">
//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
//               <div className="flex items-center mb-2">
//                 <Calendar className="w-5 h-5 text-green-400 mr-2" />
//                 <h4 className="text-white font-medium">Créée le</h4>
//               </div>
//               <p className="text-white font-semibold">
//                 {new Date(task.createdAt).toLocaleDateString("fr-FR")}
//               </p>
//             </div>

//             <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
//               <div className="flex items-center mb-2">
//                 <AlertTriangle className="w-5 h-5 text-orange-400 mr-2" />
//                 <h4 className="text-white font-medium">Échéance</h4>
//               </div>
//               <p className="text-white font-semibold">
//                 {task.dueDate
//                   ? new Date(task.dueDate).toLocaleDateString("fr-FR")
//                   : "Non définie"}
//               </p>
//             </div>
//           </div>

//           {/* Progress indicator */}
//           <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
//             <h4 className="text-sm font-medium text-white/70 mb-3">
//               Progression
//             </h4>
//             <div className="flex items-center justify-between">
//               <div className="flex space-x-2">
//                 <div
//                   className={`w-3 h-3 rounded-full ${
//                     task.etat === "EN_ATTENTE" ||
//                     task.etat === "EN_COURS" ||
//                     task.etat === "TERMINEE"
//                       ? "bg-green-500"
//                       : "bg-gray-500"
//                   }`}
//                 />
//                 <div
//                   className={`w-3 h-3 rounded-full ${
//                     task.etat === "EN_COURS" || task.etat === "TERMINEE"
//                       ? "bg-green-500"
//                       : "bg-gray-500"
//                   }`}
//                 />
//                 <div
//                   className={`w-3 h-3 rounded-full ${
//                     task.etat === "TERMINEE" ? "bg-green-500" : "bg-gray-500"
//                   }`}
//                 />
//               </div>
//               <span className="text-white/70 text-sm">
//                 {task.etat === "TERMINEE"
//                   ? "Terminée"
//                   : task.etat === "EN_COURS"
//                   ? "En cours"
//                   : "En attente"}
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="p-6 border-t border-white/10">
//           <button
//             onClick={onClose}
//             className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold py-3 px-6 rounded-2xl transition-all transform hover:scale-105 shadow-lg"
//           >
//             Fermer
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

import React from "react";
import {
  CheckCircle2,
  Clock,
  AlertCircle,
  X,
  FileText,
  Calendar,
  AlertTriangle,
  Tag,
} from "lucide-react";

interface TaskViewModalProps {
  task: {
    id: number;
    title: string;
    description: string;
    etat: "EN_ATTENTE" | "EN_COURS" | "TERMINEE";
    priority: "BASSE" | "MOYENNE" | "HAUTE" | "URGENTE";
    createdAt: string;
    dueDate?: string;
  } | null;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskViewModal: React.FC<TaskViewModalProps> = ({
  task,
  isOpen,
  onClose,
}) => {
  if (!isOpen || !task) return null;

  const getPriorityColor = (priority: string) => {
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

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case "URGENTE":
        return "Urgente";
      case "HAUTE":
        return "Haute";
      case "MOYENNE":
        return "Moyenne";
      case "BASSE":
        return "Basse";
      default:
        return priority;
    }
  };

  const getStatusColor = (etat: string) => {
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

  const getStatusIcon = (etat: string) => {
    switch (etat) {
      case "EN_ATTENTE":
        return <Clock className="w-3 h-3 mr-1" />;
      case "EN_COURS":
        return <AlertCircle className="w-3 h-3 mr-1" />;
      case "TERMINEE":
        return <CheckCircle2 className="w-3 h-3 mr-1" />;
      default:
        return null;
    }
  };

  const getStatusLabel = (etat: string) => {
    switch (etat) {
      case "EN_ATTENTE":
        return "En attente";
      case "EN_COURS":
        return "En cours";
      case "TERMINEE":
        return "Terminée";
      default:
        return etat;
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
        <div className="relative p-6 border-b border-white/10">
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
                  {getStatusIcon(task.etat)}
                  {getStatusLabel(task.etat)}
                </span>
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPriorityColor(
                    task.priority
                  )} text-white shadow-md`}
                >
                  <Tag className="w-3 h-3 mr-1" />
                  Priorité {getPriorityLabel(task.priority)}
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
                {task.etat === "EN_ATTENTE" && "0% - En attente"}
                {task.etat === "EN_COURS" && "50% - En cours"}
                {task.etat === "TERMINEE" && "100% - Terminée"}
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

export default TaskViewModal;
