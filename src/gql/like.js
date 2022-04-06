import { gql } from "@apollo/client";

export const ADD_LIKE = gql`
  mutation addLike($idMovie: ID!) {
    addLike(idMovie: $idMovie)
  }
`;

export const IS_LIKE = gql`
  query isLike($idMovie: ID!) {
    isLike(idMovie: $idMovie)
  }
`;

export const DELETE_LIKE = gql`
  mutation deleteLike($idMovie: ID!) {
    deleteLike(idMovie: $idMovie)
  }
`;

export const COUNT_LIKES = gql`
  query countLikes($idMovie: ID!) {
    countLikes(idMovie: $idMovie)
  }
`;
