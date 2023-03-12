import { createHttpLink } from "@apollo/client";
import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { setContext } from "@apollo/client/link/context";

const httpLink = createHttpLink({
  uri: "http://localhost:4000/"
});

const authLink = setContext((_, { header }) => {
  return {
    headers: {
      ...header,
      authorization: localStorage.getItem("token") || ""
    }
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

export default client;