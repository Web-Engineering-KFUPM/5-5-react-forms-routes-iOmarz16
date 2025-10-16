// src/App.jsx
import { NavLink, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Registration from "./pages/Registration";

export default function App() {
  return (
    <div className="app">
      {/* === Navigation Bar === */}
      <nav className="navbar">
        <div className="brand">🧑‍💻 Student Portal</div>
        <div className="links">
          <NavLink to="/" end className="navlink">
            Home
          </NavLink>
          <NavLink to="/about" className="navlink">
            About
          </NavLink>
          <NavLink to="/registration" className="navlink">
            Registration
          </NavLink>
        </div>
      </nav>

      {/* === Page Content === */}
      <main className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="*" element={<h2>404 — Not Found</h2>} />
        </Routes>
      </main>

      {/* === Footer === */}
      <footer className="footer">
        <span>© {new Date().getFullYear()} React Student Portal</span>
      </footer>
    </div>
  );
}
