import React, { useState, useEffect } from "react";
import "./Feed.scss";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Dimmer, Icon, Image, List, Loader } from "semantic-ui-react";
import {
  GET_LAST_MOVIES,
  GET_POPULAR_MOVIES,
  GET_MOVIES_BY_GENRE,
} from "../../../gql/movie";
import ImageNotFound from "../../../assets/png/avatar.png";
import Actions from "../../Modal/ModalMovieMovil/Actions";
import ModalMovie from "../../Modal/ModalMovie";
import FeedMovie from "../../FeedMovie/FeedMovie";

export default function Feed({ user }) {
  const [showModal, setShowModal] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);

  //QUERY DE PELÍCULAS MÁS NUEVAS
  const { data, loading, startPolling, stopPolling } =
    useQuery(GET_LAST_MOVIES);

  // PELÍCULAS POPULARES
  const { data: dataPopular, loadingPopular } = useQuery(GET_POPULAR_MOVIES);

  // PELÍCULAS DE GÉNERO
  const { data: dataGenre1, loading: loadingGenre1 } = useQuery(
    GET_MOVIES_BY_GENRE,
    {
      variables: { idGenre: user.preferences[0], limit: 4 },
    }
  );
  const { data: dataGenre2, loading: loadingGenre2 } = useQuery(
    GET_MOVIES_BY_GENRE,
    {
      variables: { idGenre: user.preferences[1], limit: 4 },
    }
  );
  const { data: dataGenre3, loading: loadingGenre3 } = useQuery(
    GET_MOVIES_BY_GENRE,
    {
      variables: { idGenre: user.preferences[2], limit: 4 },
    }
  );

  useEffect(
    () => {
      // startPolling(3000);
      // return () => {
      //   stopPolling();
      // };
    },
    [
      // startPolling, stopPolling
    ]
  );
  if (
    loading ||
    loadingPopular ||
    loadingGenre1 ||
    loadingGenre2 ||
    loadingGenre3
  )
    return (
      <div style={{ width: "100vw", height: "100vh" }}>
        <Dimmer
          style={{
            backgroundColor: "rgba(0,0, 0, 0)",
          }}
          active
        >
          <Loader size="massive" />
        </Dimmer>
      </div>
    );
  if (
    data === undefined ||
    dataPopular === undefined ||
    dataGenre1 === undefined ||
    dataGenre2 === undefined ||
    dataGenre3 === undefined
  )
    return null;
  const { getLastMovies } = data;
  const { getPopularMovies } = dataPopular;
  const { getMoviesByGenre: moviesByGenre1 } = dataGenre1;
  const { getMoviesByGenre: moviesByGenre2 } = dataGenre2;
  const { getMoviesByGenre: moviesByGenre3 } = dataGenre3;

  const openMovie = (movie) => {
    setMovieSelected(movie);
    setShowModal(true);
  };

  const indexGenero1 = moviesByGenre1[0].genres.findIndex(
    (genre) => genre.id === user.preferences[0]
  );
  const indexGenero2 = moviesByGenre2[0].genres.findIndex(
    (genre) => genre.id === user.preferences[1]
  );

  const indexGenero3 = moviesByGenre3[0].genres.findIndex(
    (genre) => genre.id === user.preferences[2]
  );
  return (
    <>
      <div className="feed">
        {getPopularMovies.length === 0 && (
          <h2 className="feed__noposts">No hay películas para ver aún</h2>
        )}

        <List horizontal className="list">
          <h2 className="feed__noposts">
            Porque te gusta el género{" "}
            {moviesByGenre1[0].genres[indexGenero1].name}
          </h2>

          {map(moviesByGenre1, (movie) => (
            <FeedMovie key={movie.id} movie={movie} openMovie={openMovie} />
          ))}
        </List>

        <List horizontal className="list">
          <h2 className="feed__noposts">
            Porque te gusta el género{" "}
            {moviesByGenre2[0].genres[indexGenero2].name}
          </h2>

          {map(moviesByGenre2, (movie) => (
            <FeedMovie key={movie.id} movie={movie} openMovie={openMovie} />
          ))}
        </List>

        <List horizontal className="list">
          <h2 className="feed__noposts">
            Porque te gusta el género{" "}
            {moviesByGenre3[0].genres[indexGenero3].name}
          </h2>

          {map(moviesByGenre3, (movie) => (
            <FeedMovie key={movie.id} movie={movie} openMovie={openMovie} />
          ))}
        </List>

        <List horizontal className="list">
          <h2 className="feed__noposts">Películas más populares</h2>

          {map(getPopularMovies, (movie) => (
            <FeedMovie key={movie.id} movie={movie} openMovie={openMovie} />
          ))}
        </List>

        <List horizontal className="list">
          <h2 className="feed__noposts">Últimos lanzamientos</h2>

          {map(getLastMovies, (movie) => (
            <FeedMovie key={movie.id} movie={movie} openMovie={openMovie} />
          ))}
        </List>
      </div>

      {showModal && (
        <ModalMovie
          show={showModal}
          setShow={setShowModal}
          movie={movieSelected}
        />
      )}
    </>
  );
}
