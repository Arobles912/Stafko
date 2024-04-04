import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProjectsModule } from "./projects/projects.module";
import { StaffModule } from "./staff/staff.module";
import { AuthModule } from "./auth/auth.module";
import { StaffProjectModule } from "./staff_project/staff_project.module";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    ProjectsModule,
    StaffModule,
    AuthModule,
    StaffProjectModule,
    TypeOrmModule.forRoot({
      type: "postgres",
      host: "localhost",
      port: 5432,
      username: "user",
      password: "password",
      database: "dbname",
      autoLoadEntities: true,
      synchronize: true,
    }),
    MulterModule.register({
      dest: './uploads', 
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
