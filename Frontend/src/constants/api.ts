import { ApolloClient, InMemoryCache, createHttpLink } from "@apollo/client";
import axios, { AxiosError, AxiosResponse } from "axios";
import { setContext } from "@apollo/client/link/context";
import { tokenStorage, userStorage } from "../utils/createStorage";
import { USER_LOGIN, getGlobalState, removeGlobalState, } from "@store/queryClient";
import { authService } from "@services/auth";

// axios

const onResponseSuccess = (response: AxiosResponse) => {
  return response.data.data;
}

const onResponseError = (error: AxiosError) => {
  if(error.response?.status !== 401){
    throw error.response?.data
  }
  return refreshToken(error, onUnauthenticated)
}

const refreshToken = async (error: AxiosError, logout: Function) => {
  const refreshToken = tokenStorage.get().refreshToken;
  console.log(error)
  if (!refreshToken) {
    logout();
    return;
  }
  try {
      const data = await authService.refreshToken({ "refreshToken": refreshToken});
      tokenStorage.set(data)

      // setCookie(
      //   Authenticate.AUTH,
      //   JSON.stringify({
      //     username: data.username,
      //     accessToken: data.accessToken,
      //   }),
      //   0.02
      // );
      if(error.config){
        error.config.headers.Authorization = `Bearer ${tokenStorage.get().accessToken}`;
        return axios(error.config);
      }
      throw error.response?.data
    } catch (error) {
      logout();
      return;
    }
}
const onUnauthenticated = () => {
    removeGlobalState(USER_LOGIN);
    userStorage.clear();
    tokenStorage.clear();
}
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
    return onResponseSuccess(res);
  },
  (error) => {
    return onResponseError(error)
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
