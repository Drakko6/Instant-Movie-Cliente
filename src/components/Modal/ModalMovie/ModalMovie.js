import React, { useState, useEffect } from "react";
import "./ModalMovie.scss";
import { Modal, Grid, Button, Icon } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Actions from "./Actions";
import { URL_API, API } from "../../../utils/constants";
import useFetch from "../../../hooks/useFetch";
import ModalVideo from "../../ModalVideo/ModalVideo";

export default function ModalMovie({ show, setShow, movie }) {
  const onClose = () => {
    setShow(false);
  };

  const [isVisibleModalVideo, setIsVisibleModalVideo] = useState(false);
  const [videoMovie, setVideoMovie] = useState(null);
  const { loading, result } = useFetch(
    `${URL_API}/search/movie?api_key=${API}&language=es-MX&query=${
      movie.original_title
    }&page=1&primary_release_year=${movie.release_date.slice(0, 4)}`
  );

  const openModal = () => setIsVisibleModalVideo(true);
  const closeModal = () => setIsVisibleModalVideo(false);

  useEffect(() => {
    const obtenerDatos = async () => {
      if (result && result.results.length > 0) {
        const response = await fetch(
          `${URL_API}/movie/${result.results[0].id}/videos?api_key=${API}&language=es-MX`
        );
        setVideoMovie(await response.json());
      }
    };

    obtenerDatos();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [result]);

  const renderVideo = () => {
    if (videoMovie && videoMovie.results) {
      if (videoMovie.results.length > 0) {
        return (
          <>
            <Button
              inverted
              color="violet"
              icon
              labelPosition="left"
              onClick={openModal}
            >
              Ver Trailer
              <Icon name="play circle" />
            </Button>
            <ModalVideo
              videoKey={videoMovie.results[0].key}
              videoPlatform={videoMovie.results[0].site}
              isOpen={isVisibleModalVideo}
              close={closeModal}
            />
          </>
        );
      }
    }
  };

  return (
    <Modal open={show} onClose={onClose} className="modal-movie">
      <Grid>
        <Grid.Column
          className="modal-movie__left"
          width={10}
          style={{
            backgroundImage: `url("https://image.tmdb.org/t/p/original/${movie.backdrop_path}")`,
            padding: 0,
            backgroundSize: "cover",
          }}
        >
          <div
            style={{
              backgroundColor: "black",
              opacity: 0.7,
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              position: "absolute",
              zIndex: 1,
            }}
          ></div>
          <div
            style={{
              position: "absolute",
              zIndex: 2,
              padding: 20,
              display: "flex",
              alignItems: "center",
              height: "100%",
            }}
          >
            <div>
              {renderVideo()}

              <h2 style={{ color: "white" }}>
                {movie.title}{" "}
                <span style={{ fontSize: "medium", opacity: 0.6 }}>
                  {movie.release_date}
                </span>
              </h2>
              <p style={{ color: "white" }}>
                {movie.overview
                  ? movie.overview
                  : "No hay sinopsis de esta película"}
              </p>
              <h3 style={{ color: "white" }}>Géneros</h3>
              <ul style={{ color: "white" }}>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </Grid.Column>
        <Grid.Column className="modal-movie__right" width={6}>
          <Comments movie={movie} />
          <Actions movie={movie} />
          <CommentForm movie={movie} />
        </Grid.Column>
      </Grid>
    </Modal>
  );
}
