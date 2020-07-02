import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { IsString, IsNotEmpty } from 'class-validator';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { Idea } from 'src/idea/idea.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: {
      getters: true,
    },
    toObject: {
      getters: true,
    },
  },
})
export class User {
  @prop()
  @IsString()
  id: string;

  @prop({ required: true })
  @IsNotEmpty()
  username: string;

  @prop({
    required: true,
    set: (password: string) => (password = password),
    get: (): undefined => undefined,
  })
  @IsNotEmpty()
  password: string;

  @prop({ type: 'Idea', ref: 'Idea' })
  ideas: Ref<Idea>[];

  toResponseObject(showToken = true): UserRO {
    const { id, username, token } = this;
    const responseObject: any = { id, username };
    if (showToken) responseObject.token = token;
    return responseObject;
  }

  async hashPassword(password: string) {
    return await bcrypt.hash(password, 10);
  }

  async comparePassword(attempt: string) {
    return await bcrypt.compare(attempt, this.password);
  }

  private get token() {
    const { id, username } = this;
    // console.log(id);

    return jwt.sign(
      {
        id,
        username,
      },
      process.env.SECRET,
      { expiresIn: '7d' },
    );
  }
}

export class UserRO {
  id: string;
  username: string;
  token?: string;
}
