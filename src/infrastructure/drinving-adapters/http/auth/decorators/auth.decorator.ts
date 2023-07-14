import { applyDecorators, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
// import { ACGuard, Role, UseRoles } from 'nest-access-control';
import { JwtAuthGuard } from '../guards/jwt.auth.guard';

export function Auth() {
  return applyDecorators(UseGuards(JwtAuthGuard), ApiBearerAuth());

  // UseRoles(...roles),
  // ApiBearerAuth(),
}
