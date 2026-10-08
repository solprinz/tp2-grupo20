import { useEffect, useRef, useState } from "react";
import styles from "./PatronusAlways.module.css";

/**
 * Encantamiento "Always" (perfil de Sol, TP1: always.js).
 *
 * Al pulsar "Revelio" el botón desaparece y se revela el Patronus del
 * ciervo con la respuesta "Always.".
 *
 * Estado mínimo: un booleano `revelado`. Como el botón se retira del DOM
 * al revelarse, el foco se mueve al resultado para no dejar a quien usa
 * teclado o lector de pantalla "perdido".
 */
export function PatronusAlways() {
  const [revelado, setRevelado] = useState(false);
  const escenaRef = useRef(null);

  useEffect(() => {
    if (revelado) escenaRef.current?.focus();
  }, [revelado]);

  return (
    <section className={styles.raiz} aria-label="Encantamiento Always">
      <p className={styles.pregunta}>&quot;After all this time?&quot;</p>

      {!revelado && (
        <button
          type="button"
          className={styles.boton}
          onClick={() => setRevelado(true)}
        >
          <i className="fa-solid fa-wand-magic-sparkles me-2" aria-hidden="true" />
          Revelio
        </button>
      )}

      {revelado && (
        <div
          ref={escenaRef}
          tabIndex={-1}
          className={styles.escena}
          role="status"
        >
          <img
            src="/img/patronus-ciervo.png"
            alt="Patronus en forma de ciervo"
            className={styles.patronus}
          />
          <p className={styles.respuesta}>&quot;Always.&quot;</p>
        </div>
      )}
    </section>
  );
}
