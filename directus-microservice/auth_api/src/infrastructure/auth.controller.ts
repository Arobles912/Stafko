import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  BadRequestException,
  UnauthorizedException,
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
      const result = await this.authService.register(registerDto);
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;  
      }
      throw new BadRequestException('Registration failed unexpectedly');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;  
      }
      throw new UnauthorizedException('Login failed unexpectedly');
    }
  }
}
