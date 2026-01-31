import { ApolloClient, InMemoryCache, HttpLink } from "@apollo/client";

export const client = new ApolloClient({
  link: new HttpLink({
    // url graphql
    uri: "https://your-api-url.com/graphql",
  }),
  cache: new InMemoryCache(),
});
