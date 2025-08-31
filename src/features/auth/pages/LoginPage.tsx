import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import { useAuth, useGuestRedirect } from "../hooks/useAuth";
import AuthForm from "../components/AuthForm";
import { useAuth } from "../hooks/useAuth";
import type { LoginRequest } from "../api";
// import type { LoginRequest } from "../services/authService";

const LoginPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const { login } = useAuth();
  const { login, useGuestRedirect } = useAuth();
  const navigate = useNavigate();

  // Rediriger si déjà connecté
  // useGuestRedirect("/");

  const handleLogin = async (credentials: LoginRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await login(credentials);

      if (!response || !response.user) {
        throw new Error("Échec de la connexion. Veuillez réessayer.");
      }

      // Redirection après connexion réussie
      navigate("/");

      // useGuestRedirect("/");
    } catch (err: any) {
      setError(err.message || "Erreur de connexion");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-900/30 via-purple-900/20 to-transparent"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(50)].map((_, i) => (
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
              <div className="w-1 h-1 bg-white/30 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-3/4 right-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-1/3 w-48 h-48 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Marketing Content */}
          <div className="hidden lg:block space-y-8">
            <div className="space-y-6">
              <h1 className="text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                  Bienvenue sur
                </span>
                <br />
                <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  TaskFlow Pro
                </span>
              </h1>

              <p className="text-xl text-white/70 leading-relaxed">
                La plateforme de gestion de projets nouvelle génération.
                Organisez, collaborez et réussissez avec style.
              </p>
            </div>

            {/* Features List */}
            <div className="space-y-4">
              {[
                {
                  title: "Interface Révolutionnaire",
                  description: "Design moderne avec animations fluides",
                  gradient: "from-cyan-500 to-blue-500",
                },
                {
                  title: "Collaboration Temps Réel",
                  description: "Travaillez en équipe sans limite",
                  gradient: "from-purple-500 to-violet-500",
                },
                {
                  title: "Analytics Avancés",
                  description: "Tableaux de bord et métriques détaillées",
                  gradient: "from-green-500 to-emerald-500",
                },
              ].map((feature, index) => (
                <div key={index} className="flex items-start space-x-4 group">
                  <div
                    className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center transform group-hover:rotate-12 transition-all duration-300 shadow-lg`}
                  >
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg">
                      {feature.title}
                    </h3>
                    <p className="text-white/60">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8">
              {[
                { number: "10K+", label: "Utilisateurs" },
                { number: "50K+", label: "Projets" },
                { number: "99.9%", label: "Uptime" },
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                    {stat.number}
                  </div>
                  <div className="text-white/60 text-sm">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Login Form */}
          <div className="flex justify-center lg:justify-end">
            <div className="w-full max-w-md">
              {/* Glassmorphism Container */}
              <div className="backdrop-blur-2xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-cyan-500/20 via-transparent to-purple-500/20 animate-gradient-shift"></div>

                {/* Content */}
                <div className="relative z-10">
                  <AuthForm
                    mode="login"
                    onSubmit={handleLogin}
                    isLoading={isLoading}
                    error={error}
                  />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 text-center space-y-2">
                <div className="flex items-center justify-center space-x-4 text-white/40 text-xs">
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                    <span>Sécurisé SSL</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                    <span>RGPD Conforme</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"></div>
                    <span>Support 24/7</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles for Animations */}
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

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 4s ease infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
