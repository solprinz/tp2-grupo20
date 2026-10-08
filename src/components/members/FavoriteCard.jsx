import PropTypes from "prop-types";
import { favoritoShape, validarProps } from "./memberPropTypes";
import styles from "./FavoritesMap.module.css";

/**
 * Un "lugar" del Mapa del Merodeador: edificio, portada, título y botón.
 *
 * Componente presentacional: no tiene estado. El padre (FavoritesMap) le
 * dice si está seleccionado y le pasa `onVisitar`, que es la función que
 * cambia el estado del padre (patrón "levantar el estado").
 *
 * Comparte la hoja de estilos con FavoritesMap porque ambos forman una
 * misma pieza visual.
 */

// Siluetas SVG de los edificios; se reparten según la posición en el plano.
const EDIFICIOS = [
  "M20 60V25L80 4l60 21v35ZM35 25h90M40 32v22m25-22v22m30-22v22m25-22v22",
  "M48 60V20L80 2l32 18v40ZM58 20h44M70 60V42h20v18M72 26h16v8H72Z",
  "M15 60V22h130v38ZM10 22 80 2l70 20M30 32h20v18H30Zm40 28V32h20v28m20-28h20v18h-20Z",
];

export function FavoriteCard(props) {
  validarProps(FavoriteCard.propTypes, props, "FavoriteCard");
  const {
    item,
    indice,
    formato,
    seleccionado,
    fichaId,
    onVisitar,
    onEscuchar,
    ref,
  } = props;

  return (
    <article
      className={`${styles.lugar} ${seleccionado ? styles.seleccionado : ""}`}
    >
      <svg className={styles.edificio} viewBox="0 0 160 64" aria-hidden="true">
        <path d={EDIFICIOS[indice % EDIFICIOS.length]} />
      </svg>
      <p className={styles.leyenda}>{item.lugar}</p>
      {item.portada && (
        <img
          src={item.portada}
          alt={`Portada de ${item.titulo}`}
          className={`${styles.portada} ${formato === "album" ? styles.album : ""}`}
          loading="lazy"
        />
      )}
      <h3 className={styles.nombreLugar}>{item.titulo}</h3>
      {item.subtitulo && (
        <p className={styles.subtituloLugar}>{item.subtitulo}</p>
      )}
      <button
        ref={ref}
        type="button"
        className={styles.boton}
        aria-expanded={seleccionado}
        aria-controls={seleccionado ? fichaId : undefined}
        onClick={onVisitar}
      >
        Explorar {item.lugar.toLowerCase()}
      </button>
      {/* Solo los favoritos con reproductor (`embed`) ofrecen "Escuchar". */}
      {item.embed && onEscuchar && (
        <button
          type="button"
          className={styles.escuchar}
          aria-haspopup="dialog"
          onClick={onEscuchar}
        >
          <span aria-hidden="true">▶</span> Escuchar
          <span className="visually-hidden"> {item.titulo}</span>
        </button>
      )}
      <span className={styles.huellas} aria-hidden="true">
        <span>👣</span>
        <span>👣</span>
        <span>👣</span>
      </span>
    </article>
  );
}

FavoriteCard.propTypes = {
  /** Película o canción a mostrar. */
  item: favoritoShape.isRequired,
  /** Posición en el plano (elige la silueta del edificio). */
  indice: PropTypes.number.isRequired,
  /** "poster" (3:4) o "album" (cuadrada). */
  formato: PropTypes.oneOf(["poster", "album"]).isRequired,
  /** true si su ficha está abierta. */
  seleccionado: PropTypes.bool.isRequired,
  /** id de la ficha que controla el botón (aria-controls). */
  fichaId: PropTypes.string.isRequired,
  /** Se llama al pulsar "Explorar": el padre decide qué hacer. */
  onVisitar: PropTypes.func.isRequired,
  /** Abre la Vitriola; solo se usa si el favorito tiene `embed`. */
  onEscuchar: PropTypes.func,
  /** Ref al botón, para que el padre pueda devolverle el foco. */
  ref: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
};
