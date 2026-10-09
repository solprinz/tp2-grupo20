import { useEffect, useRef, useState } from "react";
import { useWand } from "../../wand/WandContext";
import styles from "./ExpelliarmusDuelo.module.css";

/**
 * Duelo Expelliarmus (perfil de Lucas, TP1: cursor.js).
 *
 * Al lanzar el hechizo hay 50 % de ganar o perder:
 *   - Ganás:   el botón sale volando por la pantalla, cae y se desvanece.
 *   - Perdés:  la varita-cursor se desarma, cae al suelo y el duelo termina
 *              ("Perdiste tu varita").
 *
 * La varita-cursor ya no vive aquí: es global (components/wand/WandProvider)
 * y está en todas las páginas. Este componente solo la usa a través de
 * useWand(): al perder llama a `desarmar()` y, al salir del perfil, llama a
 * `reiniciar()` para que la varita vuelva en el resto de la app.
 *
 * Se respeta `prefers-reduced-motion` y los dispositivos sin puntero fino
 * (táctiles): ahí no hay varita ni animaciones, pero el duelo funciona igual
 * con los mensajes de texto.
 *
 * La animación del botón se hace con estilos directos sobre el DOM (refs)
 * porque cambia ~15 veces por segundo; pasarla por el estado de React
 * volvería a renderizar el componente sin necesidad. React solo guarda lo
 * visible del duelo: la frase y el texto de la pregunta.
 *
 * Ciclo de vida: los temporizadores pendientes se cancelan en la limpieza
 * del efecto (el "componentWillUnmount" de D8a).
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

const TIRONES = 15; // sacudidas aleatorias antes de caer
const MS_ENTRE_TIRONES = 60;

const aleatorio = (rango) => (Math.random() - 0.5) * rango;

export function ExpelliarmusDuelo() {
  const { fase: faseVarita, desarmar, reiniciar } = useWand();
  const [textoDuelo, setTextoDuelo] = useState(TEXTO_INICIAL);
  const [frase, setFrase] = useState(null);

  // Preferencia del usuario, leída una sola vez al montar.
  const [reducirMovimiento] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  const botonRef = useRef(null);
  const zonaBotonRef = useRef(null);
  const animandoBotonRef = useRef(false);
  const temporizadoresRef = useRef([]);

  // Si se perdió el duelo, el botón queda bloqueado.
  const perdido = faseVarita === "perdida";

  /** Programa un timeout y lo registra para cancelarlo al desmontar. */
  const esperar = (accion, ms) => {
    const id = setTimeout(accion, ms);
    temporizadoresRef.current.push(id);
    return id;
  };

  // --- Ciclo de vida: al salir del perfil se limpia todo ---
  useEffect(() => {
    const temporizadores = temporizadoresRef;
    return () => {
      temporizadores.current.forEach((id) => {
        clearTimeout(id);
        clearInterval(id);
      });
      // La varita global vuelve a la normalidad en el resto de la app.
      reiniciar();
    };
  }, [reiniciar]);

  // ---- Caso "perdés": la varita del cursor se desarma ----
  const desarmarVarita = (evento) => {
    setTextoDuelo(TEXTO_PERDIDO);
    setFrase(null);
    desarmar(evento.clientX, evento.clientY);
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
    if (faseVarita !== "activa" || animandoBotonRef.current) return;
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
          disabled={perdido}
          onClick={lanzarHechizo}
        >
          <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true" />
          ¡Expelliarmus!
        </button>
        <p className={styles.resultado} role="status" aria-live="polite">
          {frase}
        </p>
      </div>
    </section>
  );
}
