import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { LoginDto } from '../domain/dto/login.dto';
import { RegisterDto } from '../domain/dto/register.dto';
import { DirectusService } from 'src/shared/directus/directus.service';
import { StaffService } from 'staff_api/src/application/staff.service';
import { RefreshDto } from '../domain/dto/refresh.dto';
import { IAuthService } from './auth.service.interface';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    private readonly directusService: DirectusService,
    private readonly staffService: StaffService,
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    try {
      await this.directusService.register(
        registerDto.email,
        registerDto.password,
        registerDto.first_name,
        registerDto.role,
      );

      await this.staffService.create({
        username: registerDto.first_name,
        pass: registerDto.password,
        email: registerDto.email,
      });

      return { message: 'User registered successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Registration failed unexpectedly.');
    }
  }

  async login(loginDto: LoginDto): Promise<any> {
    try {
      const response = await this.directusService.login(
        loginDto.email,
        loginDto.password,
      );
      return response;
    } catch (error) {
      if (error instanceof HttpException) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException('Login failed unexpectedly.');
    }
  }

  async refreshToken(refreshDto: RefreshDto): Promise<any> {
    try {
      await this.directusService.refreshToken(refreshDto.refreshToken);
      return { message: 'Token refreshed successfully' };
    } catch (error) {
      if (error instanceof HttpException) {
        throw new UnauthorizedException(error.message);
      }
      throw new UnauthorizedException('Token refresh failed unexpectedly.');
    }
  }
  
}
