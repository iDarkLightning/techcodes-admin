import { Role } from ".prisma/client";
import { User as NextUser, Session as NextSession } from "next-auth";

declare module "next-auth" {
  interface User extends NextUser {
    osis?: string;
    role: Role;
  }

  // interface Session extends NextSession {
  //   user: User;
  // }
}
