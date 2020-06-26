import { IsString } from 'class-validator';
import { prop, modelOptions } from '@typegoose/typegoose';
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
}
