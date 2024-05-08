import { Inject, Injectable } from "@nestjs/common";
import { LoginDto } from "../domain/dto/login.dto";
import { RegisterDto } from "../domain/dto/register.dto";
import { ApiResponse, ApiTags, ApiOperation, ApiBody, ApiUnauthorizedResponse, ApiBadRequestResponse } from '@nestjs/swagger';
import { IAuthService } from "./auth.service.interface";
import { IAuthRepository } from "../domain/repositories/auth.repository.interface";

@ApiTags('Auth')
@Injectable()
export class AuthService implements IAuthService {
  constructor(
    @Inject('AuthRepository')
    private readonly authRepository: IAuthRepository,
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto, description: 'User registration data' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBadRequestResponse({ description: 'Username already exists or invalid data provided' })

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    return this.authRepository.register(registerDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto, description: 'User login data' })
  @ApiResponse({ status: 200, description: 'User authenticated' })
  @ApiUnauthorizedResponse({ description: 'Invalid username or password' })
  async login(loginDto: LoginDto): Promise<{ token: string; username: string }> {
    return this.authRepository.login(loginDto);
  }
}
