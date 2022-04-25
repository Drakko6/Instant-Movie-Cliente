import React, { useState, useEffect } from "react";
import { Search as SearchSU, Image, Button, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Search.scss";
import { useMutation, useQuery } from "@apollo/client";
import { SEARCH_MOVIES } from "../../../gql/movie";
import { size } from "lodash";
import ImageNotFound from "../../../assets/png/avatar.png";
import ModalMovie from "../../Modal/ModalMovie";
import ModalMovieMovil from "../../Modal/ModalMovieMovil";
import { useMediaQuery } from "react-responsive";
import { ADD_MOVIE_TO_LIST } from "../../../gql/lists";
import { toast } from "react-toastify";

export default function Search({ addingToList, listName, refetchLists }) {
  const isMovil = useMediaQuery({ query: "(max-width: 600px)" });

  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);

  const { data, loading } = useQuery(SEARCH_MOVIES, {
    variables: {
      search,
    },
  });

  useEffect(() => {
    if (size(data?.searchMovies) > 0) {
      const movies = [];
      data.searchMovies.forEach((movie, index) => {
        movies.push({
          movie: movie,
          key: index,
          title: movie.title,
          release_date: movie.release_date,
          avatar: `https://image.tmdb.org/t/p/original/${movie.poster_path}`,
        });
      });
      setResults(movies);
    } else {
      setResults([]);
    }
  }, [data]);

  const handleChange = (e) => {
    if (e.target.value.length > 0) setSearch(e.target.value);
    else setSearch(null);
  };

  const handleResultSelect = () => {
    setSearch(null);
    setResults([]);
  };

  const [showModal, setShowModal] = useState(false);
  const [movieSelected, setMovieSelected] = useState(null);

  const openMovie = (movie) => {
    setMovieSelected(movie.movie);
    setShowModal(true);
  };

  return (
    <>
      <SearchSU
        className="search-movies"
        fluid
        input={{ icon: "search", iconPosition: "left" }}
        loading={loading}
        value={search || ""}
        onSearchChange={handleChange}
        onResultSelect={handleResultSelect}
        results={results}
        placeholder="Buscar Película..."
        resultRenderer={(e) =>
          addingToList ? (
            <ResultSearchAddToList
              data={e}
              listName={listName}
              refetchLists={refetchLists}
            />
          ) : (
            <ResultSearch data={e} openMovie={openMovie} />
          )
        }
        noResultsMessage="Sin resultados"
      />

      {showModal && (
        <>
          {isMovil ? (
            <ModalMovieMovil
              show={showModal}
              setShow={setShowModal}
              movie={movieSelected}
            />
          ) : (
            <ModalMovie
              show={showModal}
              setShow={setShowModal}
              movie={movieSelected}
            />
          )}
        </>
      )}
    </>
  );
}

function ResultSearch({ data, openMovie }) {
  return (
    <>
      <div className="search-movies_item" onClick={() => openMovie(data)}>
        <div>
          <p>{data.title}</p>
          <p>{data.release_date}</p>
        </div>
        <Image src={data.avatar || ImageNotFound} />
      </div>
    </>
  );
}

function ResultSearchAddToList({ data, listName, refetchLists }) {
  const [addMovieToList] = useMutation(ADD_MOVIE_TO_LIST);

  const onClickAddMovie = async (movie, listName) => {
    try {
      await addMovieToList({
        variables: {
          idMovie: movie.id,
          listName,
        },
      });
      toast.success("Se agregó la película a la lista");
      refetchLists();
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <>
      <div
        className="search-movies_item"
        style={{ justifyContent: "space-between" }}
      >
        <div style={{ display: "flex", alignItems: "center" }}>
          <Image src={data.avatar || ImageNotFound} />

          <div>
            <p>{data.title}</p>
            <p>{data.release_date}</p>
          </div>
        </div>
        <Button
          icon
          color="violet"
          onClick={() => onClickAddMovie(data.movie, listName)}
        >
          <Icon name="plus" />
        </Button>
      </div>
    </>
  );
}
