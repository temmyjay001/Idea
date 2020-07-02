import { Module } from '@nestjs/common';
import { IdeaController } from './idea.controller';
import { IdeaService } from './idea.service';
import { Idea } from './idea.model';
import { TypegooseModule } from 'nestjs-typegoose';
import { User } from 'src/user/user.model';

@Module({
  imports: [TypegooseModule.forFeature([Idea, User])],
  controllers: [IdeaController],
  providers: [IdeaService],
})
export class IdeaModule {}
