import { GraphQLClient } from "graphql-request";
import Cookies from "js-cookie";

const endpoint = process.env.NEXT_PUBLIC_API_URL || "";

export const gqlClient = new GraphQLClient(endpoint, {
  headers: () => {
    const token = Cookies.get("auth_token");
    return {
      authorization: token ? `Bearer ${token}` : "",
    };
  },
});
