import { Module } from "@nestjs/common";
import { AuthController } from "./infrastructure/auth.controller";
import { StaffModule } from "staff_api/src/staff.module";
import { AuthService } from "./application/auth.service";
import { JwtModule } from "@nestjs/jwt";
import { jwtConstants } from "./infrastructure/constants/jwt.constant";
import { AuthRepository } from "./domain/repositories/auth.repository";
import { DirectusService } from "src/shared/directus/directus.service";

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
    DirectusService

  ], 
})
export class AuthModule {}
