import React from "react";
import {
  ApolloLink,
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";

const directLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  credentials: "include",
});

const proxyLink = createHttpLink({
  uri: "/api/graphql",
  credentials: "include",
});

const link = ApolloLink.split(
  (operation) => operation.getContext().useProxy,
  proxyLink,
  directLink
);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

export default function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
