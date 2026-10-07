import { useLocation } from "react-router-dom";

export function Footer() {
  const location = useLocation();

  // Mapeo de rutas a casas de Hogwarts
  const houseRoutes = {
    "/perfil/alejandro": "",
    "/perfil/daniela": "house-slytherin",
    "/perfil/juanpablo": "house-slytherin",
    "/perfil/lucas": "house-hufflepuff",
    "/perfil/sol": "house-gryffindor",
  };

  const currentHouseClass = houseRoutes[location.pathname] || "";

  return (
    <footer
      className={`footer-hallows py-4 w-100 mt-auto ${currentHouseClass}`}
    >
      <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center gap-3">
        <span className="hallows-titulo-footer font-lumos fs-4 m-0">
          Hallows Code
        </span>
        <p className="m-0 text-center copyright-texto small">
          © 2026 Todos los derechos reservados. Desarrollado con magia y código.
        </p>
        <a
          href="https://github.com/solprinz/tp2-grupo20/"
          target="_blank"
          rel="noreferrer"
          className="footer-link-hallows"
          aria-label="GitHub"
        >
          <i className="fa-brands fa-github fs-4"></i>
        </a>
      </div>
    </footer>
  );
}
