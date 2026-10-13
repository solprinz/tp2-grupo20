import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    let ticking = false;

    const manejarScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollActual =
            window.scrollY || document.documentElement.scrollTop;
          setVisible(scrollActual > 300);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", manejarScroll, { passive: true });
    return () => window.removeEventListener("scroll", manejarScroll);
  }, []);

  const irArriba = () => {
    try {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } catch {
      window.scrollTo(0, 0);
    }
  };

  if (!visible) return null;

  // Lógica para asignar la clase del tema según la ruta actual
  const obtenerClaseTema = () => {
    const ruta = location.pathname.toLowerCase();

    // Mapeo por perfil
    if (ruta.includes("/perfil/daniela") || ruta.includes("/perfil/juanpablo"))
      return "tema-slytherin";
    if (ruta.includes("/perfil/lucas")) return "tema-hufflepuff";
    if (ruta.includes("/perfil/sol") || ruta.includes("/perfil/alejandro")) {
      return "tema-gryffindor";
    }

    // Por defecto para Home y otras secciones
    return "tema-home";
  };

  return (
    <button
      type="button"
      className={`boton-scroll-top ${obtenerClaseTema()}`}
      onClick={irArriba}
      aria-label="Volver arriba"
    >
      <i className="fa-solid fa-arrow-up" aria-hidden="true" />
    </button>
  );
}
