import { LoginDto } from "../domain/dto/login.dto";
import { RefreshDto } from "../domain/dto/refresh.dto";
import { RegisterDto } from "../domain/dto/register.dto";

export interface IAuthService {
  register(registerDto: RegisterDto): Promise<{ message: string }>;
  login(loginDto: LoginDto): Promise<any>;
  refreshToken(refreshToken: RefreshDto) : Promise<any>;
}
