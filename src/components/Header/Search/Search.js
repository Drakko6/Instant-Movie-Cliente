import React, { useState, useEffect } from "react";
import { Search as SearchSU, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Search.scss";
import { useQuery } from "@apollo/client";
import { SEARCH_MOVIES } from "../../../gql/movie";
import { size } from "lodash";
import ImageNotFound from "../../../assets/png/avatar.png";
import ModalMovie from "../../Modal/ModalMovie";
import ModalMovieMovil from "../../Modal/ModalMovieMovil";
import { useMediaQuery } from "react-responsive";

export default function Search() {
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
        resultRenderer={(e) => <ResultSearch data={e} openMovie={openMovie} />}
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
      <div className="search-users_item" onClick={() => openMovie(data)}>
        {/* Abrir el modal con la info de la película */}
        <Image src={data.avatar || ImageNotFound} />

        <div>
          <p>{data.title}</p>
          <p>{data.release_date}</p>
        </div>
      </div>
    </>
  );
}
