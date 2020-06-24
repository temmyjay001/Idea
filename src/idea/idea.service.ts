import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Idea } from './idea.model';

@Injectable()
export class IdeaService {
  constructor(@InjectModel('Idea') private readonly ideaModel: Model<Idea>) {}

  async showAll() {
    return await this.ideaModel.find().exec();
  }

  async create(data: Idea) {
    const idea = await new this.ideaModel(data);
    await idea.save();
    return idea;
  }

  async read(id: string) {
    return await this.ideaModel.findOne({ _id: id }).catch(error => {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    });
  }

  async update(id: string, data: Partial<Idea>) {
    return await this.ideaModel
      .findOneAndUpdate({ _id: id }, data, { new: true })
      .catch(error => {
        throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
      });
  }

  async destroy(id: string) {
    await this.ideaModel.findOneAndDelete({ _id: id }).catch(error => {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    });
    return { deleted: true };
  }
}
