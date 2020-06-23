import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeaModule } from './idea/idea.module';

@Module({
  imports: [MongooseModule.forRoot(process.env.MONGODB_URI), IdeaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
