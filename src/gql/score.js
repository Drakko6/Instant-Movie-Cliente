import { gql } from "@apollo/client";

export const GET_SCORE = gql`
  query getScore($idMovie: ID!) {
    getScore(idMovie: $idMovie)
  }
`;

export const SCORE_MOVIE = gql`
  mutation scoreMovie($input: ScoreInput!) {
    scoreMovie(input: $input)
  }
`;

export const GET_TOTAL_SCORE = gql`
  query getTotalScore($idMovie: ID!) {
    getTotalScore(idMovie: $idMovie) {
      total
      scoresNumber
    }
  }
`;
