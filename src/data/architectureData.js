// Mapa descriptivo del JSX de main.jsx, App.jsx y sus páginas.
// Actualizar junto con las rutas o la composición de los componentes.
const node = (name, type, description, children = [], route) => ({ name, type, description, children, route });

export const architectureTree = node('main.jsx', 'entrada', 'createRoot monta la aplicación en el elemento #root del HTML.', [
  node('StrictMode', 'react', 'Activa comprobaciones adicionales de React durante el desarrollo.', [
    node('App', 'raiz', 'Reúne la navegación, las rutas y los elementos compartidos de Hallows Code.', [
      node('BrowserRouter', 'ruta', 'Sincroniza la navegación con la URL del navegador.', [
        node('WandProvider', 'contexto', 'Comparte el estado de la varita y mantiene el cursor mágico entre páginas.', [
          node('div.layout-hallows', 'estructura', 'Contenedor HTML del diseño. No es un componente Layout independiente.', [
            node('Sidebar', 'componente', 'Logo, navegación por grupos, menú móvil y alternancia Lumos / Nox.'),
            node('main.main-content', 'estructura', 'Área principal que contiene la página activa y el pie compartido.', [
              node('Routes', 'ruta', 'Cada Route elige su página según la URL. Solo se muestra la ruta coincidente.', [
                node('Home', 'pagina', 'Bienvenida a Hogwarts y presentación de los cinco integrantes.', [
                  node('MemberCard', 'componente', 'Una tarjeta por integrante con acceso a su perfil.'),
                ], '/'),
                node('MemberProfileContainer', 'pagina', 'Lee :id, busca en membersData y selecciona las experiencias del integrante.', [
                  node('MemberProfile', 'componente', 'Plantilla común: presentación, biografía, habilidades, proyectos y favoritos.', [
                    node('ProjectRelics', 'componente', 'Presenta los proyectos como reliquias cuando el perfil tiene proyectos.', [
                      node('RelicCard', 'componente', 'Tarjeta interactiva de cada proyecto.'),
                      node('RelicStory', 'componente', 'Historia y detalles del proyecto seleccionado.'),
                    ]),
                    node('FavoritesMap', 'componente', 'Dos instancias: películas y canciones, con lugares que se pueden explorar.', [
                      node('FavoriteCard', 'componente', 'Cada favorito se convierte en un lugar del mapa.'),
                      node('FavoriteDetail', 'componente', 'Ficha del favorito seleccionado.'),
                      node('Vitrola', 'modal', 'Reproductor de canciones, renderizado mediante un portal.'),
                    ]),
                    node('children / cierre', 'slot', 'Elementos creados por el contenedor a partir de EXTRAS_POR_MIEMBRO. Se muestran según el perfil.', [
                      node('RelatoTresHermanos', 'componente', 'Alejandro · relato interactivo de las reliquias.'),
                      node('SombreroQuiz', 'componente', 'Daniela · cuestionario del Sombrero Seleccionador.'),
                      node('SlytherinEfficiencyTest', 'componente', 'Juan Pablo · prueba de eficiencia.'),
                      node('ExpelliarmusDuelo', 'componente', 'Lucas · duelo conectado al estado global de la varita.'),
                      node('PatronusAlways', 'componente', 'Sol · experiencia del Patronus.'),
                      node('CopaDeLasCasas', 'componente', 'Sol · copa de las casas al final del perfil.'),
                    ]),
                  ]),
                  node('MemberNotFound', 'componente', 'Alternativa al perfil cuando el id no existe; ofrece enlaces a integrantes válidos.'),
                ], '/perfil/:id'),
                node('Arquitectura', 'pagina', 'Este mapa de la composición de la aplicación.', [
                  node('ArchitectureNode', 'componente', 'Renderiza cada nodo y sus descendientes de forma recursiva.'),
                ], '/arbol'),
                node('Estudiantes', 'pagina', 'Consulta la API de Harry Potter. Gestiona búsqueda, casas, paginación, carga y errores dentro de la página.', [], '/estudiantes'),
                node('LibroDeHechizos', 'pagina', 'Lee libro_de_hechizos.json y gestiona filtros, paginación y detalles dentro de la página.', [], '/hechizos'),
                node('Bitacora', 'pagina', 'Muestra los registros locales del equipo con filtros y entradas desplegables.', [], '/bitacora'),
                node('NotFound', 'pagina', 'Respuesta global para una URL que no coincide con ninguna ruta.', [], '*'),
              ]),
              node('Footer', 'componente', 'Pie compartido que permanece al cambiar de página.'),
            ]),
          ]),
          node('ScrollToTop', 'componente', 'Botón para volver arriba, adaptado al tema de la página.'),
        ]),
      ]),
    ]),
  ]),
]);

export const nodeTypes = {
  entrada: 'Entrada', react: 'React', raiz: 'Raíz', ruta: 'Router',
  contexto: 'Contexto', estructura: 'HTML', pagina: 'Página',
  componente: 'Componente', modal: 'Modal', slot: 'Slot',
};

export const architectureSteps = [
  ['01', 'El punto de entrada', 'main.jsx', 'Monta App dentro de StrictMode y carga los estilos globales.'],
  ['02', 'Los caminos del castillo', 'BrowserRouter', 'Conecta la URL con las rutas declaradas en App.'],
  ['03', 'La magia compartida', 'WandProvider', 'Conserva el estado de la varita para toda la aplicación.'],
  ['04', 'La estructura estable', 'Sidebar + Footer', 'Acompañan la navegación junto al botón ScrollToTop.'],
  ['05', 'La sala que cambia', 'Routes', 'Renderiza la portada, los perfiles o la sección elegida.'],
];
