import { ServerResponse } from "http";
import { NextApiRequest } from "next";

export interface Context {
  req: NextApiRequest;
  res: ServerResponse;
}
