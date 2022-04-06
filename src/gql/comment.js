import { gql } from "@apollo/client";

export const ADD_COMMENT = gql`
  mutation addComment($input: CommentInput) {
    addComment(input: $input) {
      idMovie
      comment
    }
  }
`;

export const GET_COMMENTS = gql`
  query getComments($idMovie: ID!) {
    getComments(idMovie: $idMovie) {
      comment
      idUser {
        username
        avatar
      }
    }
  }
`;
