import {
  NavLink,
  useNavigate,
} from "react-router-dom";

function Sidebar({ isOpen, onClose }) {
  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside
      className={`sidebar ${
        isOpen ? "sidebar-open" : ""
      }`}
    >
      <div className="sidebar-menu">

        <NavLink
          to="/dashboard"
          onClick={onClose}
        >
          Dashboard
        </NavLink>

        <NavLink
          to="/history"
          onClick={onClose}
        >
          Analysis History
        </NavLink>

        <NavLink
          to="/upload"
          onClick={onClose}
        >
          Upload X-Ray
        </NavLink>

        <NavLink
          to="/profile"
          onClick={onClose}
        >
          My Profile
        </NavLink>

        <NavLink
          to="/model-analysis"
          onClick={onClose}
        >
          Model Analysis
        </NavLink>

        <NavLink
          to="/about"
          onClick={onClose}
        >
          About
        </NavLink>

      </div>

      <div className="sidebar-user">

        <div className="sidebar-avatar">
          {user?.first_name?.[0]?.toUpperCase() || "U"}
        </div>

        <div className="sidebar-user-info">

          <strong>
            {user
              ? `${user.first_name} ${user.last_name}`
              : "User"}
          </strong>

          <span>
            {user?.email || ""}
          </span>

        </div>

        <button
          className="logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>

      </div>

    </aside>
  );
}

export default Sidebar;