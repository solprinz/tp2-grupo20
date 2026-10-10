/**
 * Fuente única de datos de los integrantes de Hallows Code.
 *
 * Cada objeto alimenta la plantilla <MemberProfile /> a través de la ruta
 * dinámica /perfil/:id. Para editar un perfil NO hace falta tocar
 * componentes: alcanza con modificar el objeto correspondiente.
 *
 * Contenido migrado desde los perfiles del TP1 (pages/members/*.html).
 *
 * Forma de cada integrante (validada en memberPropTypes.js):
 * - id           → slug de la URL (/perfil/<id>). Único y en minúsculas.
 * - nombre       → nombre que se muestra en la cabecera.
 * - rol          → subtítulo temático.
 * - casa         → "gryffindor" | "slytherin" | "ravenclaw" | "hufflepuff".
 *                  Define la paleta de acentos del perfil.
 * - avatar       → ruta pública de la foto (carpeta /public).
 * - tema?        → tema visual especial ("azkaban"); redefine la paleta.
 * - intro?       → texto sobre el nombre (por defecto "Perfil personal").
 * - placa?       → { titulo, leyenda? } bajo el avatar (p. ej. expediente).
 * - datos        → pares { etiqueta, valor } (ciudad, edad, etc.).
 * - sobreMi      → párrafos de presentación.
 * - habilidades  → lista de textos (se numeran solos: 01, 02…).
 * - peliculas / canciones → favoritos del Mapa del Merodeador:
 *     { titulo, lugar, portada?, subtitulo?, detalles: [{ etiqueta, valor }] }
 *     `detalles` es flexible: cada integrante decide qué fichas mostrar
 *     (Director, Año, "Por qué me gusta", "Frase destacada", etc.).
 *     Los saltos de línea ("\n") se respetan al mostrar la ficha.
 *     Opcional `embed: { tipo: "spotify" | "youtube", url, titulo, cancion? }`:
 *     agrega un botón "Escuchar" que abre la Vitriola (modal con reproductor).
 * - proyectos    → "El relato de las tres creaciones" (reliquias):
 *     { titulo, subtitulo?, resumen, imagen?, historia?: {
 *         titulo, texto, tecnologias?, aporte?, enlace?: { url, texto }, nota? } }
 *     Un proyecto sin `historia` se muestra como tarjeta informativa.
 */

export const membersData = [
  {
    id: "alejandro",
    nombre: "Alejandro Ramos",
    rol: "Desarrollador Back End · Java · Spring Framework",
    casa: "gryffindor",
    avatar: "/img/alejandro-avatar.gif",
    // Perfil ambientado como expediente de Azkaban (igual que en el TP1).
    tema: "azkaban",
    intro: "Archivo reservado · Azkaban",
    placa: {
      titulo: "Azkaban · Expediente 020",
      leyenda: "Prisionero del código",
    },
    datos: [
      { etiqueta: "Ciudad", valor: "CABA" },
      { etiqueta: "Edad", valor: "30 años" },
    ],
    sobreMi: [
      "Soy un desarrollador Back End con experiencia en Java y Spring Framework. Me apasiona crear soluciones eficientes y escalables, y disfruto trabajando en equipo para enfrentar desafíos técnicos. Siempre estoy buscando aprender nuevas tecnologías y mejorar mis habilidades para contribuir al éxito de los proyectos en los que participo.",
    ],
    habilidades: [
      "Maquetación con HTML",
      "Diseño responsive",
      "Posicionamiento con CSS",
      "Trabajo en equipo",
    ],
    peliculas: [
      {
        titulo: "Super Mario Bros.: La película",
        lugar: "El cine",
        portada:
          "https://upload.wikimedia.org/wikipedia/en/4/44/The_Super_Mario_Bros._Movie_poster.jpg",
        detalles: [
          { etiqueta: "Dirección", valor: "Aaron Horvath y Michael Jelenic" },
          { etiqueta: "Año", valor: "2023" },
          { etiqueta: "Género", valor: "Animación, aventura y comedia" },
          {
            etiqueta: "Sinopsis",
            valor:
              "Mario llega al Reino Champiñón y se une a Peach y Toad en una aventura para rescatar a Luigi y enfrentar a Bowser.",
          },
        ],
      },
      {
        titulo: "Patch Adams",
        lugar: "La torre",
        portada:
          "https://upload.wikimedia.org/wikipedia/en/5/53/Patch_Adams_1998_movie_poster.jpg",
        detalles: [
          { etiqueta: "Director", valor: "Tom Shadyac" },
          { etiqueta: "Año", valor: "1998" },
          { etiqueta: "Género", valor: "Comedia dramática" },
          {
            etiqueta: "Sinopsis",
            valor:
              "Un estudiante de medicina desafía las convenciones de su profesión al poner el humor y el trato humano en el centro de la atención a sus pacientes.",
          },
        ],
      },
      {
        titulo: "La sociedad de los poetas muertos",
        lugar: "La biblioteca",
        portada:
          "https://upload.wikimedia.org/wikipedia/en/8/86/Dead_poets_society.png",
        detalles: [
          { etiqueta: "Director", valor: "Peter Weir" },
          { etiqueta: "Año", valor: "1989" },
          { etiqueta: "Género", valor: "Drama" },
          {
            etiqueta: "Sinopsis",
            valor:
              "En un colegio de tradición estricta, un profesor de literatura inspira a sus alumnos a descubrir la poesía, pensar por sí mismos y encontrar su propia voz.",
          },
        ],
      },
    ],
    canciones: [
      {
        titulo: "Hybrid Theory",
        subtitulo: "Linkin Park",
        lugar: "El salón",
        portada:
          "https://upload.wikimedia.org/wikipedia/en/2/2a/Linkin_Park_Hybrid_Theory_Album_Cover.jpg",
        detalles: [
          { etiqueta: "Artista", valor: "Linkin Park" },
          { etiqueta: "Año", valor: "2000" },
          { etiqueta: "Género", valor: "Nu metal y rap rock" },
          { etiqueta: "Canción destacada", valor: "In the End" },
        ],
      },
      {
        titulo: "The Colour and the Shape",
        subtitulo: "Foo Fighters",
        lugar: "La tienda de vinilos",
        portada:
          "https://upload.wikimedia.org/wikipedia/en/0/0d/FooFighters-TheColourAndTheShape.jpg",
        detalles: [
          { etiqueta: "Artista", valor: "Foo Fighters" },
          { etiqueta: "Año", valor: "1997" },
          { etiqueta: "Género", valor: "Rock alternativo y post-grunge" },
          { etiqueta: "Canción destacada", valor: "Everlong" },
        ],
      },
      {
        titulo: "The Number of the Beast",
        subtitulo: "Iron Maiden",
        lugar: "El escenario",
        portada:
          "https://upload.wikimedia.org/wikipedia/en/3/32/IronMaiden_NumberOfBeast.jpg",
        detalles: [
          { etiqueta: "Artista", valor: "Iron Maiden" },
          { etiqueta: "Año", valor: "1982" },
          { etiqueta: "Género", valor: "Heavy metal" },
          { etiqueta: "Canción destacada", valor: "Hallowed Be Thy Name" },
        ],
      },
    ],
    proyectos: [
      {
        titulo: "Gestor de Tiendas",
        subtitulo: "La ambición de crear",
        resumen:
          "Sistema para gestionar las operaciones de una tienda basado en Spring Framework, creado como proyecto de integración al finalizar un bootcamp en la empresa donde trabajo.",
        historia: {
          titulo: "Desafío y solución",
          texto:
            "Resolvimos el problema de gestionar las operaciones de una tienda de manera eficiente y escalable.",
          tecnologias: ["Spring Framework", "MySQL", "Angular"],
          aporte:
            "Crear endpoints para comunicar el frontend con la base de datos.",
          nota: "Al ser un proyecto de la empresa donde trabajo, no se encuentra disponible públicamente.",
        },
      },
      {
        titulo: "Gestor de Gimnasio",
        subtitulo: "Una idea que renace",
        resumen:
          "Sistema de gestión para un club que permite administrar membresías, rutinas y reservas. Realizado para una materia del IFTS 29.",
        historia: {
          titulo: "Aprendizaje y transformación",
          texto:
            "Un proyecto académico que permitió modelar las operaciones reales de un club de punta a punta.",
          tecnologias: ["C#", "MySQL"],
          aporte:
            "Desarrollo de la lógica de negocio y las funcionalidades principales, creación del manual y documentación.",
          nota: "Se preparó para la presentación final de la materia, sin repositorio público.",
        },
      },
      {
        titulo: "Huna",
        subtitulo: "El valor de los detalles",
        resumen:
          "Proyecto de negocio de venta de cosméticos naturales junto a mi madre.",
        historia: {
          titulo: "Detalles y experiencia",
          texto:
            "Gestionamos el negocio de forma que yo me encargaba de la parte de cuentas y mi madre de la producción, aprovechando nuestras fortalezas y habilidades para lograr un negocio exitoso.",
        },
      },
    ],
  },

  {
    id: "daniela",
    nombre: "Daniela Méndez",
    rol: "Maestra de Transformaciones Front-end",
    casa: "slytherin",
    avatar: "/img/daniela-avatar.jpg",
    datos: [
      { etiqueta: "Ciudad", valor: "CABA" },
      { etiqueta: "Edad", valor: "39 años" },
    ],
    sobreMi: [
      "Soy Profesora en Educación Especial y estudio Desarrollo de Software en el IFTS 29. Empecé realizando talleres orientados a programación para docentes y, sin darme cuenta, terminé enamorada del código: hoy combino mis dos mundos.",
      "Me interesa el backend, aunque disfruto explorar el frontend porque me permite crear experiencias pensadas para todas las personas. Mi título me define como maestra de transformaciones front-end y me encanta que así sea.",
      "Lo que me motiva es resolver problemas, construir buenas experiencias y, sobre todo, garantizar la accesibilidad: trabajo con personas con discapacidad y sé que una web bien hecha puede abrir puertas.",
    ],
    habilidades: ["Organización", "Compromiso", "Resiliencia", "Creatividad"],
    peliculas: [
      {
        titulo: "Hasta el último hombre",
        lugar: "El cine",
        portada: "/img/daniela/heuh-pelicula.jpg",
        detalles: [
          { etiqueta: "Director", valor: "Mel Gibson" },
          { etiqueta: "Año", valor: "2016" },
          { etiqueta: "Género", valor: "Bélico / Drama" },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "Muestra el valor de salvar vidas sin recurrir a las armas, manteniéndose fiel a sus convicciones y a su fe.",
          },
        ],
      },
      {
        titulo: "Coraline",
        lugar: "La torre",
        portada: "/img/daniela/coraline-pelicula.jpg",
        detalles: [
          { etiqueta: "Director", valor: "Henry Selick" },
          { etiqueta: "Año", valor: "2009" },
          { etiqueta: "Género", valor: "Infantil / Terror" },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "Presenta una trama misteriosa y original, acompañada de un estilo de animación único que crea una atmósfera cautivadora.",
          },
        ],
      },
      {
        titulo: "Black Swan",
        lugar: "La biblioteca",
        portada: "/img/daniela/black-swan.jpg",
        detalles: [
          { etiqueta: "Director", valor: "Darren Aronofsky" },
          { etiqueta: "Año", valor: "2011" },
          { etiqueta: "Género", valor: "Terror / Drama" },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "Explora la obsesión por alcanzar la perfección y la lucha interna de una bailarina, acompañadas de una atmósfera intensa y perturbadora.",
          },
        ],
      },
    ],
    canciones: [
      {
        titulo: "Minutes to Midnight",
        subtitulo: "Linkin Park",
        lugar: "El salón",
        portada: "/img/daniela/minutes-to-midnight-lp.jpg",
        detalles: [
          { etiqueta: "Artista", valor: "Linkin Park" },
          { etiqueta: "Año", valor: "2007" },
          { etiqueta: "Género", valor: "Nu Metal" },
          { etiqueta: "Canción destacada", valor: "Shadow of the Day" },
        ],
        embed: {
          tipo: "spotify",
          url: "https://open.spotify.com/embed/track/0OYcEfskah1egYHjYRvbg1?utm_source=generator",
          titulo: "Shadow of the Day — Linkin Park",
          cancion: "Shadow of the Day",
        },
      },
      {
        titulo: "Born to Die",
        subtitulo: "Lana Del Rey",
        lugar: "La tienda de vinilos",
        portada: "/img/daniela/lana-rey.jpg",
        detalles: [
          { etiqueta: "Artista", valor: "Lana Del Rey" },
          { etiqueta: "Año", valor: "2012" },
          { etiqueta: "Género", valor: "Indie pop" },
          { etiqueta: "Canción destacada", valor: "Dark Paradise" },
        ],
        embed: {
          tipo: "spotify",
          url: "https://open.spotify.com/embed/track/6qqdFWe7C4LsBjWbXQdsHA?utm_source=generator",
          titulo: "Dark Paradise — Lana Del Rey",
          cancion: "Dark Paradise",
        },
      },
      {
        titulo: "Cry Baby",
        subtitulo: "Melanie Martinez",
        lugar: "El escenario",
        portada: "/img/daniela/melaniemartinez.jpg",
        detalles: [
          { etiqueta: "Artista", valor: "Melanie Martinez" },
          { etiqueta: "Año", valor: "2015" },
          { etiqueta: "Género", valor: "Pop alternativo" },
          { etiqueta: "Canción destacada", valor: "Play Date" },
        ],
        embed: {
          tipo: "spotify",
          url: "https://open.spotify.com/embed/track/4GBcYFYVwnsPDo6OOauRir?utm_source=generator",
          titulo: "Play Date — Melanie Martinez",
          cancion: "Play Date",
        },
      },
    ],
    // En el TP1 Daniela no tenía sección de proyectos: la plantilla muestra
    // un mensaje amigable cuando la lista está vacía.
    proyectos: [],
  },

  {
    id: "juanpablo",
    nombre: "Juan Pablo",
    rol: "Erudito de Aritmancia y Lógica de JavaScript",
    casa: "slytherin",
    avatar: "/img/juanpablo-avatar.jpg",
    datos: [
      { etiqueta: "Ciudad", valor: "Paraná" },
      { etiqueta: "Edad", valor: "38 años" },
    ],
    sobreMi: [
      "Soy desarrollador orientado a la lógica, la eficiencia y la funcionalidad. Me interesa cómo las pequeñas decisiones en el código pueden transformar por completo la experiencia de un usuario y la calidad de un sistema.",
      "Estudio Desarrollo de Software en el IFTS 29 y trabajo en proyectos donde la optimización, la automatización y la claridad estructural son fundamentales.",
      "Mi enfoque combina pensamiento funcional, orden, QA automatizado y una búsqueda constante por la eficiencia real.",
    ],
    habilidades: [
      "Organización lógica",
      "Eficiencia en procesos",
      "Pensamiento funcional",
      "Optimización de código",
      "Automatización",
      "Resolución de problemas",
    ],
    peliculas: [
      {
        titulo: "The Terminator",
        lugar: "El cine",
        portada: "/img/juanpablo/terminator.jpg",
        detalles: [
          { etiqueta: "Director", valor: "James Cameron" },
          { etiqueta: "Año", valor: "1984" },
          { etiqueta: "Género", valor: "Ciencia ficción / Acción" },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "Un cyborg implacable enviado desde el futuro, tensión y suspenso constantes, y el inicio de una de las sagas de ciencia ficción y acción más influyentes de la historia. La combinación de narrativa cyberpunk y efectos prácticos la convierten en un clásico indiscutible.",
          },
        ],
      },
      {
        titulo: "Warcraft: El origen",
        lugar: "La torre",
        portada: "/img/juanpablo/warcraft.jpg",
        detalles: [
          { etiqueta: "Director", valor: "Duncan Jones" },
          { etiqueta: "Año", valor: "2016" },
          { etiqueta: "Género", valor: "Fantasía / Acción / Aventura" },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "Trasladar el vasto universo de Azeroth a la gran pantalla fue un desafío titánico logrado con un despliegue visual asombroso. Lo mejor es que no cae en el cliché del bien contra el mal absoluto: muestra los dilemas, la lealtad y el honor tanto de la Horda orca como de la Alianza humana.",
          },
        ],
      },
      {
        titulo: "Avengers: Infinity War",
        lugar: "La biblioteca",
        portada: "/img/juanpablo/avengers-infinity-war.jpg",
        detalles: [
          { etiqueta: "Director", valor: "Anthony y Joe Russo" },
          { etiqueta: "Año", valor: "2018" },
          {
            etiqueta: "Género",
            valor: "Acción / Superhéroes / Ciencia ficción",
          },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "El punto culminante de diez años de historias interconectadas en el MCU. Destaca por darle a Thanos una presencia arrolladora y motivaciones contundentes, logrando equilibrar decenas de personajes con un ritmo vertiginoso y un final tan valiente como devastador.",
          },
        ],
      },
    ],
    canciones: [
      {
        titulo: "Viviré viajando",
        subtitulo: "La Mancha de Rolando",
        lugar: "El salón",
        portada: "/img/juanpablo/vivire-viajando.jpg",
        detalles: [
          { etiqueta: "Artista", valor: "La Mancha de Rolando" },
          { etiqueta: "Año", valor: "2008" },
          { etiqueta: "Género", valor: "Rock argentino / Rock and roll" },
          {
            etiqueta: "Canción destacada",
            valor: "Arde la ciudad / Viviré viajando",
          },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "Un álbum potente que recopila grandes éxitos en vivo y nuevas composiciones, reflejando el espíritu rutero, barrial y enérgico de la banda. Transmite esa adrenalina de subirse a la ruta con amigos y disfrutar del rock nacional en su estado más genuino.",
          },
        ],
      },
      {
        titulo: "Comfort y música para volar",
        subtitulo: "Soda Stereo",
        lugar: "La tienda de vinilos",
        portada: "/img/juanpablo/comfort-musica-volar.jpg",
        detalles: [
          { etiqueta: "Artista", valor: "Soda Stereo" },
          { etiqueta: "Año", valor: "1996" },
          {
            etiqueta: "Género",
            valor: "Rock alternativo / Post-punk / Pop rock",
          },
          {
            etiqueta: "Canción destacada",
            valor: "En la ciudad de la furia (con Andrea Echeverri)",
          },
          {
            etiqueta: "Por qué me gusta",
            valor:
              'La legendaria sesión de MTV Unplugged grabada en Miami, donde rompieron las reglas del formato acústico con guitarras eléctricas y arreglos orquestales sublimes. La reinterpretación de "En la ciudad de la furia" y "Té para tres" representa una cumbre artística inolvidable en la historia del rock latinoamericano.',
          },
        ],
      },
      {
        titulo: "Fulanos de nadie",
        subtitulo: "Los Caballeros de la Quema",
        lugar: "El escenario",
        portada: "/img/juanpablo/fulanos-de-nadie.jpg",
        detalles: [
          { etiqueta: "Artista", valor: "Los Caballeros de la Quema" },
          { etiqueta: "Año", valor: "2000" },
          { etiqueta: "Género", valor: "Rock alternativo / Rock barrial" },
          {
            etiqueta: "Canción destacada",
            valor: "Fulanos de nadie / Sapo de otro pozo",
          },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "El último trabajo de estudio antes de su reencuentro, cargado de letras mordaces, poesía urbana y la voz inconfundible de Iván Noble. Retrata con precisión quirúrgica y nostalgia las vivencias de la calle, el desamor y la identidad suburbana de principios de los 2000.",
          },
        ],
      },
    ],
    proyectos: [
      {
        titulo: "PythonFS Nono Luigi",
        subtitulo: "Fullstack Python · Codo a Codo",
        resumen: "Proyecto fullstack en Python realizado en Codo a Codo.",
      },
      {
        titulo: "KipuBankV3",
        subtitulo: "Desarrollo en Ethereum · Codo a Codo",
        resumen:
          "Proyecto de desarrollo sobre Ethereum realizado en Codo a Codo.",
      },
      {
        titulo: "QA Automatizado",
        subtitulo: "Testing y generación de informes",
        resumen: "Automatización de pruebas y generación de informes.",
      },
    ],
  },

  {
    id: "lucas",
    nombre: "Lucas Eliel Sosa",
    rol: "Android Developer, Maestro de Juegos y Creador de Experiencias",
    casa: "hufflepuff",
    avatar: "/img/lucas-avatar.jpg",
    datos: [
      { etiqueta: "Ciudad", valor: "Autónoma de Buenos Aires" },
      { etiqueta: "Edad", valor: "39 años" },
    ],
    sobreMi: [
      "Soy un Desarrollador Mobile apasionado por transformar sistemas complejos en herramientas prácticas e inmersivas. Como buen Hufflepuff, encaro cada desafío con dedicación, paciencia y priorizando siempre el trabajo en equipo. Me especializo en unir la lógica del código con una narrativa coherente, buscando que cada aplicación no solo funcione impecable, sino que mantenga el foco en la experiencia de los usuarios.",
    ],
    habilidades: [
      "Gamificación y UX Narrativa",
      "Interactividad Avanzada",
      "Arquitectura de Interfaces",
      "Desarrollo Mobile Nativo",
    ],
    peliculas: [
      {
        titulo: "The Bulletproof Monk",
        lugar: "El cine",
        portada: "/img/lucas/lucas-pelicula1.jpg",
        detalles: [
          { etiqueta: "Director", valor: "Paul Hunter" },
          { etiqueta: "Año", valor: "2003" },
          {
            etiqueta: "Género",
            valor: "Acción / Buddy Film / Artes Marciales / Fantasía",
          },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "A veces las películas de artes marciales pecan de no tener una buena historia. En este caso siento que esta historia es súper entretenida. Vemos una dinámica espectacular que incorpora mística y una narrativa atrapante con profecías, mientras la comedia y la acción constante logran que todas las piezas encajen perfecto.",
          },
        ],
      },
      {
        titulo: "The Lord of The Rings: The Two Towers",
        lugar: "La torre",
        portada: "/img/lucas/lucas-pelicula3.jfif",
        detalles: [
          { etiqueta: "Director", valor: "Peter Jackson" },
          { etiqueta: "Año", valor: "2002" },
          { etiqueta: "Género", valor: "Fantasía / Aventura" },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "La verdad que de toda la saga, esta tiene la narrativa más espectacular. Me encanta cómo divide el foco de los protagonistas sin que pierdas la inmersión; pasás de vivir hazañas épicas en el Abismo de Helm a la tensión del viaje de Frodo, manteniendo siempre un hilo conductor tremendo. Pero ESA BATALLA TUVO TODO. La música, la coreografía, la tensión y el suspenso. Es una obra maestra.",
          },
        ],
      },
      {
        titulo: "2 Fast 2 Furious",
        lugar: "La biblioteca",
        portada: "/img/lucas/lucas-pelicula2.jpg",
        detalles: [
          { etiqueta: "Director", valor: "John Singleton" },
          { etiqueta: "Año", valor: "2003" },
          {
            etiqueta: "Género",
            valor: "Acción / Aventura / Crimen / Suspenso",
          },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "Siempre me atrapó la movida de las carreras callejeras, en gran parte por el auge que tenía la saga Need For Speed en esa época. Más allá de la tremenda variedad de autos que muestran, lo que realmente te engancha es la química y la dinámica espectacular que se genera entre los protagonistas.",
          },
        ],
      },
    ],
    canciones: [
      {
        titulo: "Toca madera",
        subtitulo: "Joan Manuel Serrat",
        lugar: "El salón",
        portada: "/img/lucas/lucas-cancion1.jfif",
        detalles: [
          { etiqueta: "Artista", valor: "Joan Manuel Serrat" },
          { etiqueta: "Año", valor: "1992" },
          { etiqueta: "Género", valor: "Popular (Irónico)" },
          {
            etiqueta: "Frase destacada",
            valor:
              "Nada tienes que temer\nAl mal tiempo buena cara\nLa Constitución te ampara\nLa justicia te defiende\nLa policía te guarda\nEl sindicato te apoya\nEl sistema te respalda\nY los pajaritos cantan\nY las nubes se levantan 🎶",
          },
        ],
      },
      {
        titulo: "Kryptonite",
        subtitulo: "3 Doors Down",
        lugar: "La tienda de vinilos",
        portada: "/img/lucas/lucas-cancion2.jfif",
        detalles: [
          { etiqueta: "Artista", valor: "3 Doors Down" },
          { etiqueta: "Año", valor: "2000" },
          { etiqueta: "Género", valor: "Post-grunge / Rock" },
          {
            etiqueta: "Frase destacada",
            valor: "If I go crazy, then will you still call me Superman? 🎶",
          },
        ],
      },
      {
        titulo: "Lo siento",
        subtitulo: "Beret",
        lugar: "El escenario",
        portada: "/img/lucas/lucas-cancion3.jfif",
        detalles: [
          { etiqueta: "Artista", valor: "Beret" },
          { etiqueta: "Año", valor: "2019" },
          { etiqueta: "Género", valor: "Pop Latino / Balada Pop / Pop Urbano" },
          {
            etiqueta: "Frase destacada",
            valor:
              "No luchar por lo que quieres solo tiene un nombre y se llama perder 🎶",
          },
        ],
      },
    ],
    proyectos: [
      {
        titulo: "Lanzador Legendario",
        subtitulo: "La ambición de crear",
        resumen:
          "Un lanzador de dados digital exclusivo para el juego de rol Leyenda, con su propia lógica de cálculo de éxitos.",
        imagen: "/img/lucas/lucas-proyecto1.png",
        historia: {
          titulo: "Desafío y solución",
          texto:
            "Llevar las reglas del sistema Leyenda a una app nativa: el desafío fue implementar el cálculo de éxitos de los dados de forma fiel a las reglas, en una interfaz rápida, clara y divertida de usar.",
          tecnologias: ["Kotlin", "Jetpack Compose", "Android"],
          aporte:
            "Desarrollo completo de la aplicación: lógica de dados y cálculo de éxitos, interfaz en Jetpack Compose y publicación en Google Play.",
          enlace: {
            url: "https://play.google.com/store/apps/details?id=com.rolesencia.lanzadr",
            texto: "Disponible en Google Play",
          },
        },
      },
      {
        titulo: "AsistenTZ",
        subtitulo: "Una idea que renace",
        resumen:
          "Un gestor de personajes y campañas creado específicamente para el juego de rol Territorio Zombie.",
        imagen: "/img/lucas/lucas-proyecto2.png",
        historia: {
          titulo: "Aprendizaje y transformación",
          texto:
            "Convertir la organización de mis mesas de Territorio Zombie en una herramienta digital me enseñó a modelar personajes y campañas que evolucionan partida a partida.",
          tecnologias: ["Kotlin", "Jetpack Compose", "Room / SQLite"],
          aporte:
            "Diseño y desarrollo del gestor de personajes y campañas, y de su modelo de datos persistente.",
          nota: "Enlace disponible cuando se publique el proyecto.",
        },
      },
      {
        titulo: "FotoXPress",
        subtitulo: "El valor de los detalles",
        resumen:
          "Un gestor rápido para organizar y borrar fotos en el celular usando una mecánica de deslizamiento lateral.",
        imagen: "/img/lucas/lucas-proyecto3.png",
        historia: {
          titulo: "Detalles y experiencia",
          texto:
            "La mejor experiencia está en el detalle: la mecánica de deslizamiento lateral convierte una tarea repetitiva en un gesto fluido, directo y natural.",
          tecnologias: ["Kotlin", "Jetpack Compose"],
          aporte:
            "Desarrollo de la mecánica de gestos y de la experiencia de usuario al organizar y borrar fotos.",
          nota: "Enlace disponible cuando se publique el proyecto.",
        },
      },
    ],
  },

  {
    id: "sol",
    nombre: "Sol Prinzen",
    rol: "Desarrolladora Front End, Cazadora de Quidditch y Guardiana de Criaturas Mágicas",
    casa: "gryffindor",
    avatar: "/img/sol-avatar.jpg",
    datos: [
      { etiqueta: "Ciudad", valor: "Hogwarts (o Entre Ríos para los muggles)" },
      { etiqueta: "Edad", valor: "30 años" },
    ],
    sobreMi: [
      "Soy desarrolladora Front-End y diseñadora UI/UX apasionada por transformar ideas complejas en experiencias digitales intuitivas y atractivas. Como buena Gryffindor, encaro cada desafío con creatividad, iniciativa y atención al detalle. Me especializo en combinar la estructura del código con el impacto visual del diseño, buscando que cada interfaz no solo funcione impecable, sino que también conecte con los usuarios.",
    ],
    habilidades: [
      "Encantamientos de Maquetación",
      "Arquitectura & Diseño UI/UX",
      "Dinamismo & Hechizos de JavaScript",
      "Magia de Componentes & Apps (React & React Native)",
    ],
    peliculas: [
      {
        titulo: "The Time Traveler's Wife",
        lugar: "El cine",
        portada: "/img/sol/sol-pelicula1.png",
        detalles: [
          { etiqueta: "Director", valor: "Robert Schwentke" },
          { etiqueta: "Año", valor: "2009" },
          { etiqueta: "Género", valor: "Drama" },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "Como buena romántica empedernida, esta película lo tiene todo: a Rachel McAdams (una de mis actrices favoritas) y una historia que desafía al tiempo mismo, explorando la paciencia, la nostalgia y la fuerza del amor verdadero.",
          },
        ],
      },
      {
        titulo: "The Hunger Games",
        lugar: "La torre",
        portada: "/img/sol/sol-pelicula2.png",
        detalles: [
          { etiqueta: "Director", valor: "Francis Lawrence" },
          { etiqueta: "Año", valor: "2012" },
          { etiqueta: "Género", valor: "Ciencia ficción / Aventura" },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "Me apasionan las historias distópicas y de ciencia ficción. Habiendo leído la saga de libros completa, me encanta cómo crea un universo alternativo tan potente y cautivador, logrando ese mismo nivel de inmersión y fascinación que me genera Harry Potter.",
          },
        ],
      },
      {
        titulo: "Harry Potter and the Half-Blood Prince",
        lugar: "La biblioteca",
        portada: "/img/sol/sol-pelicula3.png",
        detalles: [
          { etiqueta: "Director", valor: "David Yates" },
          { etiqueta: "Año", valor: "2009" },
          { etiqueta: "Género", valor: "Fantasía / Misterio" },
          {
            etiqueta: "Por qué me gusta",
            valor:
              "Ufff... Es difícil elegir una sola porque amo todo el universo de Harry Potter, pero podría decirse que esta es la que más me atrapa. Vemos a un Harry más maduro enfrentando un punto de quiebre, mientras se explora en profundidad el pasado de Voldemort y las piezas del rompecabezas empiezan a encajar... magnífico.",
          },
        ],
      },
    ],
    canciones: [
      {
        titulo: "Antología",
        subtitulo: "Shakira",
        lugar: "El salón",
        portada: "/img/sol/sol-cancion1.png",
        detalles: [
          { etiqueta: "Artista", valor: "Shakira" },
          { etiqueta: "Año", valor: "1995" },
          { etiqueta: "Género", valor: "Pop" },
          {
            etiqueta: "Frase destacada",
            valor:
              "Desarrollaste mi sentido del olfato\nY fue por ti que aprendí a querer los gatos\nDespegaste del cemento mis zapatos\nPara escapar los dos volando un rato 🎶",
          },
        ],
      },
      {
        titulo: "Mi soledad y yo",
        subtitulo: "Alejandro Sanz",
        lugar: "La tienda de vinilos",
        portada: "/img/sol/sol-cancion2.png",
        detalles: [
          { etiqueta: "Artista", valor: "Alejandro Sanz" },
          { etiqueta: "Año", valor: "1995" },
          { etiqueta: "Género", valor: "Pop" },
          {
            etiqueta: "Frase destacada",
            valor:
              "En Madrid está lloviendo y todo sigue como siempre\nSolamente que no estás y el tiempo pasa lentamente 🎶",
          },
        ],
      },
      {
        titulo: "A Thousand Years",
        subtitulo: "Christina Perri",
        lugar: "El escenario",
        portada: "/img/sol/sol-cancion3.png",
        detalles: [
          { etiqueta: "Artista", valor: "Christina Perri" },
          { etiqueta: "Año", valor: "2011" },
          { etiqueta: "Género", valor: "Pop Romántico" },
          {
            etiqueta: "Frase destacada",
            valor:
              "I have died every day waiting for you\nDarling, don't be afraid\nI have loved you for a thousand years\nI'll love you for a thousand more 🎶",
          },
        ],
      },
    ],
    // En el TP1 Sol no tenía proyectos (tenía "Always" y la Copa de las
    // Casas, que se pueden pasar como `children` de la plantilla).
    proyectos: [
      {
        titulo: "KittApp Web",
        subtitulo: "Plataforma de Adopción Responsable",
        resumen:
          "Sitio web dinámico diseñado para promover y facilitar la adopción responsable de gatos y publicación de mascotas en busca de hogar.",
        imagen: "/img/sol/sol-proyecto1.png",
        historia: {
          titulo: "Diseno UX/UI & Proceso Creativo",
          texto:
            "Desarrollado a partir de un proceso integral de diseño UX/UI en Figma. El mayor desafío fue crear un flujo de adopción claro e intuitivo, combinando componentes interactivos con modales de validación en tiempo real.",
          tecnologias: [
            "HTML5",
            "SASS/SCSS",
            "JavaScript (ES6+)",
            "Bootstrap 5",
            "Figma",
          ],
          aporte:
            "Proceso completo de Investigación UX, prototipado interactivo en Figma, maquetado responsivo y lógica de validación de formularios.",
          enlace: {
            url: "https://github.com/solprinz/KittApp-Web",
            texto: "Ver repositorio en GitHub",
          },
        },
      },
      {
        titulo: "Viajá Seguro",
        subtitulo: "Cotizador de Seguros en Tiempo Real",
        resumen:
          "Aplicación web interactiva que calcula y cotiza el costo de un seguro de viaje según destino, duración y pasajeros.",
        imagen: "/img/sol/sol-proyecto2.png",
        historia: {
          titulo: "Lógica Frontend & Manipulación del DOM",
          texto:
            "Proyecto enfocado en la interacción dinámica con el usuario. Implementa cálculo instantáneo, persistencia de datos mediante LocalStorage para guardar cotizaciones y control estricto de validación de campos.",
          tecnologias: ["JavaScript (ES6+)", "HTML5", "CSS3", "LocalStorage"],
          aporte:
            "Desarrollo de la lógica de cotización en tiempo real, eventos en el DOM y almacenamiento local de búsquedas previas.",
          enlace: {
            url: "https://github.com/solprinz/ViajaSeguro",
            texto: "Ver repositorio en GitHub",
          },
        },
      },
      {
        titulo: "Portfolio Profesional",
        subtitulo: "Práctica Formativa Front End",
        resumen:
          "Sitio web personal y portfolio profesional desarrollado con HTML5, CSS3 y Bootstrap 5, diseñado para presentar proyectos de desarrollo Web y Mobile.",
        imagen: "/img/sol/sol-proyecto3.png",
        historia: {
          titulo: "Estructura Semántica & Maquetación UI",
          texto:
            "Desarrollado como Práctica Formativa de la materia Desarrollo de Sistemas Web. Enfocado en la maquetación semántica, diseño responsivo mediante utilidades de Flexbox/Bootstrap 5 e integración de formularios funcionales sin backend mediante Formspree.",
          tecnologias: [
            "HTML5",
            "CSS3",
            "Bootstrap 5.3",
            "Font Awesome 6",
            "Formspree",
          ],
          aporte:
            "Diseño e implementación integral de la maqueta: paleta de colores, tipografías, grilla responsiva, integración de formulario de contacto y organización de proyectos.",
          enlace: {
            url: "https://github.com/solprinz/portfolio-sol-prinzen",
            texto: "Ver repositorio en GitHub",
          },
        },
      },
    ],
  },
];

/**
 * Busca un integrante por id con coincidencia exacta: solo /perfil/lucas es
 * válida; /perfil/Lucas o cualquier otra variante no existe.
 * Devuelve `undefined` si no hay coincidencia; el contenedor decide qué mostrar.
 */
export function getMemberById(id) {
  return membersData.find((member) => member.id === id);
}
