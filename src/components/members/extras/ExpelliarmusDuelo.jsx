import { useEffect, useRef, useState } from "react";
import styles from "./ExpelliarmusDuelo.module.css";

/**
 * Duelo Expelliarmus + cursor-varita (perfil de Lucas, TP1: cursor.js).
 *
 * Al lanzar el hechizo hay 50 % de ganar o perder:
 *   - Ganás:   el botón sale volando por la pantalla, cae y se desvanece.
 *   - Perdés:  la varita que hace de cursor se desarma, cae al suelo y el
 *              duelo termina ("Perdiste tu varita").
 *
 * Diferencias con el TP1 (a propósito):
 *  - La varita-cursor solo existe mientras este componente está montado, es
 *    decir, en el perfil de Lucas. Al salir de la página, la función de
 *    limpieza de los efectos (el "componentWillUnmount" de D8a) retira la
 *    varita, los listeners, los timers y las clases del <body>, y el
 *    cursor vuelve a ser el del sistema. Si el equipo quiere la varita en
 *    toda la app, este bloque se puede mover a un componente de layout.
 *  - Se respeta `prefers-reduced-motion` y los dispositivos sin puntero
 *    fino (táctiles): ahí no hay varita ni animaciones, pero el duelo
 *    funciona igual con los mensajes de texto.
 *
 * Las animaciones se hacen con estilos aplicados directamente al DOM (refs)
 * porque cambian ~15 veces por segundo; pasarlas por el estado de React
 * volvería a renderizar el componente sin necesidad. React solo guarda el
 * estado "visible" del duelo: la fase, la frase y el texto de la pregunta.
 */

const FRASES_VICTORIA = [
  "¡Venciste!",
  "¡Sos grande!",
  "¡Qué poder!",
  "¡Qué velocidad!",
  "¡Gran foco!",
];

const TEXTO_INICIAL = "Apostá tu varita en este duelo";
const TEXTO_PERDIDO = "Perdiste tu varita";

// Clases globales sobre <body> (ocultan el cursor del sistema, ver .module.css).
const CLASE_VARITA_ACTIVA = "cursor-varita-activo";
const CLASE_DUELO_PERDIDO = "duelo-varita-perdido";

const TIRONES = 15; // sacudidas aleatorias antes de caer
const MS_ENTRE_TIRONES = 60;

const aleatorio = (rango) => (Math.random() - 0.5) * rango;

export function ExpelliarmusDuelo() {
  const [fase, setFase] = useState("listo"); // "listo" | "perdido"
  const [textoDuelo, setTextoDuelo] = useState(TEXTO_INICIAL);
  const [frase, setFrase] = useState(null);

  // Preferencias del usuario, leídas una sola vez al montar.
  const [{ conVarita, reducirMovimiento }] = useState(() => {
    const reducir = window.matchMedia("(prefers-reduced-motion: reduce)")
      .matches;
    const punteroFino = window.matchMedia("(pointer: fine)").matches;
    return { conVarita: punteroFino && !reducir, reducirMovimiento: reducir };
  });

  const botonRef = useRef(null);
  const zonaBotonRef = useRef(null);
  const cursorRef = useRef(null);
  const varitaRef = useRef(null);
  const desarmadaRef = useRef(false);
  const animandoBotonRef = useRef(false);
  const visibleRef = useRef(false);
  const temporizadoresRef = useRef([]);

  /** Programa un timeout y lo registra para cancelarlo al desmontar. */
  const esperar = (accion, ms) => {
    const id = setTimeout(accion, ms);
    temporizadoresRef.current.push(id);
    return id;
  };

  // --- Ciclo de vida: clase global que oculta el cursor del sistema ---
  useEffect(() => {
    if (!conVarita) return;
    document.body.classList.add(CLASE_VARITA_ACTIVA);
    return () => document.body.classList.remove(CLASE_VARITA_ACTIVA);
  }, [conVarita]);

  // Duelo perdido: vuelve el cursor normal (la varita queda fuera de juego).
  useEffect(() => {
    if (!conVarita || fase !== "perdido") return;
    document.body.classList.add(CLASE_DUELO_PERDIDO);
    return () => document.body.classList.remove(CLASE_DUELO_PERDIDO);
  }, [conVarita, fase]);

  // --- Ciclo de vida: la varita sigue al mouse ---
  useEffect(() => {
    if (!conVarita) return;
    const cursor = cursorRef.current;
    const varita = varitaRef.current;

    const alMover = (evento) => {
      // Visible recién con el primer movimiento (no queda una varita fija).
      if (!visibleRef.current) {
        cursor.style.opacity = "1";
        visibleRef.current = true;
      }
      if (desarmadaRef.current) return;
      cursor.style.left = `${evento.clientX - 45}px`;
      cursor.style.top = `${evento.clientY}px`;
      const angulo = (evento.clientX / window.innerWidth - 1) * 90;
      varita.style.transform = `rotate(${angulo}deg)`;
    };
    // La punta brilla sobre elementos interactivos (si la varita no está caída).
    const alEntrar = (evento) => {
      if (!desarmadaRef.current && evento.target.closest?.("a, button, input")) {
        varita.classList.add(styles.punta);
      }
    };
    const alSalir = (evento) => {
      if (evento.target.closest?.("a, button, input")) {
        varita.classList.remove(styles.punta);
      }
    };

    document.addEventListener("mousemove", alMover);
    document.addEventListener("mouseover", alEntrar);
    document.addEventListener("mouseout", alSalir);
    return () => {
      document.removeEventListener("mousemove", alMover);
      document.removeEventListener("mouseover", alEntrar);
      document.removeEventListener("mouseout", alSalir);
    };
  }, [conVarita]);

  // --- Ciclo de vida: cancelar timers pendientes al salir de la página ---
  useEffect(() => {
    const temporizadores = temporizadoresRef.current;
    return () => {
      temporizadores.forEach((id) => {
        clearTimeout(id);
        clearInterval(id);
      });
    };
  }, []);

  // ---- Caso "perdés": la varita del cursor se desarma ----
  const desarmarVarita = (evento) => {
    desarmadaRef.current = true;
    setTextoDuelo(TEXTO_PERDIDO);
    setFrase(null);

    // Sin varita visible (táctil o movimiento reducido): solo el texto.
    if (!conVarita) {
      setFase("perdido");
      return;
    }

    const cursor = cursorRef.current;
    const varita = varitaRef.current;
    const { clientX, clientY } = evento;
    varita.classList.remove(styles.punta);

    let contador = 0;
    const idIntervalo = setInterval(() => {
      cursor.style.left = `${clientX - 45 + aleatorio(400)}px`;
      cursor.style.top = `${clientY + aleatorio(400)}px`;
      varita.style.transform = `rotate(${aleatorio(720)}deg) scale(1.5)`;
      contador += 1;

      if (contador >= TIRONES) {
        clearInterval(idIntervalo);
        caerAlSuelo();
      }
    }, MS_ENTRE_TIRONES);
    temporizadoresRef.current.push(idIntervalo);

    function caerAlSuelo() {
      cursor.classList.add(styles.caida);
      esperar(() => {
        cursor.style.top = `${window.innerHeight - 45}px`;
        cursor.style.left = `${clientX - 45 + aleatorio(300)}px`;
        varita.style.transform = "rotate(1080deg) scale(1)";
      }, 50);
      // Duelo perdido: la varita queda fuera de juego y el botón se bloquea.
      esperar(() => setFase("perdido"), 1000);
    }
  };

  // ---- Caso "ganás": el botón mismo repite la coreografía de la varita ----
  const botonQueVuela = (evento) => {
    animandoBotonRef.current = true;
    setFrase(
      FRASES_VICTORIA[Math.floor(Math.random() * FRASES_VICTORIA.length)],
    );

    // Sin animación (movimiento reducido): solo se muestra la frase.
    if (reducirMovimiento) {
      esperar(() => {
        animandoBotonRef.current = false;
        setFrase(null);
      }, 3500);
      return;
    }

    const boton = botonRef.current;
    const zona = zonaBotonRef.current;
    const rect = boton.getBoundingClientRect();

    // Se congela el alto de la zona: el hueco que deja el botón al volar se
    // conserva y la frase de victoria queda justo donde estaba.
    zona.style.height = `${zona.offsetHeight}px`;

    // Se saca del flujo para poder animarlo por toda la pantalla.
    Object.assign(boton.style, {
      position: "fixed",
      left: `${rect.left}px`,
      top: `${rect.top}px`,
      width: `${rect.width}px`,
      zIndex: "9999",
      margin: "0",
      transition: "none",
      pointerEvents: "none",
    });

    let contador = 0;
    const idIntervalo = setInterval(() => {
      boton.style.left = `${evento.clientX - rect.width / 2 + aleatorio(400)}px`;
      boton.style.top = `${evento.clientY - rect.height / 2 + aleatorio(400)}px`;
      boton.style.transform = `rotate(${aleatorio(720)}deg) scale(1.5)`;
      contador += 1;

      if (contador >= TIRONES) {
        clearInterval(idIntervalo);
        caerAlSuelo();
      }
    }, MS_ENTRE_TIRONES);
    temporizadoresRef.current.push(idIntervalo);

    function caerAlSuelo() {
      esperar(() => {
        boton.style.top = `${window.innerHeight - rect.height}px`;
        boton.style.left = `${evento.clientX - rect.width / 2 + aleatorio(300)}px`;
        boton.style.transform = "rotate(1080deg) scale(1)";
        boton.style.transition = "all 0.35s ease";
      }, 50);

      // Ya en el suelo, se va desvaneciendo.
      esperar(() => {
        boton.style.opacity = "0";
        boton.style.transition = "opacity 1.2s ease";
      }, 500);

      // Vuelve completo a su lugar en el flujo.
      esperar(() => {
        boton.removeAttribute("style");
        zona.style.height = "";
        animandoBotonRef.current = false;
        setFrase(null);
      }, 3500);
    }
  };

  const lanzarHechizo = (evento) => {
    if (desarmadaRef.current || animandoBotonRef.current) return;
    const usuarioGana = Math.random() < 0.5;
    if (usuarioGana) botonQueVuela(evento);
    else desarmarVarita(evento);
  };

  return (
    <section className={styles.raiz} aria-label="Duelo Expelliarmus">
      <p className={styles.pregunta}>{textoDuelo}</p>

      <div ref={zonaBotonRef} className={styles.zonaBoton}>
        <button
          ref={botonRef}
          type="button"
          className={styles.boton}
          disabled={fase === "perdido"}
          onClick={lanzarHechizo}
        >
          <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true" />
          ¡Expelliarmus!
        </button>
        <p className={styles.resultado} role="status" aria-live="polite">
          {frase}
        </p>
      </div>

      {conVarita && (
        <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
          <div ref={varitaRef} className={styles.varita} />
        </div>
      )}
    </section>
  );
}
