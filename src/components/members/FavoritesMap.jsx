import { useEffect, useId, useRef, useState } from "react";
import PropTypes from "prop-types";
import { FavoriteCard } from "./FavoriteCard";
import { FavoriteDetail } from "./FavoriteDetail";
import { Vitrola } from "./Vitrola";
import { favoritoShape, validarProps } from "./memberPropTypes";
import styles from "./FavoritesMap.module.css";

/**
 * Mapa del Merodeador: componente CON ESTADO (contenedor de la interacción).
 *
 * Guarda qué lugar está visitado, si el mapa está abierto y el mensaje de
 * estado, y reparte el trabajo de dibujar entre dos hijos sin estado:
 *   - <FavoriteCard />   → cada lugar del plano (recibe `onVisitar`).
 *   - <FavoriteDetail /> → la ficha del lugar activo (recibe `onCerrar`).
 *
 * Es el patrón "padre con estado + hijos presentacionales": los hijos no
 * cambian nada por su cuenta, solo llaman a las funciones que el padre les
 * pasa por props.
 *
 * Se usa dos veces por perfil (películas y canciones); lo único que cambia
 * son los datos (`items`) y el formato de portada (`formato`).
 * Accesibilidad conservada del TP1: aria-expanded / aria-controls, región
 * aria-live, Escape para cerrar y foco que vuelve al botón.
 */
export function FavoritesMap(props) {
  validarProps(FavoritesMap.propTypes, props, "FavoritesMap");
  // React 19 no admite `defaultProps` en funciones: los valores por defecto
  // se declaran al desestructurar.
  const {
    titulo,
    subtitulo,
    leyenda = "Cartografía de mis favoritos",
    items,
    formato = "poster",
  } = props;

  const [abierto, setAbierto] = useState(false);
  const [activo, setActivo] = useState(null); // índice del lugar visitado
  const [escuchando, setEscuchando] = useState(null); // índice en la Vitriola
  const [mensaje, setMensaje] = useState("El mapa espera tu primer recorrido.");

  // ids únicos por instancia: la página monta dos mapas a la vez.
  const uid = useId();
  const tituloId = `${uid}-titulo`;
  const planoId = `${uid}-plano`;
  const fichaId = `${uid}-ficha`;

  // Gestión de foco: se anota qué enfocar y se aplica tras renderizar,
  // cuando el elemento destino ya existe en el DOM.
  const focoPendiente = useRef(null);
  const botonAbrirRef = useRef(null);
  const botonesLugarRef = useRef([]);
  const tituloFichaRef = useRef(null);
  const origenVitrolaRef = useRef(null); // botón "Escuchar" que abrió la Vitriola

  useEffect(() => {
    const pendiente = focoPendiente.current;
    if (!pendiente) return;
    focoPendiente.current = null;
    if (pendiente.tipo === "ficha") tituloFichaRef.current?.focus();
    else botonesLugarRef.current[pendiente.indice]?.focus();
  }, [activo]);

  const abrirMapa = () => {
    setAbierto(true);
    setMensaje("Caminos revelados. Elegí un favorito para explorar.");
  };

  const cerrarFicha = (indiceParaFoco) => {
    focoPendiente.current = { tipo: "boton", indice: indiceParaFoco };
    setActivo(null);
    setMensaje("Ficha cerrada. Podés seguir explorando.");
  };

  const visitar = (indice) => {
    // Toggle: volver a pulsar el mismo lugar cierra su ficha.
    if (activo === indice) {
      cerrarFicha(indice);
      return;
    }
    focoPendiente.current = { tipo: "ficha" };
    setAbierto(true);
    setActivo(indice);
    setMensaje(`Explorando: ${items[indice].titulo}.`);
  };

  const cerrarMapa = () => {
    setActivo(null);
    setAbierto(false);
    setMensaje("Travesura realizada. Los favoritos siguen en el mapa.");
    botonAbrirRef.current?.focus();
  };

  const manejarTeclado = (evento) => {
    // Los eventos de la Vitriola (portal) también suben hasta aquí: mientras
    // está abierta, Escape le corresponde a ella y no a la ficha.
    if (escuchando !== null) return;
    if (evento.key === "Escape" && activo !== null) {
      evento.preventDefault();
      cerrarFicha(activo);
    }
  };

  const itemActivo = activo !== null ? items[activo] : null;

  return (
    <section
      className={`${styles.mapa} ${abierto ? styles.abierto : ""}`}
      aria-labelledby={tituloId}
      onKeyDown={manejarTeclado}
    >
      <header className={styles.cabecera}>
        <p className={styles.leyenda}>{leyenda}</p>
        <h2 id={tituloId} className={styles.titulo}>
          {titulo}
        </h2>
        <p className={styles.subtitulo}>{subtitulo}</p>
        <button
          ref={botonAbrirRef}
          type="button"
          className={styles.boton}
          aria-expanded={abierto}
          aria-controls={planoId}
          onClick={abrirMapa}
        >
          Juro solemnemente…
        </button>
      </header>

      <div className={styles.distribucion}>
        <div id={planoId} className={styles.plano}>
          <span className={styles.brujula} aria-hidden="true">
            N<br />✧
          </span>
          <div className={styles.camino} aria-hidden="true" />

          {items.map((item, indice) => (
            <FavoriteCard
              key={item.titulo}
              ref={(el) => {
                botonesLugarRef.current[indice] = el;
              }}
              item={item}
              indice={indice}
              formato={formato}
              seleccionado={activo === indice}
              fichaId={fichaId}
              onVisitar={() => visitar(indice)}
              onEscuchar={(evento) => {
                origenVitrolaRef.current = evento.currentTarget;
                setEscuchando(indice);
              }}
            />
          ))}
        </div>

        <div className={styles.panel}>
          {itemActivo ? (
            <FavoriteDetail
              key={activo}
              id={fichaId}
              item={itemActivo}
              numero={activo + 1}
              tituloRef={tituloFichaRef}
              onCerrar={() => cerrarFicha(activo)}
            />
          ) : (
            <p className={styles.invitacion}>
              Elegí un lugar del mapa para descubrir su historia.
            </p>
          )}
        </div>
      </div>

      <footer className={styles.pie}>
        <p role="status" aria-live="polite" className={styles.estado}>
          {mensaje}
        </p>
        {abierto && (
          <button type="button" className={styles.boton} onClick={cerrarMapa}>
            Travesura realizada
          </button>
        )}
      </footer>

      {/* Vitriola: modal con reproductor (favoritos que tienen `embed`). */}
      {escuchando !== null && (
        <Vitrola
          item={items[escuchando]}
          origenRef={origenVitrolaRef}
          onCerrar={() => setEscuchando(null)}
        />
      )}
    </section>
  );
}

FavoritesMap.propTypes = {
  /** Título de la sección (h2). */
  titulo: PropTypes.string.isRequired,
  /** Frase manuscrita bajo el título. */
  subtitulo: PropTypes.string.isRequired,
  /** Leyenda pequeña sobre el título. */
  leyenda: PropTypes.string,
  /** Favoritos a ubicar en el plano. */
  items: PropTypes.arrayOf(favoritoShape).isRequired,
  /** "poster" (3:4, películas) o "album" (cuadrada, discos). */
  formato: PropTypes.oneOf(["poster", "album"]),
};
