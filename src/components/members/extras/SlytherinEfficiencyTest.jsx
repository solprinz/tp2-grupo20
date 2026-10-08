import { useEffect, useRef, useState } from "react";
import styles from "./SlytherinEfficiencyTest.module.css";

/**
 * Slytherin Efficiency Test (perfil de Juan Pablo, TP1: juan-efficiency.js).
 *
 * Prueba de reflejos: se pulsa "Iniciar prueba", el botón espera un tiempo
 * aleatorio ("Esperá...") y al activarse ("¡Ahora!") se vuelve a pulsar para
 * medir cuántos milisegundos tardó la reacción.
 *
 * Máquina de estados (`fase`):
 *   reposo ──pulsar──▶ esperando ──(timer)──▶ listo ──pulsar──▶ reposo
 *
 * Mejora respecto al TP1: pulsar durante la espera se ignora. Antes cada
 * clic arrancaba otro temporizador y el botón podía activarse varias veces.
 *
 * Ciclo de vida: el temporizador pendiente se cancela en la limpieza del
 * efecto (el "componentWillUnmount") para que no dispare un setState sobre
 * un componente que ya no está en pantalla.
 *
 * Efectos visuales (destello y serpiente): se omiten si el usuario pidió
 * "reducir movimiento". Se quitan solos al terminar su animación CSS.
 */

const MENSAJES = [
  { hasta: 250, texto: "Reflejos de basilisco. Eficiencia suprema." },
  { hasta: 450, texto: "Rápido como una serpiente en las mazmorras." },
  { hasta: 700, texto: "Buena reacción, digno de Slytherin." },
  {
    hasta: Infinity,
    texto: "Necesitás más práctica… la eficiencia requiere precisión.",
  },
];

const ETIQUETAS = {
  reposo: "Iniciar prueba",
  esperando: "Esperá...",
  listo: "¡Ahora!",
};

const prefiereMenosMovimiento = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export function SlytherinEfficiencyTest() {
  const [fase, setFase] = useState("reposo");
  const [resultado, setResultado] = useState("");
  const [destellos, setDestellos] = useState([]); // [{ id, x, y }]
  const [serpiente, setSerpiente] = useState(0); // 0 = ninguna; n = n-ésima

  const inicioRef = useRef(0);
  const temporizadorRef = useRef(null);
  const idDestelloRef = useRef(0);

  useEffect(() => {
    const temporizador = temporizadorRef;
    return () => clearTimeout(temporizador.current);
  }, []);

  const crearDestello = (boton) => {
    const rect = boton.getBoundingClientRect();
    idDestelloRef.current += 1;
    const nuevo = {
      id: idDestelloRef.current,
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    };
    setDestellos((previos) => [...previos, nuevo]);
  };

  const quitarDestello = (id) =>
    setDestellos((previos) => previos.filter((d) => d.id !== id));

  const alPulsar = (evento) => {
    if (fase === "esperando") return; // pulsar antes de tiempo no hace nada

    const animar = !prefiereMenosMovimiento();
    if (animar) crearDestello(evento.currentTarget);

    if (fase === "reposo") {
      setResultado("");
      setSerpiente(0);
      setFase("esperando");
      const retardo = Math.random() * 3000 + 1000; // entre 1 y 4 segundos
      temporizadorRef.current = setTimeout(() => {
        inicioRef.current = performance.now();
        setFase("listo");
      }, retardo);
      return;
    }

    // fase === "listo": se mide la reacción.
    const tiempo = performance.now() - inicioRef.current;
    const { texto } = MENSAJES.find((m) => tiempo < m.hasta);
    setResultado(`${texto} (${Math.round(tiempo)} ms)`);
    if (animar) setSerpiente((n) => n + 1);
    setFase("reposo");
  };

  return (
    <section className={styles.raiz} aria-labelledby="eficiencia-titulo">
      <p className={styles.intro}>Interacción mágica</p>
      <h2 id="eficiencia-titulo" className={styles.titulo}>
        Slytherin Efficiency Test
      </h2>
      <p className={styles.subtitulo}>
        Poné a prueba tu eficiencia con un desafío rápido.
      </p>

      <button
        type="button"
        className={`${styles.boton} ${styles[fase]}`}
        aria-disabled={fase === "esperando"}
        onClick={alPulsar}
      >
        <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true" />
        {ETIQUETAS[fase]}
      </button>

      {/* Anuncia el cambio de fase a lectores de pantalla. */}
      <p className={styles.soloLectores} role="status">
        {fase === "esperando" && "Esperá la señal."}
        {fase === "listo" && "¡Ahora! Pulsá el botón."}
      </p>

      <p className={styles.resultado} role="status" aria-live="polite">
        {resultado}
      </p>

      {/* Ancla de la serpiente: debajo del resultado. */}
      <div className={styles.ancla}>
        {serpiente > 0 && (
          <div
            key={serpiente}
            className={styles.serpiente}
            onAnimationEnd={() => setSerpiente(0)}
          >
            <img src="/img/quiz/serpiente.png" alt="Serpiente de Slytherin" />
          </div>
        )}
      </div>

      {destellos.map(({ id, x, y }) => (
        <span
          key={id}
          className={styles.destello}
          style={{ left: x - 10, top: y - 10 }}
          onAnimationEnd={() => quitarDestello(id)}
          aria-hidden="true"
        />
      ))}
    </section>
  );
}
