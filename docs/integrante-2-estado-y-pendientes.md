# Integrante 2 (Lucas) — Estado, rúbrica y pendientes

> Rama de trabajo: `feature/perfiles-dinamicos` · Documento de trabajo, actualizar a medida que se avance.
> Convención de estado: ✅ hecho · 🟡 parcial · ⛔ pendiente · 👥 depende de otro integrante

---

## 1. Mi responsabilidad y su nivel de completado

**Responsabilidad principal (consigna):** páginas individuales de perfiles y arquitectura del componente base.

| Ítem de la consigna | Completado | Qué está hecho | Qué falta |
|---|---|---|---|
| **[VISTA-2]** Estructura dinámica `/perfil/:id`, carpeta `src/pages/members/`, ruteo | **95 %** ✅ | Ruta única `/perfil/:id` en `App.jsx`; contenedor con `useParams`; búsqueda en `membersData.js`; mensaje amable si el id no existe (coincidencia exacta: `/perfil/Lucas` no existe); título de pestaña con limpieza | Nada obligatorio. Opcional: ruta `*` global (es de Sol) |
| **[PERFILES-EQUIPO]** Plantilla reutilizable (mapa del merodeador, habilidades, películas, canciones, avatar, detalles) | **95 %** ✅ | `MemberProfile` + `FavoritesMap` (×2) + `ProjectRelics`; validación con prop-types; datos de los 5 integrantes migrados del TP1; CSS Modules con paleta por casa; **punto de extensión por integrante** (`extras/index.js`, slots `children` y `cierre`); interacciones migradas de los 5: Daniela (quiz + Vitriola), Lucas (duelo + varita), Sol (Always + Copa), Juan Pablo (Efficiency Test) y Alejandro (tema Azkaban + reliquias) | Que cada integrante revise y ajuste lo suyo |
| **[RESPONSIVE-QA]** Auditoría de breakpoints en perfiles | **60 %** 🟡 | Sin scroll horizontal en los 5 perfiles a 320/375/768/1024/1280 px; ajustes en tablet (2 columnas) y desktop (cabecera en fila); capturas revisadas | Revisión visual completa sección por sección y por perfil; modo Nox; sidebar mobile real (👥 Sol); repetir con el contenido final de todos |

Arquitectura entregada (para el árbol de renderizado, Integrante 5):

```
MemberProfileContainer          (ruta: useParams + búsqueda de datos)
└── MemberProfile               (presentacional)
    ├── FavoritesMap × 2        (estado: mapa abierto, lugar activo, mensaje)
    │   ├── FavoriteCard × N    (recibe onVisitar)
    │   └── FavoriteDetail      (recibe onCerrar)
    └── ProjectRelics           (estado: proyecto abierto, explorados)
        ├── RelicCard × N       (recibe onAlternar)
        └── RelicStory          (recibe onCerrar)
```

---

## 2. Comparación con la rúbrica (solo criterios que tocan mi parte)

| # | Criterio | Nivel alcanzado hoy | Para llegar a "Propone" / sostenerlo |
|---|---|---|---|
| 04 | Proyecto en React | **3 · Propone** ✅ — `MemberProfile`, `FavoritesMap` y `ProjectRelics` se reutilizan con distintos datos por props | Mantenerlo: no duplicar plantillas por integrante |
| 06 | Navegación completa | **2 · Cumple** (mi parte) 🟡 — los perfiles tienen sidebar; el error 404 de perfil tiene links | **3 requiere recargar cualquier URL sin error**: hoy `vercel.json` está en `src/` y Vercel lo busca en la raíz → 👥 Sol (T-12) |
| 08 | Perfiles dentro de React | **3 · Propone (lectura amplia)** 🟡 — los 5 perfiles viven en la app y todos tienen el mapa interactivo | Para blindar el nivel 3: que **cada** perfil tenga además su interacción propia (T-01, T-02) |
| 09 | Estética | **Aporte a 3 · Propone** 🟡 — identidad por casa, tipografías Cinzel/Caveat, imágenes propias | El **4 · Supera** pide imágenes generadas/editadas para el proyecto y coherencia global → 👥 Sol + equipo |
| 13 | Árbol de renderizado | Aporte ✅ — árbol real entregado arriba | 👥 Integrante 5 lo vuelve interactivo |
| 15 | Declaración de IA | Pendiente de redactar 🟡 | Pasar mis datos (sección 6) |
| 03 | Integrantes con acceso | Aporte: texto de responsabilidad para README | Sección 6 |

Criterios que **no** son míos (1, 2, 5, 7, 10, 11, 12, 14): no los evalúo aquí.

---

## 3. Lo que debo tener en cuenta para que el resto avance

1. **Publicar mi rama cuanto antes.** Los demás dependen de `/perfil/:id`, `membersData.js` y `prop-types`. Hasta que haya PR, trabajan sobre un `main` sin perfiles.
2. **Conflictos previsibles:**
   - `src/App.jsx`: Sol (NAV-1) y yo lo tocamos. Mi cambio es chico (una sola ruta + un import). Mergear primero el PR de Sol o rebasar el mío sobre el suyo.
   - `package.json` / `package-lock.json`: agregué `prop-types`. Quienes mergeen deben correr `npm install`.
   - `src/data/membersData.js`: lo van a editar varias personas. Pedirles tocar **solo su propio objeto** para minimizar conflictos.
3. **Contrato de datos (no cambiarlo sin avisar):** `id` en minúscula e igual al de la URL (`alejandro`, `daniela`, `juanpablo`, `lucas`, `sol`); `casa` ∈ gryffindor/slytherin/ravenclaw/hufflepuff. Los links del Sidebar, Footer y Home ya dependen de esos ids.
4. **Duplicación de datos:** `Home.jsx` tiene su propio arreglo de integrantes (nombre, rol, casa, foto) y Sidebar/Footer hardcodean la casa por ruta. Hay que unificarlo con `membersData` (👥 Sol) para que un cambio se refleje en todos lados.
5. **Mis `!important`:** existen porque `index.css` fuerza fuente y color de `h1/h2/h3` y cambia el color en modo Nox. Si Sol acota esas reglas globales, hay que **revisar los títulos de los perfiles** (podrían verse distinto).
6. **Cuando Sol suba la sidebar colapsable**, repetir mi auditoría mobile (hoy solo pude hacerla con la sidebar oculta).
7. **Imágenes pesadas:** varias PNG de Lucas y Sol pesan ~1 MB cada una. Conviene comprimirlas antes del deploy.
8. **Portadas de Alejandro** vienen de Wikipedia (dependen de un tercero). Bajarlas a `public/img/alejandro/`.
9. **Rúbrica nivel 3 del criterio 8** se ve más sólido si cada perfil suma una interacción propia (no solo el mapa).

---

## 4. Qué debe saber cada integrante (mensajes para compartir)

### Para todos — cómo cargar su perfil
- Editar **solo su objeto** en `src/data/membersData.js`. Campos: `nombre`, `rol`, `casa`, `avatar`, `datos[]`, `sobreMi[]`, `habilidades[]`, `peliculas[]`, `canciones[]`, `proyectos[]`.
- Imágenes en `public/img/<su-id>/` y referenciarlas como `/img/<su-id>/archivo.jpg`.
- Cada película/canción: `{ titulo, lugar, subtitulo?, portada?, detalles: [{ etiqueta, valor }] }`. `detalles` es libre ("Director", "Año", "Por qué me gusta", "Frase destacada"…); un `\n` en el valor genera salto de línea (útil para letras).
- Cada proyecto: `{ titulo, subtitulo?, resumen, imagen?, historia?: { titulo, texto, tecnologias[], aporte, nota?, enlace?: { url, texto } } }`. Sin `historia`, la tarjeta es informativa (sin botón).
- Si dejan `proyectos: []`, la página muestra un aviso "todavía se están forjando".
- En desarrollo, la consola avisa si un dato no cumple el formato (prop-types).
- Probar en `http://localhost:5173/perfil/<id>` con `npm run dev`.

### Sol (Integrante 1)
- 🔴 Mover `vercel.json` a la **raíz** del repo (hoy está en `src/`) para que recargar `/perfil/lucas` no dé 404.
- **Sidebar colapsable en mobile (NAV-2): ya implementada por mí** a pedido de Lucas, para que no bloquee a nadie. Revisar y quedarse con ella o ajustarla: `src/components/Sidebar.jsx` (reescrito) y la sección "4b. SIDEBAR RESPONSIVE" de `src/index.css`. Detalle en la sección 8 de este documento.
- Agregar ruta `*` (404 global) y revisar que las rutas coincidan con la consigna (`/catalogo`, `/api`, `/arbol`, `/bitacora`; hoy hay `/estudiantes` y `/hechizos`).
- Unificar `Home.jsx`, `Sidebar.jsx` y `Footer.jsx` con `membersData` (roles, casa, avatar). Corregir la línea suelta `if (path.includes("/perfil/alejandro"));` en `Sidebar.jsx`.
- Decidir la casa de Juan Pablo (Home dice Ravenclaw; Sidebar/Footer y su perfil, Slytherin).
- Acotar las reglas globales con `!important` de `index.css` para `h1/h2/h3` y revisar cómo quedan los perfiles.
- Su perfil: completar proyectos (hoy vacío), verificar el "Sobre mí" (la última frase la completé yo) y migrar "Always"/Copa de las Casas como interacción propia.

### Integrante 3 (datos JSON, búsqueda y filtros)
- Mínimo 20 registros, tarjetas dinámicas, búsqueda por texto + filtro, mensaje "sin resultados" y botón restablecer, detalle desplegable.
- Sugerencia de la guía D9: guardar búsqueda y filtro en la URL con `useSearchParams`.
- Reutilizar el patrón padre con estado + hijos presentacionales (ver `FavoritesMap` → `FavoriteCard`).

### Integrante 4 (API pública y bitácora)
- Consumir con `useEffect` **con limpieza** (como enseña D8a) y estados cargando / error / reintentar.
- Bitácora con acordeones o filtros. Agregar mis registros (sección 5).

### Integrante 5 (árbol, QA, README)
- Usar el árbol real de la sección 1 como base de `/arbol` e incorporar los componentes de los demás.
- README: integrantes con GitHub, deploy, uso de IA por integrante (texto en sección 6) y responsabilidades.
- Auditoría de rúbrica final; verificar `npm install` limpio tras mergear (nueva dependencia `prop-types`).

### Integrantes con perfil propio (Alejandro, Daniela, Juan Pablo)
- **Alejandro (importante):** su `public/img/alejandro-avatar.gif` pesa **41 MB**, así que **su perfil y la portada tardan en cargar**. Se dejó como está a pedido; le toca reemplazarlo por una versión liviana. Además tiene que **poner sus imágenes en su carpeta** `public/img/alejandro/` (hoy las portadas de películas y discos se cargan desde Wikipedia, que depende de un tercero) y actualizar las rutas en su objeto de `membersData.js`.
- **Proyectos (todos):** cada uno tiene que completar `proyectos` en su objeto de `membersData.js` (`titulo`, `resumen`, `imagen` opcional e `historia` con desafío, tecnologías, aporte y enlace). Estado hoy: Alejandro y Lucas tienen 3 completos; **Daniela y Sol tienen la lista vacía** (se muestra "todavía se están forjando"); Juan Pablo tiene 3 tarjetas informativas **sin historia** (falta desafío, tecnologías y aporte para que se puedan revelar).
- Revisar que sus textos/imágenes migrados del TP1 sean los correctos (los extraje automáticamente).
- Daniela, Lucas y Sol: su interacción ya está migrada (ver `src/components/members/extras/`); revisarla y ajustarla.
- Alejandro y Juan Pablo: también migradas. Alejandro = tema Azkaban (campos `tema`, `intro` y `placa` en `membersData.js`) + reliquias; Juan Pablo = `SlytherinEfficiencyTest` en `extras/`. Para sumar algo nuevo, los 3 pasos están en `extras/index.js`.
- Tema visual propio: cualquier integrante puede definir uno nuevo agregando un bloque `.perfil[data-tema="..."]` en `MemberProfile.module.css` con las variables `--tema-*` (ver el bloque de Azkaban) y el campo `tema` en su objeto (hay que sumarlo también a `oneOf` en `memberPropTypes.js`).
- Cualquiera que quiera un botón "Escuchar" en sus canciones: agregar `embed: { tipo: "spotify", url, titulo, cancion }` a la canción en `membersData.js`.

---

## 5. Entradas para la Bitácora (propuestas)

- **Decisión:** separar contenedor (`MemberProfileContainer`) y presentacional (`MemberProfile`) según D9.
- **Decisión:** CSS Modules por componente para evitar choques con Bootstrap y el CSS global.
- **Dificultad resuelta:** React 19 ignora `propTypes`; se agregó un helper que los valida en desarrollo.
- **Dificultad resuelta:** el título "Alejandro" a 48 px desbordaba la columna a 1024 px (sidebar de 250 px); se ajustaron tamaños entre 1024 y 1279 px.
- **Decisión:** el mapa del TP1 pasó a 2 columnas en tablet para que los títulos no se partieran.
- **Mejora:** dividir `FavoritesMap` y `ProjectRelics` en padre con estado + hijos sin estado.
- **Bug corregido:** el título de la pestaña quedaba con el nombre del integrante al volver a otras pantallas.

---

## 6. Texto para el README (mis datos)

- **Responsabilidad (criterio 03 Propone):** Lucas — perfiles dinámicos `/perfil/:id`, plantilla reutilizable `MemberProfile`, datos de integrantes y auditoría responsive de los perfiles.
- **Uso de IA (criterio 15 Propone):**
  - Aplicación: Claude Code (app de escritorio).
  - Modelos: Claude Opus 5.5 (inicio de la sesión) y Claude Sonnet 5.5 (después del cambio de modelo).
  - Tareas: ruteo dinámico, plantilla de perfiles, migración de contenido del TP1 a datos, CSS Modules y breakpoints, componentes del mapa y reliquias, auditoría responsive y revisión de las guías de la cursada.
  - Lo hecho con IA fue revisado y probado en el navegador antes de incorporarlo.

---

## 7. Lista de tareas pendientes (mi parte, hacia la entrega)

Prioridad: 🔴 bloquea a otros o a la entrega · 🟠 importante · 🟢 mejora

### 🔴 Bloqueantes
- [ ] **T-00 Commit + push + Pull Request** de `feature/perfiles-dinamicos` (incluye `public/img/*`, `src/components/members`, `src/data`, `src/pages/members`, `App.jsx`, `package*.json`). Sin esto nadie puede usar mi trabajo.
- [x] **T-01 Punto de extensión por integrante.** HECHO: registro `EXTRAS_POR_MIEMBRO` en `src/components/members/extras/index.js` (slots `despuesDeSobreMi` y `alFinal`), con instrucciones de 3 pasos en el propio archivo. Ya lo usan Daniela, Lucas y Sol.
- [ ] **T-02 Avisar a los demás** con los mensajes de la sección 4 (idealmente en el PR y por el chat del grupo).

### 🟠 Importantes
- [ ] **T-03 Auditoría responsive completa** (RESPONSIVE-QA): revisar visualmente cada sección de los 5 perfiles a 320, 768 y 1024 px, con la sidebar real y con el contenido final; incluir modo Nox y contraste.
- [ ] **T-04 Repetir la auditoría** cuando Sol suba la sidebar colapsable y cuando cambie `index.css`.
- [ ] **T-05 Bajar las portadas de Alejandro** a `public/img/alejandro/` y actualizar sus rutas en `membersData.js`.
- [ ] **T-06 Comprimir imágenes pesadas** (PNG de Lucas y Sol de ~1 MB).
- [ ] **T-07 Verificar en Vercel** (con `vercel.json` ya en la raíz): recargar `/perfil/lucas` y `/perfil/sol`, y `/perfil/hagrid` (debe mostrar el mensaje, no 404).
- [ ] **T-08 Revisar mi propio contenido**: mis textos de Lucas (rol, "Sobre mí", frases de canciones, enlaces de proyectos) y las capturas de proyectos.
- [ ] **T-09 Pasar mis entradas de bitácora** (sección 5) y mi texto de README (sección 6) al Integrante 4 y al 5.

### 🟢 Mejoras
- [x] **T-10 Migrar mi interacción del TP1** (duelo "Expelliarmus" y cursor-varita): HECHO como `ExpelliarmusDuelo`. La varita-cursor ahora es **global** (`src/components/wand/`, montada en `App.jsx`): está en todas las páginas y no se reinicia al navegar. El duelo la "desarma" con `useWand()` y la varita vuelve en cuanto se sale del perfil de Lucas. Se desactiva con `prefers-reduced-motion` y en dispositivos sin puntero fino. Limitación: sobre el reproductor de Spotify (iframe) vuelve a verse el cursor del sistema, porque el navegador no pasa los eventos del mouse del iframe a la página.
- [ ] **T-14 Comprimir `public/img/patronus-ciervo.png`** (2,1 MB, es la imagen de Sol que se carga al pulsar "Revelio").
- [ ] **T-15 Avisar a Daniela, Sol, Juan Pablo y Alejandro** de que sus interacciones ya están migradas y dónde viven (`extras/` y `membersData.js`), para que las revisen y las ajusten a su gusto.
- [ ] **T-11 Accesibilidad**: pasada con teclado (Tab, Escape) y lector de pantalla en mapa y reliquias; revisar jerarquía de títulos.
- [ ] **T-12 (👥 Sol) `vercel.json` en la raíz** — no es mío, pero lo controlo en T-07.
- [ ] **T-13 Prueba final de la rúbrica** en mis criterios (04, 06, 08) antes de que el Integrante 5 haga la auditoría general.

### Orden sugerido
`T-00 → T-02 → T-01 → T-05/T-06 → T-03/T-04 → T-07 → T-09 → T-10/T-11 → T-13`

---

## 8. NAV-2 Sidebar responsive (hecho por Lucas, tarea de Sol)

Se implementó para desbloquear la auditoría responsive de los perfiles.

**Comportamiento**
- **768px+ (tablet y desktop):** barra lateral fija de 250px, alto completo, `position: sticky` (acompaña el scroll). Sin barra superior.
- **< 768px (mobile):** barra superior fija de 56px con botón de menú y título; la sidebar es un panel que se desliza desde la izquierda con fondo oscuro. La barra toma los colores de la casa del perfil.
- **Cierre del panel:** botón ✕, clic en el fondo, Escape, elegir un enlace, cambiar de ruta (incluido el botón Atrás) o ensanchar la ventana a desktop.
- **Accesibilidad:** `aria-expanded`/`aria-controls` en el botón, foco al botón de cierre al abrir y de vuelta al botón de menú al cerrar, Tab atrapado dentro del panel, scroll de la página bloqueado mientras está abierto, panel cerrado fuera del orden de Tab (`visibility: hidden`), objetivos táctiles de 44px, `prefers-reduced-motion` respetado.
- **Sección activa:** `NavLink` marca la clase `active-link` y `aria-current="page"` automáticamente.

**Grupos desplegables de la sidebar**
- Sobre la sidebar de Sol (con sus íconos), los enlaces se agrupan bajo tres títulos: *Integrantes*, *Proyecto* (Árbol de Componentes, Bitácora) y *Hogwarts* (Estudiantes, Hechizos). Los tres usan el estilo que ya tenía el título "Integrantes".
- Solo se muestra abierto el grupo de la página actual (en la portada, ninguno); los títulos se abren y cierran a mano y abrir uno cierra los demás.
- Para sumar un enlace: agregarlo a `INTEGRANTES`, `PROYECTO` o `HOGWARTS` en `Sidebar.jsx`.
- Se quitó la línea separadora entre Integrantes y el resto: los títulos ocupan su lugar.

**Cambios en archivos compartidos (revisar con Sol)**
- `src/components/Sidebar.jsx`: reescrito (enlaces ahora salen de dos listas `INTEGRANTES` y `SECCIONES`).
- `src/index.css`: sección 4b nueva; `.main-content` con `min-width: 0` (evita que un contenido ancho empuje a `<main>` fuera de pantalla); variable `--topbar-altura`; la barra superior se suma a los selectores de color por casa; corrección del botón Nox/Lumos, que era ilegible sobre el fondo amarillo de Hufflepuff.
- `Sidebar.jsx`: la línea suelta `if (path.includes("/perfil/alejandro"));` pasó a ser un comentario (Alejandro queda con sidebar neutra a propósito, por su tema Azkaban).
- `MemberProfile.module.css`: se quitó el relleno superior que esquivaba el botón flotante, porque la barra superior ya reserva su propio espacio.

**Auditoría (11 rutas × 13 anchos, con todas las interacciones abiertas)**
Anchos: 320, 360, 375, 414, 480, 600, 767, 768, 900, 1024, 1280, 1440 y 1920 px. Rutas: portada, 5 perfiles, `/arbol`, `/estudiantes`, `/hechizos`, `/bitacora` e id inexistente. Se verificó: sin scroll horizontal, topbar solo en mobile, sidebar fija solo desde 768px, contenido por debajo de la topbar, sección activa correcta en cada ruta y 404 sin ítem activo. Resultado: sin problemas. Además: panel con 320px de alto (celular en horizontal) con scroll interno y botón Nox alcanzable.

**Pendiente de este bloque**
- [ ] Probar en un celular real (Safari iOS y Chrome Android): el panel, el bloqueo de scroll y el foco.
- [ ] Las páginas provisorias (`/arbol`, `/estudiantes`, `/hechizos`, `/bitacora`) son placeholders: cuando sus dueños las reemplacen, repetir la auditoría.
