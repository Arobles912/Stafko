import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { StaffService } from "src/staff/application/staff.service";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
import { ApiResponse, ApiTags, ApiOperation, ApiBody, ApiUnauthorizedResponse, ApiBadRequestResponse } from '@nestjs/swagger';

@ApiTags('Auth')
@Injectable()
export class AuthService {
  constructor(
    private readonly staffService: StaffService,
    private readonly jwtService: JwtService
  ) {}

  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({ type: RegisterDto, description: 'User registration data' })
  @ApiResponse({ status: 201, description: 'User created successfully' })
  @ApiBadRequestResponse({ description: 'Username already exists or invalid data provided' })
  async register({ username, pass, email }: RegisterDto) {
    const user = await this.staffService.findOneByUsername(username);

    if (user) {
      throw new BadRequestException("Username already exists.");
    }

    const hashedPassword = await bcryptjs.hash(pass, 10);

    await this.staffService.create({
      username,
      pass: hashedPassword,
      email
    });

    return {
      message: "User created successfully.",
    };
  }

  @ApiOperation({ summary: 'Login user' })
  @ApiBody({ type: LoginDto, description: 'User login data' })
  @ApiResponse({ status: 200, description: 'User authenticated' })
  @ApiUnauthorizedResponse({ description: 'Invalid username or password' })
  async login({ username, pass }: LoginDto) {
    const user = await this.staffService.findOneByUsername(username);

    if (!user) {
      throw new UnauthorizedException("Invalid username.");
    }

    const isPasswordValid = await bcryptjs.compare(pass, user.pass);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password.");
    }
    const payload = { username: user.username };

    const token = await this.jwtService.signAsync(payload);
    return {
      token: token,
      username: user.username,
    };
  }
}
