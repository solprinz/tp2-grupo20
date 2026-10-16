# 🪄 Hallows Code — TP2 React

Proyecto web grupal desarrollado para el **Trabajo Práctico 2** de la materia _Desarrollo de Sistemas Web (Front End)_ del IFTS 29, 2° cuatrimestre 2026.

Hallows Code es una aplicación web temática de Harry Potter que presenta al equipo de desarrollo, sus perfiles individuales, un libro interactivo de hechizos, un bestiario de estudiantes consultado en vivo a la API pública de Harry Potter, y una bitácora del proceso de trabajo. Está construida con **React + Vite** y navegación con **React Router 7**.

Este TP continúa el proyecto iniciado en el [TP1](https://github.com/solprinz/tp1-grupo20), migrado de HTML/CSS/JS vanilla a una arquitectura de componentes reutilizables.

---

## 📋 Índice

- [Descripción](#-descripción)
- [Deploy](#-deploy)
- [Integrantes](#-integrantes)
- [Tecnologías](#️-tecnologías)
- [Estructura del proyecto](#-estructura-del-proyecto)
- [Funcionalidades](#-funcionalidades)
- [Uso de IA](#-uso-de-ia)
- [Cómo correr el proyecto](#-cómo-correr-el-proyecto)
- [Referencias](#-referencias)

---

## 🎯 Descripción

La aplicación está organizada en secciones accesibles desde una **sidebar compartida**:

- **Portada**: presentación del equipo con tarjetas a cada perfil
- **Perfiles dinámicos** (`/perfil/:id`): página individual de cada integrante con su bio, habilidades, películas y discos favoritos, y proyectos
- **Libro de Hechizos** (`/hechizos`): catálogo de 124 hechizos desde un JSON local, con búsqueda por texto, filtro por categoría y paginación
- **Estudiantes** (`/estudiantes`): bestiario consultado en vivo a la [HP-API](https://hp-api.onrender.com/) con estados de carga, error y reintentar, más búsqueda y filtro por casa
- **Bitácora** (`/bitacora`): registro cronológico del proceso de trabajo con filtros por integrante y tipo, secciones temáticas de decisiones y dificultades, y acordeones desplegables
- **Árbol de Componentes** (`/arbol`): jerarquía visual de componentes de la app

Todas las secciones comparten la identidad visual del equipo: paleta dorada/crema, tipografía Cinzel y modo oscuro **Nox/Lumos**.

---

## 🌐 Deploy

**Sitio publicado en Vercel:** [https://tp2-grupo20.vercel.app](https://tp2-grupo20.vercel.app)

---

## 👥 Integrantes

| Nombre | GitHub |
|--------|--------|
| Alejandro Ramos | [@AleR25](https://github.com/AleR25) |
| Daniela Méndez | [@mendez-daniela](https://github.com/mendez-daniela) |
| Juan Pablo | [@JPFinal](https://github.com/JPFinal) |
| Lucas Sosa | [@Strashoy](https://github.com/Strashoy) |
| Sol Prinzen | [@solprinz](https://github.com/solprinz) |

---

## 🛠️ Tecnologías

- **React 19.2** — biblioteca de UI basada en componentes
- **React Router 7.18** — navegación SPA con rutas dinámicas
- **Vite 8.3** — bundler y dev server
- **Bootstrap 5** — grilla, utilidades y componentes responsive
- **CSS Modules** — estilos encapsulados por componente
- **Font Awesome 6** — iconografía
- **Google Fonts** — Cinzel, Caveat, Noto Sans
- **prop-types** — validación de propiedades de componentes
- **ESLint 10** — linter con reglas de React Hooks y React Refresh

---

## 📁 Estructura del proyecto

```
tp2-grupo20/
├── public/                     # Recursos estáticos (logos, imágenes)
├── src/
│   ├── components/            # Componentes reutilizables
│   │   ├── Footer.jsx
│   │   ├── MemberCard.jsx
│   │   ├── ScrollToTop.jsx
│   │   ├── Sidebar.jsx        # Menú lateral compartido
│   │   ├── members/           # Componentes de perfil reutilizables
│   │   │   └── extras/        # Animaciones y componentes interactivos individuales
│   │   └── wand/              # Cursor de varita + provider global
│   ├── data/
│   │   ├── libro_de_hechizos.json    # 124 hechizos
│   │   ├── architectureData.js       # Datos de la jerarquía para el Árbol de Componentes
│   │   └── membersData.js            # Datos de los 5 integrantes
│   ├── pages/
│   │   ├── Arquitectura.jsx          # Jerarquía visual del proyecto
│   │   ├── Bitacora.jsx              # Timeline + decisiones + dificultades
│   │   ├── Estudiantes.jsx           # HP-API con estados
│   │   ├── Home.jsx                  # Portada
│   │   ├── LibroDeHechizos.jsx       # JSON local + búsqueda/filtro
│   │   └── members/
│   │       └── MemberProfileContainer.jsx
│   ├── App.jsx                # Router principal
│   ├── main.jsx               # Entry point
│   └── index.css              # Estilos globales
├── index.html
├── package.json
├── vercel.json                # Configuración de deploy
└── vite.config.js
```

---

## ⚡ Funcionalidades

### Sidebar compartida (`components/Sidebar.jsx`)
- Menú lateral fijo en desktop, panel deslizante en mobile
- Grupos colapsables: Integrantes, Proyecto, Hogwarts
- Identificación automática de la sección activa
- Modo oscuro **Nox/Lumos** con persistencia en localStorage
- Accesibilidad: cierre con Escape, foco atrapado en el panel móvil

### Portada (`pages/Home.jsx`)
- Presentación del equipo con elementos interactivos
- Tarjetas con acceso a cada perfil

### Perfiles dinámicos (`pages/members/`)
- Ruta `/perfil/:id` con plantilla reutilizable
- Cada perfil muestra: bio, habilidades, películas y discos favoritos, proyectos
- Datos centralizados en `data/membersData.js`

### Libro de Hechizos (`pages/LibroDeHechizos.jsx`)
- Catálogo de 124 hechizos desde JSON local
- Búsqueda por texto (nombre, tipo, descripción)
- Filtro por categoría (encantamiento, maldición, maleficio, embrujo, hechizo, otros)
- Paginación con 12 registros por página
- Fichas desplegables con instrucciones de varita
- Estado "sin resultados" con botón de restablecer

### Estudiantes (`pages/Estudiantes.jsx`)
- Consumo de la HP-API (`https://hp-api.onrender.com/api/characters/students`)
- Estados de carga ("Invocando estudiantes..."), error y reintentar
- Botón "Actualizar" para refrescar datos desde la UI
- Búsqueda por nombre o actor
- Filtro por casa (Gryffindor, Slytherin, Ravenclaw, Hufflepuff)
- Grilla con borde superior de color según la casa

### Bitácora (`pages/Bitacora.jsx`)
- Timeline cronológico con filtros por integrante, tipo y orden
- 13+ registros con acordeones desplegables
- Sección temática "Decisiones del Wizengamot" (continuación del TP1)
- Sección temática "Dificultades y Maldiciones" (continuación del TP1)
- Estado "sin resultados" con restablecer

- ### Árbol de Componentes (`pages/ArbolComponentes.jsx`)
- Esquema visual que representa la jerarquía y estructura de la app React
- Muestra la relación entre `App`, `LayoutHallows`, `Sidebar`, `MainContent` y los componentes hijos
- Explica el flujo de props, estados globales y modularización del proyecto

### Modo Nox/Lumos
- Alternancia entre modo claro y oscuro desde la sidebar
- Persistencia en localStorage
- Aplicable a todas las secciones

---

## 🤖 Uso de IA

En el TP2 usamos herramientas de IA como **asistentes técnicos** en momentos puntuales del desarrollo.

### Herramientas utilizadas por integrante

| Integrante | Aplicación | Modelo | Tareas |
|------------|-----------|--------|--------|
| Alejandro Ramos | Codex | GPT-6 Astra | Creación de la historia de las reliquias de la muerte |
| Daniela Méndez | DeepSeek | V3 | Estructura de Estudiantes y Bitácora, ajustes CSS, redacción   del README |
| Juan Pablo | _completar_ | _completar_ | _completar_ |
| Lucas Sosa | _completar_ | _completar_ | _completar_ |
| Sol Prinzen | Gemini | Gemini 2.5 Pro | Asistencia técnica y consultas para la migración de HTML/CSS a componentes de React, estandarización de perfiles y  modo NOX | |

> **Aclaración:** cada integrante completa su fila con la aplicación, el modelo y las tareas concretas para las que usó IA durante el TP2.

### Criterio de uso

La IA fue una **herramienta de apoyo**, no un sustituto del trabajo propio:

- **Consultas técnicas:** entender errores de React, CSS Modules, estados de API y navegación con React Router.
- **Revisión de código:** validar soluciones y explorar alternativas antes de implementarlas.
- **Generación de imágenes:** recursos visuales temáticos del universo Harry Potter.

Las decisiones de diseño, la arquitectura del proyecto, la selección de contenido y la integración final fueron **nuestras**, revisadas y adaptadas por cada integrante.

---

## 🚀 Cómo correr el proyecto

```bash
# Clonar el repositorio
git clone https://github.com/solprinz/tp2-grupo20.git

# Entrar a la carpeta
cd tp2-grupo20

# Instalar dependencias
npm install

# Correr el servidor de desarrollo
npm run dev
```

El sitio estará disponible en `http://localhost:5173`.

### Scripts disponibles

- `npm run dev` — servidor de desarrollo con HMR
- `npm run build` — build de producción
- `npm run preview` — previsualizar el build
- `npm run lint` — ejecutar ESLint

---

## 📚 Referencias

- [Repositorio del TP1](https://github.com/solprinz/tp1-grupo20)
- [HP-API — Documentación](https://hp-api.onrender.com/)
