import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="container nav-inner">
        <div className="brand">MB-Project</div>
        <nav className="nav-links">
          <NavLink to="/" end>Hem</NavLink>
          <NavLink to="/products">Produkter</NavLink>
          <NavLink to="/contact-us">Kontakta oss</NavLink>
          <NavLink to="/about">Om oss</NavLink>
        </nav>
      </div>
    </header>
  );
}

