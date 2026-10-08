import { useEffect, useId, useRef, useState } from "react";
import PropTypes from "prop-types";
import { RelicCard } from "./RelicCard";
import { RelicStory } from "./RelicStory";
import { proyectoShape, validarProps } from "./memberPropTypes";
import styles from "./ProjectRelics.module.css";

/**
 * "El relato de las creaciones": componente CON ESTADO que coordina a sus
 * hijos presentacionales.
 *
 *   ProjectRelics (estado: proyecto abierto + proyectos explorados)
 *   ├── RelicCard × N   → una tarjeta por proyecto (recibe `onAlternar`)
 *   └── RelicStory      → la historia del proyecto abierto (recibe `onCerrar`)
 *
 * Solo una historia queda abierta a la vez. El contador cuenta únicamente
 * los proyectos que tienen `historia`, y reabrir uno no suma de nuevo.
 */
export function ProjectRelics(props) {
  validarProps(ProjectRelics.propTypes, props, "ProjectRelics");
  const { proyectos } = props;

  const [activo, setActivo] = useState(null); // índice del proyecto abierto
  const [exploradas, setExploradas] = useState([]); // índices ya visitados

  const uid = useId();
  const historiaId = `${uid}-historia`;
  const focoPendiente = useRef(null);
  const botonesRef = useRef([]);
  const tituloHistoriaRef = useRef(null);

  // Mismo patrón de foco diferido que FavoritesMap.
  useEffect(() => {
    const pendiente = focoPendiente.current;
    if (!pendiente) return;
    focoPendiente.current = null;
    if (pendiente.tipo === "historia") tituloHistoriaRef.current?.focus();
    else botonesRef.current[pendiente.indice]?.focus();
  }, [activo]);

  const totalExplorables = proyectos.filter((p) => p.historia).length;
  const completo =
    totalExplorables > 0 && exploradas.length === totalExplorables;

  const alternar = (indice) => {
    if (activo === indice) {
      focoPendiente.current = { tipo: "boton", indice };
      setActivo(null);
      return;
    }
    focoPendiente.current = { tipo: "historia" };
    setActivo(indice);
    // Visitas únicas: reabrir una tarjeta no suma de nuevo.
    setExploradas((previas) =>
      previas.includes(indice) ? previas : [...previas, indice],
    );
  };

  const manejarTeclado = (evento) => {
    if (evento.key === "Escape" && activo !== null) {
      evento.preventDefault();
      focoPendiente.current = { tipo: "boton", indice: activo };
      setActivo(null);
    }
  };

  const proyectoActivo = activo !== null ? proyectos[activo] : null;
  const titulo =
    proyectos.length === 3
      ? "El relato de las tres creaciones"
      : "El relato de mis creaciones";

  return (
    <section
      className={styles.reliquias}
      aria-labelledby={`${uid}-titulo`}
      onKeyDown={manejarTeclado}
    >
      <header className={styles.encabezado}>
        <p className={styles.capitulo}>{titulo}</p>
        <h2 id={`${uid}-titulo`} className={styles.titulo}>
          Proyectos destacados
        </h2>
        <p>Toda creación tiene una historia.</p>
      </header>

      <div className={styles.tarjetas}>
        {proyectos.map((proyecto, indice) => (
          <RelicCard
            key={proyecto.titulo}
            ref={(el) => {
              botonesRef.current[indice] = el;
            }}
            proyecto={proyecto}
            indice={indice}
            activa={activo === indice}
            explorada={exploradas.includes(indice)}
            controlId={historiaId}
            onAlternar={() => alternar(indice)}
          />
        ))}
      </div>

      {proyectoActivo?.historia && (
        <RelicStory
          key={activo}
          id={historiaId}
          proyecto={proyectoActivo}
          tituloRef={tituloHistoriaRef}
          onCerrar={() => alternar(activo)}
        />
      )}

      {totalExplorables > 0 && (
        <p role="status" aria-live="polite" className={styles.progreso}>
          {exploradas.length} de {totalExplorables} historias exploradas.
        </p>
      )}

      {completo && (
        <div className={styles.final} role="status">
          {/* role="status": los lectores de pantalla anuncian el logro. */}
          <svg viewBox="0 0 120 120" width="96" height="96" aria-hidden="true">
            <path d="M60 8 8 108h104Z M60 8v100" />
            <circle cx="60" cy="76" r="31" />
          </svg>
          <p>La verdadera magia está en lo que creamos.</p>
        </div>
      )}
    </section>
  );
}

ProjectRelics.propTypes = {
  /** Proyectos a presentar (los 3 primeros usan varita, piedra y capa). */
  proyectos: PropTypes.arrayOf(proyectoShape).isRequired,
};
