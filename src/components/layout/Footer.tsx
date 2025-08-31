// import { Link } from "react-router-dom";

// const Footer: React.FC = () => {
//   return (
//     <footer className="bg-gray-900 text-gray-300 w-full">
//       <div className="container mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
//         <div className="space-y-4">
//           <h3 className="text-white text-lg font-bold">TodoApp</h3>
//           <p className="text-sm">
//             Organisez vos projets et vos tâches efficacement avec TodoApp.
//           </p>
//         </div>

//         <div>
//           <h4 className="text-white font-semibold mb-4">Navigation</h4>
//           <ul className="space-y-2">
//             <li>
//               <Link
//                 to="/dashboard"
//                 className="text-sm hover:text-white transition-colors duration-200"
//               >
//                 Dashboard
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/projects"
//                 className="text-sm hover:text-white transition-colors duration-200"
//               >
//                 Projets
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/tasks"
//                 className="text-sm hover:text-white transition-colors duration-200"
//               >
//                 Tâches
//               </Link>
//             </li>
//           </ul>
//         </div>

//         <div>
//           <h4 className="text-white font-semibold mb-4">Ressources</h4>
//           <ul className="space-y-2">
//             <li>
//               <Link
//                 to="/help"
//                 className="text-sm hover:text-white transition-colors duration-200"
//               >
//                 Centre d'aide
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/documentation"
//                 className="text-sm hover:text-white transition-colors duration-200"
//               >
//                 Documentation
//               </Link>
//             </li>
//             <li>
//               <Link
//                 to="/guides"
//                 className="text-sm hover:text-white transition-colors duration-200"
//               >
//                 Guides
//               </Link>
//             </li>
//           </ul>
//         </div>

//         <div>
//           <h4 className="text-white font-semibold mb-4">Contact</h4>
//           <ul className="space-y-2">
//             <li>
//               <a
//                 href="mailto:contact@todoapp.com"
//                 className="text-sm hover:text-white transition-colors duration-200"
//               >
//                 contact@todoapp.com
//               </a>
//             </li>
//             <li className="flex space-x-4 mt-4">
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition-colors duration-200"
//               >
//                 <svg
//                   className="h-6 w-6"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition-colors duration-200"
//               >
//                 <svg
//                   className="h-6 w-6"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
//                 </svg>
//               </a>
//               <a
//                 href="#"
//                 className="text-gray-400 hover:text-white transition-colors duration-200"
//               >
//                 <svg
//                   className="h-6 w-6"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.6.11.819-.26.819-.578 0-.284-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61-.546-1.386-1.332-1.755-1.332-1.755-1.087-.744.083-.729.083-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 21.795 24 17.298 24 12c0-6.627-5.373-12-12-12" />
//                 </svg>
//               </a>
//             </li>
//           </ul>
//         </div>
//       </div>
//       <div className="border-t border-gray-800 mt-8">
//         <div className="max-w-7xl mx-auto px-4 py-4">
//           <p className="text-sm text-center">
//             © 2025 TodoApp. Tous droits réservés.
//           </p>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;

import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Zap,
  Mail,
  MapPin,
  Phone,
  Heart,
  ArrowUp,
  Github,
  Twitter,
  Linkedin,
  Facebook,
  Instagram,
  Youtube,
  Send,
  Star,
  Globe,
  Shield,
  Award,
  Users,
  Rocket,
  Sparkles,
} from "lucide-react";

const Footer: React.FC = () => {
  const [email, setEmail] = useState("");
  const [isNewsletterHovered, setIsNewsletterHovered] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const footerLinks = {
    navigation: [
      {
        name: "Dashboard",
        path: "/dashboard",
        icon: <Star className="w-4 h-4" />,
      },
      {
        name: "Projets",
        path: "/projects",
        icon: <Rocket className="w-4 h-4" />,
      },
      {
        name: "Tâches",
        path: "/tasks",
        icon: <Sparkles className="w-4 h-4" />,
      },
      { name: "Équipe", path: "/team", icon: <Users className="w-4 h-4" /> },
    ],
    resources: [
      {
        name: "Centre d'aide",
        path: "/help",
        icon: <Shield className="w-4 h-4" />,
      },
      {
        name: "Documentation",
        path: "/docs",
        icon: <Globe className="w-4 h-4" />,
      },
      { name: "API", path: "/api", icon: <Award className="w-4 h-4" /> },
      {
        name: "Tutoriels",
        path: "/tutorials",
        icon: <Heart className="w-4 h-4" />,
      },
    ],
    company: [
      { name: "À propos", path: "/about" },
      { name: "Carrières", path: "/careers" },
      { name: "Blog", path: "/blog" },
      { name: "Presse", path: "/press" },
    ],
    legal: [
      { name: "Confidentialité", path: "/privacy" },
      { name: "Conditions", path: "/terms" },
      { name: "Cookies", path: "/cookies" },
      { name: "RGPD", path: "/gdpr" },
    ],
  };

  const socialLinks = [
    {
      name: "GitHub",
      icon: <Github className="w-5 h-5" />,
      url: "#",
      color: "hover:text-gray-300 hover:bg-gray-800",
    },
    {
      name: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      url: "#",
      color: "hover:text-blue-400 hover:bg-blue-500/10",
    },
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-5 h-5" />,
      url: "#",
      color: "hover:text-blue-600 hover:bg-blue-600/10",
    },
    {
      name: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      url: "#",
      color: "hover:text-blue-500 hover:bg-blue-500/10",
    },
    {
      name: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      url: "#",
      color: "hover:text-pink-500 hover:bg-pink-500/10",
    },
    {
      name: "YouTube",
      icon: <Youtube className="w-5 h-5" />,
      url: "#",
      color: "hover:text-red-500 hover:bg-red-500/10",
    },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/10 via-purple-900/10 to-pink-900/10"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${3 + Math.random() * 4}s`,
              }}
            >
              <div className="w-1 h-1 bg-white/20 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative z-10">
        {/* Newsletter Section */}
        <div className="border-b border-white/10 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-pink-600/10 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent mb-4">
                Restez connecté avec TaskFlow
              </h2>
              <p className="text-white/70 text-lg max-w-2xl mx-auto">
                Recevez les dernières mises à jour, conseils de productivité et
                fonctionnalités exclusives
              </p>
            </div>

            <form
              onSubmit={handleNewsletterSubmit}
              className="max-w-md mx-auto"
            >
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white/40 w-5 h-5" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Votre adresse email"
                    className="w-full bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl px-12 py-4 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-cyan-400/50 focus:bg-white/15 transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  onMouseEnter={() => setIsNewsletterHovered(true)}
                  onMouseLeave={() => setIsNewsletterHovered(false)}
                  className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all transform hover:scale-105 hover:shadow-2xl flex items-center justify-center space-x-2"
                >
                  <Send
                    className={`w-5 h-5 transition-transform duration-300 ${
                      isNewsletterHovered ? "translate-x-1" : ""
                    }`}
                  />
                  <span>S'abonner</span>
                </button>
              </div>
              <p className="text-white/50 text-sm mt-3 text-center">
                Pas de spam, désabonnez-vous à tout moment
              </p>
            </form>
          </div>
        </div>

        {/* Main Footer Content */}
        <div className="max-w-7xl mx-auto px-6 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 rounded-3xl flex items-center justify-center transform hover:rotate-12 transition-all duration-300 shadow-2xl shadow-cyan-500/20">
                  <Zap className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-cyan-200 to-blue-300 bg-clip-text text-transparent">
                    TaskFlow
                  </h3>
                  <p className="text-white/60 text-sm">Pro Edition</p>
                </div>
              </div>

              <p className="text-white/70 text-lg leading-relaxed">
                Révolutionnez votre productivité avec l'outil de gestion de
                projets et tâches le plus avancé. Conçu pour les équipes
                modernes qui visent l'excellence.
              </p>

              {/* Contact Info */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-blue-500/20 transition-all">
                    <Mail className="w-5 h-5 text-white/70 group-hover:text-blue-400" />
                  </div>
                  <a
                    href="mailto:contact@taskflow.com"
                    className="text-white/70 hover:text-white transition-colors"
                  >
                    contact@taskflow.com
                  </a>
                </div>

                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-green-500/20 transition-all">
                    <Phone className="w-5 h-5 text-white/70 group-hover:text-green-400" />
                  </div>
                  <span className="text-white/70">+221 77 495 20 24</span>
                </div>

                <div className="flex items-center space-x-3 group">
                  <div className="w-10 h-10 bg-white/10 rounded-2xl flex items-center justify-center group-hover:bg-purple-500/20 transition-all">
                    <MapPin className="w-5 h-5 text-white/70 group-hover:text-purple-400" />
                  </div>
                  <span className="text-white/70">UASZ, Ziguinchor</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex flex-wrap gap-3 pt-4">
                {socialLinks.map((social) => (
                  <a
                    key={social.name}
                    href={social.url}
                    className={`w-12 h-12 bg-white/10 backdrop-blur-sm rounded-2xl flex items-center justify-center text-white/60 transition-all duration-300 hover:scale-110 hover:shadow-lg ${social.color}`}
                    title={social.name}
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Navigation Links */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center">
                <Rocket className="w-5 h-5 mr-2 text-cyan-400" />
                Navigation
              </h4>
              <ul className="space-y-3">
                {footerLinks.navigation.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="flex items-center space-x-3 text-white/70 hover:text-white transition-all duration-200 group"
                    >
                      <span className="text-cyan-400 group-hover:scale-110 transition-transform">
                        {link.icon}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Resources */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center">
                <Globe className="w-5 h-5 mr-2 text-purple-400" />
                Ressources
              </h4>
              <ul className="space-y-3">
                {footerLinks.resources.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="flex items-center space-x-3 text-white/70 hover:text-white transition-all duration-200 group"
                    >
                      <span className="text-purple-400 group-hover:scale-110 transition-transform">
                        {link.icon}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform">
                        {link.name}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company & Legal */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold text-white flex items-center">
                <Shield className="w-5 h-5 mr-2 text-green-400" />
                Entreprise
              </h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>

              <h5 className="text-lg font-semibold text-white mt-8 mb-4">
                Légal
              </h5>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      className="text-white/70 hover:text-white transition-all duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-white/10 bg-gradient-to-r from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-6 py-6">
            <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
              <div className="flex items-center space-x-2 text-white/60">
                <span>© 2025 TaskFlow Pro.</span>
                <span>Conçu avec</span>
                <Heart className="w-4 h-4 text-red-500 animate-pulse" />
                <span>à Ziguinchor</span>
              </div>

              <div className="flex items-center space-x-6">
                <div className="flex items-center space-x-2 text-white/50 text-sm">
                  <Award className="w-4 h-4 text-yellow-400" />
                  <span>Leader en productivité 2025</span>
                </div>

                <button
                  onClick={scrollToTop}
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-3 text-white hover:bg-white/20 hover:scale-110 transition-all duration-300"
                  title="Retour en haut"
                >
                  <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
