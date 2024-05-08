import { Module } from "@nestjs/common";
import { AuthController } from "./infrastructure/auth.controller";
import { StaffModule } from "src/staff/staff.module";
import { AuthService } from "./application/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./infrastructure/constants/jwt.constant";
import { AuthRepository } from "./domain/repositories/auth.repository";

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
  providers: [
    AuthService,
    {
      provide: 'AuthRepository',
      useClass: AuthRepository,
    },

  ], 
})
export class AuthModule {}
