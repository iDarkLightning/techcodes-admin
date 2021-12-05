import { Field, InputType } from "type-graphql";

@InputType()
export class CreatePoints {
  @Field()
  name: string;

  @Field()
  value: number;
}
