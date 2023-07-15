import { Controller, Get } from '@nestjs/common';
import { UserRepository } from 'src/infrastructure/implementations/mongo/user/user.repository';
import { Auth, User } from '../../auth/decorators';
import { UserDto } from 'src/domain/dtos';
import { UserService } from 'src/application/uses-cases';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Auth()
  @Get()
  async getAll(@User() user: UserDto) {
    return await this.userService.getAll(user);
  }
}
