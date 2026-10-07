import { MemberCard } from "../components/MemberCard";

export function Home() {
  const integrantes = [
    {
      nombre: "ALEJANDRO",
      rol: "100 puntos para Azkaban y Maestro de Encantamientos Back-end",
      casa: "gryffindor",
      foto: "/img/alejandro-avatar.gif",
      path: "/perfil/alejandro",
    },
    {
      nombre: "DANIELA",
      rol: "Maestra de Transformaciones Front-end",
      casa: "slytherin",
      foto: "/img/daniela-avatar.jpg",
      path: "/perfil/daniela",
    },
    {
      nombre: "JUAN PABLO",
      rol: "Erudito de Aritmancia y Lógica de JavaScript",
      casa: "ravenclaw",
      foto: "/img/juanpablo-avatar.jpg",
      path: "/perfil/juanpablo",
    },
    {
      nombre: "LUCAS",
      rol: "Experto en Herbología y Accesibilidad Web",
      casa: "hufflepuff",
      foto: "/img/lucas-avatar.jpg",
      path: "/perfil/lucas",
    },
    {
      nombre: "SOL",
      rol: "Cazadora de Quidditch y Guardiana de Criaturas Mágicas",
      casa: "gryffindor",
      foto: "/img/sol-avatar.jpg",
      path: "/perfil/sol",
    },
  ];

  return (
    <div className="home-container">
      {/* SECCIÓN HERO */}
      <section id="hero" className="container hero mb-5">
        <div className="row justify-content-center">
          <div className="col-12 col-md-10 col-lg-8 text-center">
            <h1 className="title font-lumos display-4 mb-3">
              ¡BIENVENIDOS A HOGWARTS!
            </h1>
            <p className="subtitle fs-5 text-muted">
              Provenientes de distintas casas y unidos por el arte del
              maquetado, combinamos antiguos encantos de HTML, pociones
              avanzadas de CSS y poderosos conjuros en JavaScript para dar vida
              a experiencias web verdaderamente mágicas. Explorá nuestros
              perfiles, conocé las habilidades de cada integrante y adentrate en
              nuestra bitácora de hechizos. ¡Que la magia del código te
              acompañe!
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN CARDS */}
      <section className="container my-5" id="integrantes">
        {/* FILA 1: 3 INTEGRANTES */}
        <div className="row g-4 justify-content-center mb-4">
          {integrantes.slice(0, 3).map((member) => (
            <div key={member.nombre} className="col-12 col-md-6 col-lg-4">
              <MemberCard {...member} />
            </div>
          ))}
        </div>

        {/* FILA 2: 2 INTEGRANTES */}
        <div className="row g-4 justify-content-center">
          {integrantes.slice(3, 5).map((member) => (
            <div key={member.nombre} className="col-12 col-md-6 col-lg-4">
              <MemberCard {...member} />
            </div>
          ))}
        </div>

        {/* NOTA REVELIO */}
        <div className="row justify-content-center mt-5">
          <div className="col-12 col-md-8">
            <div className="nota-hechizo text-center p-3 rounded shadow-sm">
              <p className="m-0 text-muted fst-italic small">
                <strong>¿Qué significa Revelio?</strong> Es un encantamiento
                mágico de revelación utilizado para descubrir objetos ocultos,
                pasadizos invisibles o la verdadera identidad y secretos detrás
                de algo. Haz clic para revelar el perfil completo de cada mago.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
