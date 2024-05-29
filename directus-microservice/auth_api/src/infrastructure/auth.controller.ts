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
import { RefreshDto } from '../domain/dto/refresh.dto';
import { AuthService } from '../application/auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { GlobalService } from 'src/shared/global.service';

@Controller('api/auth')
@ApiTags('Authentication')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto })
  @ApiResponse({
    status: 201,
    description: 'User registered successfully',
    type: RegisterDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Registration failed unexpectedly.',
  })
  async register(@Body() registerDto: RegisterDto) {
    try {
      const result = await this.authService.register(registerDto);
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException('Registration failed unexpectedly.');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('login')
  @ApiOperation({ summary: 'Log in a user' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({
    status: 200,
    description: 'User logged in successfully',
    type: LoginDto,
  })
  @ApiResponse({
    status: 401,
    description: 'Login failed unexpectedly.',
  })
  async login(@Body() loginDto: LoginDto) {
    try {
      const result = await this.authService.login(loginDto);
      return result;
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Login failed unexpectedly.');
    }
  }

  @HttpCode(HttpStatus.OK)
  @Post('refresh')
  @ApiOperation({ summary: 'Refresh authentication token' })
  @ApiBody({ type: RefreshDto })
  @ApiResponse({
    status: 200,
    description: 'Token refreshed successfully',
  })
  @ApiResponse({
    status: 401,
    description: 'Token refresh failed unexpectedly.',
  })
  async refreshToken(@Body() refreshDto: RefreshDto) {
    try {
      await this.authService.refreshToken(refreshDto);
      return {
        data: {
          access_token: GlobalService.token,
          refresh_token: GlobalService.refreshToken,
        },
      };
    } catch (error) {
      if (error instanceof UnauthorizedException) {
        throw error;
      }
      throw new UnauthorizedException('Token refresh failed unexpectedly.');
    }
  }
}
