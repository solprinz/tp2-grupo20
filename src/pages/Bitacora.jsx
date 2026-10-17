import { useState, useMemo, useEffect } from "react";
import styles from "./Bitacora.module.css";

/**
 * Registros cronológicos del equipo Hallows Code.
 * tipo: "setup" | "feature" | "fix" | "estilo" | "contenido"
 */
const REGISTROS = [
  {
    id: 1,
    fecha: "2026-10-07",
    integrante: "Sol Prinzen",
    titulo: "Configuración inicial del proyecto",
    detalle:
      "Creamos el repositorio público tp2-grupo20, configuramos Vite + React y la estructura base de carpetas (components, pages, data). Definimos que el proyecto continuaría la temática de Hallows Code del TP1.",
    tipo: "setup",
  },
  {
    id: 2,
    fecha: "2026-10-08",
    integrante: "Lucas Eliel Sosa",
    titulo: "Perfiles dinámicos con /perfil/:id",
    detalle:
      "Implementamos una plantilla reutilizable MemberProfile que toma los datos de membersData.js y renderiza un perfil por integrante según el id de la URL. Cada perfil migra el contenido del TP1 (bio, habilidades, favoritos, proyectos).",
    tipo: "feature",
  },
  {
    id: 3,
    fecha: "2026-10-08",
    integrante: "Lucas Eliel Sosa",
    titulo: "Sidebar responsive (NAV-2)",
    detalle:
      "Armamos la sidebar compartida: fija en desktop (position: sticky), colapsable en móvil con panel deslizante, botón de cierre, backdrop y cierre con Escape. La sección activa se marca automáticamente con NavLink.",
    tipo: "feature",
  },
  {
    id: 4,
    fecha: "2026-10-09",
    integrante: "Sol Prinzen",
    titulo: "Unificación visual de la sidebar",
    detalle:
      "Unificamos iconos, colores y espaciados. Resolvimos problemas de overflow y ajustamos el modo oscuro para que funcione también en las páginas individuales de perfil.",
    tipo: "estilo",
  },
  {
    id: 5,
    fecha: "2026-10-09",
    integrante: "Lucas Eliel Sosa",
    titulo: "Varita-cursor global",
    detalle:
      "Implementamos un cursor personalizado con forma de varita mágica, montado a nivel App para que persista al navegar entre páginas sin reiniciarse.",
    tipo: "feature",
  },
  {
    id: 6,
    fecha: "2026-10-09",
    integrante: "Lucas Eliel Sosa",
    titulo: "Sidebar con grupos desplegables",
    detalle:
      "Reorganizamos los enlaces en tres grupos colapsables: Integrantes, Proyecto y Hogwarts. Solo se muestra abierto el grupo de la página actual; los títulos se pueden abrir y cerrar a mano.",
    tipo: "feature",
  },
  {
    id: 7,
    fecha: "2026-10-09",
    integrante: "Lucas Eliel Sosa",
    titulo: "Fix: barra superior móvil tapaba contenido",
    detalle:
      "Ajustamos el offset de la topbar en mobile para que el contenido no quede oculto debajo al scrollear.",
    tipo: "fix",
  },
  {
    id: 8,
    fecha: "2026-10-12",
    integrante: "Juan Pablo",
    titulo: "JSON local y buscador de hechizos",
    detalle:
      "Creamos libro_de_hechizos.json con más de 50 registros (encantamientos, maldiciones, maleficios y embrujos). Implementamos búsqueda por texto y filtro por categoría con estado de 'sin resultados' y botón de restablecer.",
    tipo: "contenido",
  },
  {
    id: 9,
    fecha: "2026-10-12",
    integrante: "Juan Pablo",
    titulo: "Correcciones de hechizos y tarjetas",
    detalle:
      "Ajustamos detalles en las tarjetas del libro de hechizos y corregimos la paginación y el toggle de ficha de cada conjuro.",
    tipo: "fix",
  },
  {
    id: 10,
    fecha: "2026-10-12",
    integrante: "Sol Prinzen",
    titulo: "Ajustes estéticos: Patronus y fondo pergamino",
    detalle:
      "Incorporamos un Patronus animado, fondo tipo pergamino global y nuevas imágenes en la Home. Adaptamos el botón ScrollToTop para que sea responsive.",
    tipo: "estilo",
  },
  {
    id: 11,
    fecha: "2026-10-12",
    integrante: "Sol Prinzen",
    titulo: "Fix: conflicto de merge en index.css",
    detalle:
      "Resolvimos un conflicto de merge en index.css entre la rama de perfil y los ajustes visuales globales.",
    tipo: "fix",
  },
  {
    id: 12,
    fecha: "2026-10-13",
    integrante: "Juan Pablo",
    titulo: "Detalles finales en tarjetas de hechizos",
    detalle:
      "Últimos ajustes de presentación en las tarjetas del libro de hechizos antes de la revisión final.",
    tipo: "estilo",
  },
  {
    id: 13,
    fecha: "2026-10-13",
    integrante: "Daniela Méndez",
    titulo: "Integración de API pública y Bitácora",
    detalle:
      "Arrancamos la integración de la HP API (hp-api.onrender.com) con estados de carga, error y botón reintentar. En paralelo, construimos esta Bitácora con acordeones y filtros por integrante y tipo.",
    tipo: "feature",
  },
    {
    id: 14,
    fecha: "2026-10-17",
    integrante: "Alejandro Ramos",
    titulo: "Árbol de Renderizado y Arquitectura",
    detalle:
      "Desarrollamos la página /arbol (Arquitectura.jsx) con un esquema interactivo de componentes desplegables. Separamos la lógica de datos en architectureData.js para mantener el código limpio.",
    tipo: "feature",
  },
  {
    id: 15,
    fecha: "2026-10-17",
    integrante: "Alejandro Ramos",
    titulo: "Relato de los Tres Hermanos en el perfil",
    detalle:
      "Agregamos un componente especial (RelatoTresHermanos.jsx) con una narrativa interactiva temática de las Reliquias de la Muerte para enriquecer el perfil personal.",
    tipo: "feature",
  },
  {
    id: 16,
    fecha: "2026-10-17",
    integrante: "Sol Prinzen",
    titulo: "Documentación final y capturas en README",
    detalle:
      "Actualizamos el README.md agregando capturas de pantalla del proyecto (Home, Hechizos, Estudiantes, Modo Oscuro, Perfiles) y optimizamos el peso de las imágenes para el deploy final.",
    tipo: "contenido",
  },
];


/**
 * Decisiones clave del equipo (continuación del formato del TP1:
 * "Decisiones del Wizengamot").
 */
const DECISIONES = [
  {
    titulo: "Temática de Hogwarts",
    texto:
      "Elegimos ambientar el proyecto en el universo de Harry Potter. Optamos por usar avatares e ilustraciones temáticas en lugar de fotos personales, para darle un toque más inmersivo.",
  },
  {
    titulo: "React + Vite en el TP2",
    texto:
      "Para el TP2 migramos de HTML/Bootstrap plano a React con Vite. Decidimos mantener Bootstrap para la grilla y utilidades, pero sumar CSS Modules para componentes con estilo propio (Bitácora, Libro de Hechizos).",
  },
  {
    titulo: "Estructura del Proyecto",
    texto:
      "Organizamos el código en /components (reutilizables), /pages (una por sección) y /data (JSONs y arrays de datos). Los perfiles viven en /pages/members con una plantilla dinámica.",
  },
  {
    titulo: "Bitácora interactiva",
    texto:
      "Reemplazamos la bitácora HTML del TP1 por una versión React con filtros por integrante y tipo, acordeones desplegables y una línea de tiempo cronológica. La sección temática del TP1 se conserva debajo del timeline.",
  },
];

/**
 * Dificultades encontradas y cómo las resolvimos (continuación del formato
 * del TP1: "Dificultades y Maldiciones").
 */
const DIFICULTADES = [
  {
    titulo: "Maldición de los Enlaces Rotos",
    problema:
      "Al separar los archivos en distintas subcarpetas, las rutas relativas se rompían y algunos estilos e imágenes no cargaban.",
    resolucion:
      "Reorganizamos las imágenes en subcarpetas por integrante y aplicamos un contrahechizo masivo con sed para actualizar todas las rutas relativas de una sola vez, verificando luego con grep.",
  },
  {
    titulo: "Duelos de Especificidad (CSS)",
    problema:
      "Las clases de Bootstrap sobreescribían nuestros colores de las casas.",
    resolucion:
      "Definimos variables CSS en :root para los colores de cada casa y las aplicamos con selectores más específicos (body.gryffindor .card). Así evitamos recurrir a !important.",
  },
  {
    titulo: "Cold start de la API externa",
    problema:
      "El servidor de hp-api.onrender.com se duerme después de un tiempo sin uso, y la primera carga puede tardar más de 30 segundos.",
    resolucion:
      "Aprovechamos esa demora para mostrar el estado de 'Cargando...' con un mensaje temático y habilitar el botón 'Reintentar' si falla la conexión.",
  },
  {
    titulo: "Conflictos de merge en index.css",
    problema:
      "Al trabajar varias ramas en paralelo sobre el mismo archivo global de estilos, hubo conflictos de merge.",
    resolucion:
      "Resolvimos los conflictos a mano y acordamos una 'regla de oro' (ya en el Trello): avisar antes de tocar index.css o style.css directamente.",
  },
];

const TIPOS = [
  { valor: "todos", etiqueta: "Todos los tipos" },
  { valor: "setup", etiqueta: "Configuración" },
  { valor: "feature", etiqueta: "Nuevas funcionalidades" },
  { valor: "fix", etiqueta: "Correcciones" },
  { valor: "estilo", etiqueta: "Estilo y diseño" },
  { valor: "contenido", etiqueta: "Contenido y datos" },
];

const ETIQUETAS_TIPO = {
  setup: "Configuración",
  feature: "Feature",
  fix: "Fix",
  estilo: "Estilo",
  contenido: "Contenido",
};

export function Bitacora() {
  const [filtroIntegrante, setFiltroIntegrante] = useState("todos");
  const [filtroTipo, setFiltroTipo] = useState("todos");
  const [orden, setOrden] = useState("desc");

  useEffect(() => {
    const tituloPrevio = document.title;
    document.title = "Hallows Code: Bitácora";
    return () => {
      document.title = tituloPrevio;
    };
  }, []);

  const integrantes = useMemo(() => {
    return [...new Set(REGISTROS.map((r) => r.integrante))].sort();
  }, []);

  const filtrados = useMemo(() => {
    let lista = REGISTROS;

    if (filtroIntegrante !== "todos") {
      lista = lista.filter((r) => r.integrante === filtroIntegrante);
    }
    if (filtroTipo !== "todos") {
      lista = lista.filter((r) => r.tipo === filtroTipo);
    }

    return [...lista].sort((a, b) =>
      orden === "desc"
        ? b.fecha.localeCompare(a.fecha)
        : a.fecha.localeCompare(b.fecha),
    );
  }, [filtroIntegrante, filtroTipo, orden]);

  const hayFiltrosActivos =
    filtroIntegrante !== "todos" || filtroTipo !== "todos";

  const handleReset = () => {
    setFiltroIntegrante("todos");
    setFiltroTipo("todos");
    setOrden("desc");
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.titulo}>Bitácora del Equipo</h1>
        <p className={styles.subtitulo}>
          Registro cronológico del proceso de trabajo de Hallows Code.
          Desplegá cada entrada para ver el detalle o filtrá por integrante y
          tipo de tarea.
        </p>
      </header>

      <section className={styles.herramientas}>
        <div className={styles.filtrosRow}>
          <label className={styles.labelFiltro}>
            <span>Integrante</span>
            <select
              value={filtroIntegrante}
              onChange={(e) => setFiltroIntegrante(e.target.value)}
              className={styles.select}
            >
              <option value="todos">Todos los integrantes</option>
              {integrantes.map((i) => (
                <option key={i} value={i}>
                  {i}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.labelFiltro}>
            <span>Tipo</span>
            <select
              value={filtroTipo}
              onChange={(e) => setFiltroTipo(e.target.value)}
              className={styles.select}
            >
              {TIPOS.map((t) => (
                <option key={t.valor} value={t.valor}>
                  {t.etiqueta}
                </option>
              ))}
            </select>
          </label>

          <label className={styles.labelFiltro}>
            <span>Orden</span>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className={styles.select}
            >
              <option value="desc">Más reciente primero</option>
              <option value="asc">Más antiguo primero</option>
            </select>
          </label>

          {hayFiltrosActivos && (
            <button
              type="button"
              onClick={handleReset}
              className={styles.btnReset}
            >
              <i className="fa-solid fa-rotate-left" aria-hidden="true"></i>
              Restablecer
            </button>
          )}
        </div>
      </section>

      <div className={styles.metadata}>
        <span>
          Mostrando{" "}
          <strong className={styles.contadorBadge}>
            {filtrados.length}
          </strong>{" "}
          {filtrados.length === 1 ? "registro" : "registros"}
          {hayFiltrosActivos && " (filtrados)"} de {REGISTROS.length} en total
        </span>
      </div>

      {filtrados.length === 0 ? (
        <div className={styles.sinResultados}>
          <div className={styles.sinResultadosIcono}>
            <i className="fa-solid fa-feather-pointed" aria-hidden="true"></i>
          </div>
          <h2 className={styles.sinResultadosTitulo}>
            No hay registros que coincidan
          </h2>
          <p className={styles.sinResultadosTexto}>
            Probá con otro integrante u otro tipo de tarea, o restablecé los
            filtros para ver la bitácora completa.
          </p>
          <button
            type="button"
            onClick={handleReset}
            className={styles.btnReset}
          >
            Restablecer filtros
          </button>
        </div>
      ) : (
        <div className={styles.lista}>
          {filtrados.map((reg) => (
            <details key={reg.id} className={styles.registro}>
              <summary className={styles.summary}>
                <span className={styles.fecha}>{reg.fecha}</span>
                <span
                  className={`${styles.badgeTipo} ${styles[`tipo_${reg.tipo}`] || ""}`}
                >
                  {ETIQUETAS_TIPO[reg.tipo] || reg.tipo}
                </span>
                <span className={styles.integrante}>{reg.integrante}</span>
                <span className={styles.tituloRegistro}>{reg.titulo}</span>
                <i
                  className={`fa-solid fa-chevron-down ${styles.flecha}`}
                  aria-hidden="true"
                ></i>
              </summary>
              <p className={styles.detalle}>{reg.detalle}</p>
            </details>
          ))}
        </div>
      )}

      {/* ─── SECCIÓN 2: DECISIONES ─── */}
      <section className={styles.seccionTematica}>
        <h2 className={styles.tituloSeccion}>
          <i className="fa-solid fa-gavel me-2" aria-hidden="true"></i>
          Decisiones del Wizengamot
        </h2>
        <div className={styles.cardsGrid}>
          {DECISIONES.map((dec, i) => (
            <div key={i} className={styles.cardTematica}>
              <h3 className={styles.cardTitulo}>{dec.titulo}</h3>
              <p className={styles.cardTexto}>{dec.texto}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ─── SECCIÓN 3: DIFICULTADES ─── */}
      <section className={styles.seccionTematica}>
        <h2 className={styles.tituloSeccion}>
          <i className="fa-solid fa-bolt me-2" aria-hidden="true"></i>
          Dificultades y Maldiciones
        </h2>
        <div className={styles.listaDificultades}>
          {DIFICULTADES.map((dif, i) => (
            <details key={i} className={styles.registro}>
              <summary className={styles.summary}>
                <span className={`${styles.badgeTipo} ${styles.tipo_fix}`}>
                  Dificultad
                </span>
                <span className={styles.tituloRegistro}>{dif.titulo}</span>
                <i
                  className={`fa-solid fa-chevron-down ${styles.flecha}`}
                  aria-hidden="true"
                ></i>
              </summary>
              <div className={styles.detalle}>
                <p>
                  <strong>Problema:</strong> {dif.problema}
                </p>
                <p>
                  <strong>Resolución:</strong> {dif.resolucion}
                </p>
              </div>
            </details>
          ))}
        </div>
      </section>
    </div>
  );
}