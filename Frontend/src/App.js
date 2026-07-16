import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import {
  useState,
} from "react";

import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PrivateRoute from "./components/PrivateRoute";


import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Dashboard from "./pages/Dashboard";
import AnalysisHistory from "./pages/AnalysisHistory";

import UploadXray from "./pages/UploadXray";
import Processing from "./pages/Processing";
import Results from "./pages/Results";

import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";

import ClassDistribution from "./pages/ClassDistribution";
import DatasetExplorer from "./pages/DatasetExplorer";
import Metadata from "./pages/Metadata";
import ResolutionAnalysis from "./pages/ResolutionAnalysis";
import PixelAnalysis from "./pages/PixelAnalysis";
import About from "./pages/About";


function Layout() {
  const location = useLocation();

  const [
    sidebarOpen,
    setSidebarOpen,
  ] = useState(false);


  const publicPages = [
    "/",
    "/login",
    "/register",
  ];


  const isPublicPage =
    publicPages.includes(
      location.pathname
    );


  // ==============================
  // PUBLIC WEBSITE
  // ==============================

  if (isPublicPage) {
    return (
      <Routes>

        <Route
          path="/"
          element={<Home />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

      </Routes>
    );
  }


  // ==============================
  // PRIVATE APPLICATION
  // ==============================

  return (
    <>

      <Navbar
        onMenuClick={() =>
          setSidebarOpen(
            !sidebarOpen
          )
        }
      />


      <div className="app-container">

        <Sidebar
          isOpen={sidebarOpen}
          onClose={() =>
            setSidebarOpen(false)
          }
        />


        {sidebarOpen && (

          <div
            className="sidebar-overlay"
            onClick={() =>
              setSidebarOpen(false)
            }
          />

        )}


        <main className="main-content">

          <Routes>

            {/* Dashboard */}

            <Route
              path="/dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />


            {/* Analysis History */}

            <Route
              path="/history"
              element={
                <PrivateRoute>
                  <AnalysisHistory />
                </PrivateRoute>
              }
            />


            {/* Upload */}

            <Route
              path="/upload"
              element={
                <PrivateRoute>
                  <UploadXray />
                </PrivateRoute>
              }
            />


            {/* Processing */}

            <Route
              path="/processing"
              element={
                <PrivateRoute>
                  <Processing />
                </PrivateRoute>
              }
            />


            {/* New Analysis Result */}

            <Route
              path="/results"
              element={
                <PrivateRoute>
                  <Results />
                </PrivateRoute>
              }
            />


            {/* Saved Analysis Result */}

            <Route
              path="/results/:analysisId"
              element={
                <PrivateRoute>
                  <Results />
                </PrivateRoute>
              }
            />


            {/* Profile */}

            <Route
              path="/profile"
              element={
                <PrivateRoute>
                  <Profile />
                </PrivateRoute>
              }
            />


            {/* Edit Profile */}

            <Route
              path="/edit-profile"
              element={
                <PrivateRoute>
                  <EditProfile />
                </PrivateRoute>
              }
            />


            {/* Dataset Analytics */}

            <Route
              path="/distribution"
              element={
                <PrivateRoute>
                  <ClassDistribution />
                </PrivateRoute>
              }
            />


            <Route
              path="/explorer"
              element={
                <PrivateRoute>
                  <DatasetExplorer />
                </PrivateRoute>
              }
            />


            <Route
              path="/metadata"
              element={
                <PrivateRoute>
                  <Metadata />
                </PrivateRoute>
              }
            />


            <Route
              path="/resolution"
              element={
                <PrivateRoute>
                  <ResolutionAnalysis />
                </PrivateRoute>
              }
            />


            <Route
              path="/pixel"
              element={
                <PrivateRoute>
                  <PixelAnalysis />
                </PrivateRoute>
              }
            />


            <Route
              path="/about"
              element={
                <PrivateRoute>
                  <About />
                </PrivateRoute>
              }
            />

          </Routes>

        </main>

      </div>

    </>
  );
}


function App() {
  return (
    <BrowserRouter>
      <Layout />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </BrowserRouter>
  );
}


export default App;