import { TypeGraphQLServer } from "next-type-graphql";
import { PointsResolver } from "../apps/points-manager/resolvers/points.resolver";
import { authChecker } from "./auth-checker";

export const apolloServer = new TypeGraphQLServer({
  path: "/api/graphql",
  schema: {
    resolvers: [PointsResolver],
    authChecker: authChecker,
  },
  context: (ctx) => ctx,
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
});
