import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { LoginDto } from '../domain/dto/login.dto';
import { RegisterDto } from '../domain/dto/register.dto';
import { AuthService } from '../application/auth.service'; 

@Controller('api/auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, 
  ) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDto) {
    try {
      await this.authService.register(registerDto);
      return { message: 'User registered successfully' };
    } catch (error) {
      return { message: 'Registration failed' };
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const { token, username } = await this.authService.login(loginDto);
      return { token, username };
    } catch (error) {
      return { message: 'Login failed' };
    }
  }
}
