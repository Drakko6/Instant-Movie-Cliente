import React, { useState } from "react";
import "./Lists.scss";
import { map } from "lodash";
import { Button, Icon } from "semantic-ui-react";

import { useMediaQuery } from "react-responsive";
import ListMovie from "./ListMovie";
import ModalBasic from "../Modal/ModalBasic";
import NewListForm from "../NewListForm";

export default function Lists({ lists, refetchLists }) {
  const [showModalAddList, setShowModalAddList] = useState(false);

  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1099px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });
  return (
    <div className="lists">
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1 style={{ color: "aliceblue", textAlign: "center" }}>
          Listas de películas
        </h1>
        <Button
          icon
          labelPosition="right"
          color="purple"
          // Abrir modal para poner el nombre
          onClick={() => setShowModalAddList(true)}
        >
          <Icon name="plus" />
          Añadir nueva lista
        </Button>
      </div>

      {lists.map((list) => (
        <ListMovie key={list.id} list={list} refetchLists={refetchLists} />
      ))}

      {showModalAddList && (
        <ModalBasic
          size={"mini"}
          show={showModalAddList}
          setShow={setShowModalAddList}
          title={"Escribe el nombre de la nueva lista"}
        >
          <NewListForm
            setShowModal={setShowModalAddList}
            refetch={refetchLists}
          />
        </ModalBasic>
      )}
    </div>
  );
}
