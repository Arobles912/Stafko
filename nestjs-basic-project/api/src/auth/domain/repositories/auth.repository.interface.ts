import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
import { StaffEntity } from "src/staff/domain/entities/staff.entity";

export interface IAuthRepository {
  register(registerDto: RegisterDto): Promise<{ message: string }>;
  login(loginDto: LoginDto): Promise<{ token: string; username: string }>;
  findOneByUsername(username: string): Promise<StaffEntity>;
}