import { Field, InputType } from "type-graphql";

@InputType()
export class DisablePoints {
  @Field()
  id: string;

  @Field()
  value: boolean;
}
