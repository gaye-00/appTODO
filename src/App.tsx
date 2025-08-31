// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/layout/Navbar";
// import Footer from "./components/layout/Footer";
// import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import ProjectListPage from "./features/projets/pages/ProjectListPage";
// import TaskListPage from "./features/projets/pages/TaskListPage";
// import LoginPage from "./features/auth/pages/LoginPage";
// // import "./App.css";

// function App() {
//   return (
//     <Router>
//       <div className="min-h-screen flex flex-col w-full">
//         <Navbar />
//         <main className="flex-grow w-full">
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/dashboard" element={<Dashboard />} />
//             <Route path="/projects" element={<ProjectListPage />} />
//             <Route path="/tasks" element={<TaskListPage />} />
//             <Route path="/login" element={<LoginPage />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }
// export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import { AuthProvider } from "./features/auth/hooks/useAuth";

// Import des composants
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import ProjectListPage from "./features/projets/pages/ProjectListPage";

// Import des pages d'authentification
import LoginPage from "./features/auth/pages/LoginPage";
import RegisterPage from "./features/auth/pages/RegisterPage";
import LogoutPage from "./features/auth/pages/LogoutPage";
import PrivateRoute from "./routes/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import TaskListPage from "./features/projets/pages/TaskListPage";
import { AuthProvider } from "./features/auth/hooks/AuthContext";

// function App() {
//   return (
//     <AuthProvider>
//       <Router>
//         <div className="min-h-screen flex flex-col w-full">
//           <Navbar />
//           <main className="flex-grow w-full">
//             <Routes>
//               {/* Routes publiques */}
//               {/* <Route path="/" element={<Home />} /> */}
//               <Route path="/login" element={<LoginPage />} />
//               <Route path="/register" element={<RegisterPage />} />
//               <Route path="/logout" element={<LogoutPage />} />

//               {/* Routes protégées */}
//               <Route
//                 path="/"
//                 element={
//                   <PrivateRoute>
//                     <Home />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/dashboard"
//                 element={
//                   <PrivateRoute>
//                     <Dashboard />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/projects"
//                 element={
//                   <PrivateRoute>
//                     <ProjectListPage />
//                   </PrivateRoute>
//                 }
//               />
//               <Route
//                 path="/tasks"
//                 element={
//                   <PrivateRoute>
//                     <TaskListPage />
//                   </PrivateRoute>
//                 }
//               />

//               {/* Route 404 - optionnelle */}
//               <Route
//                 path="*"
//                 element={
//                   <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
//                     <div className="text-center">
//                       <h1 className="text-6xl font-bold text-white mb-4">
//                         404
//                       </h1>
//                       <p className="text-white/70 text-xl">Page non trouvée</p>
//                     </div>
//                   </div>
//                 }
//               />
//             </Routes>
//           </main>
//           <Footer />
//         </div>
//       </Router>
//     </AuthProvider>
//   );
// }

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen flex flex-col w-full">
          <Navbar />
          <main className="flex-grow w-full">
            <Routes>
              {/* Routes publiques */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/logout" element={<LogoutPage />} />

              {/* Routes protégées */}
              <Route
                path="/"
                element={
                  <PrivateRoute>
                    <Home />
                  </PrivateRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
              <Route
                path="/projects"
                element={
                  <PrivateRoute>
                    <ProjectListPage />
                  </PrivateRoute>
                }
              />
              <Route
                path="/tasks"
                element={
                  <PrivateRoute>
                    <TaskListPage />
                  </PrivateRoute>
                }
              />

              {/* Route 404 */}
              <Route
                path="*"
                element={
                  <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center">
                    <div className="text-center">
                      <h1 className="text-6xl font-bold text-white mb-4">
                        404
                      </h1>
                      <p className="text-white/70 text-xl">Page non trouvée</p>
                    </div>
                  </div>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
