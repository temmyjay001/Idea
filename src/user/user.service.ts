import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from 'nestjs-typegoose';
import { User, UserRO } from './user.model';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async showAll(): Promise<UserRO[]> {
    const users = await this.userModel.find().exec();
    return users.map(user => user.toResponseObject(false));
  }

  async login(data: User): Promise<UserRO> {
    const { username, password } = data;
    const user = await this.userModel.findOne({ username: username });
    if (!user || !user.comparePassword(password))
      throw new HttpException(
        'Invalid username/password',
        HttpStatus.BAD_REQUEST,
      );
    return user.toResponseObject();
  }
  async register(data: User): Promise<UserRO> {
    const { username } = data;

    let user = await this.userModel.findOne({ username: username });
    if (user) {
      throw new HttpException('User already exist', HttpStatus.BAD_REQUEST);
    }

    user = await new this.userModel(data);
    user.id = await user._id;
    user.password = await user.hashPassword(data.password);
    await user.save();
    return user.toResponseObject();
  }
}
