import React, { useState, useEffect } from "react";
import {
  BarChart3,
  TrendingUp,
  Calendar,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Plus,
  Filter,
  Search,
  Bell,
  Settings,
  Zap,
  Star,
  Target,
  Users,
  Activity,
} from "lucide-react";

// Types
interface DashboardStats {
  totalProjets: number;
  totalTaches: number;
  tachesTerminees: number;
  tachesEnRetard: number;
  progressionMoyenne: number;
  tachesAujourdhui: number;
}

interface RecentActivity {
  id: number;
  type:
    | "task_completed"
    | "task_created"
    | "project_created"
    | "deadline_approaching";
  titre: string;
  description: string;
  timestamp: string;
  projetNom?: string;
}

const Dashboard: React.FC = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalProjets: 8,
    totalTaches: 47,
    tachesTerminees: 28,
    tachesEnRetard: 5,
    progressionMoyenne: 68,
    tachesAujourdhui: 12,
  });

  const [recentActivities] = useState<RecentActivity[]>([
    {
      id: 1,
      type: "task_completed",
      titre: "Design UI/UX terminé",
      description: "La conception de l'interface utilisateur a été finalisée",
      timestamp: "2025-01-15T10:30:00",
      projetNom: "Application Mobile",
    },
    {
      id: 2,
      type: "deadline_approaching",
      titre: "Échéance proche",
      description: 'La tâche "Tests unitaires" arrive à échéance demain',
      timestamp: "2025-01-15T09:15:00",
      projetNom: "API Backend",
    },
    {
      id: 3,
      type: "task_created",
      titre: "Nouvelle tâche créée",
      description: "Documentation API ajoutée au projet",
      timestamp: "2025-01-15T08:45:00",
      projetNom: "API Backend",
    },
  ]);

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "task_completed":
        return <CheckCircle2 className="w-5 h-5 text-green-500" />;
      case "task_created":
        return <Plus className="w-5 h-5 text-blue-500" />;
      case "project_created":
        return <Star className="w-5 h-5 text-purple-500" />;
      case "deadline_approaching":
        return <AlertTriangle className="w-5 h-5 text-orange-500" />;
      default:
        return <Activity className="w-5 h-5 text-gray-500" />;
    }
  };

  const getActivityColor = (type: string) => {
    switch (type) {
      case "task_completed":
        return "from-green-500 to-emerald-600";
      case "task_created":
        return "from-blue-500 to-indigo-600";
      case "project_created":
        return "from-purple-500 to-violet-600";
      case "deadline_approaching":
        return "from-orange-500 to-red-500";
      default:
        return "from-gray-500 to-slate-600";
    }
  };

  if (!mounted) return null;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/20 via-purple-900/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(30)].map((_, i) => (
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

      {/* Header */}
      {/* <div className="relative z-10 backdrop-blur-xl bg-white/10 border-b border-white/20">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent">
                Tableau de Bord
              </h1>
              <p className="text-white/70 text-lg mt-2">
                Bonjour ! Voici un aperçu de vos projets aujourd'hui
              </p>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all">
                <Bell className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold text-white">
                  3
                </div>
              </button>

              <button className="p-3 rounded-2xl bg-white/10 text-white hover:bg-white/20 transition-all">
                <Settings className="w-6 h-6" />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center">
                <span className="text-white font-bold text-lg">JD</span>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Projets */}
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <Target className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  {stats.totalProjets}
                </div>
                <div className="text-white/60 text-sm">Projets actifs</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>+12% ce mois</span>
            </div>
          </div>

          {/* Total Tâches */}
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-purple-500 to-violet-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <Activity className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  {stats.totalTaches}
                </div>
                <div className="text-white/60 text-sm">Tâches totales</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-blue-400 text-sm">
              <Clock className="w-4 h-4" />
              <span>{stats.tachesAujourdhui} aujourd'hui</span>
            </div>
          </div>

          {/* Tâches Terminées */}
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <CheckCircle2 className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  {stats.tachesTerminees}
                </div>
                <div className="text-white/60 text-sm">Terminées</div>
              </div>
            </div>
            <div className="flex items-center space-x-2 text-green-400 text-sm">
              <TrendingUp className="w-4 h-4" />
              <span>
                {Math.round((stats.tachesTerminees / stats.totalTaches) * 100)}%
                du total
              </span>
            </div>
          </div>

          {/* Progression Moyenne */}
          <div className="group relative bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between mb-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 flex items-center justify-center transform group-hover:rotate-12 transition-transform duration-300">
                <BarChart3 className="w-7 h-7 text-white" />
              </div>
              <div className="text-right">
                <div className="text-3xl font-bold text-white">
                  {stats.progressionMoyenne}%
                </div>
                <div className="text-white/60 text-sm">Progression</div>
              </div>
            </div>
            <div className="w-full bg-white/20 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-orange-400 to-red-400 h-2 rounded-full transition-all duration-1000"
                style={{ width: `${stats.progressionMoyenne}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Activité Récente */}
          <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-white flex items-center">
                <Zap className="w-6 h-6 mr-3 text-yellow-400" />
                Activité Récente
              </h2>
              <button className="text-white/60 hover:text-white transition-colors">
                <Filter className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div
                  key={activity.id}
                  className="group flex items-start space-x-4 p-4 rounded-2xl bg-white/5 hover:bg-white/10 transition-all duration-300 transform hover:scale-102"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${getActivityColor(
                      activity.type
                    )} flex items-center justify-center flex-shrink-0`}
                  >
                    {getActivityIcon(activity.type)}
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white group-hover:text-blue-200 transition-colors">
                        {activity.titre}
                      </h3>
                      <span className="text-white/50 text-sm">
                        {new Date(activity.timestamp).toLocaleTimeString(
                          "fr-FR",
                          {
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                    <p className="text-white/70 text-sm mb-2">
                      {activity.description}
                    </p>
                    {activity.projetNom && (
                      <span className="inline-block px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full">
                        {activity.projetNom}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 p-3 border-2 border-dashed border-white/30 rounded-2xl text-white/60 hover:text-white hover:border-white/50 transition-all">
              Voir toute l'activité
            </button>
          </div>

          {/* Quick Actions & Calendar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Plus className="w-5 h-5 mr-2" />
                Actions Rapides
              </h3>

              <div className="space-y-3">
                <button className="w-full p-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl font-medium transition-all transform hover:scale-105 flex items-center">
                  <Plus className="w-5 h-5 mr-3" />
                  Nouvelle Tâche
                </button>

                <button className="w-full p-4 bg-gradient-to-r from-purple-500 to-violet-600 hover:from-purple-600 hover:to-violet-700 text-white rounded-2xl font-medium transition-all transform hover:scale-105 flex items-center">
                  <Star className="w-5 h-5 mr-3" />
                  Nouveau Projet
                </button>

                <button className="w-full p-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white rounded-2xl font-medium transition-all transform hover:scale-105 flex items-center">
                  <Users className="w-5 h-5 mr-3" />
                  Inviter Équipe
                </button>
              </div>
            </div>

            {/* Mini Calendar */}
            <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                Aujourd'hui
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl">
                  <span className="text-white/80">Lundi 11 Août</span>
                  <span className="text-blue-400 font-semibold">
                    {stats.tachesAujourdhui} tâches
                  </span>
                </div>

                <div className="text-white/60 text-sm">
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <span>9:00 - Réunion équipe</span>
                  </div>
                  <div className="flex items-center space-x-2 mb-2">
                    <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                    <span>14:00 - Review de code</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>16:30 - Demo client</span>
                  </div>
                </div>

                <button className="w-full mt-4 p-2 border border-white/30 rounded-xl text-white/60 hover:text-white hover:border-white/50 transition-all text-sm">
                  Voir le calendrier complet
                </button>
              </div>
            </div>

            {/* Alerts */}
            <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 backdrop-blur-xl rounded-3xl p-6 border border-orange-500/20">
              <h3 className="text-xl font-bold text-white mb-4 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 text-orange-400" />
                Alertes
              </h3>

              <div className="space-y-3">
                <div className="flex items-start space-x-3 p-3 bg-red-500/10 rounded-xl border border-red-500/20">
                  <div className="w-2 h-2 bg-red-400 rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <div className="text-white font-medium text-sm">
                      5 tâches en retard
                    </div>
                    <div className="text-white/60 text-xs">
                      Nécessitent une attention immédiate
                    </div>
                  </div>
                </div>

                <div className="flex items-start space-x-3 p-3 bg-yellow-500/10 rounded-xl border border-yellow-500/20">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 animate-pulse"></div>
                  <div>
                    <div className="text-white font-medium text-sm">
                      3 échéances cette semaine
                    </div>
                    <div className="text-white/60 text-xs">
                      Planifiez votre temps
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-8">
          {/* Progress Chart */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Progression des Projets
            </h3>

            <div className="space-y-4">
              {[
                {
                  nom: "Application Mobile",
                  progression: 85,
                  couleur: "from-blue-500 to-indigo-600",
                },
                {
                  nom: "API Backend",
                  progression: 72,
                  couleur: "from-green-500 to-emerald-600",
                },
                {
                  nom: "Marketing Digital",
                  progression: 45,
                  couleur: "from-purple-500 to-violet-600",
                },
                {
                  nom: "Site Web",
                  progression: 30,
                  couleur: "from-orange-500 to-red-500",
                },
              ].map((projet, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-white font-medium">{projet.nom}</span>
                    <span className="text-white/60">{projet.progression}%</span>
                  </div>
                  <div className="w-full bg-white/20 rounded-full h-3">
                    <div
                      className={`bg-gradient-to-r ${projet.couleur} h-3 rounded-full transition-all duration-1000 relative overflow-hidden`}
                      style={{
                        width: `${projet.progression}%`,
                        animationDelay: `${index * 0.2}s`,
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Team Performance */}
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-6 border border-white/20">
            <h3 className="text-xl font-bold text-white mb-6 flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Performance Équipe
            </h3>

            <div className="grid grid-cols-2 gap-4">
              {[
                {
                  nom: "Marie D.",
                  avatar: "MD",
                  taches: 12,
                  couleur: "from-pink-500 to-rose-600",
                },
                {
                  nom: "Jean P.",
                  avatar: "JP",
                  taches: 8,
                  couleur: "from-blue-500 to-indigo-600",
                },
                {
                  nom: "Sarah L.",
                  avatar: "SL",
                  taches: 15,
                  couleur: "from-green-500 to-emerald-600",
                },
                {
                  nom: "Tom R.",
                  avatar: "TR",
                  taches: 6,
                  couleur: "from-purple-500 to-violet-600",
                },
              ].map((membre, index) => (
                <div
                  key={index}
                  className="p-4 bg-white/5 rounded-2xl text-center transform hover:scale-105 transition-all duration-300"
                >
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${membre.couleur} flex items-center justify-center text-white font-bold mx-auto mb-2`}
                  >
                    {membre.avatar}
                  </div>
                  <div className="text-white font-medium text-sm">
                    {membre.nom}
                  </div>
                  <div className="text-white/60 text-xs">
                    {membre.taches} tâches
                  </div>
                  <div className="mt-2 w-full bg-white/20 rounded-full h-1">
                    <div
                      className={`bg-gradient-to-r ${membre.couleur} h-1 rounded-full`}
                      style={{ width: `${(membre.taches / 15) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
