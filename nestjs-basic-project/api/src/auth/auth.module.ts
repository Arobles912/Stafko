import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { StaffModule } from "src/staff/staff.module";
import { AuthService } from "./auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./constants/jwt.constant";

@Module({
  imports: [
    StaffModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: "1d" },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService], 
})
export class AuthModule {}
