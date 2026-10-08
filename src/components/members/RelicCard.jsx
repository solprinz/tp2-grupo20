import PropTypes from "prop-types";
import { proyectoShape, validarProps } from "./memberPropTypes";
import styles from "./ProjectRelics.module.css";

/**
 * Tarjeta de un proyecto, presentada como una de las Reliquias de la Muerte
 * (varita, piedra y capa).
 *
 * Componente presentacional sin estado: el padre (ProjectRelics) le indica
 * si está activa o explorada y le pasa `onAlternar`. Las ilustraciones son
 * SVG inline para poder colorearlas con `currentColor` según la casa.
 *
 * Comparte la hoja de estilos con ProjectRelics (misma pieza visual).
 */

const RELIQUIAS = [
  {
    nombre: "La varita",
    numeral: "I",
    arte: (
      <>
        <path d="M147 204 177 44 185 38 184 50 159 207Z" />
        <path
          d="m165 102 20 4m-24 18 21 4m-27 20 23 4"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
        />
      </>
    ),
  },
  {
    nombre: "La piedra",
    numeral: "II",
    arte: (
      <>
        <path d="m160 56 55 65-55 77-55-77Z" />
        <path
          d="m160 56 20 65-20 77-20-77Zm-55 65h110"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </>
    ),
  },
  {
    nombre: "La capa",
    numeral: "III",
    arte: (
      <>
        <path d="M160 48c-25 0-32 29-33 50l-51 110q84-28 168 0L193 98c-1-21-8-50-33-50Z" />
        <path
          d="M160 62q-19 4-19 37l19 14 19-14q0-33-19-37Zm-19 53-30 70m68-70 30 70"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        />
      </>
    ),
  },
];

export function RelicCard(props) {
  validarProps(RelicCard.propTypes, props, "RelicCard");
  const { proyecto, indice, activa, explorada, controlId, onAlternar, ref } =
    props;

  // Los tres primeros proyectos usan una reliquia propia; del cuarto en
  // adelante se reutilizan las ilustraciones y se numera como "Proyecto N".
  const reliquia = RELIQUIAS[indice % RELIQUIAS.length];
  const etiqueta =
    indice < RELIQUIAS.length
      ? `${reliquia.numeral} · ${reliquia.nombre}`
      : `Proyecto ${indice + 1}`;

  return (
    <article className={`${styles.tarjeta} ${activa ? styles.activa : ""}`}>
      {/* Al explorar la tarjeta, la silueta se cambia por la captura real. */}
      {explorada && proyecto.imagen ? (
        <img
          className={styles.captura}
          src={proyecto.imagen}
          alt={`Captura del proyecto ${proyecto.titulo}`}
          loading="lazy"
        />
      ) : (
        <svg
          className={styles.ilustracion}
          viewBox="0 0 320 240"
          role="img"
          aria-label={`Silueta de ${reliquia.nombre.toLowerCase()}`}
        >
          <circle
            cx="160"
            cy="123"
            r="88"
            fill="none"
            stroke="currentColor"
            opacity=".3"
          />
          <path
            d="M20 216q65-28 140 0t140 0"
            fill="none"
            stroke="currentColor"
            opacity=".35"
          />
          {reliquia.arte}
        </svg>
      )}
      <div className={styles.cuerpo}>
        <p className={styles.capitulo}>
          {etiqueta}
          {explorada && " · Explorada"}
        </p>
        <h3 className={styles.nombreProyecto}>{proyecto.titulo}</h3>
        {proyecto.subtitulo && (
          <p className={styles.subtituloProyecto}>{proyecto.subtitulo}</p>
        )}
        <p>{proyecto.resumen}</p>
        {/* Sin `historia` no hay nada que revelar: tarjeta informativa. */}
        {proyecto.historia && (
          <button
            ref={ref}
            type="button"
            className={styles.boton}
            aria-expanded={activa}
            aria-controls={activa ? controlId : undefined}
            onClick={onAlternar}
          >
            {activa ? "Cerrar historia" : "Revelar historia"}
          </button>
        )}
      </div>
    </article>
  );
}

RelicCard.propTypes = {
  proyecto: proyectoShape.isRequired,
  /** Posición del proyecto: define qué reliquia se dibuja. */
  indice: PropTypes.number.isRequired,
  /** true si su historia está abierta. */
  activa: PropTypes.bool.isRequired,
  /** true si el usuario ya la visitó alguna vez. */
  explorada: PropTypes.bool.isRequired,
  /** id de la historia que controla el botón (aria-controls). */
  controlId: PropTypes.string.isRequired,
  /** Abre o cierra la historia: la decide el padre. */
  onAlternar: PropTypes.func.isRequired,
  /** Ref al botón, para devolverle el foco al cerrar. */
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
