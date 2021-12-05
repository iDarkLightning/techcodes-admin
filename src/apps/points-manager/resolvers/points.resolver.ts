import { Role } from "@prisma/client";
import { Authorized, Query, Resolver } from "type-graphql";
import { prisma } from "../../../lib/prisma";
import { Points } from "../types/points";

@Resolver()
export class PointsResolver {
  @Query(() => [Points])
  @Authorized(Role.EXEC)
  async points(): Promise<Points[]> {
    return await prisma.points.findMany();
  }
}
