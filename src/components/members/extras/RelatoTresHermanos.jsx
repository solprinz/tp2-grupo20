import { useEffect, useId, useRef, useState } from "react";
import styles from "./RelatoTresHermanos.module.css";

const CAPITULOS = [
  {
    nombre: "La varita de saúco",
    hermano: "El hermano mayor",
    deseo: "Un poder sin rival",
    relato: "El mayor pidió una varita capaz de vencer en cualquier duelo. La Muerte cortó una rama de saúco y se la entregó. Con ella, el hermano derrotó a un antiguo enemigo y presumió de su poder en una posada.",
    destino: "Mientras dormía, otro mago lo asesinó y robó la varita. La Muerte reclamó al primero de los hermanos.",
    simbolo: "varita",
  },
  {
    nombre: "La piedra de la resurrección",
    hermano: "El segundo hermano",
    deseo: "Recuperar un amor perdido",
    relato: "El segundo quiso humillar a la Muerte y pidió devolver la vida a los muertos. Recibió una piedra del río. En su casa la giró tres veces y apareció la mujer con la que había soñado casarse.",
    destino: "Ella estaba distante y triste: ya no pertenecía al mundo de los vivos. Incapaz de aceptar esa separación, el hermano se quitó la vida para reunirse con ella. La Muerte reclamó al segundo.",
    simbolo: "piedra",
  },
  {
    nombre: "La capa de invisibilidad",
    hermano: "El hermano menor",
    deseo: "Marcharse sin ser perseguido",
    relato: "El menor desconfió de la Muerte. Solo pidió poder alejarse de aquel lugar sin que ella pudiera seguirlo. A regañadientes, la Muerte le entregó su propia capa de invisibilidad.",
    destino: "Vivió muchos años oculto bajo la capa. Ya anciano, se la legó a su hijo y recibió a la Muerte como a una vieja amiga. Ambos partieron como iguales.",
    simbolo: "capa",
  },
];

export function RelatoTresHermanos() {
  const [activo, setActivo] = useState(null);
  const [leidos, setLeidos] = useState([]);
  const [revelado, setRevelado] = useState(false);
  const uid = useId();
  const tituloRef = useRef(null);
  const inicioRef = useRef(null);
  const moverFoco = useRef(false);
  const completo = leidos.length === CAPITULOS.length;
  const capitulo = activo === null ? null : CAPITULOS[activo];

  useEffect(() => {
    if (moverFoco.current) {
      tituloRef.current?.focus();
      moverFoco.current = false;
    }
  }, [activo, revelado]);

  function explorar(indice) {
    moverFoco.current = true;
    setActivo(indice);
    setRevelado(false);
    setLeidos((previos) => previos.includes(indice) ? previos : [...previos, indice]);
  }

  function reiniciar() {
    setActivo(null);
    setLeidos([]);
    setRevelado(false);
    inicioRef.current?.focus();
  }

  return (
    <section className={styles.relato} aria-labelledby={`${uid}-titulo`} data-escena={revelado ? "final" : capitulo?.simbolo ?? "puente"}>
      <p className={styles.leyenda}>Del libro de Beedle el Bardo</p>
      <h2 className={styles.titulo} id={`${uid}-titulo`}>La fábula de los tres hermanos</h2>
      <p className={styles.bajada}>Tres deseos. Tres destinos. Una misma Muerte.</p>

      <div className={styles.pergamino}>
        <div className={styles.teatro} aria-hidden="true">
          <svg viewBox="0 0 900 310" className={styles.paisaje}>
            <circle className={styles.luna} cx="610" cy="100" r="68" />
            <path className={styles.lejania} d="M0 220 80 165 150 190 250 120 360 200 470 155 590 210 710 130 810 175 900 140V310H0Z" />
            <path className={styles.rio} d="M280 310q170-80 350 0m-320-15q150-65 290 0m-245-13q90-25 180 0" />
            <g className={styles.sombras}>
              <path d="M0 250q110-45 245 0l35 60H0Zm900 0q-110-45-245 0l-35 60h280Z" />
              <path d="M200 250Q450 85 700 250l-5 18Q450 120 205 268Z" />
              <path d="M220 238v-35m45 11v-35m45 17v-34m45 21v-35m45 29v-35m45 33v-35m45 36v-35m45 39v-35m45 43v-35m45 49v-35m45 54v-35" fill="none" stroke="currentColor" strokeWidth="5" />
              <path d="M0 300 46 80 39 0h18l10 100 50-65-35 86 42-12-49 28-19 163Zm900 0-46-220 7-80h-18l-10 100-50-65 35 86-42-12 49 28 19 163Z" />
            </g>
            <g className={`${styles.hermano} ${styles.mayor}`}>
              <circle cx="330" cy="115" r="10" /><path d="m330 123-19 59 37-10-10-47Zm-8 48-5 22m18-23 8 15m-4-47 23-17 16-28" />
            </g>
            <g className={`${styles.hermano} ${styles.segundo}`}>
              <circle cx="405" cy="96" r="10" /><path d="m405 104-18 56 36-3-10-47Zm-8 47-4 24m18-24 9 20m-6-55 22 15" />
              <circle className={styles.piedraLuz} cx="438" cy="129" r="4" />
            </g>
            <g className={`${styles.hermano} ${styles.menor}`}>
              <path d="M477 81q-15 8-12 26l-17 45 56 2-14-46q2-19-13-27Zm-8 68-4 22m18-20 8 19" />
            </g>
            <g className={styles.muerte}>
              <path d="M590 37q-27 18-22 48l-36 80 34-15-6 21 34-17 28 26-8-46 22 20-23-69q6-31-23-48Z" />
              <path d="m576 91-34 19-40-22m102 8 37 18 32-28" fill="none" stroke="currentColor" strokeWidth="7" />
              <path d="m579 69 13-15 12 18-13 15Z" className={styles.visage} />
            </g>
          </svg>
          <span className={styles.cartela}>{revelado ? "Y así termina la fábula…" : capitulo ? capitulo.deseo : "Una noche, junto a un río…"}</span>
        </div>
        <p className={styles.apertura}>
          Al anochecer, tres hermanos encontraron un río peligroso y crearon un
          puente con magia. La Muerte, contrariada porque habían escapado de ella,
          fingió felicitarlos y ofreció un regalo a cada uno.
        </p>
        <p className={styles.indicacion}>Elegí una reliquia para descubrir qué ocurrió con su dueño.</p>

        <div className={styles.reliquias}>
          {CAPITULOS.map((item, indice) => (
            <button
              key={item.simbolo}
              ref={indice === 0 ? inicioRef : undefined}
              type="button"
              className={`${styles.eleccion} ${activo === indice && !revelado ? styles.activa : ""}`}
              aria-pressed={activo === indice && !revelado}
              aria-controls={`${uid}-capitulo`}
              onClick={() => explorar(indice)}
            >
              <svg viewBox="0 0 100 110" aria-hidden="true" className={styles.icono}>
                {item.simbolo === "varita" && <path d="M50 8v94m-7-70h14m-14 18h14m-14 18h14m-14 18h14" />}
                {item.simbolo === "piedra" && <><path d="m50 18 30 37-30 37-30-37Zm0 0 10 37-10 37-10-37Z" /><path d="M20 55h60" /></>}
                {item.simbolo === "capa" && <><path d="M50 8 8 99h84ZM50 24c-12 0-16 16-16 25l16 10 16-10c0-9-4-25-16-25Z" /><path d="m34 60-12 28m44-28 12 28" /></>}
              </svg>
              <span className={styles.numero}>0{indice + 1} · {item.hermano}</span>
              <strong>{item.nombre}</strong>
              <span className={styles.marca}>{leidos.includes(indice) ? "Historia descubierta ✓" : "Revelar historia"}</span>
            </button>
          ))}
        </div>

        <div id={`${uid}-capitulo`} className={styles.panel}>
          {revelado ? (
            <div key="final" className={styles.escena}>
              <svg viewBox="0 0 120 120" className={styles.sello} aria-hidden="true">
                <path d="M60 8 8 108h104ZM60 8v100" /><circle cx="60" cy="76" r="31" />
              </svg>
              <h3 ref={tituloRef} tabIndex={-1} className={styles.subtitulo}>Las Reliquias de la Muerte</h3>
              <p>La línea es la varita, el círculo es la piedra y el triángulo es la capa. Juntas forman el símbolo de las tres reliquias.</p>
              <p>La leyenda promete que quien las reúna será el señor de la Muerte. Pero el menor encontró otro camino: vivir su vida y aceptar su final.</p>
              <button type="button" className={styles.boton} onClick={reiniciar}>Volver al puente</button>
            </div>
          ) : capitulo ? (
            <div key={activo} className={styles.escena}>
              <p className={styles.leyenda}>Capítulo {activo + 1} · {capitulo.hermano}</p>
              <h3 ref={tituloRef} tabIndex={-1} className={styles.subtitulo}>{capitulo.deseo}</h3>
              <p>{capitulo.relato}</p>
              <p className={styles.destino}>{capitulo.destino}</p>
              {!completo && (
                <button type="button" className={styles.boton} onClick={() => explorar(CAPITULOS.findIndex((_, indice) => !leidos.includes(indice)))}>
                  Descubrir otra reliquia →
                </button>
              )}
            </div>
          ) : <p className={styles.espera}>El puente ya está cruzado. La historia espera tu elección.</p>}
        </div>

        <p className={styles.progreso} role="status">{leidos.length} de 3 historias descubiertas</p>
        {completo && !revelado && (
          <button type="button" className={styles.boton} onClick={() => { moverFoco.current = true; setRevelado(true); }}>
            Unir las tres reliquias
          </button>
        )}
      </div>
      <p className={styles.fuente}>Una adaptación resumida del relato presentado en <cite>Harry Potter y las Reliquias de la Muerte: Parte 1</cite>. <a href="https://www.harrypotter.com/features/how-the-tale-of-the-three-brothers-shapes-the-whole-harry-potter-series" target="_blank" rel="noopener noreferrer">Sobre la fábula ↗</a></p>
    </section>
  );
}
