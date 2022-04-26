import React, { useState } from "react";
import "./Lists.scss";
import { Button, Icon } from "semantic-ui-react";

import ListMovie from "./ListMovie";
import ModalBasic from "../Modal/ModalBasic";
import NewListForm from "../NewListForm";

export default function Lists({ lists, refetchLists }) {
  const [showModalAddList, setShowModalAddList] = useState(false);

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
        <ListMovie
          key={list.id}
          list={list}
          refetchLists={refetchLists}
          editable
        />
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
