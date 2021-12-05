import { TypeGraphQLServer } from "next-type-graphql";
import { AuthResolver } from "../apps/auth/auth.resolver";
import { PointsResolver } from "../apps/points-manager/resolvers/points.resolver";
import { authChecker } from "./auth-checker";

export const apolloServer = new TypeGraphQLServer({
  path: "/api/graphql",
  schema: {
    resolvers: [PointsResolver, AuthResolver],
    authChecker: authChecker,
  },
  context: (ctx) => ctx,
  playground: {
    settings: {
      "request.credentials": "include",
    },
  },
});
