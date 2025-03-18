import { AuthenticatedRequest } from '@/types/request.types';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@prisma/client';

export const Authorized = createParamDecorator(
  (data: keyof User, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    return data ? user[data] : user;
  },
);
