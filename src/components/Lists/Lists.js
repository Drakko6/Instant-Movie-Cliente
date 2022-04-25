import React from "react";
import "./Lists.scss";
import { map } from "lodash";
import { Grid } from "semantic-ui-react";

import { useMediaQuery } from "react-responsive";
import ListMovie from "./ListMovie";

export default function Lists({ lists }) {
  // obtener Listas y mostarlas (Componente ListMovie le pasas la lista y muestra las películas en miniatura)
  // Este componente podrá tener un botón de agregar película, abrirá un modal de búsqueda

  // Botón + para agregar nuevas listas

  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1099px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  return (
    <div className="lists">
      <h1 style={{ color: "aliceblue", textAlign: "center" }}>
        Listas de películas
      </h1>
      {lists.map((list) => (
        <ListMovie key={list.id} list={list} />
      ))}
    </div>
  );
}
