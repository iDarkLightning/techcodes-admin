import { Role } from ".prisma/client";
import { User } from "@generated/type-graphql";
import { getSession } from "next-auth/react";
import { Arg, Authorized, Ctx, Mutation, ObjectType } from "type-graphql";
import { prisma } from "../../lib/prisma";
import { Context } from "../../types/Context";

type Query = {
  where: { email: string };
  data: { osis: string; role: Role };
};

@ObjectType()
export class AuthResolver {
  @Mutation(() => User)
  @Authorized(Role.EXEC, Role.MEMBER)
  async register(@Arg("osis") osis: string, @Ctx() context: Context) {
    const session = await getSession({ req: context.req });

    const query: Query = {
      where: { email: session.user.email },
      data: { osis, role: Role.MEMBER },
    };

    if (session.user.email.includes("@techcodes.org")) {
      query.data.role = Role.EXEC;
    }

    return await prisma.user.update(query);
  }
}
