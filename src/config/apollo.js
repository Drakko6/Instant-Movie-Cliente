import { ApolloClient, InMemoryCache } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { setContext } from "apollo-link-context";
import { getToken } from "../utils/token";

const httpLink = createUploadLink({
  // uri: "https://instant-movie.herokuapp.com/",
  // uri: "http://localhost:4000",
  uri: "http://ec2-54-235-55-60.compute-1.amazonaws.com/",
});

const authLink = setContext((_, { headers }) => {
  const token = getToken();

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  connectToDevTools: true,
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
});

export default client;
