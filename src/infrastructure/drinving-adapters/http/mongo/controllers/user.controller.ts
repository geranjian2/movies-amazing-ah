import { Controller, Get } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/implementations/mongo/user/user.repository';

@Controller('user')
export class UserController {
  constructor(private readonly userRepository: UserRepository) {}
  @Get()
  async getAll() {
    // return await this.userRepository.getMovies();
  }
}
