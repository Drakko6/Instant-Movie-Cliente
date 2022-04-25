import { gql } from "@apollo/client";
// TODO: AGREGAR QUERIES Y MUTATIONS DE LISTAS

export const ADD_EMPTY_LIST = gql`
  mutation addEmptyList($listName: String!) {
    addEmptyList(listName: $listName)
  }
`;

export const ADD_LIST_WITH_MOVIE = gql`
  mutation addListWithMovie($listName: String, $idMovie: ID) {
    addListWithMovie(listName: $listName, idMovie: $idMovie)
  }
`;

export const ADD_MOVIE_TO_LIST = gql`
  mutation addMovieToList($listName: String, $idMovie: ID) {
    addMovieToList(listName: $listName, idMovie: $idMovie)
  }
`;

export const DELETE_MOVIE_FROM_LIST = gql`
  mutation deleteMovieFromList($listName: String, $idMovie: ID) {
    deleteMovieFromList(listName: $listName, idMovie: $idMovie)
  }
`;

export const COPY_LIST = gql`
  mutation copyList($listName: String, $username: String) {
    copyList(listName: $listName, username: $username)
  }
`;

export const CHANGE_LIST_NAME = gql`
  mutation changeNameList($listName: String, $newName: String) {
    changeNameList(listName: $listName, newName: $newName)
  }
`;

export const GET_LISTS_FOLLOWED = gql`
  query getListsFollowed {
    getListsFollowed {
      id
      idUser {
        name
        username
        email
        avatar
      }
      name
      createdAt
      movies {
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
  }
`;

export const GET_LISTS_WITH_MOVIE_INFO = gql`
  query getListsWithMovieInfo($username: String) {
    getListsWithMovieInfo(username: $username) {
      id
      idUser {
        name
        username
        email
        avatar
      }
      name
      createdAt
      movies {
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
  }
`;

export const GET_RANDOM_LISTS = gql`
  query getRandomLists {
    getRandomLists {
      id
      idUser {
        name
        username
        email
        avatar
      }
      name
      createdAt
      movies {
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
  }
`;

export const GET_LISTS = gql`
  query getLists($username: String) {
    getLists(username: $username) {
      id
      idUser
      name
      createdAt
      movies
    }
  }
`;
