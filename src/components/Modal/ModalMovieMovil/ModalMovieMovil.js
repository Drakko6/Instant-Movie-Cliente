import React, { useEffect, useState } from "react";
import "./ModalMovieMovil.scss";
import { Modal, Grid, Icon, Button } from "semantic-ui-react";
import CommentForm from "./CommentForm";
import Comments from "./Comments";
import Actions from "../ModalMovie/Actions";
import { useMutation, useQuery } from "@apollo/client";
import { GET_SCORE, GET_TOTAL_SCORE, SCORE_MOVIE } from "../../../gql/score";
import ModalVideo from "../../ModalVideo/ModalVideo";
import { Rating } from "react-simple-star-rating";
import AddToFavorite from "../ModalMovie/AddToFavorite";
import useFetch from "../../../hooks/useFetch";
import { API, URL_API } from "../../../utils/constants";

export default function ModalMovieMovil({ show, setShow, movie }) {
  const [scoreMovie] = useMutation(SCORE_MOVIE);

  const {
    data: dataMyScore,
    loading: loadingScore,
    refetch,
  } = useQuery(GET_SCORE, {
    variables: {
      idMovie: movie.id,
    },
  });

  const {
    data: dataTotalScore,
    loading: loadingTotalScore,
    refetch: refetchTotalScore,
  } = useQuery(GET_TOTAL_SCORE, {
    variables: {
      idMovie: movie.id,
    },
  });

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

  const onChangeRating = async (score) => {
    try {
      await scoreMovie({
        variables: {
          input: {
            idMovie: movie.id,
            score: score / 20,
          },
        },
      });

      refetch();
      refetchTotalScore();
    } catch (error) {
      console.log(error);
    }
  };

  if (loadingScore || loadingTotalScore) return null;
  if (dataMyScore === undefined || dataTotalScore === undefined) return null;
  const { getScore } = dataMyScore;
  const { getTotalScore } = dataTotalScore;

  return (
    <Modal open={show} onClose={onClose} className="modal-movie-movil">
      <Grid>
        <Grid.Row
          className="modal-movie-movil__top"
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
              padding: 10,
              display: "flex",
              alignItems: "center",
              // height: "100%",
              // width: "100%",
            }}
          >
            <div>
              <AddToFavorite movie={movie} />

              {renderVideo()}

              <h2 style={{ color: "white", margin: 0 }}>
                {movie.title}{" "}
                <span style={{ fontSize: "medium", opacity: 0.6 }}>
                  {movie.release_date}
                </span>
              </h2>
              <p style={{ fontSize: "large", color: "white" }}>
                <span>
                  <Icon name="star" color="yellow" /> {getTotalScore.total} / 5
                </span>
                <span style={{ fontSize: "medium" }}>
                  {"  "}({getTotalScore.scoresNumber})
                </span>
              </p>

              <p style={{ color: "white" }}>
                {movie.overview
                  ? movie.overview
                  : "No hay sinopsis de esta pel??cula"}
              </p>
              <h3 style={{ color: "white" }}>G??neros</h3>
              <ul style={{ color: "white" }}>
                {movie.genres.map((genre) => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>

              <div
                style={{
                  display: "flex",
                  justifyContent: "end",
                  width: "100%",
                }}
              >
                <Rating
                  size={20}
                  transition
                  onClick={onChangeRating}
                  ratingValue={getScore * 20}
                  tooltipDefaultText={"Tu calificaci??n"}
                  showTooltip
                  tooltipArray={[
                    "Terrible",
                    "Mala",
                    "Regular",
                    "Buena",
                    "Excelente",
                  ]}
                />
              </div>
            </div>
          </div>
        </Grid.Row>
        <Grid.Row className="modal-movie-movil__bottom">
          <Actions movie={movie} />
          <Comments movie={movie} />
          <CommentForm movie={movie} />
        </Grid.Row>
      </Grid>
    </Modal>
  );
}
