import { FavoritesMap } from "./FavoritesMap";
import { ProjectRelics } from "./ProjectRelics";
import { memberShape, nodoReact, validarProps } from "./memberPropTypes";
import styles from "./MemberProfile.module.css";

/**
 * Plantilla reutilizable de perfil (componente presentacional).
 *
 * No sabe nada de rutas ni de dónde vienen los datos: recibe un integrante
 * por props y lo maqueta. Por eso el mismo componente sirve para los cinco
 * perfiles (criterio 04 "Propone" de la rúbrica).
 *
 * Estructura común:
 *   1. Cabecera: avatar (con placa opcional), nombre, rol, casa y datos.
 *      Un integrante puede definir un `tema` visual propio (p. ej. el
 *      expediente "azkaban" de Alejandro), un `intro` y una `placa`.
 *   2. Sobre mí.
 *   3. Espacios libres para la interacción propia de cada integrante
 *      (quiz, duelo, copa de las casas…), así personalizan su perfil sin
 *      tocar la plantilla:
 *        - `children` → justo después de "Sobre mí".
 *        - `cierre`   → al final del perfil.
 *      Se registran en components/members/extras/index.js.
 *   4. Habilidades.
 *   5. Proyectos (reliquias).
 *   6. Películas y canciones favoritas (Mapa del Merodeador).
 *
 * La paleta de cada casa se aplica con el atributo `data-casa`: el CSS
 * define variables por casa y todos los hijos las heredan.
 */

const NOMBRE_CASA = {
  gryffindor: "Gryffindor",
  slytherin: "Slytherin",
  ravenclaw: "Ravenclaw",
  hufflepuff: "Hufflepuff",
};

export function MemberProfile(props) {
  validarProps(MemberProfile.propTypes, props, "MemberProfile");
  const { member, children, cierre } = props;
  const {
    nombre,
    rol,
    casa,
    avatar,
    tema,
    intro = "Perfil personal",
    placa,
    datos = [],
    sobreMi = [],
    habilidades,
    peliculas,
    canciones,
    proyectos = [],
  } = member;

  return (
    <article className={styles.perfil} data-casa={casa} data-tema={tema}>
      {/* 1. CABECERA */}
      <section className={styles.cabecera} aria-labelledby="perfil-nombre">
        <div className={styles.retrato}>
          <img
            src={avatar}
            alt={`Avatar de ${nombre}`}
            className={styles.foto}
          />
          {placa && (
            <p className={styles.placa}>
              {placa.titulo}
              {placa.leyenda && (
                <>
                  <br />
                  <span>{placa.leyenda}</span>
                </>
              )}
            </p>
          )}
        </div>
        <div className={styles.presentacion}>
          <p className={styles.intro}>{intro}</p>
          <h1 id="perfil-nombre" className={styles.nombre}>
            {nombre}
          </h1>
          <p className={styles.rol}>{rol}</p>
          <p className={styles.casa}>Casa {NOMBRE_CASA[casa]}</p>
          {datos.length > 0 && (
            <dl className={styles.datos}>
              {datos.map(({ etiqueta, valor }) => (
                <div key={etiqueta}>
                  <dt>{etiqueta}</dt>
                  <dd>{valor}</dd>
                </div>
              ))}
            </dl>
          )}
        </div>
      </section>

      {/* 2. SOBRE MÍ */}
      {sobreMi.length > 0 && (
        <section className={styles.seccion} aria-labelledby="perfil-sobre-mi">
          <div className={styles.pergamino}>
            <h2 id="perfil-sobre-mi" className={styles.titulo}>
              Sobre mí
            </h2>
            {sobreMi.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
          </div>
        </section>
      )}

      {/* 3. INTERACCIÓN PROPIA (opcional) */}
      {children && <div className={styles.extra}>{children}</div>}

      {/* 4. HABILIDADES */}
      <section className={styles.seccion} aria-labelledby="perfil-habilidades">
        <p className={styles.intro}>Mi caja de herramientas</p>
        <h2 id="perfil-habilidades" className={styles.titulo}>
          Habilidades
        </h2>
        <ol className={styles.habilidades}>
          {habilidades.map((habilidad, indice) => (
            <li key={habilidad} className={styles.habilidad}>
              <span className={styles.numero} aria-hidden="true">
                {String(indice + 1).padStart(2, "0")}
              </span>
              <h3 className={styles.nombreHabilidad}>{habilidad}</h3>
            </li>
          ))}
        </ol>
      </section>

      {/* 5. PROYECTOS */}
      {proyectos.length > 0 ? (
        <ProjectRelics proyectos={proyectos} />
      ) : (
        <section
          className={styles.seccion}
          aria-labelledby="perfil-proyectos-vacio"
        >
          <p className={styles.intro}>Mi trabajo</p>
          <h2 id="perfil-proyectos-vacio" className={styles.titulo}>
            Proyectos
          </h2>
          <p className={styles.vacio}>
            Los proyectos de {nombre.split(" ")[0]} todavía se están forjando
            en el caldero. ¡Volvé pronto!
          </p>
        </section>
      )}

      {/* 6. FAVORITOS */}
      <FavoritesMap
        titulo="Películas favoritas"
        subtitulo="El callejón de las historias"
        items={peliculas}
        formato="poster"
      />
      <FavoritesMap
        titulo="Canciones favoritas"
        subtitulo="El pasaje de las melodías"
        items={canciones}
        formato="album"
      />

      {/* 7. CIERRE (opcional) */}
      {cierre && <div className={styles.extra}>{cierre}</div>}
    </article>
  );
}

MemberProfile.propTypes = {
  /** Datos del integrante (ver src/data/membersData.js). */
  member: memberShape.isRequired,
  /** Interacción propia del integrante, después de "Sobre mí" (opcional). */
  children: nodoReact,
  /** Interacción propia del integrante, al final del perfil (opcional). */
  cierre: nodoReact,
};
