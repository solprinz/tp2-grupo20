import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import PropTypes from "prop-types";
import { WandContext } from "./WandContext";
import styles from "./WandProvider.module.css";

/**
 * Varita-cursor global (creada por Lucas en el TP1: cursor.js).
 *
 * Reemplaza el cursor del sistema en TODA la aplicación: sigue al mouse,
 * se inclina según la posición horizontal y brilla en la punta al pasar
 * sobre links, botones e inputs.
 *
 * Se monta una sola vez en App.jsx, por fuera de las rutas, así que no se
 * reinicia al navegar entre páginas.
 *
 * Decisiones de diseño:
 *  - Las animaciones usan estilos directos sobre el DOM (refs) porque cambian
 *    más de 15 veces por segundo; pasarlas por el estado de React volvería a
 *    renderizar toda la app sin necesidad. React solo guarda la `fase`.
 *  - Se respeta `prefers-reduced-motion` y los dispositivos sin puntero fino
 *    (táctiles): ahí no se dibuja la varita ni se oculta el cursor.
 *  - Los componentes pueden "desarmar" la varita con useWand().desarmar(): lo
 *    usa el duelo Expelliarmus del perfil de Lucas. Ese estado se restablece
 *    con reiniciar() (el duelo lo llama al desmontarse), de modo que la
 *    varita vuelve en cuanto se sale de su perfil.
 *
 * Ciclo de vida: los efectos registran listeners y clases en <body>; sus
 * funciones de limpieza (el "componentWillUnmount" de D8a) los quitan.
 */

// Clases globales sobre <body> (ocultan el cursor del sistema, ver .module.css).
const CLASE_VARITA_ACTIVA = "cursor-varita-activo";
const CLASE_VARITA_PERDIDA = "duelo-varita-perdido";

// Elementos sobre los que la punta brilla.
const SELECTOR_INTERACTIVO =
  'a, button, input, select, textarea, summary, [role="button"]';

const TIRONES = 15; // sacudidas aleatorias antes de caer
const MS_ENTRE_TIRONES = 60;
const aleatorio = (rango) => (Math.random() - 0.5) * rango;

export function WandProvider({ children }) {
  const [fase, setFase] = useState("activa"); // "activa" | "desarmando" | "perdida"

  // Preferencias del usuario, leídas una sola vez al montar.
  const [disponible] = useState(
    () =>
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const cursorRef = useRef(null);
  const varitaRef = useRef(null);
  const desarmadaRef = useRef(false);
  const visibleRef = useRef(false);
  const temporizadoresRef = useRef([]);

  const cancelarTemporizadores = useCallback(() => {
    temporizadoresRef.current.forEach((id) => {
      clearTimeout(id);
      clearInterval(id);
    });
    temporizadoresRef.current = [];
  }, []);

  // --- Ciclo de vida: oculta el cursor del sistema mientras haya varita ---
  useEffect(() => {
    if (!disponible) return;
    document.body.classList.add(CLASE_VARITA_ACTIVA);
    return () => document.body.classList.remove(CLASE_VARITA_ACTIVA);
  }, [disponible]);

  // Varita perdida: vuelve el cursor normal y la varita desaparece.
  useEffect(() => {
    if (!disponible || fase !== "perdida") return;
    document.body.classList.add(CLASE_VARITA_PERDIDA);
    return () => document.body.classList.remove(CLASE_VARITA_PERDIDA);
  }, [disponible, fase]);

  // --- Ciclo de vida: la varita sigue al mouse ---
  useEffect(() => {
    if (!disponible) return;
    const cursor = cursorRef.current;
    const varita = varitaRef.current;
    const raiz = document.documentElement;

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
    // La punta brilla sobre elementos interactivos (si no está caída).
    const alEntrar = (evento) => {
      if (
        !desarmadaRef.current &&
        evento.target.closest?.(SELECTOR_INTERACTIVO)
      ) {
        varita.classList.add(styles.punta);
      }
    };
    const alSalir = (evento) => {
      if (evento.target.closest?.(SELECTOR_INTERACTIVO)) {
        varita.classList.remove(styles.punta);
      }
    };
    // Al salir de la ventana se oculta; reaparece con el próximo movimiento.
    const alSalirDeLaVentana = () => {
      cursor.style.opacity = "0";
      visibleRef.current = false;
    };

    document.addEventListener("mousemove", alMover);
    document.addEventListener("mouseover", alEntrar);
    document.addEventListener("mouseout", alSalir);
    raiz.addEventListener("mouseleave", alSalirDeLaVentana);
    return () => {
      document.removeEventListener("mousemove", alMover);
      document.removeEventListener("mouseover", alEntrar);
      document.removeEventListener("mouseout", alSalir);
      raiz.removeEventListener("mouseleave", alSalirDeLaVentana);
    };
  }, [disponible]);

  // --- Ciclo de vida: cancelar timers pendientes al desmontar ---
  useEffect(() => cancelarTemporizadores, [cancelarTemporizadores]);

  /** Desarma la varita en (x, y): se sacude, cae y queda fuera de juego. */
  const desarmar = useCallback(
    (x, y) => {
      if (desarmadaRef.current) return;
      desarmadaRef.current = true;

      // Sin varita visible (táctil o movimiento reducido): solo cambia la fase.
      if (!disponible) {
        setFase("perdida");
        return;
      }

      setFase("desarmando");
      const cursor = cursorRef.current;
      const varita = varitaRef.current;
      varita.classList.remove(styles.punta);

      let contador = 0;
      const idIntervalo = setInterval(() => {
        cursor.style.left = `${x - 45 + aleatorio(400)}px`;
        cursor.style.top = `${y + aleatorio(400)}px`;
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
        temporizadoresRef.current.push(
          setTimeout(() => {
            cursor.style.top = `${window.innerHeight - 45}px`;
            cursor.style.left = `${x - 45 + aleatorio(300)}px`;
            varita.style.transform = "rotate(1080deg) scale(1)";
          }, 50),
          // Varita caída: queda fuera de juego y vuelve el cursor normal.
          setTimeout(() => setFase("perdida"), 1000),
        );
      }
    },
    [disponible],
  );

  /** Devuelve la varita a la normalidad (la usa el duelo al desmontarse). */
  const reiniciar = useCallback(() => {
    cancelarTemporizadores();
    desarmadaRef.current = false;
    cursorRef.current?.classList.remove(styles.caida);
    if (varitaRef.current) varitaRef.current.style.transform = "";
    setFase("activa");
  }, [cancelarTemporizadores]);

  const valor = useMemo(
    () => ({ disponible, fase, desarmar, reiniciar }),
    [disponible, fase, desarmar, reiniciar],
  );

  return (
    <WandContext.Provider value={valor}>
      {children}
      {disponible && (
        <div ref={cursorRef} className={styles.cursor} aria-hidden="true">
          <div ref={varitaRef} className={styles.varita} />
        </div>
      )}
    </WandContext.Provider>
  );
}

WandProvider.propTypes = {
  children: PropTypes.node,
};
