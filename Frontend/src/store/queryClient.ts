import { QueryClient, useQuery } from "@tanstack/react-query";

export const LOGIN_MODAL = "LOGIN_MODAL";
export const USER_DATA = "USER_DATA";

export interface IGlobalState {
  [LOGIN_MODAL]: boolean;
  [USER_DATA]?: {
    name: string;
    email: string;
    avatar?: string;
  };
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: import.meta.env.NODE_ENV === "production",
      refetchOnWindowFocus: false,
    },
  },
});

export const setGlobalState = <T extends keyof IGlobalState>(
  name: T,
  value: Required<IGlobalState>[T]
) => {
  queryClient.setQueryData([name], value);
  queryClient.invalidateQueries([name]);
};

export const getGlobalState = <T extends keyof IGlobalState>(
  name: T
): IGlobalState[T] => {
  return queryClient.getQueryData([name]) as IGlobalState[T];
};

export const clearGlobalState = <T extends keyof IGlobalState>(
  name: T
): IGlobalState[T] => {
  return queryClient.removeQueries([name]) as IGlobalState[T];
};

export const useGLobalState = <T extends keyof IGlobalState>(
  name: T,
  defaultValue?: IGlobalState[T]
): IGlobalState[T] => {
  const { data } = useQuery({
    queryKey: [name],
    staleTime: Infinity,
    cacheTime: Infinity,
    initialData: defaultValue,
    queryFn: () => {
      const value = getGlobalState(name);

      if (typeof value !== "undefined") return value;

      if (typeof defaultValue !== "undefined") return defaultValue;

      return null;
    },
  });
  return data as IGlobalState[T];
};

// setGlobalState(LOGIN_MODAL, false);
