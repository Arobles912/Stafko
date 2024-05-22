import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
import { StaffService } from "staff_api/src/application/staff.service";
import { IAuthRepository } from "./auth.repository.interface";
import { StaffEntity } from "staff_api/src/domain/entities/staff.entity";

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

  async login(loginDto: LoginDto): Promise<{ token: string; email: string }> {
    const { email, pass } = loginDto;
    const user = await this.staffService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException("Invalid email.");
    }

    const isPasswordValid = await bcryptjs.compare(pass, user.pass);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password.");
    }
    const payload = { email: user.email };

    const token = await this.jwtService.signAsync(payload);
    return {
      token: token,
      email: user.email,
    };
  }

  async findOneByEmail(email: string): Promise<StaffEntity> {
    return this.staffService.findOneByEmail(email);
  }
}
