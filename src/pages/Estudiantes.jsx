import { useState, useMemo, useEffect, useCallback } from "react";
import styles from "./Estudiantes.module.css";

const API_URL = "https://hp-api.onrender.com/api/characters/students";

const POR_PAGINA = 24;

const CASAS = [
  { valor: "todas", etiqueta: "Todas las casas" },
  { valor: "Gryffindor", etiqueta: "🦁 Gryffindor" },
  { valor: "Slytherin", etiqueta: "🐍 Slytherin" },
  { valor: "Ravenclaw", etiqueta: "🦅 Ravenclaw" },
  { valor: "Hufflepuff", etiqueta: "🦡 Hufflepuff" },
];

const clasePorCasa = {
  Gryffindor: "gryffindor",
  Slytherin: "slytherin",
  Ravenclaw: "ravenclaw",
  Hufflepuff: "hufflepuff",
};

export function Estudiantes() {
  const [estudiantes, setEstudiantes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [busqueda, setBusqueda] = useState("");
  const [filtroCasa, setFiltroCasa] = useState("todas");
  const [pagina, setPagina] = useState(1);

  useEffect(() => {
    const tituloPrevio = document.title;
    document.title = "Hallows Code: Estudiantes";
    return () => {
      document.title = tituloPrevio;
    };
  }, []);

  const fetchEstudiantes = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error(`Error ${res.status}`);
      const data = await res.json();
      setEstudiantes(data);
    } catch (err) {
      setError(
        "No pudimos invocar a los estudiantes de Hogwarts. Revisá tu conexión e intentá de nuevo."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEstudiantes();
  }, [fetchEstudiantes]);

  const filtrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();
    return estudiantes.filter((e) => {
      const matchTexto =
        !q ||
        (e.name && e.name.toLowerCase().includes(q)) ||
        (e.actor && e.actor.toLowerCase().includes(q));
      if (!matchTexto) return false;
      if (filtroCasa === "todas") return true;
      return e.house === filtroCasa;
    });
  }, [estudiantes, busqueda, filtroCasa]);

  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA) || 1;
  const estudiantesPaginados = useMemo(() => {
    const inicio = (pagina - 1) * POR_PAGINA;
    return filtrados.slice(inicio, inicio + POR_PAGINA);
  }, [filtrados, pagina]);

  const hayFiltrosActivos = busqueda.trim() !== "" || filtroCasa !== "todas";

  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
    setPagina(1);
  };

  const handleFiltroChange = (e) => {
    setFiltroCasa(e.target.value);
    setPagina(1);
  };

  const handleReset = () => {
    setBusqueda("");
    setFiltroCasa("todas");
    setPagina(1);
  };

  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.estado}>
          <div className={styles.estadoIcono}>
            <i className="fa-solid fa-hat-wizard" aria-hidden="true"></i>
          </div>
          <h2 className={styles.estadoTitulo}>Invocando estudiantes...</h2>
          <p className={styles.estadoTexto}>
            El Sombrero Seleccionador está consultando los pergaminos de
            Hogwarts. Esto puede tardar unos segundos.
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.estado}>
          <div className={`${styles.estadoIcono} ${styles.estadoIconoError}`}>
            <i className="fa-solid fa-bolt" aria-hidden="true"></i>
          </div>
          <h2 className={styles.estadoTitulo}>Accio falló</h2>
          <p className={styles.estadoTexto}>{error}</p>
          <button
            type="button"
            onClick={fetchEstudiantes}
            className={styles.btnReset}
          >
            <i className="fa-solid fa-rotate-right" aria-hidden="true"></i>
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.titulo}>Estudiantes de Hogwarts</h1>
        <p className={styles.subtitulo}>
          Plantel estudiantil del castillo, consultado en vivo a la red flu de
          la HP-API. Filtrá por casa o buscá por nombre o actor.
        </p>
      </header>

      <section
        className={styles.herramientas}
        aria-label="Filtros de estudiantes"
      >
        <div className={styles.filtrosRow}>
          <div className={styles.buscadorWrapper}>
            <i
              className={`fa-solid fa-magnifying-glass ${styles.iconoBuscador}`}
              aria-hidden="true"
            ></i>
            <input
              type="text"
              value={busqueda}
              onChange={handleBusquedaChange}
              placeholder="Buscar por nombre o actor..."
              className={styles.inputBuscador}
              aria-label="Buscar estudiantes"
            />
          </div>

          <select
            value={filtroCasa}
            onChange={handleFiltroChange}
            className={styles.selectFiltro}
            aria-label="Filtrar por casa"
          >
            {CASAS.map((c) => (
              <option key={c.valor} value={c.valor}>
                {c.etiqueta}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={fetchEstudiantes}
            className={styles.btnReset}
            title="Actualizar datos de la API"
          >
            <i className="fa-solid fa-rotate-right" aria-hidden="true"></i>
            Actualizar
          </button>

          {hayFiltrosActivos && (
            <button
              type="button"
              onClick={handleReset}
              className={styles.btnReset}
              title="Limpiar filtros"
            >
              <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
              Limpiar filtros
            </button>
          )}
        </div>
      </section>

      <div className={styles.metadata}>
        <span>
          Mostrando{" "}
          <strong className={styles.contadorBadge}>{filtrados.length}</strong>{" "}
          {filtrados.length === 1 ? "estudiante" : "estudiantes"}
          {hayFiltrosActivos && " (filtrados)"} de {estudiantes.length} en total
        </span>

        {filtrados.length > 0 && totalPaginas > 1 && (
          <span>
            Página {pagina} de {totalPaginas}
          </span>
        )}
      </div>

      {filtrados.length === 0 ? (
        <div className={styles.sinResultados}>
          <div className={styles.sinResultadosIcono}>
            <i className="fa-solid fa-wand-magic" aria-hidden="true"></i>
          </div>
          <h2 className={styles.sinResultadosTitulo}>
            Ningún estudiante coincide
          </h2>
          <p className={styles.sinResultadosTexto}>
            No encontramos resultados para "{busqueda}" en la casa
            seleccionada. Probá con otro término o limpiá los filtros.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className={styles.btnReset}
          >
            <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
            Limpiar filtros
          </button>
        </div>
      ) : (
        <>
          <div className={styles.grilla}>
            {estudiantesPaginados.map((est) => (
              <article
                key={est.id}
                className={`${styles.tarjeta} ${
                  est.house ? styles[clasePorCasa[est.house]] || "" : ""
                }`}
              >
                <div className={styles.fotoWrapper}>
                  {est.image ? (
                    <img
                      src={est.image}
                      alt={est.name}
                      className={styles.foto}
                      loading="lazy"
                    />
                  ) : (
                    <div className={styles.fotoPlaceholder}>
                      <i className="fa-solid fa-user" aria-hidden="true"></i>
                    </div>
                  )}
                </div>
                <div className={styles.tarjetaInfo}>
                  <h3 className={styles.nombre}>{est.name}</h3>
                  {est.house && (
                    <span className={styles.casaBadge}>{est.house}</span>
                  )}
                  {est.actor && (
                    <p className={styles.actor}>
                      <i
                        className="fa-solid fa-film me-1"
                        aria-hidden="true"
                      ></i>
                      {est.actor}
                    </p>
                  )}
                </div>
              </article>
            ))}
          </div>

          {totalPaginas > 1 && (
            <nav
              className={styles.paginacion}
              aria-label="Paginación de estudiantes"
            >
              <button
                type="button"
                className={styles.btnPagina}
                onClick={() => setPagina((p) => Math.max(1, p - 1))}
                disabled={pagina === 1}
              >
                ← Anterior
              </button>

              {Array.from({ length: totalPaginas }, (_, i) => i + 1)
                .filter(
                  (p) =>
                    p === 1 || p === totalPaginas || Math.abs(p - pagina) <= 2
                )
                .map((num, idx, arr) => {
                  const prev = arr[idx - 1];
                  return (
                    <span
                      key={num}
                      style={{ display: "inline-flex", gap: "0.25rem" }}
                    >
                      {prev && num - prev > 1 && (
                        <span
                          style={{
                            padding: "0.3rem 0.5rem",
                            color: "#888",
                          }}
                        >
                          …
                        </span>
                      )}
                      <button
                        type="button"
                        className={`${styles.btnPagina} ${
                          pagina === num ? styles.btnPaginaActiva : ""
                        }`}
                        onClick={() => setPagina(num)}
                      >
                        {num}
                      </button>
                    </span>
                  );
                })}

              <button
                type="button"
                className={styles.btnPagina}
                onClick={() => setPagina((p) => Math.min(totalPaginas, p + 1))}
                disabled={pagina === totalPaginas}
              >
                Siguiente →
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
}