import { LoginDto } from "../dto/login.dto";
import { AuthService } from "./auth.service";
import { RegisterDto } from "../dto/register.dto";
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(registerDto: RegisterDto): Promise<{
        message: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        token: string;
        username: string;
    }>;
}
