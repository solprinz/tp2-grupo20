import { createElement, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useParams } from "react-router-dom";
import { MemberProfile } from "../../components/members/MemberProfile";
import { EXTRAS_POR_MIEMBRO } from "../../components/members/extras";
import { getMemberById, membersData } from "../../data/membersData";
import styles from "./MemberProfileContainer.module.css";

/**
 * Contenedor de la ruta /perfil/:id.
 *
 * Responsabilidades (y solo estas):
 *   1. Leer el `:id` de la URL con useParams().
 *   2. Buscar al integrante en el archivo de datos local.
 *   3. Decidir qué mostrar: el perfil o, si el id no existe, un mensaje amable.
 *
 * Toda la maquetación vive en <MemberProfile />, que recibe los datos por
 * props. Separarlos permite reutilizar la plantilla y probarla sin router.
 */

/** Mensaje amigable para ids inexistentes, con salida a los perfiles reales. */
function MemberNotFound({ id }) {
  return (
    <section className={styles.noEncontrado} aria-labelledby="perfil-404">
      <p className={styles.codigo} aria-hidden="true">
        ⚡
      </p>
      <h1 id="perfil-404" className={styles.titulo}>
        Este mago no figura en el registro
      </h1>
      <p>
        No encontramos ningún perfil para “{id}”. Quizás se ocultó con un
        hechizo desilusionador… Probá con alguno de nuestros integrantes:
      </p>
      <ul className={styles.lista}>
        {membersData.map((member) => (
          <li key={member.id}>
            <Link to={`/perfil/${member.id}`} className={styles.enlace}>
              {member.nombre}
            </Link>
          </li>
        ))}
      </ul>
      <Link to="/" className={styles.enlace}>
        ← Volver a la portada
      </Link>
    </section>
  );
}

MemberNotFound.propTypes = {
  id: PropTypes.string,
};

export function MemberProfileContainer() {
  const { id } = useParams();
  const member = getMemberById(id);

  // Título de la pestaña y scroll al inicio al cambiar de perfil.
  // La función que devuelve el efecto es la "limpieza" (el equivalente a
  // componentWillUnmount): al salir del perfil restaura el título anterior,
  // así las demás pantallas no quedan con el nombre de un integrante.
  useEffect(() => {
    const tituloPrevio = document.title;
    document.title = member
      ? `Hallows Code: ${member.nombre}`
      : "Hallows Code: Perfil no encontrado";
    window.scrollTo(0, 0);
    return () => {
      document.title = tituloPrevio;
    };
  }, [member]);

  // Id inexistente (incluye variantes como /perfil/Lucas): mensaje amable.
  if (!member) return <MemberNotFound id={id} />;

  // Interacciones propias del integrante (quiz, duelo, copa…): se registran
  // en components/members/extras/index.js y se pasan a la plantilla.
  const extras = EXTRAS_POR_MIEMBRO[member.id] ?? {};

  // `key` reinicia el estado interno (mapa abierto, historia activa…) al
  // navegar de un perfil a otro: React desmonta y monta el componente.
  return (
    <MemberProfile
      key={member.id}
      member={member}
      cierre={extras.alFinal && createElement(extras.alFinal)}
    >
      {extras.despuesDeSobreMi && createElement(extras.despuesDeSobreMi)}
    </MemberProfile>
  );
}
