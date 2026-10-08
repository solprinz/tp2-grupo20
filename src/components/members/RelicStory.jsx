import PropTypes from "prop-types";
import { proyectoShape, validarProps } from "./memberPropTypes";
import styles from "./ProjectRelics.module.css";

/**
 * Historia desplegada de un proyecto: desafío, tecnologías, aporte y enlace.
 *
 * Componente presentacional sin estado. Avisa al padre con `onCerrar` y
 * recibe `tituloRef` para que el padre le mande el foco al abrirse.
 */
export function RelicStory(props) {
  validarProps(RelicStory.propTypes, props, "RelicStory");
  const { proyecto, id, onCerrar, tituloRef } = props;
  const { historia } = proyecto;

  return (
    <article className={styles.historia} id={id} aria-labelledby={`${id}-titulo`}>
      <p className={styles.capitulo}>{proyecto.titulo} · Historia</p>
      <h3
        id={`${id}-titulo`}
        ref={tituloRef}
        tabIndex={-1}
        className={styles.tituloHistoria}
      >
        {historia.titulo}
      </h3>
      <p>{historia.texto}</p>
      <dl>
        {historia.tecnologias && (
          <>
            <dt>Tecnologías</dt>
            <dd>{historia.tecnologias.join(" · ")}</dd>
          </>
        )}
        {historia.aporte && (
          <>
            <dt>Mi aporte</dt>
            <dd>{historia.aporte}</dd>
          </>
        )}
        {(historia.enlace || historia.nota) && (
          <>
            <dt>Demo y repositorio</dt>
            <dd>
              {historia.enlace ? (
                <a
                  href={historia.enlace.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {historia.enlace.texto}
                </a>
              ) : (
                historia.nota
              )}
            </dd>
          </>
        )}
      </dl>
      <button type="button" className={styles.boton} onClick={onCerrar}>
        Cerrar historia
      </button>
    </article>
  );
}

RelicStory.propTypes = {
  /** Proyecto cuya `historia` se muestra (debe tenerla). */
  proyecto: proyectoShape.isRequired,
  /** id del <article>; lo referencia el aria-controls del botón. */
  id: PropTypes.string.isRequired,
  onCerrar: PropTypes.func.isRequired,
  tituloRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
