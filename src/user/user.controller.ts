import { Controller, Post, Get, Logger, Body, UsePipes } from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from 'src/shared/validation.pipe';
import * as Joi from '@hapi/joi';
import { User } from './user.model';

@Controller()
export class UserController {
  private logger = new Logger('UserController');
  constructor(private userService: UserService) {}
  @Get('api/users')
  showAllUsers() {
    return this.userService.showAll();
  }

  @Post('login')
  @UsePipes(
    new ValidationPipe(
      Joi.object().keys({
        username: Joi.string().required(),
        password: Joi.string().required(),
      }),
    ),
  )
  login(@Body() data: User) {
    return this.userService.login(data);
  }

  @Post('register')
  @UsePipes(
    new ValidationPipe(
      Joi.object().keys({
        username: Joi.string()
          .min(4)
          .required(),
        password: Joi.string().required(),
      }),
    ),
  )
  register(@Body() data: User) {
    return this.userService.register(data);
  }
}
