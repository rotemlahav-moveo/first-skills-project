import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import type { StringValue } from 'ms';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { Repository } from 'typeorm';
import { LoginDto, RefreshTokenDto, SignupDto } from '../dto';
import { UserEntity } from '../entities/user.entity';

// Returned payload shape for successful auth actions
interface AuthResult {
  userId: string;
  email: string;
  accessToken: string;
  refreshToken: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
  ) {} // usersRepository interacts with the users table

  async signup(payload: SignupDto): Promise<AuthResult> {
    const email = this.normalizeAndValidateEmail(payload.email);
    this.validatePassword(payload.password);

    // Ensure signup uses a unique email
    const existing = await this.usersRepository.findOne({
      where: { email },
    });
    if (existing) {
      throw new ConflictException('Email is already in use');
    }

    const user = this.usersRepository.create({
      email,
      // Store only a hashed password, never plain text
      passwordHash: this.hashPassword(payload.password),
      refreshTokenHash: null,
    });

    const created = await this.usersRepository.save(user);
    return this.createAuthResult(created);
  }

  async login(payload: LoginDto): Promise<AuthResult> {
    const email = this.normalizeAndValidateEmail(payload.email);
    this.validatePassword(payload.password);

    const user = await this.usersRepository.findOne({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isValidPassword = this.verifyPassword(
      payload.password,
      user.passwordHash,
    );
    if (!isValidPassword) {
      throw new UnauthorizedException('Invalid email or password');
    }

    return this.createAuthResult(user);
  }

  // refresh the tokens 
  async refreshTokens(payload: RefreshTokenDto): Promise<AuthResult> {
    const userId = payload.userId?.trim();
    const refreshToken = payload.refreshToken?.trim();
    if (!userId || !refreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const user = await this.usersRepository.findOne({ // find the user by the id
      where: { id: userId },
    });
    if (!user?.refreshTokenHash) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    const isValidRefreshToken = this.verifyHash( // verify the refresh token
      refreshToken,
      user.refreshTokenHash,
    );
    if (!isValidRefreshToken) {
      throw new UnauthorizedException('Invalid refresh token');
    }

    return this.createAuthResult(user);
  }

  // validation helpers //
  //--------------------//
  private normalizeAndValidateEmail(rawEmail: string): string {
    const email = rawEmail?.trim().toLowerCase();
    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      throw new BadRequestException('A valid email is required');
    }
    return email;
  }

  private validatePassword(password: string): void {
    if (!password || password.length < 8) {
      throw new BadRequestException(
        'Password is required and must be at least 8 characters long',
      );
    }
  }
  // create the auth result - jwt
  private async createAuthResult(user: UserEntity): Promise<AuthResult> {
    const accessSecret = process.env.JWT_ACCESS_SECRET || 'dev-access-secret';
    const accessExpiresIn = process.env.JWT_ACCESS_EXPIRES_IN || '15m';
    const refreshSecret = process.env.JWT_REFRESH_SECRET || 'dev-refresh-secret';
    const refreshExpiresIn = process.env.JWT_REFRESH_EXPIRES_IN || '7d';

    const jwtPayload = { sub: user.id, email: user.email };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: accessSecret,
        expiresIn: accessExpiresIn as StringValue | number,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: refreshSecret,
        expiresIn: refreshExpiresIn as StringValue | number,
      }),
    ]);
    // update the user's refresh token hash in the database
    await this.usersRepository.update(
      { id: user.id },
      { refreshTokenHash: this.hashSecret(refreshToken) },
    );

    return { // return the user's id, email, access token, and refresh token to the controller
      userId: user.id,
      email: user.email,
      accessToken,
      refreshToken,
    };
  }

  private hashPassword(password: string): string {
    return this.hashSecret(password);
  }

  private hashSecret(secret: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(secret, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }

  private verifyPassword(password: string, storedHash: string): boolean {
    return this.verifyHash(password, storedHash);
  }

  private verifyHash(secret: string, storedHash: string): boolean {
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash) {
      return false;
    }

    const derived = scryptSync(secret, salt, 64);
    const bufferHash = Buffer.from(hash, 'hex');
    if (bufferHash.length !== derived.length) {
      return false;
    }

    return timingSafeEqual(bufferHash, derived);
  }
}
