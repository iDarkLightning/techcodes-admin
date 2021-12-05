import { Field, ObjectType, Int } from "type-graphql";

@ObjectType()
export class Points {
  @Field()
  id: string;

  @Field()
  type: string;

  @Field()
  name: string;

  @Field()
  value: number;

  @Field()
  enabled: boolean;

  @Field({ nullable: true })
  linkCode: string;
}
