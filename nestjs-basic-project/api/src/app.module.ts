import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ProjectsModule } from "./projects/projects.module";
import { StaffModule } from "./staff/staff.module";
import { AuthModule } from "./auth/auth.module";
import { StaffProjectModule } from "./staff_project/staff_project.module";
import { CustomersModule } from './customers/customers.module';
import config from "./config";
import * as dotenv from "dotenv";
import { MulterModule } from '@nestjs/platform-express';

dotenv.config();

@Module({
  imports: [
    ProjectsModule,
    StaffModule,
    AuthModule,
    StaffProjectModule,
    CustomersModule,
    TypeOrmModule.forRoot({
      type: config.dbType,
      host: config.dbHost,
      port: config.dbPort,
      username: config.dbUsername,
      password: config.dbPassword,
      database: config.dbName,
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
