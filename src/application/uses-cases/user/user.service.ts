import { Inject, Injectable } from '@nestjs/common';
import { IUSER_SHARED } from 'src/common/constants';
import { UserDto } from 'src/domain/dtos';
import { UserModel } from 'src/domain/models';
import { IUserRepository } from 'src/domain/repository/user.repository';

@Injectable()
export class UserService {
  constructor(
    @Inject(IUSER_SHARED.IUSERREPOSITORY)
    private userRepository: IUserRepository,
  ) {}
  async getAll(user: UserDto): Promise<UserDto[]> {
    const users = await this.userRepository.getAll(user);
    return users.map((user) => new UserDto(user));
  }
}
