import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UploadXray from "./pages/UploadXray";
import Processing from "./pages/Processing";
import Results from "./pages/Results";

import Dashboard from "./pages/Dashboard";
import ClassDistribution from "./pages/ClassDistribution";
import DatasetExplorer from "./pages/DatasetExplorer";
import Metadata from "./pages/Metadata";
import ResolutionAnalysis from "./pages/ResolutionAnalysis";
import PixelAnalysis from "./pages/PixelAnalysis";
import About from "./pages/About";

function Layout() {
  const location = useLocation();

  const publicPages = [
    "/",
    "/login",
    "/register",
  ];

  const isPublicPage =
    publicPages.includes(location.pathname);

  // PUBLIC WEBSITE
  if (isPublicPage) {
    return (
      <Routes>
        <Route path="/" element={<Home />} />

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

  // DASHBOARD / APPLICATION
  return (
    <>
      <Navbar />

      <div className="app-container">
        <Sidebar />

        <div className="main-content">
          <Routes>

            {/* AI Workflow */}

            <Route
              path="/upload"
              element={<UploadXray />}
            />

            <Route
              path="/processing"
              element={<Processing />}
            />

            <Route
              path="/results"
              element={<Results />}
            />

            {/* Existing Dashboard */}

            <Route
              path="/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/distribution"
              element={<ClassDistribution />}
            />

            <Route
              path="/explorer"
              element={<DatasetExplorer />}
            />

            <Route
              path="/metadata"
              element={<Metadata />}
            />

            <Route
              path="/resolution"
              element={<ResolutionAnalysis />}
            />

            <Route
              path="/pixel"
              element={<PixelAnalysis />}
            />

            <Route
              path="/about"
              element={<About />}
            />

          </Routes>
        </div>
      </div>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;