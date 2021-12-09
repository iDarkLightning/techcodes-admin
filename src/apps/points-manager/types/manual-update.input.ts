import { Field, InputType } from "type-graphql";

@InputType()
export class ManualPointsUpdate {
  @Field()
  userId: string;

  @Field()
  name: string;

  @Field()
  value: number;
}
