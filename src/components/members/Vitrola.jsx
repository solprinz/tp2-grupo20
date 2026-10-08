import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import PropTypes from "prop-types";
import { favoritoShape, validarProps } from "./memberPropTypes";
import styles from "./Vitrola.module.css";

/**
 * La Vitriola: modal con vinilo giratorio y reproductor incrustado
 * (Spotify o YouTube), migrado del perfil de Daniela del TP1.
 *
 * Es reutilizable: se abre para cualquier favorito que tenga `embed` en
 * sus datos. FavoritesMap decide cuándo mostrarla (estado) y esta pieza
 * solo se dibuja y avisa con `onCerrar`.
 *
 * Accesibilidad (igual que en el TP1):
 *  - role="dialog" + aria-modal + título asociado.
 *  - El foco entra al botón de cerrar y vuelve al botón que la abrió.
 *  - Escape y clic en el fondo cierran; Tab queda atrapado dentro.
 *  - Se bloquea el scroll de la página mientras está abierta.
 *
 * Ciclo de vida: el efecto de montaje registra listeners y guarda el foco
 * previo; su función de limpieza (el "componentWillUnmount") los quita y
 * restaura todo al cerrarse.
 *
 * Se dibuja en un portal sobre <body> para que ningún contenedor del
 * perfil limite su posición fija; por eso no hereda las variables de color
 * de la casa y usa su propia paleta.
 */

const ALTO_EMBED = { spotify: "352", youtube: "315" };
const PERMISOS_EMBED = {
  spotify:
    "autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture",
  youtube:
    "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
};

const buscarDetalle = (item, etiqueta) =>
  item.detalles.find((d) => d.etiqueta === etiqueta)?.valor;

export function Vitrola(props) {
  validarProps(Vitrola.propTypes, props, "Vitrola");
  const { item, onCerrar, origenRef } = props;
  const { embed } = item;

  const cajaRef = useRef(null);
  const botonCerrarRef = useRef(null);
  // Siempre apunta al `onCerrar` más reciente sin reinstalar los listeners.
  const onCerrarRef = useRef(onCerrar);
  useEffect(() => {
    onCerrarRef.current = onCerrar;
  });

  useEffect(() => {
    // Foco de regreso: el botón que abrió la Vitriola (el padre lo guarda
    // porque Safari no enfoca los botones al hacer clic); si no hay, el
    // elemento que tenía el foco.
    const focoPrevio = origenRef?.current ?? document.activeElement;
    const overflowPrevio = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    botonCerrarRef.current?.focus();

    const alTeclear = (evento) => {
      if (evento.key === "Escape") {
        evento.preventDefault();
        onCerrarRef.current();
      }
    };
    document.addEventListener("keydown", alTeclear);

    return () => {
      document.removeEventListener("keydown", alTeclear);
      document.body.style.overflow = overflowPrevio;
      if (focoPrevio && typeof focoPrevio.focus === "function") {
        focoPrevio.focus();
      }
    };
    // Solo al montar/desmontar: `origenRef` es un objeto ref estable.
  }, [origenRef]);

  // Atrapa Tab dentro del modal (primer ↔ último elemento enfocable).
  const atraparTab = (evento) => {
    if (evento.key !== "Tab") return;
    const enfocables = cajaRef.current.querySelectorAll(
      'button, [href], iframe, input, select, textarea, [tabindex]:not([tabindex="-1"])',
    );
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

  const cancion = embed.cancion ?? item.titulo;
  const artista = item.subtitulo ?? buscarDetalle(item, "Artista");
  const anio = buscarDetalle(item, "Año");

  return createPortal(
    <div className={styles.vitrola}>
      <div className={styles.overlay} onClick={onCerrar} aria-hidden="true" />
      <div
        ref={cajaRef}
        className={styles.caja}
        role="dialog"
        aria-modal="true"
        aria-labelledby="vitrola-titulo"
        onKeyDown={atraparTab}
      >
        <div className={styles.cabecera}>
          <h2 id="vitrola-titulo" className={styles.titulo}>
            <span aria-hidden="true">🎶</span> La Vitriola
          </h2>
          <button
            ref={botonCerrarRef}
            type="button"
            className={styles.cerrar}
            aria-label="Cerrar la Vitriola"
            onClick={onCerrar}
          >
            ✕
          </button>
        </div>

        <div className={styles.cuerpo}>
          <div className={styles.vinilo}>
            {item.portada && (
              <img
                className={styles.portada}
                src={item.portada}
                alt={`Portada de ${cancion}${artista ? ` — ${artista}` : ""}`}
              />
            )}
          </div>
          <div className={styles.embed}>
            <iframe
              src={embed.url}
              title={embed.titulo}
              width="100%"
              height={ALTO_EMBED[embed.tipo]}
              allow={PERMISOS_EMBED[embed.tipo]}
              allowFullScreen={embed.tipo === "youtube"}
              loading="lazy"
              style={{ border: 0 }}
            />
          </div>
        </div>

        <div className={styles.info}>
          <p className={styles.cancion}>{cancion}</p>
          {artista && <p className={styles.artista}>{artista}</p>}
          {anio && <p className={styles.anio}>{anio}</p>}
        </div>

        <div className={styles.pie}>
          <button type="button" className={styles.boton} onClick={onCerrar}>
            Cerrar
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}

Vitrola.propTypes = {
  /** Favorito con `embed` (se muestra su portada, título y reproductor). */
  item: favoritoShape.isRequired,
  onCerrar: PropTypes.func.isRequired,
  /** Ref al botón que abrió la Vitriola: recibe el foco al cerrarse. */
  origenRef: PropTypes.shape({ current: PropTypes.any }),
};
