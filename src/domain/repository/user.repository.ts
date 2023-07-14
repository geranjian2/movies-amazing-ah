import { UserModel } from '../models';
import { IBaseRepository } from './base.repository';

export interface IUserRepository extends IBaseRepository<UserModel> {
  find: (filter: UserModel) => Promise<UserModel | undefined>;
  findUserValidatePassword: (
    filter: UserModel,
  ) => Promise<UserModel | undefined>;
}
