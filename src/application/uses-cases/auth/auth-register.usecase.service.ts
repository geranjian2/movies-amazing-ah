import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { IUSER_SHARED, USER_EXIST_EMAIL } from 'src/common/constants';
import { UserMapper } from 'src/common/mappers';
import { RegisterDto } from 'src/domain/dtos';
import { IUserRepository } from 'src/domain/repository/user.repository';

@Injectable()
export class AuthRegisterUseCase {
  constructor(
    @Inject(IUSER_SHARED.IUSERREPOSITORY)
    private userRepository: IUserRepository,
  ) {}

  async run(data: RegisterDto): Promise<string> {
    try {
      const userExist = await this.userRepository.find({
        email: data.email,
      });
      if (userExist) throw new BadRequestException(USER_EXIST_EMAIL);
      const response = await this.userRepository.save(data);
      return response;
    } catch (err) {
      throw new HttpException(err.message, HttpStatus.CONFLICT);
    }
  }
}
