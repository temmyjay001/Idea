import { Module } from '@nestjs/common';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { Idea } from './idea.model';
import { TypegooseModule } from 'nestjs-typegoose';

@Module({
  imports: [TypegooseModule.forFeature([Idea])],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
