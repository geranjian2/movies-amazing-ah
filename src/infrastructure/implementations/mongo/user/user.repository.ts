import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CREATE } from 'src/common/constants';
import { UserMapper } from 'src/common/mappers';
import { User, UserDocument, schema } from 'src/common/schemas/mongo';
import { UserModel } from 'src/domain/models';
import { IUserRepository } from 'src/domain/repository/user.repository';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectModel(schema.USER) private userModel: Model<UserDocument>,
    private userMapper: UserMapper,
  ) {}

  async findUserValidatePassword(filter: UserModel): Promise<UserModel | null> {
    const { email, password } = filter;
    const userFind = await this.userModel.findOne({ email }).exec();
    const user = new this.userModel(userFind);
    const comparePassword = await user.comparePassword(password);
    const userMapper =
      user && comparePassword ? this.userMapper.toDomain(user) : null;
    return userMapper;
  }
  async find(filter: UserModel): Promise<UserModel | null> {
    const user = await this.userModel.findOne(filter).exec();
    const userMapper = user ? this.userMapper.toDomain(user) : null;
    return userMapper;
  }
  async save(data: UserModel): Promise<string> {
    const createdUser = new this.userModel(data);
    createdUser.password = bcrypt.hashSync(createdUser.password, 10);
    await createdUser.save();
    return CREATE;
  }
  getAll(data: UserModel): Promise<UserModel[]> {
    return this.userModel.find(data);
  }
  getById: (dataId: string) => Promise<UserModel>;
  getOne: (filter: UserModel) => Promise<UserModel>;
  delete: (data: UserModel) => Promise<string>;
  update: (data: UserModel) => Promise<UserModel>;

  async getUsers(): Promise<User[]> {
    return this.userModel.find();
  }
}
