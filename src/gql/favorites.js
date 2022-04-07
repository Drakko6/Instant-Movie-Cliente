import { gql } from "@apollo/client";

export const GET_FAVORITES = gql`
  query getFavorites($username: String!) {
    getFavorites(username: $username) {
      id
      title
      release_date
      budget
      original_language
      backdrop_path
      poster_path
      overview
      runtime
      genres {
        name
        id
      }
    }
  }
`;

export const ADD_TO_FAVORITES = gql`
  mutation addToFavorites($idMovie: ID!) {
    addToFavorites(idMovie: $idMovie)
  }
`;

export const IS_FAVORITE = gql`
  query isFavorite($idMovie: ID!) {
    isFavorite(idMovie: $idMovie)
  }
`;
