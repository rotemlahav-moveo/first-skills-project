import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignupDto } from './dto/signup.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {} //authService is the service that handles the authentication logic

  @Post('signup')
  // default status code is 201 (Created)
  async signup(@Body() payload: SignupDto) { //payload is the data that is sent to the signup endpoint
    const user = await this.authService.signup(payload);
    return {
      message: 'Signup successful',
      user,
    };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK) //HttpStatus.OK (200) is the status code that is returned when the login is successful
  async login(@Body() payload: LoginDto) {
    const user = await this.authService.login(payload);
    return {
      message: 'Login successful',
      user,
    };
  }
}
