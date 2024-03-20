import { JwtService } from "@nestjs/jwt";
import { StaffService } from "src/staff/staff/staff.service";
import { LoginDto } from "../dto/login.dto";
import { RegisterDto } from "../dto/register.dto";
export declare class AuthService {
    private readonly staffService;
    private readonly jwtService;
    constructor(staffService: StaffService, jwtService: JwtService);
    register({ username, pass, email }: RegisterDto): Promise<{
        message: string;
    }>;
    login({ username, pass }: LoginDto): Promise<{
        token: string;
        username: string;
    }>;
}
