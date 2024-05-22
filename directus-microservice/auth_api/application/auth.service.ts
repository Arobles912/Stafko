import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from '../domain/dto/login.dto';
import { RegisterDto } from '../domain/dto/register.dto';
import { IAuthService } from './auth.service.interface';
import { DirectusService } from 'src/shared/directus/directus.service';

@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('AuthRepository')
    private readonly directusService: DirectusService, 
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    await this.directusService.register(registerDto.email, registerDto.pass, registerDto.username);
    return { message: 'User registered successfully' };
  }

  async login(loginDto: LoginDto): Promise<{ token: string; username: string }> {
    const { token, username } = await this.directusService.login(loginDto.email, loginDto.pass);
    return { token, username };
  }
}
