import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
import { StaffEntity } from "staff_api/src/domain/entities/staff.entity";

export interface IAuthRepository {
  register(registerDto: RegisterDto): Promise<{ message: string }>;
  login(loginDto: LoginDto): Promise<{ token: string; email: string }>;
  findOneByEmail(username: string): Promise<StaffEntity>;
}