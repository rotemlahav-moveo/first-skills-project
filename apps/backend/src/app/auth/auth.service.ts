import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';
import { UserEntity } from './entities/user.entity';

// AuthResult is the type of the result that is returned when the signup or login is successful
interface AuthResult {
  userId: string;
  email: string;
}

@Injectable() 
export class AuthService { 
  constructor(
    @InjectRepository(UserEntity) 
    private readonly usersRepository: Repository<UserEntity>,
  ) {} // accessing the usersRepository to interact with the users table in the database

  
  async signup(payload: SignupDto): Promise<AuthResult> {
    const email = this.normalizeAndValidateEmail(payload.email); // validate the email
    this.validatePassword(payload.password); // validate the password

    const existing = await this.usersRepository.findOne({ // check if the email is already in use
      where: { email },
    });
    if (existing) {
      throw new ConflictException('Email is already in use');
    }

    const user = this.usersRepository.create({ // create a new user
      email,
      passwordHash: this.hashPassword(payload.password), // hash the password
    });

    const created = await this.usersRepository.save(user); // save the new user to the database
    return { userId: created.id, email: created.email };
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

    return { userId: user.id, email: user.email };
  }

  // validation functions //
  //----------------------//
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

  private hashPassword(password: string): string {
    const salt = randomBytes(16).toString('hex');
    const hash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${hash}`;
  }

  private verifyPassword(password: string, storedHash: string): boolean {
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash) {
      return false;
    }

    const derived = scryptSync(password, salt, 64);
    const bufferHash = Buffer.from(hash, 'hex');
    if (bufferHash.length !== derived.length) {
      return false;
    }

    return timingSafeEqual(bufferHash, derived);
  }
}
