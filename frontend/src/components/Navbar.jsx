import { Link, useLocation } from "react-router-dom";

function Navbar() {
  const location = useLocation();

  return (

    <header className="app-header">
      <div className="header-logo">
        <span className="logo-icon">🧠</span>
        <span className="logo-text">NeuralDigit</span>
      </div>
      <nav className="header-nav">
        <Link 
          to="/" 
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          Workspace
        </Link>
        <Link 
          to="/history" 
          className={`nav-link ${location.pathname === "/history" ? "active" : ""}`}
        >
          History Log
        </Link>
      </nav>
    </header>

  );

}

export default Navbar;