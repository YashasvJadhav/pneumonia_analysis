import { Link } from "react-router-dom";

function Sidebar() {
  return (
    <div className="sidebar">

      <Link to="/">Dashboard</Link>

      <Link to="/distribution">
        Class Distribution
      </Link>

      <Link to="/explorer">
        Dataset Explorer
      </Link>

      <Link to="/metadata">
        Metadata
      </Link>

      <Link to="/resolution">
        Resolution Analysis
      </Link>

      <Link to="/pixel">
        Pixel Analysis
      </Link>

      <Link to="/about">
        About
      </Link>

    </div>
  );
}

export default Sidebar;