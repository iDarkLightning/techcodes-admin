import { Points, User } from "@generated/type-graphql";
import { PointsType, Role } from "@prisma/client";
import { randomBytes } from "crypto";
import { Arg, Authorized, Mutation, Query, Resolver } from "type-graphql";
import { prisma } from "../../../lib/prisma";
import { CreatePoints } from "../types/create-points.input";
import { DisablePoints } from "../types/disable-points.input";

@Resolver()
export class PointsResolver {
  @Query(() => [Points])
  @Authorized(Role.EXEC)
  async points(): Promise<Points[]> {
    return await prisma.points.findMany();
  }

  @Query(() => [User])
  @Authorized(Role.EXEC)
  async redeemedPoints(@Arg("id") id: string) {
    return await prisma.user.findMany({
      where: {
        redeemedPoints: {
          has: id,
        },
      },
    });
  }

  @Mutation(() => Points)
  @Authorized(Role.EXEC)
  async createPoints(@Arg("createInput") args: CreatePoints): Promise<Points> {
    const { value, name } = args;
    const code = randomBytes(3).toString("hex");

    return await prisma.points.create({
      data: {
        type: PointsType.LINK,
        name,
        value,
        linkCode: code,
      },
    });
  }

  @Mutation(() => Points)
  @Authorized(Role.EXEC)
  async disablePoints(
    @Arg("disableInput") args: DisablePoints
  ): Promise<Points> {
    const { id, value } = args;

    return await prisma.points.update({
      where: {
        id,
      },
      data: {
        enabled: value,
      },
    });
  }
}
