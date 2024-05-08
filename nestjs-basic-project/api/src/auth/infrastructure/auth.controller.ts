import { Body, Controller, HttpCode, HttpStatus, Inject, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LoginDto } from "../domain/dto/login.dto";
import { RegisterDto } from "../domain/dto/register.dto";
import { IAuthService } from "../application/auth.service.interface";

@ApiTags('Auth')
@Controller("api/auth")
export class AuthController {
  constructor(
    @Inject('AuthRepository')
    private readonly authService: IAuthService) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto, description: 'User registration data' })
  @ApiResponse({ status: HttpStatus.CREATED, description: 'User registered successfully'})
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad request' })
  @Post("register")
  async register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto, description: 'User login data' })
  @ApiResponse({ status: HttpStatus.OK, description: 'User authenticated'})
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'Invalid credentials' })
  @HttpCode(HttpStatus.OK)
  @Post("login")
  async login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
