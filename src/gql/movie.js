import { gql } from "@apollo/client";

export const GET_RECOMMENDED_MOVIES = gql`
  query getRecommendedMovies {
    getRecommendedMovies {
      id
      title
      original_title
      genres {
        name
        id
      }
      release_date
      poster_path
      backdrop_path
      overview
    }
  }
`;

export const GET_LAST_MOVIES = gql`
  query getLastMovies {
    getLastMovies {
      id
      title
      original_title
      genres {
        name
        id
      }
      release_date
      poster_path
      backdrop_path
      overview
    }
  }
`;

export const GET_POPULAR_MOVIES = gql`
  query getPopularMovies {
    getPopularMovies {
      id
      title
      original_title
      genres {
        name
        id
      }
      release_date
      poster_path
      backdrop_path
      overview
    }
  }
`;

export const SEARCH_MOVIES = gql`
  query searchMovies($search: String) {
    searchMovies(search: $search) {
      id
      title
      original_title
      genres {
        name
        id
      }
      release_date
      poster_path
      backdrop_path
      overview
    }
  }
`;

export const GET_MOVIES_BY_GENRE = gql`
  query getMoviesByGenre($idGenre: Int, $limit: Int) {
    getMoviesByGenre(idGenre: $idGenre, limit: $limit) {
      id
      title
      original_title
      genres {
        name
        id
      }
      release_date
      poster_path
      backdrop_path
      overview
    }
  }
`;
