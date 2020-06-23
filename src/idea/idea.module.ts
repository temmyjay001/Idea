import { Module } from '@nestjs/common';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { MongooseModule } from '@nestjs/mongoose';
import { IdeaSchema } from './idea.model';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Idea', schema: IdeaSchema }])],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
