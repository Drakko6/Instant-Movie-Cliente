import React, { useState } from "react";
import "./AddToFavorite.scss";
import { Button, Icon } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_TO_FAVORITES,
  DELETE_FAVORITE,
  IS_FAVORITE,
} from "../../../../gql/favorites";
import { toast } from "react-toastify";
import ModalBasic from "../../ModalBasic";
import useAuth from "../../../../hooks/useAuth";
import {
  ADD_LIST_WITH_MOVIE,
  ADD_MOVIE_TO_LIST,
  GET_LISTS,
  GET_LISTS_WITH_MOVIE_INFO,
} from "../../../../gql/lists";
import NewListForm from "../../../NewListForm";

export default function AddToFavorite({ movie }) {
  const { auth } = useAuth();

  const [loadingAction, setLoadingAction] = useState(false);
  const [showModalAddList, setShowModalAddList] = useState(false);
  const [showModalAddNewList, setShowModalAddNewList] = useState(false);

  const { data, loading, refetch } = useQuery(IS_FAVORITE, {
    variables: {
      idMovie: movie.id,
    },
  });

  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);
  const [deleteFavorite] = useMutation(DELETE_FAVORITE);

  const [addMovieToList] = useMutation(ADD_MOVIE_TO_LIST);

  const {
    data: dataLists,
    loading: loadingLists,
    refetch: refetchLists,
  } = useQuery(GET_LISTS_WITH_MOVIE_INFO, {
    variables: { username: auth.username },
  });

  const onAddFavorite = async () => {
    setLoadingAction(true);
    try {
      await addToFavorites({
        variables: {
          idMovie: movie.id,
        },
      });

      refetch();
    } catch (error) {
      toast.error(error);
    }
    setLoadingAction(false);
  };

  const onDeleteFavorite = async () => {
    setLoadingAction(true);
    try {
      await deleteFavorite({
        variables: {
          idMovie: movie.id,
        },
      });
      refetch();
    } catch (error) {
      toast.error(error);
    }

    setLoadingAction(false);
  };

  const onAction = (e) => {
    e.preventDefault();
    if (!loadingAction) {
      if (isFavorite) {
        onDeleteFavorite();
      } else {
        onAddFavorite();
      }
    }
  };

  if (loading || loadingLists) return null;
  const { isFavorite } = data;
  const { getListsWithMovieInfo: lists } = dataLists;

  const onAddMovieToList = async (listName) => {
    try {
      await addMovieToList({
        variables: {
          listName,
          idMovie: movie.id,
        },
      });

      toast.success("Agregada con éxito a tu lista", {
        position: "bottom-right",
      });
      setShowModalAddList(false);
      refetchLists();
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="addToFavorite">
      <>
        {isFavorite ? (
          <Icon
            name="heart"
            className="addToFavorite__addToFavorites_icon"
            onClick={onAction}
          >
            <div className="tooltiptext">
              <p className="addToFavorite__addToFavorites__option">
                Quitar de Favoritos
              </p>
              <p
                className="addToFavorite__addToFavorites__option"
                onClick={(e) => {
                  e.stopPropagation();
                  console.log("Agregando");
                }}
              >
                Agregar a lista
              </p>
            </div>
          </Icon>
        ) : (
          <div>
            <Icon
              name="plus"
              className="addToFavorite__addToFavorites_icon"
              onClick={onAction}
            >
              <div className="tooltiptext">
                <p className="addToFavorite__addToFavorites__option">
                  Agregar a Favoritos
                </p>
                <p
                  className="addToFavorite__addToFavorites__option"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowModalAddList(true);
                  }}
                >
                  Agregar a lista
                </p>
              </div>
            </Icon>
          </div>
        )}

        {showModalAddList && (
          <ModalBasic
            size={"small"}
            show={showModalAddList}
            setShow={setShowModalAddList}
            title={"Agrega a una existente o crea una nueva"}
          >
            <>
              <div style={{ padding: "10px" }}>
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <Button
                    color="purple"
                    onClick={() => setShowModalAddNewList(true)}
                  >
                    Crear nueva
                  </Button>
                </div>
                <div style={{ display: "block", marginTop: "10px" }}>
                  {lists.map((list) => (
                    <Button
                      key={list.id}
                      icon
                      color="facebook"
                      labelPosition="right"
                      onClick={() => onAddMovieToList(list.name)}
                    >
                      <Icon name="add circle" />
                      {list.name}
                    </Button>
                  ))}
                </div>
              </div>

              {showModalAddNewList && (
                <ModalBasic
                  size={"mini"}
                  show={showModalAddNewList}
                  setShow={setShowModalAddNewList}
                  title={"Escribe el nombre de la nueva lista"}
                >
                  <NewListForm
                    setShowModal={setShowModalAddNewList}
                    refetch={refetchLists}
                    withMovie={true}
                    idMovie={movie.id}
                  />
                </ModalBasic>
              )}
            </>
          </ModalBasic>
        )}
      </>
    </div>
  );
}
