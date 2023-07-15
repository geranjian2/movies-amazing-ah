import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  AuthLoginAccessUseCase,
  AuthRegisterUseCase,
  AuthService,
} from 'src/application/uses-cases';
import { LoginDto, RegisterDto, UserDto } from 'src/domain/dtos';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './decorators/user.decorator';
import { UserModel } from 'src/domain/models';
import { Auth } from './decorators/auth.decorator';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authRegisterUseCase: AuthRegisterUseCase,
    private readonly authLoginUseCase: AuthLoginAccessUseCase,
    private readonly AuthService: AuthService,
  ) {}
  @Post('sign-up')
  async signUp(@Body() data: RegisterDto): Promise<string> {
    return await this.authRegisterUseCase.run(data);
  }
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(
    @User() user: UserDto,
    @Body() data: LoginDto,
  ): Promise<{ user: UserDto; accessToken: string }> {
    return await this.authLoginUseCase.run(user);
  }

  @Auth()
  @Get('profile')
  async profile(@User() user: UserDto): Promise<UserDto> {
    return user;
  }
}
