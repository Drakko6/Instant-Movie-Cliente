import React, { useState } from "react";
import "./AddToFavorite.scss";
import { Icon } from "semantic-ui-react";
import { useMutation, useQuery } from "@apollo/client";
import { ADD_TO_FAVORITES, IS_FAVORITE } from "../../../../gql/favorites";

export default function AddToFavorite({ movie }) {
  const [loadingAction, setLoadingAction] = useState(false);

  const { data, loading, refetch } = useQuery(IS_FAVORITE, {
    variables: {
      idMovie: movie.id,
    },
  });

  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);

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
      console.log(error);
    }
    setLoadingAction(false);
  };

  // const onDeleteLike = async () => {
  //   setLoadingAction(true);
  //   try {
  //     await deleteLike({
  //       variables: {
  //         idMovie: movie.id,
  //       },
  //     });
  //     refetch();
  //     refetchCount();
  //   } catch (error) {
  //     console.log(error);
  //   }

  //   setLoadingAction(false);
  // };

  const onAction = (e) => {
    e.preventDefault();
    if (!loadingAction) {
      if (isFavorite) {
        // onDeleteLike();
      } else {
        onAddFavorite();
      }
    }
  };

  if (loading) return null;
  const { isFavorite } = data;

  return (
    <div className="addToFavorite">
      <>
        {isFavorite ? (
          <Icon name="heart" className="addToFavorite__addToFavorites_icon">
            <span className="tooltiptext">Está en Favoritos</span>
          </Icon>
        ) : (
          <div>
            <Icon
              name="plus"
              className="addToFavorite__addToFavorites_icon"
              onClick={onAction}
            >
              <span className="tooltiptext">Agregar a Favoritos</span>
            </Icon>
          </div>
        )}
      </>
    </div>
  );
}
