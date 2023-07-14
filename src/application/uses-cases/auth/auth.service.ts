import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import {
  IUSER_SHARED,
  USER_AND_PASSWORD_INCORRECTS,
} from 'src/common/constants';
import { UserDto } from 'src/domain/dtos';
import { IUserRepository } from 'src/domain/repository/user.repository';

@Injectable()
export class AuthService {
  constructor(
    @Inject(IUSER_SHARED.IUSERREPOSITORY)
    private userRepository: IUserRepository,
  ) {}
  async validateUserById(_id: string): Promise<UserDto> {
    const user = await this.userRepository.find({
      _id,
    });
    return new UserDto(user);
  }
  async validateUser(email: string, password: string): Promise<any> {
    const userRecord = await this.userRepository.findUserValidatePassword({
      email,
      password,
    });
    if (!userRecord) throw new NotFoundException(USER_AND_PASSWORD_INCORRECTS);
    const user = new UserDto(userRecord);
    return user;
  }
}
