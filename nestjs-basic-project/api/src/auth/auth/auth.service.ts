import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcryptjs from "bcryptjs";
import { StaffService } from "src/staff/staff/staff.service";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly staffService: StaffService,
    private readonly jwtService: JwtService
  ) {}


  async register({ username, pass, email }: RegisterDto) {
    const user = await this.staffService.findOneByUserName(username);

    if (user) {
      throw new BadRequestException("Username already exists");
    }

    const hashedPassword = await bcryptjs.hash(pass, 10);

    await this.staffService.create({
      username,
      pass: hashedPassword,
      email
    });

    return {
      message: "User created successfully",
    };
  }

  async login({ username, pass }: LoginDto) {
    const user = await this.staffService.findOneByUserName(username);

    if (!user) {
      throw new UnauthorizedException("Invalid user");
    }

    const isPasswordValid = await bcryptjs.compare(pass, user.pass);

    if (!isPasswordValid) {
      throw new UnauthorizedException("Invalid password");
    }
    const payload = { username: user.username };

    const token = await this.jwtService.signAsync(payload);
    return {
      token: token,
      username: user.username,
    };
  }
}
