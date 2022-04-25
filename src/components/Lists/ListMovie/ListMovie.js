import React, { useState } from "react";
import "./ListMovie.scss";
import { map } from "lodash";
import { Grid, Card, Feed, Button, Icon } from "semantic-ui-react";

import { useMediaQuery } from "react-responsive";
import ModalMovieMovil from "../../Modal/ModalMovieMovil";
import ModalMovie from "../../Modal/ModalMovie";
import ModalBasic from "../../Modal/ModalBasic";
import Search from "../../Header/Search/Search";

export default function ListMovie({ list }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalAddList, setShowModalAddList] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  // Este componente podrá tener un botón de agregar película, abrirá un modal de búsqueda

  // Botón + para agregar nuevas listas

  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });
  const isTablet = useMediaQuery({
    query: "(min-width: 601px) and (max-width: 1099px)",
  });
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 1100px)",
  });

  const showMovie = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };
  return (
    <>
      <Card className="list-movie">
        <Card.Content>
          <Card.Header className="list-movie__header">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <p>{list.name}</p>
              <Button
                icon
                labelPosition="right"
                color="violet"
                onClick={() => setShowModalAddList(true)}
              >
                <Icon name="plus" />
                Añadir película
              </Button>
            </div>
          </Card.Header>
        </Card.Content>
        <Card.Content>
          <Feed className="list-movie__feed">
            {list.movies.map((movie) => (
              <Feed.Event
                key={movie.id}
                onClick={() => showMovie(movie)}
                className="list-movie__movie"
              >
                <Feed.Label
                  image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
                />
                <Feed.Content>
                  <Feed.Summary className="list-movie__movie-title">
                    {movie.title}
                  </Feed.Summary>
                  <Feed.Summary className="list-movie__movie-date">
                    {movie.release_date}
                  </Feed.Summary>
                </Feed.Content>
              </Feed.Event>
            ))}
          </Feed>
        </Card.Content>
      </Card>

      {showModal && (
        <>
          {isMovil ? (
            <ModalMovieMovil
              show={showModal}
              setShow={setShowModal}
              movie={selectedMovie}
            />
          ) : (
            <ModalMovie
              show={showModal}
              setShow={setShowModal}
              movie={selectedMovie}
            />
          )}
        </>
      )}

      {showModalAddList && (
        <ModalBasic
          size={"small"}
          show={showModalAddList}
          setShow={setShowModalAddList}
          title={"Busca tu película y agrégala a la lista"}
        >
          <div style={{ height: "60vh" }}>
            <Search addingToList={true} listName={list.name} />
          </div>
        </ModalBasic>
      )}
    </>
  );
}
