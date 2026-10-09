import { createContext, useContext } from "react";

/**
 * Contexto de la varita-cursor global.
 *
 * Quién lo usa:
 *  - <WandProvider /> (en App.jsx) dibuja la varita y provee este valor.
 *  - Cualquier componente puede leerlo con `useWand()`. Hoy lo usa el duelo
 *    Expelliarmus del perfil de Lucas para "desarmar" la varita.
 *
 * Valor:
 *  - disponible: true si hay varita (puntero fino y sin "reducir movimiento").
 *  - fase: "activa" | "desarmando" | "perdida".
 *  - desarmar(x, y): inicia la animación en la que la varita se desarma.
 *  - reiniciar(): devuelve la varita a la normalidad.
 *
 * El valor por defecto (sin proveedor) es inofensivo: no hay varita.
 */
export const WandContext = createContext({
  disponible: false,
  fase: "activa",
  desarmar: () => {},
  reiniciar: () => {},
});

export function useWand() {
  return useContext(WandContext);
}
