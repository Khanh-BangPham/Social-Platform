import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import axios from "axios";
import { setContext } from "@apollo/client/link/context";
import { tokenStorage } from "../utils/createStorage";

// axios

export const api = axios.create({
  baseURL: import.meta.env.VITE_API,
});

api.interceptors.request.use((config) => {
  if (tokenStorage.get()) {
    config.headers.Authorization = `Bearer ${tokenStorage.get().accessToken}`;
  }
  return config;
});

api.interceptors.response.use(
  (res) => {
    return res.data.data;
  },
  (error) => {
    throw error.response.data;
  }
);
// graphql

const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = tokenStorage.get();
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token.accessToken}` : "",
    },
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
