import { NavLink, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const getHouseClass = () => {
    const path = location.pathname;
    if (path.includes("/perfil/sol")) return "house-gryffindor";
    if (path.includes("/perfil/alejandro"));
    if (path.includes("/perfil/daniela")) return "house-slytherin";
    if (path.includes("/perfil/juanpablo")) return "house-slytherin";
    if (path.includes("/perfil/lucas")) return "house-hufflepuff";
    return "";
  };

  const [modoOscuro, setModoOscuro] = useState(() => {
    return localStorage.getItem("modo-hallows") === "nox";
  });

  useEffect(() => {
    if (modoOscuro) {
      document.body.classList.add("nox-mode");
      localStorage.setItem("modo-hallows", "nox");
    } else {
      document.body.classList.remove("nox-mode");
      localStorage.setItem("modo-hallows", "lumos");
    }
  }, [modoOscuro]);

  return (
    <>
      <button
        className="btn btn-dark d-md-none position-fixed top-0 start-0 m-3 z-3"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Abrir o cerrar menú"
      >
        <i className="fa-solid fa-bars"></i>
      </button>

      <aside
        className={`sidebar-hallows p-3 ${getHouseClass()} ${isOpen ? "open" : ""}`}
      >
        <div className="sidebar-header text-center mb-4">
          <img
            src="/img/hallows-logo.png"
            alt="Hallows Logo"
            className="sidebar-logo rounded-circle mb-2"
            width="60"
            height="60"
          />
          <h2 className="h4 font-lumos m-0">Hallows Code</h2>
        </div>

        <nav className="nav flex-column gap-2">
          <NavLink
            to="/"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            <i className="fa-solid fa-house me-2"></i>Inicio
          </NavLink>

          <div className="text-muted small fw-bold mt-3 mb-1 text-uppercase px-2">
            Integrantes
          </div>
          <NavLink
            to="/perfil/alejandro"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Alejandro
          </NavLink>
          <NavLink
            to="/perfil/daniela"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Daniela
          </NavLink>
          <NavLink
            to="/perfil/juanpablo"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Juan Pablo
          </NavLink>
          <NavLink
            to="/perfil/lucas"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Lucas
          </NavLink>
          <NavLink
            to="/perfil/sol"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Sol
          </NavLink>

          <NavLink
            to="/arbol"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Árbol de Componentes
          </NavLink>
          <NavLink
            to="/estudiantes"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Estudiantes
          </NavLink>
          <NavLink
            to="/hechizos"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Hechizos
          </NavLink>
          <NavLink
            to="/bitacora"
            onClick={() => setIsOpen(false)}
            className={({ isActive }) =>
              `nav-link ${isActive ? "active-link" : ""}`
            }
          >
            Bitácora
          </NavLink>
        </nav>

        <div className="mt-auto pt-4 border-top border-secondary text-center">
          <button
            className="btn btn-outline-warning btn-sm w-100"
            onClick={() => setModoOscuro(!modoOscuro)}
          >
            <i className="fa-solid fa-wand-magic-sparkles me-1"></i>
            {modoOscuro ? "Lumos" : "Nox"}
          </button>
        </div>
      </aside>
    </>
  );
}
