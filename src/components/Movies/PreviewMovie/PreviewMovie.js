import React, { useState } from "react";
import "./PreviewMovie.scss";
import { Image, Icon } from "semantic-ui-react";
import ModalMovie from "../../Modal/ModalMovie";
import ModalMovieMovil from "../../Modal/ModalMovieMovil";
import { useMediaQuery } from "react-responsive";
import { COUNT_LIKES } from "../../../gql/like";
import { useMutation, useQuery } from "@apollo/client";
import { toast } from "react-toastify";
import { ADD_TO_FAVORITES } from "../../../gql/favorites";

export default function PreviewMovie({ movie, isFavorite, refetch }) {
  const [loadingAction, setLoadingAction] = useState(false);
  const [addToFavorites] = useMutation(ADD_TO_FAVORITES);

  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1099px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  const [showModal, setShowModal] = useState(false);

  const { data: dataCount, loading: loadingCount } = useQuery(COUNT_LIKES, {
    variables: {
      idMovie: movie.id,
    },
  });

  if (loadingCount) return null;

  const { countLikes } = dataCount;

  const addToFavoritesAction = async () => {
    // Correr la mutación, hacer un loading y recargar películas

    setLoadingAction(true);
    try {
      await addToFavorites({
        variables: {
          idMovie: movie.id,
        },
      });

      refetch();
      toast.success("Película agregada a tus favoritos");
    } catch (error) {
      console.log(error);
    }
    setLoadingAction(false);
  };

  return (
    <>
      {isTablet && (
        <div
          className="preview-movie_tablet"
          onClick={() => setShowModal(true)}
        >
          <Image
            className="preview-movie_image"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
          <Icon name="like" className="active" />
          {countLikes} {countLikes === 1 ? "Like" : "Likes"}
        </div>
      )}

      {isMovil && (
        <div className="preview-movie_movil" onClick={() => setShowModal(true)}>
          <Image
            className="preview-movie_image"
            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
          />
          <Icon name="like" className="active" />
          {countLikes} {countLikes === 1 ? "Like" : "Likes"}
        </div>
      )}

      {isDesktopOrLaptop && (
        <>
          {!isFavorite && (
            <div className="preview-movie_addToFavorites">
              <Icon
                name="plus"
                className="preview-movie_addToFavorites_icon"
                onClick={addToFavoritesAction}
              >
                <span className="tooltiptext">Agregar a Favoritos</span>
              </Icon>
            </div>
          )}

          <div className="preview-movie" onClick={() => setShowModal(true)}>
            <Image
              className="preview-movie_image"
              src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            />
            <Icon name="like" className="active" />
            {countLikes} {countLikes === 1 ? "Like" : "Likes"}
          </div>
        </>
      )}

      {isMovil ? (
        <ModalMovieMovil
          show={showModal}
          setShow={setShowModal}
          movie={movie}
        />
      ) : (
        <ModalMovie show={showModal} setShow={setShowModal} movie={movie} />
      )}
    </>
  );
}
