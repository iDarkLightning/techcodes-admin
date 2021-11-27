import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { PrismaClient, Role, User } from "@prisma/client";
import { prisma } from "../../../lib/prisma";

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  // callbacks: {
  //   signIn: async ({ user, account, profile, email, credentials }) => {
  //     if (user.email.includes("techcodes")) {
  //       await prisma.user.update({
  //         where: { id: user.id },
  //         data: { role: Role.EXEC },
  //       });
  //     }

  //     return true;
  //   },
  // },
});
