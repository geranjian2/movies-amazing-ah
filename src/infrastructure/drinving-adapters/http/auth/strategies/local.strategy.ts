import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from 'src/application/uses-cases/auth/auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly auth: AuthService) {
    super({
      usernameField: 'email', // 'username'
      passwordField: 'password', // password
    });
  }
  async validate(email: string, password: string) {
    const user = await this.auth.validateUser(email, password);
    if (!user)
      throw new UnauthorizedException('Login user or Password Incorrect');
    return user;
  }
}
