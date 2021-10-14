import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
  NormalizedCacheObject,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { setContext } from "@apollo/client/link/context";

export type ApolloConfig = {
  GRAPHQL_API: string;
  REACT_APP_CLIENT_TOKEN?: string;
  fetch?: typeof fetch;
};

let cachedClient: null | ApolloClient<NormalizedCacheObject> = null;

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) =>
      console.warn(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
      ),
    );
  }

  if (networkError) {
    console.warn(`[Network error]: ${networkError}`);
  }
});

const create = ({
  GRAPHQL_API,
  REACT_APP_CLIENT_TOKEN,
  fetch = null,
}: ApolloConfig): ApolloClient<NormalizedCacheObject> => {
  console.warn("Setting a new apollo client!");
  console.log({
    GRAPHQL_API,
    REACT_APP_CLIENT_TOKEN,
  });
  const httpLink = new HttpLink({
    uri: GRAPHQL_API,
    fetch,
  });

  const authLink = setContext((_, { headers }) => {
    return {
      headers: {
        ...headers,
        Authorization: `bearer ${REACT_APP_CLIENT_TOKEN}`,
      },
    };
  });

  const link = ApolloLink.from([errorLink, authLink, httpLink]);

  return new ApolloClient({
    link: link,
    cache: new InMemoryCache(),
  });
};

const useApolloClient = (config: ApolloConfig): ApolloClient<NormalizedCacheObject> => {
  console.log(config);
  return (cachedClient ??= create(config));
};

export { useApolloClient };
