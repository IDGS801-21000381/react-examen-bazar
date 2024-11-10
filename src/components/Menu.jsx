// src/components/Menu.jsx
import { Link, useLocation } from 'react-router-dom';

const Menu = () => {
  const location = useLocation();

  // Mostrar el menú solo cuando no estamos en la página de inicio
  if (location.pathname === '/') {
    return null;  // No mostrar el menú en la página de inicio
  }

  return (
    <div className="container-fluid">
      {/* Menú completo para pantallas grandes */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light d-none d-lg-flex">
        <Link className="navbar-brand" to="/">Tienda</Link>
        <ul className="navbar-nav ms-auto">
          {/* Botón de Inicio */}
          <li className="nav-item">
            <Link className="nav-link" to="/">Inicio</Link>
          </li>

          {/* Botón de Historial de Compras */}
          <li className="nav-item">
            <Link className="nav-link" to="/compras">Historial</Link>
          </li>
        </ul>
      </nav>

      {/* Menú con íconos para pantallas pequeñas */}
      <div className="d-lg-none">
        <div className="d-flex justify-content-center">
          {/* Botón de Inicio (casita) */}
          <Link to="/" className="btn btn-light mx-2">
            <i className="fas fa-home"></i>
          </Link>

          {/* Botón de Historial (bolso o billete) */}
          <Link to="/compras" className="btn btn-light mx-2">
            <i className="fas fa-shopping-bag"></i>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Menu;
