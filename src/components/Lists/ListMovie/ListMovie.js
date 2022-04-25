import React, { useState } from "react";
import "./ListMovie.scss";
import { map } from "lodash";
import { Grid, Card, Feed, Button, Icon } from "semantic-ui-react";

import { useMediaQuery } from "react-responsive";
import ModalMovieMovil from "../../Modal/ModalMovieMovil";
import ModalMovie from "../../Modal/ModalMovie";
import ModalBasic from "../../Modal/ModalBasic";
import Search from "../../Header/Search/Search";
import { useMutation } from "@apollo/client";
import { DELETE_MOVIE_FROM_LIST } from "../../../gql/lists";
import { toast } from "react-toastify";
import NewListForm from "../../NewListForm";

export default function ListMovie({ list, refetchLists }) {
  const [showModal, setShowModal] = useState(false);
  const [showModalAddList, setShowModalAddList] = useState(false);
  const [showModalEditList, setShowModalEditList] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const [deleteMovieFromList] = useMutation(DELETE_MOVIE_FROM_LIST);

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

  const onDeleteMovie = async (movie) => {
    try {
      await deleteMovieFromList({
        variables: {
          listName: list.name,
          idMovie: movie.id,
        },
      });

      refetchLists();
      setShowModal(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <Card className="list-movie">
        <Card.Content>
          <Card.Header className="list-movie__header">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <div style={{ display: "flex", alignItems: "center" }}>
                <Button
                  icon
                  color="facebook"
                  onClick={() => setShowModalEditList(true)}
                >
                  <Icon name="edit" />
                </Button>
                <p>{list.name}</p>
              </div>

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
            {list.movies.length === 0 && (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  color: "black",
                }}
              >
                <p>Esta lista no contiene películas aún</p>
              </div>
            )}
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
                  <div
                    style={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <div>
                      <Feed.Summary className="list-movie__movie-title">
                        {movie.title}
                      </Feed.Summary>
                      <Feed.Summary className="list-movie__movie-date">
                        {movie.release_date}
                      </Feed.Summary>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginRight: 10,
                      }}
                    >
                      <Icon
                        className="deleteIcon"
                        name="delete"
                        color="red"
                        size="large"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteMovie(movie);
                        }}
                      />
                    </div>
                  </div>
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
            <Search
              addingToList={true}
              listName={list.name}
              refetchLists={refetchLists}
            />
          </div>
        </ModalBasic>
      )}

      {showModalEditList && (
        <ModalBasic
          size={"mini"}
          show={showModalEditList}
          setShow={setShowModalEditList}
          title={"Ingresa el nuevo nombre de la lista"}
        >
          <NewListForm
            setShowModal={setShowModalAddList}
            refetch={refetchLists}
            currentName={list.name}
            edit={true}
          />
        </ModalBasic>
      )}
    </>
  );
}
