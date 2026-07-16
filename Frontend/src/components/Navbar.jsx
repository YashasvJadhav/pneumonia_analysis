function Navbar({ onMenuClick }) {
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
        Pneumonia Analysis Dashboard
      </h1>

    </header>
  );
}

export default Navbar;