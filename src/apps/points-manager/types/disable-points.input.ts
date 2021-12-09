import { Field, InputType } from "type-graphql";

@InputType()
export class TogglePoints {
  @Field()
  id: string;

  @Field()
  value: boolean;
}
