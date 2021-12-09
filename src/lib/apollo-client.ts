import { ApolloClient, InMemoryCache } from "@apollo/client";
import { NextPageContext } from "next";
import { withApollo as createWithApollo } from "next-apollo";

export const getApolloClient = (ctx: NextPageContext | undefined) =>
  new ApolloClient({
    uri: "/api/graphql",
    cache: new InMemoryCache(),
    headers: {
      cookie:
        (typeof window === "undefined"
          ? ctx?.req?.headers.cookie
          : undefined) || "",
    },
    credentials: "include",
  });

export const withApollo = createWithApollo(getApolloClient);
