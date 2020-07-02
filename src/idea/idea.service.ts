import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { Idea, IdeaRO } from './idea.model';
import { InjectModel } from 'nestjs-typegoose';
import { ReturnModelType } from '@typegoose/typegoose';
import { User } from 'src/user/user.model';

@Injectable()
export class IdeaService {
  constructor(
    @InjectModel(Idea) private readonly ideaModel: ReturnModelType<typeof Idea>,
    @InjectModel(User) private readonly userModel: ReturnModelType<typeof User>,
  ) {}

  async showAll(): Promise<IdeaRO[] | null> {
    const idea = await this.ideaModel.find().populate('author', 'username');

    return idea.map(idea => idea.toJSON({ virtuals: false }));
  }

  async create(userId: string, data: Idea): Promise<IdeaRO> {
    const user = await this.userModel.findOne({ _id: userId });
    const check = await this.ideaModel.findOne({ idea: data.idea });
    if (check)
      throw new HttpException(
        `Someone already has that idea`,
        HttpStatus.NOT_FOUND,
      );
    const idea = await new this.ideaModel({ ...data, author: user });
    await idea.save();
    return idea.toJSON({ virtuals: false });
  }

  async read(id: string): Promise<IdeaRO> {
    const idea = await this.ideaModel
      .findOne({ _id: id })
      .populate('author', 'username');

    if (!idea) {
      throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
    }
    return idea.toJSON({ virtuals: false });
  }

  async update(
    id: string,
    userId: string,
    data: Partial<Idea>,
  ): Promise<IdeaRO> {
    await this.ideaModel.findOne(
      { _id: id, author: userId },
      async (err, file) => {
        if (!file) throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
      },
    );
    const idea = await this.ideaModel
      .findOneAndUpdate({ _id: id, author: userId }, data, {
        new: true,
      })
      .populate('author', 'username');

    if (!idea) {
      throw new HttpException(`Invalid user`, HttpStatus.NOT_FOUND);
    }
    return idea.toJSON({ virtuals: false });
  }

  async destroy(id: string, userId: string) {
    const idea = await this.ideaModel
      .findOneAndDelete({
        _id: id,
        author: userId,
      })
      .populate('author', 'username');

    if (!idea) throw new HttpException(`Not Found`, HttpStatus.NOT_FOUND);
    return { deleted: true, idea };
  }

  private ensureOwnership(idea: Idea, userId: string) {
    // if(idea.author.id)
  }
}
