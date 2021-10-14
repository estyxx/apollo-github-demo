import { ChakraProvider } from "@chakra-ui/react";
import { ApolloProvider } from "@apollo/client";

import React from "react";
import { NotificationProvider } from "contexts/Notifications";
import getConfig from "next/config";
import { useApolloClient } from "hooks/useApolloClient";

const { publicRuntimeConfig: config} = getConfig();

const client = useApolloClient({
  GRAPHQL_API: config.GRAPHQL_API,
  REACT_APP_CLIENT_TOKEN: config.REACT_APP_CLIENT_TOKEN
});

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <NotificationProvider>
        <ApolloProvider client={client}>
          <Component {...pageProps} />
        </ApolloProvider>
      </NotificationProvider>
    </ChakraProvider>
  );
}

export default MyApp;
