import { Link } from "react-router-dom";

export function MemberCard({ nombre, rol, casa, foto, path }) {
  return (
    <div className={`card card-cromo card-${casa} h-100 p-3`}>
      <div className="cromo-img-container mb-3">
        <img src={foto} alt={`Avatar de ${nombre}`} className="cromo-img" />
      </div>
      <div className="cromo-body text-center d-flex flex-column flex-grow-1">
        <h3 className="nombre-integrante font-lumos mb-2">{nombre}</h3>
        <p className="rol-integrante small text-uppercase fw-semibold mb-3 flex-grow-1">
          {rol}
        </p>
        <Link to={path} className="btn btn-ver-mas w-100 mt-auto">
          <i className="fa-solid fa-wand-magic-sparkles me-2"></i>
          REVELIO
        </Link>
      </div>
    </div>
  );
}
