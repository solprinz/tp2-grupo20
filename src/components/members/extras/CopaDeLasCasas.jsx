import { useEffect, useState } from "react";
import styles from "./CopaDeLasCasas.module.css";

/**
 * La Copa de las Casas (perfil de Sol, TP1: copa-casas.js).
 *
 * Cada "Suceso de la semana" suma puntos a una casa; cuando Gryffindor
 * llega a 100 gana la copa. El puntaje se guarda en localStorage para que
 * sobreviva a recargas (igual que en el TP1).
 *
 * Decisiones de diseño:
 *  - Todo el estado vive en un solo objeto { puntos, indice } para guardarlo
 *    y restaurarlo de una vez.
 *  - El estado inicial se lee de localStorage (inicialización perezosa de
 *    useState) y un efecto lo vuelve a guardar cada vez que cambia.
 *  - Todas las lecturas/escrituras están en try/catch: en ventanas privadas
 *    o con el almacenamiento bloqueado, el componente igual funciona.
 */

const CLAVE_STORAGE = "hallows-copa-casas";
const META_PUNTOS = 100;
const MENSAJE_INICIAL =
  "Presioná el botón para enterarte de las últimas novedades del castillo...";
const MENSAJE_CAMPEON = "¡La Copa ya ha sido otorgada a Gryffindor este año!";

const CASAS = [
  { id: "gryffindor", nombre: "Gryffindor" },
  { id: "slytherin", nombre: "Slytherin" },
  { id: "ravenclaw", nombre: "Ravenclaw" },
  { id: "hufflepuff", nombre: "Hufflepuff" },
];

const SUCESOS = [
  {
    texto: "Harry Potter se cortó el cabello. ¡15 PUNTOS PARA GRYFFINDOR!",
    casa: "gryffindor",
    puntos: 15,
  },
  {
    texto:
      "Slytherin ganó el partido de Quidditch contra Ravenclaw. ¡5 PUNTOS PARA SLYTHERIN!",
    casa: "slytherin",
    puntos: 5,
  },
  {
    texto:
      "Ron encontró una moneda de 5 knuts en su túnica. ¡20 PUNTOS PARA GRYFFINDOR!",
    casa: "gryffindor",
    puntos: 20,
  },
  {
    texto:
      "Hufflepuff organizó un banquete de galletas para todo el castillo. ¡5 PUNTOS PARA HUFFLEPUFF!",
    casa: "hufflepuff",
    puntos: 5,
  },
  {
    texto:
      "Hermione levantó la mano en clase y esperó a que el profesor la autorizara a hablar. ¡10 PUNTOS PARA GRYFFINDOR!",
    casa: "gryffindor",
    puntos: 10,
  },
  {
    texto:
      "Neville recordó la contraseña de la Torre. ¡25 PUNTOS PARA GRYFFINDOR!",
    casa: "gryffindor",
    puntos: 25,
  },
  {
    texto:
      "Ravenclaw descubrió una nueva propiedad de la mandrágora. ¡5 PUNTOS PARA RAVENCLAW!",
    casa: "ravenclaw",
    puntos: 5,
  },
  {
    texto:
      "Harry respira el mismo aire que Dumbledore. ¡30 PUNTOS PARA GRYFFINDOR!",
    casa: "gryffindor",
    puntos: 30,
  },
];

const ESTADO_INICIAL = {
  puntos: { gryffindor: 0, slytherin: 0, ravenclaw: 0, hufflepuff: 0 },
  indice: 0,
};

/** Lee el estado guardado; si no hay o está dañado, devuelve el inicial. */
function leerEstadoGuardado() {
  try {
    const guardado = JSON.parse(localStorage.getItem(CLAVE_STORAGE));
    if (guardado && guardado.puntos && Number.isInteger(guardado.indice)) {
      return {
        puntos: { ...ESTADO_INICIAL.puntos, ...guardado.puntos },
        indice: guardado.indice % SUCESOS.length,
      };
    }
  } catch {
    /* almacenamiento no disponible o JSON inválido: se empieza de cero */
  }
  return ESTADO_INICIAL;
}

export function CopaDeLasCasas() {
  const [estado, setEstado] = useState(leerEstadoGuardado);
  const [ultimaCasa, setUltimaCasa] = useState(null); // casa a animar
  const [mensaje, setMensaje] = useState(() =>
    leerEstadoGuardado().puntos.gryffindor >= META_PUNTOS
      ? MENSAJE_CAMPEON
      : MENSAJE_INICIAL,
  );

  // Cada cambio de estado se guarda en localStorage.
  useEffect(() => {
    try {
      localStorage.setItem(CLAVE_STORAGE, JSON.stringify(estado));
    } catch {
      /* sin almacenamiento: la copa funciona igual, solo no persiste */
    }
  }, [estado]);

  const hayCampeon = estado.puntos.gryffindor >= META_PUNTOS;

  const lanzarSuceso = () => {
    if (hayCampeon) return;
    const suceso = SUCESOS[estado.indice];
    setEstado((previo) => ({
      puntos: {
        ...previo.puntos,
        [suceso.casa]: previo.puntos[suceso.casa] + suceso.puntos,
      },
      indice: (previo.indice + 1) % SUCESOS.length,
    }));
    setUltimaCasa(suceso.casa);
    setMensaje(suceso.texto);
  };

  const reiniciar = () => {
    setEstado(ESTADO_INICIAL);
    setUltimaCasa(null);
    setMensaje(MENSAJE_INICIAL);
  };

  return (
    <section className={styles.raiz} aria-labelledby="copa-titulo">
      <p className={styles.intro}>¿Quién ganará esta temporada?</p>
      <h2 id="copa-titulo" className={styles.titulo}>
        La Copa de las Casas
      </h2>

      <div className={styles.marcadores}>
        {CASAS.map(({ id, nombre }) => (
          <div key={id} className={`${styles.casa} ${styles[id]}`}>
            <h3 className={styles.nombreCasa}>{nombre}</h3>
            {/* `key` cambia con el puntaje: el span se remonta y la
                animación de "pop" se reinicia en cada suma. */}
            <span
              key={`${id}-${estado.puntos[id]}`}
              className={`${styles.puntos} ${ultimaCasa === id ? styles.pop : ""}`}
            >
              {estado.puntos[id]}
            </span>
          </div>
        ))}
      </div>

      <button
        type="button"
        className={styles.boton}
        onClick={lanzarSuceso}
        disabled={hayCampeon}
      >
        <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true" />
        Suceso de la semana
      </button>

      <div className={styles.caja}>
        <p role="status" aria-live="polite" className={styles.mensaje}>
          {mensaje}
        </p>
      </div>

      {hayCampeon && (
        <div className={styles.cartel} role="status">
          <h3 className={styles.tituloCartel}>
            🏆 ¡GRYFFINDOR ES EL CAMPEÓN DE LA COPA DE LAS CASAS! 🏆
          </h3>
          <p>Dumbledore ha vuelto a hacer de las suyas.</p>
        </div>
      )}

      <button type="button" className={styles.reiniciar} onClick={reiniciar}>
        <i className="fa-solid fa-rotate-left me-1" aria-hidden="true" />{" "}
        Reiniciar Torneo
      </button>
    </section>
  );
}
