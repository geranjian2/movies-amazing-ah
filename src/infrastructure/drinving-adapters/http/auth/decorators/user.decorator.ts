import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from 'src/domain/dtos';

export const User = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    const user = request.user;
    return data ? user && user[data] : new UserDto(user);
  },
);
