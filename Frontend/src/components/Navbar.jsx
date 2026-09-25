import { useLocation } from "react-router-dom";

function Navbar({ onMenuClick }) {
  const location = useLocation();

  const getPageTitle = (pathname) => {
    const path = pathname.replace(/\/+$/, "").toLowerCase() || "/";
    if (path === "/dashboard") {
      return "Pneumonia Analysis Dashboard";
    }
    if (path === "/history") {
      return "Analysis History";
    }
    if (path === "/upload") {
      return "Upload X-Ray";
    }
    if (path === "/profile") {
      return "My Profile";
    }
    if (path === "/edit-profile") {
      return "Edit Profile";
    }
    if (path === "/model-analysis") {
      return "Model Analysis";
    }
    if (path === "/about") {
      return "About";
    }
    if (path.startsWith("/results")) {
      return "Analysis Result";
    }
    if (path === "/processing") {
      return "Processing Analysis";
    }
    return "Pneumonia Analysis Dashboard";
  };

  return (
    <header className="navbar">

      <button
        className="menu-toggle"
        onClick={onMenuClick}
        aria-label="Open navigation menu"
      >
        ☰
      </button>

      <h1>
        {getPageTitle(location.pathname)}
      </h1>

    </header>
  );
}

export default Navbar;