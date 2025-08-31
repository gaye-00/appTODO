import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import AuthForm from "../components/AuthForm";
// import type { RegisterRequest } from "../services/authService";
import {
  CheckCircle,
  Users,
  Zap,
  Shield,
  Star,
  Globe,
  Award,
  Rocket,
} from "lucide-react";
import type { RegisterRequest } from "../api";

const RegisterPage: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { register, useGuestRedirect } = useAuth();
  const navigate = useNavigate();

  // Rediriger si déjà connecté
  useGuestRedirect("/");

  const handleRegister = async (userData: RegisterRequest) => {
    try {
      setIsLoading(true);
      setError(null);

      await register(userData);

      // Redirection après inscription réussie
      navigate("/", { replace: true });
    } catch (err: any) {
      setError(err.message || "Erreur lors de l'inscription");
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
          {[...Array(60)].map((_, i) => (
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
        <div className="absolute top-1/6 left-1/6 w-72 h-72 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-2/3 right-1/6 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/6 left-1/2 w-64 h-64 bg-gradient-to-r from-green-500/15 to-teal-500/15 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center p-6">
        <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side - Registration Form */}
          <div className="flex justify-center lg:justify-start order-2 lg:order-1">
            <div className="w-full max-w-md">
              {/* Glassmorphism Container */}
              <div className="backdrop-blur-2xl bg-white/10 rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
                {/* Animated Border */}
                <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-purple-500/20 via-transparent to-cyan-500/20 animate-gradient-shift"></div>

                {/* Content */}
                <div className="relative z-10">
                  <AuthForm
                    mode="register"
                    onSubmit={handleRegister}
                    isLoading={isLoading}
                    error={error}
                  />
                </div>

                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-xl"></div>
                <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-full blur-xl"></div>
              </div>

              {/* Trust Indicators */}
              <div className="mt-6 text-center space-y-2">
                <div className="flex items-center justify-center space-x-4 text-white/40 text-xs">
                  <span className="flex items-center space-x-1">
                    <CheckCircle className="w-3 h-3 text-green-400" />
                    <span>Inscription gratuite</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Shield className="w-3 h-3 text-blue-400" />
                    <span>Données sécurisées</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <Star className="w-3 h-3 text-yellow-400" />
                    <span>Support premium</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Benefits & Features */}
          <div className="space-y-8 order-1 lg:order-2">
            <div className="space-y-6">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-white via-purple-200 to-cyan-300 bg-clip-text text-transparent">
                  Rejoignez
                </span>
                <br />
                <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-500 bg-clip-text text-transparent">
                  TaskFlow Pro
                </span>
              </h1>

              <p className="text-xl text-white/70 leading-relaxed">
                Créez votre compte et découvrez une nouvelle façon de gérer vos
                projets. Rejoignez des milliers d'équipes qui font confiance à
                TaskFlow.
              </p>
            </div>

            {/* Premium Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                {
                  icon: <Rocket className="w-6 h-6" />,
                  title: "Démarrage Rapide",
                  description: "Configurez vos projets en moins de 2 minutes",
                  gradient: "from-blue-500 to-cyan-500",
                },
                {
                  icon: <Users className="w-6 h-6" />,
                  title: "Équipes Illimitées",
                  description:
                    "Invitez autant de collaborateurs que nécessaire",
                  gradient: "from-purple-500 to-violet-500",
                },
                {
                  icon: <Zap className="w-6 h-6" />,
                  title: "Performance Ultra",
                  description: "Interface ultra-rapide et responsive",
                  gradient: "from-yellow-500 to-orange-500",
                },
                {
                  icon: <Shield className="w-6 h-6" />,
                  title: "Sécurité Avancée",
                  description:
                    "Chiffrement de bout en bout et sauvegarde automatique",
                  gradient: "from-green-500 to-emerald-500",
                },
              ].map((feature, index) => (
                <div key={index} className="group">
                  <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                    <div
                      className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center mb-4 transform group-hover:rotate-12 transition-all duration-300 shadow-lg`}
                    >
                      {feature.icon}
                    </div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-white/60 text-sm">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Social Proof */}
            <div className="space-y-6">
              <div className="text-center">
                <h3 className="text-2xl font-bold text-white mb-4">
                  Rejoint par les meilleures équipes
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 items-center opacity-60">
                  {["TechCorp", "InnoLabs", "StartupXYZ", "DevTeam"].map(
                    (company, index) => (
                      <div key={index} className="text-center">
                        <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-2">
                          <Globe className="w-8 h-8 text-white/40" />
                        </div>
                        <span className="text-white/40 text-sm font-medium">
                          {company}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>

            {/* Testimonial */}
            <div className="backdrop-blur-sm bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 flex items-center justify-center flex-shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <blockquote className="text-white/80 italic mb-3">
                    "TaskFlow a révolutionné notre façon de travailler.
                    L'interface est magnifique et les fonctionnalités sont
                    exactement ce dont nous avions besoin."
                  </blockquote>
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-400 to-pink-500"></div>
                    <div>
                      <div className="text-white font-medium text-sm">
                        Sarah Martinez
                      </div>
                      <div className="text-white/60 text-xs">
                        CEO, TechStartup
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Call to Action */}
            <div className="text-center lg:text-left">
              <p className="text-white/60 text-sm">
                Déjà plus de{" "}
                <span className="text-cyan-400 font-semibold">10,000+</span>{" "}
                utilisateurs font confiance à TaskFlow
              </p>
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

export default RegisterPage;
