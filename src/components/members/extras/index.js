import { SombreroQuiz } from "./SombreroQuiz";
import { ExpelliarmusDuelo } from "./ExpelliarmusDuelo";
import { PatronusAlways } from "./PatronusAlways";
import { CopaDeLasCasas } from "./CopaDeLasCasas";
import { SlytherinEfficiencyTest } from "./SlytherinEfficiencyTest";
import { RelatoTresHermanos } from "./RelatoTresHermanos";

/**
 * Registro de interacciones propias de cada integrante.
 *
 * Cómo sumar la tuya (3 pasos):
 *   1. Creá tu componente en esta carpeta (con su .module.css).
 *   2. Importalo arriba.
 *   3. Agregá una entrada con TU id (el mismo de membersData.js):
 *        - despuesDeSobreMi → se muestra justo después de "Sobre mí".
 *        - alFinal          → se muestra al final del perfil.
 *      Las dos son opcionales. Se pasa el componente, no el elemento:
 *      `daniela: { despuesDeSobreMi: SombreroQuiz }`, no `<SombreroQuiz />`.
 *
 * Los componentes heredan las variables de la casa que define
 * MemberProfile.module.css (--casa-fondo, --casa-acento, --casa-tinta,
 * --casa-sobre), así que se adaptan solos a la paleta del perfil.
 *
 * Alejandro tiene un relato interactivo sobre el origen de las reliquias.
 */
export const EXTRAS_POR_MIEMBRO = {
  alejandro: { despuesDeSobreMi: RelatoTresHermanos },
  daniela: { despuesDeSobreMi: SombreroQuiz },
  juanpablo: { despuesDeSobreMi: SlytherinEfficiencyTest },
  lucas: { despuesDeSobreMi: ExpelliarmusDuelo },
  sol: { despuesDeSobreMi: PatronusAlways, alFinal: CopaDeLasCasas },
};
