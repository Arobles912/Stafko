import { LoginDto } from "../domain/dto/login.dto";
import { RegisterDto } from "../domain/dto/register.dto";

export interface IAuthService {
  register(registerDto: RegisterDto): Promise<{ message: string }>;
  login(loginDto: LoginDto): Promise<{ token: string; username: string }>;
}
