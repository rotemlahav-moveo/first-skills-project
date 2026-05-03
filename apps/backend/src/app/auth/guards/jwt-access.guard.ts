import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import type { Request } from 'express';
import type { AuthUserPayload } from '../types/authenticated-request';

@Injectable() // makes the guard available to be injected into other modules
export class JwtAccessGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly config: ConfigService,
  ) {}

  // canActivate is a method that checks if the user is authenticated
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const header = request.headers.authorization;
    if (!header?.startsWith('Bearer ')) {
      throw new UnauthorizedException('Missing bearer token');
    }
    const token = header.slice('Bearer '.length).trim();
    if (!token) {
      throw new UnauthorizedException('Missing bearer token');
    }
    const secret = this.config.get<string>('JWT_ACCESS_SECRET', 'dev-access-secret');
    try {
      const payload = await this.jwtService.verifyAsync<{ sub: string }>(token, { secret });
      const user: AuthUserPayload = { userId: payload.sub };
      (request as Request & { user: AuthUserPayload }).user = user;
      return true;
    } catch {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }
}
