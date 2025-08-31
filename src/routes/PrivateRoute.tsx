import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// import { useAuth } from "../hooks/useAuth";
import { Loader2, Shield, Lock } from "lucide-react";
import useAuth from "../features/auth/hooks/useAuth";

interface PrivateRouteProps {
  children: React.ReactNode;
  requireRole?: string[];
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  requireRole,
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();
  const location = useLocation();

  // Loading state
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-3xl flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Loader2 className="w-10 h-10 text-white animate-spin" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">
            Vérification...
          </h2>
          <p className="text-white/60">Chargement de votre session</p>
        </div>
      </div>
    );
  }

  // Not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Role-based access control
  if (requireRole && user) {
    const hasRequiredRole = requireRole.includes(user.role);

    if (!hasRequiredRole) {
      return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
          <div className="max-w-md mx-auto text-center p-8">
            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Lock className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-4">Accès Refusé</h2>
            <p className="text-white/70 mb-6">
              Vous n'avez pas les permissions nécessaires pour accéder à cette
              page.
            </p>
            <div className="space-y-3">
              <p className="text-white/50 text-sm">
                Rôle requis: {requireRole.join(", ")}
              </p>
              <p className="text-white/50 text-sm">Votre rôle: {user.role}</p>
            </div>
            <button
              onClick={() => window.history.back()}
              className="mt-6 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105"
            >
              Retour
            </button>
          </div>
        </div>
      );
    }
  }

  // Authorized - render children
  return <>{children}</>;
};

export default PrivateRoute;
