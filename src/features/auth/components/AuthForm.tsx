import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  User,
  Loader2,
  CheckCircle,
  AlertCircle,
  Zap,
  Sparkles,
  Shield,
  ArrowRight,
} from "lucide-react";

interface AuthFormProps {
  mode: "login" | "register";
  onSubmit: (data: any) => Promise<void>;
  isLoading?: boolean;
  error?: string | null;
}

interface FormData {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
}

interface FormErrors {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  confirmPassword?: string;
  general?: string;
}

const AuthForm: React.FC<AuthFormProps> = ({
  mode,
  onSubmit,
  isLoading = false,
  error = null,
}) => {
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const isLoginMode = mode === "login";
  const isRegisterMode = mode === "register";

  // Validation en temps réel
  useEffect(() => {
    if (formData.password) {
      calculatePasswordStrength(formData.password);
    }
  }, [formData.password]);

  const calculatePasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length >= 6) strength += 25;
    if (password.length >= 10) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/[0-9]/.test(password)) strength += 25;
    setPasswordStrength(strength);
  };

  const validateField = (name: string, value: string): string | undefined => {
    switch (name) {
      case "email":
        if (!value) return "L'email est requis";
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return "Email invalide";
        break;
      case "password":
        if (!value) return "Le mot de passe est requis";
        if (value.length < 6) return "Au moins 6 caractères requis";
        break;
      case "firstName":
        if (isRegisterMode && !value) return "Le prénom est requis";
        if (value && value.length < 2) return "Au moins 2 caractères requis";
        break;
      case "lastName":
        if (isRegisterMode && !value) return "Le nom est requis";
        if (value && value.length < 2) return "Au moins 2 caractères requis";
        break;
      case "confirmPassword":
        if (isRegisterMode && !value) return "Confirmez votre mot de passe";
        if (value && value !== formData.password)
          return "Les mots de passe ne correspondent pas";
        break;
    }
    return undefined;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Validation en temps réel
    if (touched[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error }));
    }
  };

  const handleInputBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));

    const error = validateField(name, value);
    setErrors((prev) => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    newErrors.email = validateField("email", formData.email);
    newErrors.password = validateField("password", formData.password);

    if (isRegisterMode) {
      newErrors.firstName = validateField(
        "firstName",
        formData.firstName || ""
      );
      newErrors.lastName = validateField("lastName", formData.lastName || "");
      newErrors.confirmPassword = validateField(
        "confirmPassword",
        formData.confirmPassword || ""
      );
    }

    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const submitData = isLoginMode
        ? { username: formData.email, password: formData.password }
        : {
            email: formData.email,
            password: formData.password,
            firstName: formData.firstName,
            lastName: formData.lastName,
            confirmPassword: formData.confirmPassword,
          };

      await onSubmit(submitData);
    } catch (err) {
      console.error("Erreur de soumission:", err);
    }
  };

  const getPasswordStrengthColor = (strength: number) => {
    if (strength < 25) return "bg-red-500";
    if (strength < 50) return "bg-orange-500";
    if (strength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  const getPasswordStrengthText = (strength: number) => {
    if (strength < 25) return "Faible";
    if (strength < 50) return "Moyen";
    if (strength < 75) return "Bon";
    return "Excellent";
  };

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center transform hover:rotate-12 transition-all duration-300 shadow-2xl shadow-cyan-500/25">
            <Zap className="w-8 h-8 text-white animate-pulse" />
          </div>
        </div>

        <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent mb-2">
          {isLoginMode ? "Connexion" : "Inscription"}
        </h1>

        <p className="text-white/70">
          {isLoginMode
            ? "Accédez à votre espace de travail"
            : "Créez votre compte TaskFlow Pro"}
        </p>
      </div>

      {/* Error Message */}
      {(error || errors.general) && (
        <div className="mb-6 p-4 bg-red-500/10 backdrop-blur-sm border border-red-500/20 rounded-2xl">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0" />
            <p className="text-red-300 text-sm">{error || errors.general}</p>
          </div>
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name Fields (Register only) */}
        {isRegisterMode && (
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Prénom
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full bg-white/10 backdrop-blur-sm border ${
                    errors.firstName ? "border-red-500/50" : "border-white/20"
                  } rounded-2xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all`}
                  placeholder="Votre prénom"
                  disabled={isLoading}
                />
              </div>
              {errors.firstName && (
                <p className="mt-1 text-red-400 text-xs">{errors.firstName}</p>
              )}
            </div>

            <div>
              <label className="block text-white/80 text-sm font-medium mb-2">
                Nom
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName || ""}
                  onChange={handleInputChange}
                  onBlur={handleInputBlur}
                  className={`w-full bg-white/10 backdrop-blur-sm border ${
                    errors.lastName ? "border-red-500/50" : "border-white/20"
                  } rounded-2xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all`}
                  placeholder="Votre nom"
                  disabled={isLoading}
                />
              </div>
              {errors.lastName && (
                <p className="mt-1 text-red-400 text-xs">{errors.lastName}</p>
              )}
            </div>
          </div>
        )}

        {/* Email Field */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Email
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`w-full bg-white/10 backdrop-blur-sm border ${
                errors.email ? "border-red-500/50" : "border-white/20"
              } rounded-2xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all`}
              placeholder="votre@email.com"
              disabled={isLoading}
              autoComplete="email"
            />
            {formData.email && !errors.email && (
              <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
            )}
          </div>
          {errors.email && (
            <p className="mt-1 text-red-400 text-xs">{errors.email}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label className="block text-white/80 text-sm font-medium mb-2">
            Mot de passe
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              onBlur={handleInputBlur}
              className={`w-full bg-white/10 backdrop-blur-sm border ${
                errors.password ? "border-red-500/50" : "border-white/20"
              } rounded-2xl px-12 pr-12 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all`}
              placeholder="••••••••"
              disabled={isLoading}
              autoComplete={isLoginMode ? "current-password" : "new-password"}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5" />
              ) : (
                <Eye className="w-5 h-5" />
              )}
            </button>
          </div>

          {/* Password Strength (Register only) */}
          {isRegisterMode && formData.password && (
            <div className="mt-2">
              <div className="flex items-center justify-between text-xs text-white/60 mb-1">
                <span>Force du mot de passe</span>
                <span
                  className={
                    passwordStrength >= 75
                      ? "text-green-400"
                      : passwordStrength >= 50
                      ? "text-yellow-400"
                      : "text-red-400"
                  }
                >
                  {getPasswordStrengthText(passwordStrength)}
                </span>
              </div>
              <div className="w-full bg-white/20 rounded-full h-2">
                <div
                  className={`h-2 rounded-full transition-all duration-300 ${getPasswordStrengthColor(
                    passwordStrength
                  )}`}
                  style={{ width: `${passwordStrength}%` }}
                ></div>
              </div>
            </div>
          )}

          {errors.password && (
            <p className="mt-1 text-red-400 text-xs">{errors.password}</p>
          )}
        </div>

        {/* Confirm Password (Register only) */}
        {isRegisterMode && (
          <div>
            <label className="block text-white/80 text-sm font-medium mb-2">
              Confirmer le mot de passe
            </label>
            <div className="relative">
              <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
              <input
                type={showConfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={formData.confirmPassword || ""}
                onChange={handleInputChange}
                onBlur={handleInputBlur}
                className={`w-full bg-white/10 backdrop-blur-sm border ${
                  errors.confirmPassword
                    ? "border-red-500/50"
                    : "border-white/20"
                } rounded-2xl px-12 pr-12 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:border-transparent transition-all`}
                placeholder="••••••••"
                disabled={isLoading}
                autoComplete="new-password"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
              {formData.confirmPassword &&
                formData.confirmPassword === formData.password && (
                  <CheckCircle className="absolute right-10 top-1/2 transform -translate-y-1/2 text-green-400 w-5 h-5" />
                )}
            </div>
            {errors.confirmPassword && (
              <p className="mt-1 text-red-400 text-xs">
                {errors.confirmPassword}
              </p>
            )}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className={`w-full relative overflow-hidden group ${
            isLoading
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 hover:scale-105 hover:shadow-2xl"
          } text-white font-semibold py-4 px-6 rounded-2xl transition-all duration-300 transform flex items-center justify-center space-x-2`}
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              <span>{isLoginMode ? "Connexion..." : "Création..."}</span>
            </>
          ) : (
            <>
              <span>{isLoginMode ? "Se connecter" : "Créer mon compte"}</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </>
          )}

          {/* Animated background effect */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-2xl"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
        </button>

        {/* Additional Actions */}
        <div className="space-y-4">
          {/* Forgot Password (Login only) */}
          {isLoginMode && (
            <div className="text-center">
              <Link
                to="/forgot-password"
                className="text-cyan-400 hover:text-cyan-300 text-sm transition-colors"
              >
                Mot de passe oublié ?
              </Link>
            </div>
          )}

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/20"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 text-white/60">
                {isLoginMode ? "Nouveau sur TaskFlow ?" : "Déjà un compte ?"}
              </span>
            </div>
          </div>

          {/* Switch Mode */}
          <div className="text-center">
            <Link
              to={isLoginMode ? "/register" : "/login"}
              className="inline-flex items-center space-x-2 text-white/70 hover:text-white transition-colors group"
            >
              <Sparkles className="w-4 h-4 group-hover:animate-pulse" />
              <span>{isLoginMode ? "Créer un compte" : "Se connecter"}</span>
            </Link>
          </div>
        </div>
      </form>

      {/* Features Preview (Register only) */}
      {isRegisterMode && (
        <div className="mt-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
          <h3 className="text-white font-semibold mb-4 text-center">
            Rejoignez TaskFlow Pro
          </h3>
          <div className="space-y-3">
            {[
              {
                icon: <Zap className="w-4 h-4" />,
                text: "Gestion de projets avancée",
              },
              {
                icon: <Shield className="w-4 h-4" />,
                text: "Collaboration en équipe",
              },
              {
                icon: <Sparkles className="w-4 h-4" />,
                text: "Analytics et rapports",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="flex items-center space-x-3 text-white/70"
              >
                <div className="text-cyan-400">{feature.icon}</div>
                <span className="text-sm">{feature.text}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthForm;
