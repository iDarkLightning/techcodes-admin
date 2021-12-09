import { apolloServer } from "../../lib/apollo-server";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default apolloServer.createHandler();
