import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
import { StaffService } from "src/staff/application/staff.service";
import { IAuthRepository } from "./auth.repository.interface";
import { StaffEntity } from "src/staff/domain/entities/staff.entity";

@Injectable()
export class AuthRepository implements IAuthRepository {
  constructor(
    private readonly staffService: StaffService,
    private readonly jwtService: JwtService
  ) {}

  async register(registerDto: RegisterDto): Promise<{ message: string }> {
    const { username, pass, email } = registerDto;

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

    return { message: "User created successfully." };
  }

  async login(loginDto: LoginDto): Promise<{ token: string; username: string }> {
    const { username, pass } = loginDto;
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

  async findOneByUsername(username: string): Promise<StaffEntity> {
    return this.staffService.findOneByUsername(username);
  }
}
