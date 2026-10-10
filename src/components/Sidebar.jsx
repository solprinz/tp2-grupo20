import { NavLink, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";

/**
 * Menú lateral compartido (NAV-2).
 *
 * Comportamiento responsive:
 *  - Desktop/tablet (768px+): barra lateral fija de 250px que acompaña el
 *    scroll (position: sticky). La barra superior y el fondo no se muestran.
 *  - Mobile (<768px): una barra superior con el botón de menú; la sidebar
 *    es un panel que se desliza desde la izquierda, con fondo oscuro.
 *
 * El panel móvil se cierra con: botón ✕, clic en el fondo, tecla Escape,
 * elegir un enlace, cambiar de ruta o ensanchar la ventana a desktop.
 * Mientras está abierto bloquea el scroll de la página, mueve el foco al
 * botón de cierre y mantiene Tab dentro del panel.
 *
 * La sección activa la marca NavLink automáticamente (clase active-link y
 * aria-current="page").
 *
 * Los enlaces se agrupan bajo tres títulos desplegables (Integrantes,
 * Proyecto y Hogwarts). Solo se muestra abierto el grupo de la página
 * actual (en la portada, ninguno); los títulos también se abren y cierran a
 * mano, y abrir uno cierra los demás.
 */

// Enlaces de integrantes; los ids coinciden con /perfil/:id (membersData).
const INTEGRANTES = [
  {
    to: "/perfil/alejandro",
    label: "Alejandro",
    icon: "fa-solid fa-wand-sparkles",
  },
  { to: "/perfil/daniela", label: "Daniela", icon: "fa-solid fa-hat-wizard" },
  {
    to: "/perfil/juanpablo",
    label: "Juan Pablo",
    icon: "fa-solid fa-feather-pointed",
  },
  { to: "/perfil/lucas", label: "Lucas", icon: "fa-solid fa-code" },
  { to: "/perfil/sol", label: "Sol", icon: "fa-solid fa-cat" },
]; //le agregue iconitos a todos

const PROYECTO = [
  { to: "/arbol", label: "Árbol de Componentes", icon: "fa-solid fa-sitemap" },
  { to: "/bitacora", label: "Bitácora", icon: "fa-solid fa-book-bookmark" },
];

const HOGWARTS = [
  {
    to: "/estudiantes",
    label: "Estudiantes",
    icon: "fa-solid fa-user-graduate",
  },
  { to: "/hechizos", label: "Hechizos", icon: "fa-solid fa-bolt" },
];

// Grupos del menú. `prefijo` hace que cualquier /perfil/... abra Integrantes,
// incluso un id inexistente.
const GRUPOS = [
  {
    id: "integrantes",
    titulo: "Integrantes",
    prefijo: "/perfil/",
    enlaces: INTEGRANTES,
  },
  { id: "proyecto", titulo: "Proyecto", enlaces: PROYECTO },
  { id: "hogwarts", titulo: "Hogwarts", enlaces: HOGWARTS },
];

/** Id del grupo al que pertenece la ruta, o null (portada, 404, etc.). */
const grupoDeRuta = (pathname) =>
  GRUPOS.find(
    (g) =>
      (g.prefijo && pathname.startsWith(g.prefijo)) ||
      g.enlaces.some((e) => e.to === pathname),
  )?.id ?? null;

const claseEnlace = ({ isActive }) =>
  `nav-link ${isActive ? "active-link" : ""}`;

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  // Acordeón: id del único grupo abierto (o null). Arranca con el grupo de la
  // página actual, así la sección activa se ve sin tocar nada.
  const [grupoAbierto, setGrupoAbierto] = useState(() =>
    grupoDeRuta(location.pathname),
  );
  const toggleRef = useRef(null);
  const cerrarRef = useRef(null);
  const asideRef = useRef(null);

  // Cambiar de ruta (enlace, botón Atrás, etc.) cierra el panel móvil y abre
  // el grupo de la nueva página. Se compara durante el render en lugar de usar
  // un efecto: evita un render de más.
  const [rutaPrevia, setRutaPrevia] = useState(location.pathname);
  if (rutaPrevia !== location.pathname) {
    setRutaPrevia(location.pathname);
    setIsOpen(false);
    setGrupoAbierto(grupoDeRuta(location.pathname));
  }

  // Abrir un grupo cierra los demás; pulsar el abierto lo cierra.
  const alternarGrupo = (id) =>
    setGrupoAbierto((actual) => (actual === id ? null : id));

  const cerrar = (devolverFoco = false) => {
    setIsOpen(false);
    if (devolverFoco) toggleRef.current?.focus();
  };

  const getHouseClass = () => {
    const path = location.pathname;
    if (path.includes("/perfil/sol")) return "house-gryffindor";
    // Alejandro: sin clase de casa a propósito (tema Azkaban, sidebar neutra).
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

  // Panel móvil abierto: foco al botón de cierre, Escape cierra y se bloquea
  // el scroll de la página. La limpieza lo deshace todo al cerrar.
  useEffect(() => {
    if (!isOpen) return;
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    cerrarRef.current?.focus();

    const alTeclear = (evento) => {
      if (evento.key === "Escape") {
        setIsOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("keydown", alTeclear);

    return () => {
      document.body.style.overflow = overflowPrevio;
      document.removeEventListener("keydown", alTeclear);
    };
  }, [isOpen]);

  // Si la ventana se ensancha hasta desktop con el panel abierto, se cierra
  // (en desktop la sidebar es fija y no hay panel que cerrar).
  useEffect(() => {
    const consulta = window.matchMedia("(min-width: 768px)");
    const alCambiar = (evento) => {
      if (evento.matches) setIsOpen(false);
    };
    consulta.addEventListener("change", alCambiar);
    return () => consulta.removeEventListener("change", alCambiar);
  }, []);

  // Mantiene Tab dentro del panel mientras está abierto.
  const atraparTab = (evento) => {
    if (evento.key !== "Tab" || !isOpen) return;
    const enfocables = asideRef.current.querySelectorAll("a[href], button");
    if (!enfocables.length) return;
    const primero = enfocables[0];
    const ultimo = enfocables[enfocables.length - 1];
    if (evento.shiftKey && document.activeElement === primero) {
      evento.preventDefault();
      ultimo.focus();
    } else if (!evento.shiftKey && document.activeElement === ultimo) {
      evento.preventDefault();
      primero.focus();
    }
  };

  const houseClass = getHouseClass();

  return (
    <>
      {/* Barra superior: solo en mobile (el CSS la oculta desde 768px). */}
      <header className={`topbar-hallows ${houseClass}`}>
        <button
          ref={toggleRef}
          type="button"
          className="topbar-toggle"
          aria-label="Abrir menú"
          aria-expanded={isOpen}
          aria-controls="menu-lateral"
          onClick={() => setIsOpen(true)}
        >
          <i className="fa-solid fa-bars" aria-hidden="true"></i>
        </button>
        <span className="topbar-title font-lumos">Hallows Code</span>
      </header>

      {/* Fondo oscuro detrás del panel; un clic lo cierra. */}
      {isOpen && (
        <div
          className="sidebar-backdrop"
          aria-hidden="true"
          onClick={() => cerrar(true)}
        />
      )}

      <aside
        id="menu-lateral"
        ref={asideRef}
        className={`sidebar-hallows p-3 ${houseClass} ${isOpen ? "open" : ""}`}
        aria-label="Menú principal"
        onKeyDown={atraparTab}
      >
        <button
          ref={cerrarRef}
          type="button"
          className="sidebar-cerrar"
          aria-label="Cerrar menú"
          onClick={() => cerrar(true)}
        >
          <i className="fa-solid fa-xmark" aria-hidden="true"></i>
        </button>

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
          <NavLink to="/" onClick={() => cerrar()} className={claseEnlace}>
            <i className="fa-solid fa-house me-2"></i>Inicio
          </NavLink>

          {GRUPOS.map(({ id, titulo, enlaces }) => {
            const abierto = grupoAbierto === id;
            return (
              <div key={id} className={`nav-grupo ${abierto ? "abierto" : ""}`}>
                {/* Los tres títulos comparten el estilo del título original. */}
                <button
                  type="button"
                  id={`grupo-${id}-titulo`}
                  className="nav-grupo-titulo text-muted small fw-bold text-uppercase"
                  aria-expanded={abierto}
                  aria-controls={`grupo-${id}`}
                  onClick={() => alternarGrupo(id)}
                >
                  <span>{titulo}</span>
                  <i
                    className="fa-solid fa-chevron-down nav-grupo-flecha"
                    aria-hidden="true"
                  ></i>
                </button>
                <div
                  id={`grupo-${id}`}
                  className="nav-grupo-lista"
                  role="group"
                  aria-labelledby={`grupo-${id}-titulo`}
                >
                  <div className="nav-grupo-enlaces">
                    {enlaces.map(({ to, label, icon }) => (
                      <NavLink
                        key={to}
                        to={to}
                        onClick={() => cerrar()}
                        className={claseEnlace}
                      >
                        <i className={`${icon} me-2`}></i>
                        {label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="mt-auto pt-4text-center">
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
