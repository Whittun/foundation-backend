import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';

type AuthenticatedRequest = Request & {
  cookies: {
    accessToken?: string;
  };
  user?: {
    id: number;
  };
};

type JwtPayload = {
  sub: number;
  iat?: number;
  exp?: number;
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const token = request.cookies?.accessToken;

    if (!token) {
      throw new UnauthorizedException('missing token');
    }

    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token);

      request.user = {
        id: payload.sub,
      };
    } catch {
      throw new UnauthorizedException('token is not valid');
    }

    return true;
  }
}
