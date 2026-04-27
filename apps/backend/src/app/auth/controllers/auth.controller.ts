import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import type { AuthResponse } from '../../../../../../libs/shared/auth-contracts/src';
import { LoginDto, RefreshTokenDto, SignupDto } from '../dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  // authService handles the authentication business logic
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  // Default status code is 201 (Created)
  async signup(@Body() payload: SignupDto): Promise<AuthResponse> {
    const result = await this.authService.signup(payload);
    return this.toAuthResponse('Signup successful', result);
  }

  @Post('login')
  // Override POST default to 200 for login responses
  @HttpCode(HttpStatus.OK)
  async login(@Body() payload: LoginDto): Promise<AuthResponse> {
    const result = await this.authService.login(payload);
    return this.toAuthResponse('Login successful', result);
  }
  // refresh the tokens when the access token is expired
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() payload: RefreshTokenDto): Promise<AuthResponse> {
    const result = await this.authService.refreshTokens(payload);
    return this.toAuthResponse('Token refresh successful', result);
  }

  private toAuthResponse(
    message: string,
    result: Awaited<ReturnType<AuthService['signup']>>,
  ): AuthResponse {
    return {
      message,
      user: {
        userId: result.userId,
        name: result.name,
        email: result.email,
      },
      tokens: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    };
  }
}
