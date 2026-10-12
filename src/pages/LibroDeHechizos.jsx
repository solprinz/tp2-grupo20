import { useState, useMemo, useEffect } from "react";
import hechizosData from "../data/libro_de_hechizos.json";
import styles from "./LibroDeHechizos.module.css";

const CATEGORIAS = [
  { valor: "todos", etiqueta: "Todos los tipos" },
  { valor: "encantamiento", etiqueta: "Encantamientos" },
  { valor: "maldicion", etiqueta: "Maldiciones" },
  { valor: "maleficio", etiqueta: "Maleficios" },
  { valor: "embrujo", etiqueta: "Embrujos" },
  { valor: "hechizo", etiqueta: "Hechizos generales" },
  { valor: "otros", etiqueta: "Otras ramas mágicas" },
];

const POR_PAGINA = 12;

// Limpia corchetes de citas como [11] o [3]
const limpiar = (txt) => (txt ? String(txt).replace(/\[\d+\]/g, "").trim() : "");

export function LibroDeHechizos() {
  const [busqueda, setBusqueda] = useState("");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [pagina, setPagina] = useState(1);

  // Actualizar título de pestaña temático
  useEffect(() => {
    const tituloPrevio = document.title;
    document.title = "Hallows Code: Libro de Hechizos";
    return () => {
      document.title = tituloPrevio;
    };
  }, []);

  // Al cambiar búsqueda o filtro, volvemos a la página 1
  const handleBusquedaChange = (e) => {
    setBusqueda(e.target.value);
    setPagina(1);
  };

  const handleFiltroChange = (e) => {
    setFiltroTipo(e.target.value);
    setPagina(1);
  };

  const handleReset = () => {
    setBusqueda("");
    setFiltroTipo("todos");
    setPagina(1);
  };

  // Filtrado reactivo en memoria
  const hechizosFiltrados = useMemo(() => {
    const q = busqueda.trim().toLowerCase();

    return hechizosData.filter((item) => {
      // Coincidencia de texto en nombre, tipo o descripción
      const matchTexto =
        !q ||
        (item.hechizo && item.hechizo.toLowerCase().includes(q)) ||
        (item.tipo && item.tipo.toLowerCase().includes(q)) ||
        (item.descripcion && item.descripcion.toLowerCase().includes(q));

      if (!matchTexto) return false;

      // Coincidencia de categoría
      if (filtroTipo === "todos") return true;

      const tipoLower = (item.tipo || "").toLowerCase();
      if (filtroTipo === "encantamiento") return tipoLower.includes("encantamiento");
      if (filtroTipo === "maldicion") {
        return tipoLower.includes("maldición") || tipoLower.includes("maldicion");
      }
      if (filtroTipo === "maleficio") return tipoLower.includes("maleficio");
      if (filtroTipo === "embrujo") return tipoLower.includes("embrujo");
      if (filtroTipo === "hechizo") return tipoLower.includes("hechizo");
      if (filtroTipo === "otros") {
        return (
          !tipoLower.includes("encantamiento") &&
          !tipoLower.includes("maldici") &&
          !tipoLower.includes("maleficio") &&
          !tipoLower.includes("embrujo") &&
          !tipoLower.includes("hechizo")
        );
      }

      return true;
    });
  }, [busqueda, filtroTipo]);

  // Paginación
  const totalPaginas = Math.ceil(hechizosFiltrados.length / POR_PAGINA) || 1;
  const hechizosPaginados = useMemo(() => {
    const inicio = (pagina - 1) * POR_PAGINA;
    return hechizosFiltrados.slice(inicio, inicio + POR_PAGINA);
  }, [hechizosFiltrados, pagina]);

  const hayFiltrosActivos = busqueda.trim() !== "" || filtroTipo !== "todos";

  return (
    <div className={styles.container}>
      {/* CABECERA */}
      <header className={styles.header}>
        <h1 className={styles.titulo}>Libro de Hechizos</h1>
        <p className={styles.subtitulo}>
          Grimorio oficial de Hogwarts recopilado por el equipo de Hallows Code.
          Explorá encantamientos, maleficios y artes secretas archivadas en el
          registro local.
        </p>
      </header>

      {/* BARRA DE HERRAMIENTAS: BÚSQUEDA Y FILTRO */}
      <section className={styles.herramientas} aria-label="Filtros del libro de hechizos">
        <div className={styles.filtrosRow}>
          {/* Buscador de texto */}
          <div className={styles.buscadorWrapper}>
            <i className={`fa-solid fa-magnifying-glass ${styles.iconoBuscador}`} aria-hidden="true"></i>
            <input
              type="text"
              value={busqueda}
              onChange={handleBusquedaChange}
              placeholder="Buscar por conjuro, efecto o descripción..."
              className={styles.inputBuscador}
              aria-label="Buscar hechizos por texto"
            />
          </div>

          {/* Selector de categoría */}
          <select
            value={filtroTipo}
            onChange={handleFiltroChange}
            className={styles.selectFiltro}
            aria-label="Filtrar por tipo de hechizo"
          >
            {CATEGORIAS.map((cat) => (
              <option key={cat.valor} value={cat.valor}>
                {cat.etiqueta}
              </option>
            ))}
          </select>

          {/* Botón para restablecer */}
          {hayFiltrosActivos && (
            <button
              type="button"
              onClick={handleReset}
              className={styles.btnReset}
              title="Restablecer todos los filtros"
            >
              <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
              Restablecer
            </button>
          )}
        </div>
      </section>

      {/* METADATA Y CONTADOR */}
      <div className={styles.metadata}>
        <span>
          Mostrando{" "}
          <strong className={styles.contadorBadge}>
            {hechizosFiltrados.length}
          </strong>{" "}
          {hechizosFiltrados.length === 1 ? "hechizo encontrado" : "hechizos encontrados"}
          {hayFiltrosActivos && " (filtrados)"} de {hechizosData.length} en total
        </span>

        {hechizosFiltrados.length > 0 && totalPaginas > 1 && (
          <span>
            Página {pagina} de {totalPaginas}
          </span>
        )}
      </div>

      {/* LISTADO DE RESULTADOS */}
      {hechizosFiltrados.length === 0 ? (
        /* ESTADO SIN RESULTADOS (Criterio 11 Propone) */
        <div className={styles.sinResultados}>
          <div className={styles.sinResultadosIcono}>
            <i className="fa-solid fa-wand-magic" aria-hidden="true"></i>
          </div>
          <h2 className={styles.sinResultadosTitulo}>
            Ningún hechizo coincide con la búsqueda
          </h2>
          <p className={styles.sinResultadosTexto}>
            No encontramos ningún conjuro para “{busqueda}” en la categoría seleccionada.
            Probá con otro término o restablecé los filtros para ver el grimorio completo.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className={styles.btnReset}
          >
            <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
            Restablecer lista completa
          </button>
        </div>
      ) : (
        /* GRILLA DE TARJETAS DINÁMICAS (Criterio 10) */
        <div className={styles.grilla}>
          {hechizosPaginados.map((item) => (
            <article key={item.id} className={styles.tarjeta}>
              <header className={styles.tarjetaHeader}>
                <div className={styles.tarjetaTop}>
                  <span className={styles.catalogoNum}>
                    <i className="fa-solid fa-wand-sparkles me-1" aria-hidden="true"></i>
                    #{String(item.id).padStart(3, "0")}
                  </span>
                  <span className={styles.badgeTipo} title={limpiar(item.tipo)}>
                    {limpiar(item.tipo)}
                  </span>
                </div>
                <h2 className={styles.nombreHechizo}>{limpiar(item.hechizo)}</h2>
              </header>

              <p className={styles.descripcion}>{limpiar(item.descripcion)}</p>
            </article>
          ))}
        </div>
      )}

      {/* PAGINACIÓN */}
      {totalPaginas > 1 && (
        <nav className={styles.paginacion} aria-label="Paginación de hechizos">
          <button
            type="button"
            className={styles.btnPagina}
            onClick={() => setPagina((p) => Math.max(1, p - 1))}
            disabled={pagina === 1}
          >
            ← Anterior
          </button>

          {Array.from({ length: totalPaginas }, (_, i) => i + 1)
            .filter((p) => p === 1 || p === totalPaginas || Math.abs(p - pagina) <= 2)
            .map((num, idx, arr) => {
              const prev = arr[idx - 1];
              return (
                <span key={num} style={{ display: "inline-flex", gap: "0.25rem" }}>
                  {prev && num - prev > 1 && (
                    <span style={{ padding: "0.3rem 0.5rem", color: "#888" }}>
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
    </div>
  );
}
