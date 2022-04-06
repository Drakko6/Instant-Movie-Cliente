import React, { useState, useEffect } from "react";
import "./Feed.scss";
import { map } from "lodash";
import { Link } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { Image, List } from "semantic-ui-react";
import { GET_LAST_MOVIES, GET_POPULAR_MOVIES } from "../../../gql/movie";
import ImageNotFound from "../../../assets/png/avatar.png";
import Actions from "../../Modal/ModalMovieMovil/Actions";
import ModalMovie from "../../Modal/ModalMovie";

export default function Feed() {
  const [showModal, setShowModal] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);

  //QUERY DE PELÍCULAS MÁS NUEVAS
  const { data, loading, startPolling, stopPolling } =
    useQuery(GET_LAST_MOVIES);

  // PELÍCULAS POPULARES

  const { data: dataPopular, loadingPopular } = useQuery(GET_POPULAR_MOVIES);

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
  if (loading || loadingPopular) return null;
  if (data === undefined || dataPopular === undefined) return null;
  const { getLastMovies } = data;
  const { getPopularMovies } = dataPopular;

  const openMovie = (movie) => {
    setMovieSelected(movie);
    setShowModal(true);
  };

  return (
    <>
      <div className="feed">
        {getLastMovies.length === 0 && (
          <h2 className="feed__noposts">No hay películas para ver aún</h2>
        )}

        <List horizontal className="list">
          <h2 className="feed__noposts">Últimos lanzamientos</h2>

          {map(getLastMovies, (movie, index) => (
            <List.Item className="feed__item" key={movie.id}>
              <div onClick={() => openMovie(movie)}>
                <List.Content>
                  <div key={index} className="feed__box">
                    <div
                      style={{
                        position: "absolute",
                        padding: 20,
                        display: "flex",
                        alignItems: "center",
                        background: "rgba(0,0,0, 0.5)",
                        width: "100%",
                      }}
                    >
                      <div>
                        <h2 style={{ color: "white" }}>{movie.title} </h2>
                        <p>
                          <span style={{ fontSize: "small", opacity: 0.6 }}>
                            {movie.release_date}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="feed__box-photo"
                      style={{
                        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.poster_path}")`,
                        padding: 0,
                        backgroundSize: "cover",
                      }}
                    />
                  </div>
                </List.Content>
              </div>
              <Actions movie={movie} />
            </List.Item>
          ))}
        </List>

        <List horizontal className="list">
          <h2 className="feed__noposts">Películas más populares</h2>

          {map(getPopularMovies, (movie, index) => (
            <List.Item className="feed__item" key={movie.id}>
              <div onClick={() => openMovie(movie)}>
                <List.Content>
                  <div key={index} className="feed__box">
                    <div
                      style={{
                        position: "absolute",
                        zIndex: 2,
                        padding: 20,
                        display: "flex",
                        alignItems: "center",
                        background: "rgba(0,0,0, 0.5)",
                        width: "100%",
                      }}
                    >
                      <div>
                        <h2 style={{ color: "white" }}>{movie.title} </h2>
                        <p>
                          <span style={{ fontSize: "small", opacity: 0.6 }}>
                            {movie.release_date}
                          </span>
                        </p>
                      </div>
                    </div>
                    <div
                      className="feed__box-photo"
                      style={{
                        backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.poster_path}")`,
                        padding: 0,
                        backgroundSize: "cover",
                      }}
                    />
                  </div>
                </List.Content>
              </div>
              <Actions movie={movie} />
            </List.Item>
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
