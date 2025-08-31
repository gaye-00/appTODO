import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { LogOut, CheckCircle, Heart, Star, Zap } from "lucide-react";

const LogoutPage: React.FC = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(true);
  const [isLoggedOut, setIsLoggedOut] = useState(false);
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      try {
        // Délai pour l'animation
        await new Promise((resolve) => setTimeout(resolve, 1500));

        await logout();
        setIsLoggingOut(false);
        setIsLoggedOut(true);

        // Redirection après un délai
        setTimeout(() => {
          navigate("/login");
        }, 3000);
      } catch (error) {
        console.error("Erreur lors de la déconnexion:", error);
        setIsLoggingOut(false);
        // Rediriger même en cas d'erreur
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    };

    performLogout();
  }, [logout, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden flex items-center justify-center">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/30 via-purple-900/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(40)].map((_, i) => (
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

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md mx-auto px-6">
        {/* Logout Animation Container */}
        <div className="backdrop-blur-2xl bg-white/10 rounded-3xl p-12 shadow-2xl border border-white/20 relative overflow-hidden">
          {/* Animated Border */}
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/20 via-transparent to-purple-500/20 animate-gradient-shift"></div>

          <div className="relative z-10 space-y-8">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center transform hover:rotate-12 transition-all duration-300 shadow-2xl shadow-cyan-500/25">
                <Zap className="w-10 h-10 text-white animate-pulse" />
              </div>
            </div>

            {/* Status Icon and Animation */}
            <div className="flex justify-center">
              {isLoggingOut ? (
                <div className="relative">
                  <div className="w-24 h-24 rounded-full border-4 border-white/20 flex items-center justify-center">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 flex items-center justify-center animate-spin">
                      <LogOut className="w-8 h-8 text-white" />
                    </div>
                  </div>
                  {/* Rotating rings */}
                  <div className="absolute inset-0 rounded-full border-2 border-t-cyan-400 border-r-transparent border-b-transparent border-l-transparent animate-spin"></div>
                  <div
                    className="absolute inset-2 rounded-full border-2 border-t-transparent border-r-purple-400 border-b-transparent border-l-transparent animate-spin"
                    style={{
                      animationDirection: "reverse",
                      animationDuration: "1.5s",
                    }}
                  ></div>
                </div>
              ) : (
                <div className="w-24 h-24 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 flex items-center justify-center transform scale-110 animate-bounce">
                  <CheckCircle className="w-12 h-12 text-white" />
                </div>
              )}
            </div>

            {/* Status Text */}
            <div className="space-y-4">
              {isLoggingOut ? (
                <>
                  <h2 className="text-2xl font-bold text-white">
                    Déconnexion en cours...
                  </h2>
                  <p className="text-white/70">Nous sauvegardons vos données</p>
                </>
              ) : (
                <>
                  <h2 className="text-2xl font-bold text-white">
                    À bientôt {user?.firstName} !
                  </h2>
                  <p className="text-white/70">
                    Vous avez été déconnecté avec succès
                  </p>
                </>
              )}
            </div>

            {/* Progress Indicator */}
            {isLoggingOut && (
              <div className="space-y-2">
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full animate-pulse transition-all duration-1000 w-full"></div>
                </div>
                <div className="flex justify-center space-x-1">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="w-2 h-2 bg-white/40 rounded-full animate-bounce"
                      style={{ animationDelay: `${i * 0.2}s` }}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Thank You Message */}
            {isLoggedOut && (
              <div className="space-y-4 animate-fadeIn">
                <div className="flex justify-center space-x-2">
                  <Heart className="w-5 h-5 text-red-400 animate-pulse" />
                  <span className="text-white/80 text-sm">
                    Merci d'avoir utilisé TaskFlow
                  </span>
                  <Star className="w-5 h-5 text-yellow-400 animate-pulse" />
                </div>
                <p className="text-white/60 text-sm">
                  Redirection vers la page de connexion...
                </p>
              </div>
            )}
          </div>

          {/* Decorative Elements */}
          <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"></div>
          <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
        </div>

        {/* Quick Actions */}
        {isLoggedOut && (
          <div className="mt-8 space-y-4 animate-fadeIn">
            <button
              onClick={() => navigate("/login")}
              className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              Se reconnecter
            </button>

            <button
              onClick={() => navigate("/")}
              className="w-full bg-white/10 backdrop-blur-sm border border-white/20 text-white font-medium py-3 px-6 rounded-2xl hover:bg-white/20 transition-all duration-300"
            >
              Retour à l'accueil
            </button>
          </div>
        )}
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        @keyframes gradient-shift {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }

        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out;
        }
      `}</style>
    </div>
  );
};

export default LogoutPage;
