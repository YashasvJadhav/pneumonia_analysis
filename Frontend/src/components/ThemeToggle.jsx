import { FaMoon, FaSun } from "react-icons/fa";
import { useTheme } from "../context/ThemeContext";
import "./ThemeToggle.css";

function ThemeToggle() {

  const { theme, toggleTheme } = useTheme();

  return (

    <button
      className="theme-toggle"
      onClick={toggleTheme}
    >

      <div
        className={`toggle-circle ${
          theme === "dark" ? "dark" : ""
        }`}
      >
        {theme === "light"
          ? <FaSun />
          : <FaMoon />
        }

      </div>

    </button>

  );

}

export default ThemeToggle;