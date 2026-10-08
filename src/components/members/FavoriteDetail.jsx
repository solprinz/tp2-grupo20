import PropTypes from "prop-types";
import { favoritoShape, validarProps } from "./memberPropTypes";
import styles from "./FavoritesMap.module.css";

/**
 * Ficha desplegada de un favorito (director, año, género, letra, etc.).
 *
 * Componente presentacional sin estado: muestra lo que recibe y avisa al
 * padre con `onCerrar`. Recibe `tituloRef` para que el padre pueda mandar
 * el foco al título cuando la ficha se abre (accesibilidad).
 */
export function FavoriteDetail(props) {
  validarProps(FavoriteDetail.propTypes, props, "FavoriteDetail");
  const { item, numero, id, onCerrar, tituloRef } = props;

  return (
    <article className={styles.ficha} id={id} aria-labelledby={`${id}-titulo`}>
      <p className={styles.leyenda}>
        {item.lugar} · Archivo {String(numero).padStart(2, "0")}
      </p>
      <h3
        id={`${id}-titulo`}
        ref={tituloRef}
        tabIndex={-1}
        className={styles.tituloFicha}
      >
        {item.titulo}
      </h3>
      <dl className={styles.detalles}>
        {item.detalles.map(({ etiqueta, valor }) => (
          <div key={etiqueta}>
            <dt>{etiqueta}</dt>
            <dd>{valor}</dd>
          </div>
        ))}
      </dl>
      <button type="button" className={styles.boton} onClick={onCerrar}>
        Cerrar ficha
      </button>
    </article>
  );
}

FavoriteDetail.propTypes = {
  item: favoritoShape.isRequired,
  /** Número de archivo mostrado en la leyenda (empieza en 1). */
  numero: PropTypes.number.isRequired,
  /** id del <article>; lo referencia el aria-controls del botón. */
  id: PropTypes.string.isRequired,
  onCerrar: PropTypes.func.isRequired,
  tituloRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
