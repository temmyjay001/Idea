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
} from '@nestjs/common';
import { IdeaService } from './idea.service';
import { Idea, IdeaSchema } from './idea.model';
import { ValidationPipe } from '../shared/validation.pipe';
import * as Joi from '@hapi/joi';

@Controller('idea')
export class IdeaController {
  private logger = new Logger('IdeaController');
  constructor(private ideaService: IdeaService) {}

  @Get()
  showAllIdeas() {
    return this.ideaService.showAll();
  }

  @Post()
  @UsePipes(
    new ValidationPipe(
      Joi.object().keys({
        idea: Joi.string().required(),
        description: Joi.string().required(),
      }),
    ),
  )
  createIdea(@Body() data: Idea) {
    this.logger.log(JSON.stringify(data));
    return this.ideaService.create(data);
  }

  @Get(':id')
  readIdea(@Param('id') id: string) {
    return this.ideaService.read(id);
  }

  @Put(':id')
  updateIdea(
    @Param('id') id: string,
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
    this.logger.log(JSON.stringify(data)); 
    return this.ideaService.update(id, data);
  }

  @Delete(':id')
  destroyIdea(@Param('id') id: string) {
    return this.ideaService.destroy(id);
  }
}
