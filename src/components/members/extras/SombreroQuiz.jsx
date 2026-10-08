import { useEffect, useRef, useState } from "react";
import styles from "./SombreroQuiz.module.css";

/**
 * El Sombrero Seleccionador: quiz "¿Qué casa de Hogwarts sos?"
 * Migrado del perfil de Daniela del TP1 (quiz-casas.js).
 *
 * Es un componente CON ESTADO autocontenido: guarda en qué paso está y los
 * puntajes de cada casa. No recibe props porque su contenido es propio de
 * Daniela; se registra en extras/index.js y la plantilla lo muestra.
 *
 * Accesibilidad conservada: el foco se mueve al título de cada pregunta y
 * al resultado, y el progreso se anuncia con aria-live.
 */

const CASAS = ["gryffindor", "slytherin", "ravenclaw", "hufflepuff"];

const ICONOS = {
  gryffindor: "/img/quiz/leon.png",
  slytherin: "/img/quiz/serpiente.png",
  ravenclaw: "/img/quiz/aguila.png",
  hufflepuff: "/img/quiz/tejon.png",
};

const PREGUNTAS = [
  {
    enunciado: "¿Qué valorás más en un amigo?",
    opciones: [
      { casa: "gryffindor", texto: "Valentía" },
      { casa: "slytherin", texto: "Ambición" },
      { casa: "ravenclaw", texto: "Inteligencia" },
      { casa: "hufflepuff", texto: "Lealtad" },
    ],
  },
  {
    enunciado: "¿Qué harías si ves una injusticia?",
    opciones: [
      { casa: "gryffindor", texto: "Enfrentarla de frente" },
      { casa: "slytherin", texto: "Buscar la forma de ganar" },
      { casa: "ravenclaw", texto: "Analizar la situación" },
      { casa: "hufflepuff", texto: "Ayudar a la víctima" },
    ],
  },
  {
    enunciado: "¿Cuál es tu lugar favorito de Hogwarts?",
    opciones: [
      { casa: "gryffindor", texto: "La sala común de Gryffindor" },
      { casa: "slytherin", texto: "Las mazmorras" },
      { casa: "ravenclaw", texto: "La biblioteca" },
      { casa: "hufflepuff", texto: "Las cocinas" },
    ],
  },
];

const RESULTADOS = {
  gryffindor: {
    nombre: "¡GRYFFINDOR!",
    frase: "Donde habitan los valientes de corazón.",
  },
  slytherin: {
    nombre: "¡SLYTHERIN!",
    frase: "Donde la ambición y la astucia reinan.",
  },
  ravenclaw: {
    nombre: "¡RAVENCLAW!",
    frase: "Donde la sabiduría abre todas las puertas.",
  },
  hufflepuff: {
    nombre: "¡HUFFLEPUFF!",
    frase: "Donde la lealtad es la mayor virtud.",
  },
};

const PUNTAJES_INICIALES = {
  gryffindor: 0,
  slytherin: 0,
  ravenclaw: 0,
  hufflepuff: 0,
};

/** Casa con más puntos; en caso de empate gana la primera de la lista. */
function calcularGanadora(puntajes) {
  let ganadora = CASAS[0];
  for (const casa of CASAS) {
    if (puntajes[casa] > puntajes[ganadora]) ganadora = casa;
  }
  return ganadora;
}

export function SombreroQuiz() {
  // paso 0..2 = preguntas; paso === PREGUNTAS.length = resultado.
  const [paso, setPaso] = useState(0);
  const [puntajes, setPuntajes] = useState(PUNTAJES_INICIALES);

  // Solo se mueve el foco cuando el cambio de paso lo provocó el usuario
  // (no al cargar la página).
  const moverFoco = useRef(false);
  const tituloRef = useRef(null);

  useEffect(() => {
    if (!moverFoco.current) return;
    moverFoco.current = false;
    tituloRef.current?.focus();
  }, [paso]);

  const responder = (casa) => {
    moverFoco.current = true;
    setPuntajes((previos) => ({ ...previos, [casa]: previos[casa] + 1 }));
    setPaso((previo) => previo + 1);
  };

  const reiniciar = () => {
    moverFoco.current = true;
    setPuntajes(PUNTAJES_INICIALES);
    setPaso(0);
  };

  const terminado = paso >= PREGUNTAS.length;
  const pregunta = PREGUNTAS[paso];
  const ganadora = terminado ? calcularGanadora(puntajes) : null;

  return (
    <section className={styles.raiz} aria-labelledby="quiz-titulo">
      <p className={styles.intro}>El Sombrero Seleccionador</p>
      <h2 id="quiz-titulo" className={styles.titulo}>
        ¿Qué casa de Hogwarts sos?
      </h2>

      <div className={styles.contenedor}>
        {terminado ? (
          <div className={styles.resultado}>
            <p className={styles.progreso}>El Sombrero ha decidido...</p>
            <h3
              ref={tituloRef}
              tabIndex={-1}
              className={styles.casaResultado}
              data-casa={ganadora}
            >
              {RESULTADOS[ganadora].nombre}
            </h3>
            <p className={styles.frase}>{RESULTADOS[ganadora].frase}</p>
            <button
              type="button"
              className={`${styles.boton} ${styles.reiniciar}`}
              onClick={reiniciar}
            >
              Jugar de nuevo
            </button>
          </div>
        ) : (
          <div key={paso}>
            <p className={styles.progreso} role="status" aria-live="polite">
              Pregunta {paso + 1} de {PREGUNTAS.length}
            </p>
            <h3 ref={tituloRef} tabIndex={-1} className={styles.pregunta}>
              {pregunta.enunciado}
            </h3>
            <div className={styles.opciones}>
              {pregunta.opciones.map(({ casa, texto }) => (
                <button
                  key={casa}
                  type="button"
                  className={styles.boton}
                  data-casa={casa}
                  onClick={() => responder(casa)}
                >
                  <img
                    src={ICONOS[casa]}
                    alt=""
                    aria-hidden="true"
                    className={styles.icono}
                  />
                  {texto}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
