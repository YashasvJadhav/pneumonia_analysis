import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";

import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Dashboard from "./pages/Dashboard";
import ClassDistribution from "./pages/ClassDistribution";
import DatasetExplorer from "./pages/DatasetExplorer";
import Metadata from "./pages/Metadata";
import ResolutionAnalysis from "./pages/ResolutionAnalysis";
import PixelAnalysis from "./pages/PixelAnalysis";
import About from "./pages/About";

function App() {
  return (
    <BrowserRouter>

      <Navbar />

      <div className="app-container">

        <Sidebar />

        <div className="main-content">

          <Routes>

            <Route path="/" element={<Dashboard />} />

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

    </BrowserRouter>
  );
}

export default App;