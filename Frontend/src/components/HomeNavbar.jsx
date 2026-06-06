import "./HomeNavbar.css";
import { FaLungs } from "react-icons/fa";
import { Link } from "react-router-dom";

function HomeNavbar() {
  return (
    <nav className="home-navbar">

      <div className="logo-section">

  <div className="logo-icon">
    <FaLungs />
  </div>

  <div>

    <h2>PneumoAI</h2>

    <span>
      AI Healthcare Platform
    </span>

  </div>

</div>

      <ul className="nav-links">
  <li><a href="#home">Home</a></li>
  <li><a href="#features">Features</a></li>
  <li><a href="#how-it-works">How It Works</a></li>
  <li><a href="#about">About</a></li>
  <li><a href="#contact">Contact</a></li>
</ul>

<Link to="/login">
  <button className="login-btn">
    Login
  </button>
</Link>

    </nav>
  );
}

export default HomeNavbar;