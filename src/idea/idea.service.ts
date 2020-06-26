import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Idea } from './idea.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';

@Injectable()
export class IdeaService {
  constructor(
    @InjectModel(Idea) private readonly ideaModel: ReturnModelType<typeof Idea>,
  ) {}

  async showAll(): Promise<Idea[] | null> {
    return await this.ideaModel.find().exec();
  }

  async create(data: Idea): Promise<Idea> {
    const check = await this.ideaModel.findOne({ idea: data.idea });
    if (check)
      throw new HttpException(
        `Someone already has that idea`,
        HttpStatus.NOT_FOUND,
      );
    const idea = await new this.ideaModel(data);
    return await idea.save();
  }

  async read(id: string) {
    return await this.ideaModel.findOne({ _id: id }).catch(error => {
      throw new HttpException(`Invaild Path`, HttpStatus.NOT_FOUND);
    });
  }

  async update(id: string, data: Partial<Idea>) {
    return await this.ideaModel
      .findOneAndUpdate({ _id: id }, data, { new: true })
      .catch(error => {
        throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
      });
  }

  async destroy(id: string) {
    await this.ideaModel.findOneAndDelete({ _id: id }).catch(error => {
      throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
    });
    return { deleted: true };
  }
}
