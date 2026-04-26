import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { LoginDto, RefreshTokenDto, SignupDto } from '../dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  // authService handles the authentication business logic
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  // Default status code is 201 (Created)
  async signup(@Body() payload: SignupDto) {
    const result = await this.authService.signup(payload);
    return {
      message: 'Signup successful',
      user: {
        userId: result.userId,
        email: result.email,
      },
      tokens: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    };
  }

  @Post('login')
  // Override POST default to 200 for login responses
  @HttpCode(HttpStatus.OK)
  async login(@Body() payload: LoginDto) {
    const result = await this.authService.login(payload);
    return {
      message: 'Login successful',
      user: {
        userId: result.userId,
        email: result.email,
      },
      tokens: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    };
  }
  // refresh the tokens when the access token is expired
  @Post('refresh')
  @HttpCode(HttpStatus.OK)
  async refresh(@Body() payload: RefreshTokenDto) {
    const result = await this.authService.refreshTokens(payload);
    return {
      message: 'Token refresh successful',
      user: {
        userId: result.userId,
        email: result.email,
      },
      tokens: {
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
    };
  }
}
