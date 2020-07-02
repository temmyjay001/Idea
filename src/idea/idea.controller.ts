import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UsePipes,
  Logger,
  UseGuards,
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { Idea } from './idea.model';
import { ValidationPipe } from '../shared/validation.pipe';
import * as Joi from '@hapi/joi';
import { AuthGuard } from 'src/shared/auth.guard';
import { User } from 'src/user/user.model';
import { UserDoc } from 'src/user/user.decorator';

@Controller('api/idea')
export class IdeaController {
  private logger = new Logger('IdeaController');
  constructor(private ideaService: IdeaService) {}

  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  @Post()
  @UseGuards(new AuthGuard())
  createIdea(
    @UserDoc('id') user,
    @Body(
      new ValidationPipe(
        Joi.object().keys({
          idea: Joi.string().required(),
          description: Joi.string().required(),
        }),
      ),
    )
    data: Idea,
  ) {
    this.logData({ user, data });
    return this.ideaService.create(user, data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }

  @Put(':id')
  @UseGuards(new AuthGuard())
  updateIdea(
    @Param('id') id: string,
    @UserDoc('id') user: string,
    @Body(
      new ValidationPipe(
        Joi.object().keys({
          idea: Joi.string(),
          description: Joi.string(),
        }),
      ),
    )
    data: Partial<Idea>,
  ) {
    this.logData({ id, user, data });
    return this.ideaService.update(id, user, data);
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  destroyIdea(@Param('id') id: string, @UserDoc('id') user: string) {
    this.logData({ id, user });
    return this.ideaService.destroy(id, user);
  }

  private logData(options: any) {
    options.user && this.logger.log('USER' + JSON.stringify(options.user));
    options.data && this.logger.log('DATA' + JSON.stringify(options.data));
    options.id && this.logger.log('IDEA' + JSON.stringify(options.id));
  }
}
