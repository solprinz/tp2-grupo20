import PropTypes from "prop-types";

/**
 * Shapes de prop-types compartidos por la plantilla de perfiles.
 *
 * Viven en un único archivo para que MemberProfile, FavoritesMap y
 * ProjectRelics validen exactamente la misma estructura que exporta
 * src/data/membersData.js, sin duplicar definiciones.
 */

export const CASAS = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"];

/**
 * Equivalente a PropTypes.node pero compatible con React 19.
 *
 * `PropTypes.node` (prop-types 15.8) reconoce elementos por el símbolo
 * "react.element", y React 19 los marca con "react.transitional.element":
 * un <Componente /> válido se rechazaría con una advertencia falsa. Por eso
 * se acepta también cualquier objeto con una marca `$$typeof` de tipo symbol.
 */
const elementoReact = PropTypes.shape({ $$typeof: PropTypes.symbol });
export const nodoReact = PropTypes.oneOfType([
  PropTypes.node,
  elementoReact,
  PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.node, elementoReact])),
]);

/** Par etiqueta/valor genérico (datos personales y fichas de favoritos). */
export const detalleShape = PropTypes.shape({
  etiqueta: PropTypes.string.isRequired,
  valor: PropTypes.string.isRequired,
});

/** Reproductor incrustado (Vitriola): Spotify o YouTube. */
export const embedShape = PropTypes.shape({
  tipo: PropTypes.oneOf(["spotify", "youtube"]).isRequired,
  url: PropTypes.string.isRequired,
  titulo: PropTypes.string.isRequired,
  /** Nombre de la canción que se muestra en el reproductor. */
  cancion: PropTypes.string,
});

/** Película o canción favorita: un "lugar" del Mapa del Merodeador. */
export const favoritoShape = PropTypes.shape({
  titulo: PropTypes.string.isRequired,
  lugar: PropTypes.string.isRequired,
  subtitulo: PropTypes.string,
  portada: PropTypes.string,
  detalles: PropTypes.arrayOf(detalleShape).isRequired,
  /** Si existe, la tarjeta muestra un botón "Escuchar" que abre la Vitriola. */
  embed: embedShape,
});

/** Proyecto presentado como una de las Reliquias de la Muerte. */
export const proyectoShape = PropTypes.shape({
  titulo: PropTypes.string.isRequired,
  subtitulo: PropTypes.string,
  resumen: PropTypes.string.isRequired,
  imagen: PropTypes.string,
  historia: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    texto: PropTypes.string.isRequired,
    tecnologias: PropTypes.arrayOf(PropTypes.string),
    aporte: PropTypes.string,
    nota: PropTypes.string,
    enlace: PropTypes.shape({
      url: PropTypes.string.isRequired,
      texto: PropTypes.string.isRequired,
    }),
  }),
});

/** Integrante completo, tal como está en membersData.js. */
export const memberShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  nombre: PropTypes.string.isRequired,
  rol: PropTypes.string.isRequired,
  casa: PropTypes.oneOf(CASAS).isRequired,
  avatar: PropTypes.string.isRequired,
  /** Tema visual especial (redefine la paleta del perfil). */
  tema: PropTypes.oneOf(["azkaban"]),
  /** Texto sobre el nombre (por defecto: "Perfil personal"). */
  intro: PropTypes.string,
  /** Placa bajo el avatar, p. ej. un número de expediente. */
  placa: PropTypes.shape({
    titulo: PropTypes.string.isRequired,
    leyenda: PropTypes.string,
  }),
  datos: PropTypes.arrayOf(detalleShape),
  sobreMi: PropTypes.arrayOf(PropTypes.string),
  habilidades: PropTypes.arrayOf(PropTypes.string).isRequired,
  peliculas: PropTypes.arrayOf(favoritoShape).isRequired,
  canciones: PropTypes.arrayOf(favoritoShape).isRequired,
  proyectos: PropTypes.arrayOf(proyectoShape),
});

/**
 * React 19 dejó de ejecutar `Componente.propTypes` automáticamente (los
 * ignora en silencio). Para que la validación estricta siga funcionando,
 * cada componente llama a este helper al renderizar.
 *
 * - Solo corre en desarrollo: Vite elimina el bloque en el build.
 * - `checkPropTypes` deduplica: cada mensaje de error se muestra una vez.
 */
export function validarProps(propTypes, props, nombreComponente) {
  if (import.meta.env.DEV) {
    PropTypes.checkPropTypes(propTypes, props, "prop", nombreComponente);
  }
}
