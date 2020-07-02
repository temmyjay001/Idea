import { IsString } from 'class-validator';
import { prop, modelOptions, Ref, isDocument } from '@typegoose/typegoose';
import { User, UserRO } from 'src/user/user.model';
@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Idea {
  @IsString()
  @prop({ required: true })
  idea: string;

  @IsString()
  @prop({ required: true })
  description: string;

  @prop({
    type: User,
    ref: () => User,
  })
  author: Ref<User>;
}

export class IdeaRO {
  id?: string;
  idea: string;
  description: string;
  author: UserRO;
}
