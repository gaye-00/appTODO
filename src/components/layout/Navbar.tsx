import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/hooks/useAuth";
import "../../components/layout/style/Navbar.css";
import {
  Home,
  BarChart3,
  FolderOpen,
  CheckSquare,
  User,
  Settings,
  Bell,
  Search,
  Menu,
  X,
  Zap,
  Star,
  ChevronDown,
  LogOut,
  Moon,
  Sun,
  Globe,
  Shield,
  UserPlus,
  Loader2,
} from "lucide-react";

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const { isAuthenticated, user, logout, isLoading } = useAuth();

  // Pour debug - à retirer après
  useEffect(() => {
    console.log("Auth state:", { isAuthenticated, user, isLoading });
  }, [isAuthenticated, user, isLoading]);

  // Détecter le scroll pour les effets
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Navigation items (filtrer selon l'authentification)
  const publicNavItems = [
    {
      name: "Accueil",
      path: "/",
      icon: <Home className="w-4 h-4" />,
      color: "from-blue-500 to-cyan-500",
    },
  ];

  const privateNavItems = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <BarChart3 className="w-4 h-4" />,
      color: "from-purple-500 to-violet-500",
    },
    {
      name: "Projets",
      path: "/projects",
      icon: <FolderOpen className="w-4 h-4" />,
      color: "from-green-500 to-emerald-500",
    },
    {
      name: "Tâches",
      path: "/tasks",
      icon: <CheckSquare className="w-4 h-4" />,
      color: "from-orange-500 to-red-500",
    },
  ];

  const navItems = isAuthenticated
    ? [...publicNavItems, ...privateNavItems]
    : publicNavItems;

  const isActive = (path: string) => location.pathname === path;

  // Fonction de déconnexion
  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      setIsProfileOpen(false);
      await logout();
      navigate("/logout");
    } catch (error) {
      console.error("Erreur lors de la déconnexion:", error);
    } finally {
      setIsLoggingOut(false);
    }
  };

  // Générer les initiales de l'utilisateur
  const getUserInitials = () => {
    if (!user) return "?";
    const firstInitial = user.firstName?.charAt(0)?.toUpperCase() || "";
    const lastInitial = user.lastName?.charAt(0)?.toUpperCase() || "";
    return (
      firstInitial + lastInitial || user.email?.charAt(0)?.toUpperCase() || "U"
    );
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "backdrop-blur-xl bg-gradient-to-r from-indigo-900/95 via-purple-900/95 to-pink-800/95 border-b border-pink-700/50 shadow-lg"
            : "bg-gradient-to-r from-indigo-900/60 via-purple-900/60 to-pink-800/60 backdrop-blur-md"
        }`}
      >
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-center h-20">
            {/* Logo Section */}
            <Link to="/" className="flex items-center space-x-4 group">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-2xl flex items-center justify-center transform group-hover:rotate-12 group-hover:scale-110 transition-all duration-300 shadow-lg animate-glow">
                  <Zap className="w-6 h-6 text-white animate-float" />
                </div>
                {/* Animated particles around logo */}
                <div className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 bg-cyan-400 rounded-full animate-ping"
                      style={{
                        left: `${Math.random() * 100}%`,
                        top: `${Math.random() * 100}%`,
                        animationDelay: `${i * 0.2}s`,
                      }}
                    />
                  ))}
                </div>
              </div>
              <div className="hidden sm:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent logo-hologram">
                  TaskFlow
                </h1>
                <p className="text-xs text-white/60 -mt-1">Pro Edition</p>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative px-6 py-3 rounded-2xl font-medium text-sm transition-all duration-300 flex items-center space-x-2 group ${
                    isActive(item.path)
                      ? `bg-gradient-to-r ${item.color} text-white shadow-lg shadow-blue-500/25 scale-105`
                      : "text-white/70 hover:text-white hover:bg-white/10"
                  }`}
                >
                  <span
                    className={`transition-all duration-300 ${
                      isActive(item.path)
                        ? "scale-110"
                        : "group-hover:scale-110"
                    }`}
                  >
                    {item.icon}
                  </span>
                  <span>{item.name}</span>

                  {/* Animated underline */}
                  {isActive(item.path) && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white rounded-full animate-pulse"></div>
                  )}
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-4">
              {/* Search Bar (only for authenticated users) */}
              {isAuthenticated && (
                <div className="hidden md:block relative">
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4 group-hover:text-white/60 transition-colors" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-10 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:bg-white/15 transition-all w-48 focus:w-64"
                    />
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"></div>
                  </div>
                </div>
              )}

              {/* Theme Toggle */}
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
                title="Changer le thème"
              >
                {isDarkMode ? (
                  <Sun className="w-4 h-4" />
                ) : (
                  <Moon className="w-4 h-4" />
                )}
              </button>

              {/* Notifications (only for authenticated users) */}
              {isAuthenticated && (
                <button className="relative p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300 group">
                  <Bell className="w-4 h-4" />
                  {notifications > 0 && (
                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-500 to-pink-500 rounded-full flex items-center justify-center text-xs font-bold text-white animate-bounce">
                      {notifications}
                    </div>
                  )}
                  <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-red-500/20 to-pink-500/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
              )}

              {/* Authentication Section */}
              {isLoading ? (
                // Loading state
                <div className="flex items-center space-x-2 p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20">
                  <Loader2 className="w-4 h-4 text-white animate-spin" />
                  <span className="text-white/70 text-sm hidden sm:block">
                    Chargement...
                  </span>
                </div>
              ) : isAuthenticated ? (
                // Authenticated User Profile
                <div className="relative">
                  <button
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="flex items-center space-x-3 p-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
                  >
                    <div className="w-8 h-8 rounded-xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {getUserInitials()}
                      </span>
                    </div>
                    <span className="hidden sm:block font-medium">
                      {user?.firstName} {user?.lastName}
                    </span>
                    <ChevronDown
                      className={`w-4 h-4 transition-transform duration-300 ${
                        isProfileOpen ? "rotate-180" : ""
                      }`}
                    />
                  </button>

                  {/* Profile Dropdown Menu */}
                  {isProfileOpen && (
                    <div className="absolute right-0 top-full mt-2 w-64 bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl py-3 animate-slideInUp">
                      <div className="px-4 py-3 border-b border-white/10">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-violet-500 to-purple-600 flex items-center justify-center">
                            <span className="font-bold text-white">
                              {getUserInitials()}
                            </span>
                          </div>
                          <div>
                            <p className="font-semibold text-white">
                              {user?.firstName} {user?.lastName}
                            </p>
                            <p className="text-white/60 text-sm">
                              {user?.email}
                            </p>
                            <div className="flex items-center space-x-1 mt-1">
                              <Shield className="w-3 h-3 text-blue-400" />
                              <span className="text-xs text-blue-400 capitalize">
                                {user?.role}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="py-2">
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-all">
                          <User className="w-4 h-4" />
                          <span>Mon Profil</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-all">
                          <Settings className="w-4 h-4" />
                          <span>Paramètres</span>
                        </button>
                        <button className="w-full flex items-center space-x-3 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 transition-all">
                          <Globe className="w-4 h-4" />
                          <span>Langue</span>
                        </button>
                      </div>

                      <div className="border-t border-white/10 pt-2">
                        <button
                          onClick={handleLogout}
                          disabled={isLoggingOut}
                          className="w-full flex items-center space-x-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all disabled:opacity-50"
                        >
                          {isLoggingOut ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <LogOut className="w-4 h-4" />
                          )}
                          <span>
                            {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
                          </span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                // Not Authenticated - Login/Register Buttons
                <div className="flex items-center space-x-3">
                  <Link
                    to="/login"
                    className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 transition-all duration-300 group"
                  >
                    <LogOut className="w-4 h-4 transform rotate-180" />
                    <span>Se connecter</span>
                  </Link>

                  <Link
                    to="/register"
                    className="flex items-center space-x-2 px-4 py-2 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-medium transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    <UserPlus className="w-4 h-4" />
                    <span className="hidden sm:block">S'inscrire</span>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
              >
                {isMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-gradient-to-r from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl border-t border-white/10">
            <div className="max-w-7xl mx-auto px-6 py-6">
              {/* Mobile Search (only for authenticated users) */}
              {isAuthenticated && (
                <div className="mb-6">
                  <div className="relative group">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Rechercher..."
                      className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-10 py-3 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50"
                    />
                  </div>
                </div>
              )}

              {/* Mobile Navigation */}
              <div className="space-y-3">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setIsMenuOpen(false)}
                    className={`flex items-center space-x-4 p-4 rounded-2xl transition-all duration-300 ${
                      isActive(item.path)
                        ? `bg-gradient-to-r ${item.color} text-white shadow-lg`
                        : "text-white/70 hover:text-white hover:bg-white/10"
                    }`}
                  >
                    <span
                      className={`transition-all duration-300 ${
                        isActive(item.path) ? "scale-110" : ""
                      }`}
                    >
                      {item.icon}
                    </span>
                    <span className="font-medium">{item.name}</span>
                    {isActive(item.path) && (
                      <div className="ml-auto">
                        <Star className="w-4 h-4 text-yellow-400 animate-pulse" />
                      </div>
                    )}
                  </Link>
                ))}
              </div>

              {/* Mobile Actions */}
              <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                {isAuthenticated ? (
                  <>
                    <button className="w-full flex items-center space-x-4 p-4 rounded-2xl text-white/70 hover:text-white hover:bg-white/10 transition-all">
                      <Settings className="w-4 h-4" />
                      <span>Paramètres</span>
                    </button>
                    <button
                      onClick={handleLogout}
                      disabled={isLoggingOut}
                      className="w-full flex items-center space-x-4 p-4 rounded-2xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all disabled:opacity-50"
                    >
                      {isLoggingOut ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <LogOut className="w-4 h-4" />
                      )}
                      <span>
                        {isLoggingOut ? "Déconnexion..." : "Se déconnecter"}
                      </span>
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center space-x-4 p-4 rounded-2xl text-white/70 hover:text-white hover:bg-white/10 transition-all"
                    >
                      <LogOut className="w-4 h-4 transform rotate-180" />
                      <span>Se connecter</span>
                    </Link>
                    <Link
                      to="/register"
                      onClick={() => setIsMenuOpen(false)}
                      className="w-full flex items-center space-x-4 p-4 rounded-2xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white transition-all"
                    >
                      <UserPlus className="w-4 h-4" />
                      <span>S'inscrire</span>
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Spacer pour éviter que le contenu soit caché sous la navbar fixe */}
      <div className="h-20"></div>

      {/* Click outside to close dropdowns */}
      {(isMenuOpen || isProfileOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setIsMenuOpen(false);
            setIsProfileOpen(false);
          }}
        />
      )}
    </>
  );
};

export default Navbar;
