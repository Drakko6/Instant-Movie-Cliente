import { gql } from "@apollo/client";

export const REGISTER = gql`
  mutation register($input: UserInput) {
    register(input: $input) {
      id
      name
      username
      email
      password
      state
      town
      business
      type
    }
  }
`;

export const LOGIN = gql`
  mutation login($input: LoginInput) {
    login(input: $input) {
      token
    }
  }
`;

export const GET_USER = gql`
  query getUser($id: ID, $username: String) {
    getUser(id: $id, username: $username) {
      id
      name
      username
      email
      breed
      years
      months
      owner
      description
      avatar
      town
      state
      preferences
      business
      address
      type
      phone
      contactEmail
      schedule {
        day
        hour
      }
    }
  }
`;

export const UPDATE_AVATAR = gql`
  mutation updateAvatar($file: Upload) {
    updateAvatar(file: $file) {
      status
      urlAvatar
    }
  }
`;

export const DELETE_AVATAR = gql`
  mutation deleteAvatar {
    deleteAvatar
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($input: UserUpdateInput) {
    updateUser(input: $input)
  }
`;

export const SEARCH = gql`
  query search($search: String) {
    search(search: $search) {
      name
      username
      avatar
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser {
    deleteUser
  }
`;

export const CONFIRM_USER = gql`
  mutation confirmUser($token: String!) {
    confirmUser(token: $token)
  }
`;

export const REGISTER_FIRST_PREFERENCES = gql`
  mutation registerFirstPreferences($input: UserUpdateInput) {
    registerFirstPreferences(input: $input)
  }
`;
