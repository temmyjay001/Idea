/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { Injectable } from '@nestjs/common';
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
    return await this.ideaModel.findById(id);
  }

  async update(id: string, data: Partial<Idea>) {
    await this.ideaModel.updateOne({ _id: id }, data, { new: true });
    return await this.ideaModel.findById(id);
  }

  async destroy(id: string) {
    await this.ideaModel.deleteOne({ _id: id });
    return { deleted: true  };
  }
}
