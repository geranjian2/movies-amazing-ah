import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument, schema } from 'src/common/schemas/mongo';

@Injectable()
export class UserRepository {
  constructor(
    @InjectModel(schema.USER) private userModel: Model<UserDocument>,
  ) {}

  async getUsers(): Promise<User[]> {
    return this.userModel.find();
  }
}
