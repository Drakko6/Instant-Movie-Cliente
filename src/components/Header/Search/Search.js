import React, { useState, useEffect, useCallback } from "react";
import { Search as SearchSU, Image } from "semantic-ui-react";
import { Link } from "react-router-dom";
import "./Search.scss";
import { useQuery } from "@apollo/client";
import { SEARCH_MOVIES } from "../../../gql/movie";
import { size, debounce } from "lodash";
import ImageNotFound from "../../../assets/png/avatar.png";

export default function Search() {
  const [search, setSearch] = useState(null);
  const [results, setResults] = useState([]);

  const { data, loading } = useQuery(SEARCH_MOVIES, {
    variables: {
      search,
    },
  });

  // const debounceFn = useCallback(debounce(handleDebounceFn, 300), []);

  useEffect(() => {
    if (size(data?.searchMovies) > 0) {
      const movies = [];
      data.searchMovies.forEach((movie, index) => {
        movies.push({
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

  // function handleDebounceFn(inputValue) {
  //   refetch();
  // }

  const handleChange = (e) => {
    if (e.target.value.length > 0) setSearch(e.target.value);
    else setSearch(null);
  };

  const handleResultSelect = () => {
    setSearch(null);
    setResults([]);
  };

  return (
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
      resultRenderer={(e) => <ResultSearch data={e} />}
    />
  );
}

function ResultSearch({ data }) {
  return (
    <Link className="search-users_item" to={`/${data.title}`}>
      {/* Abrir el modal con la info de la película */}
      <Image src={data.avatar || ImageNotFound} />

      <div>
        <p>{data.title}</p>
        <p>{data.release_date}</p>
      </div>
    </Link>
  );
}
