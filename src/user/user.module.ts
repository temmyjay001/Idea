import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from './user.model';
import { Idea } from 'src/idea/idea.model';

@Module({
  imports: [TypegooseModule.forFeature([User, Idea])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
