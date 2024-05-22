import { Module } from '@nestjs/common';
import { ProjectsModule } from 'projects_api/src/projects.module';
import { TypeOrmModule } from "@nestjs/typeorm";
import { StaffModule } from 'staff_api/src/staff.module';
import { AuthModule } from 'auth_api/auth.module';
import config from './config';
import { StaffProjectModule } from 'staff_project_api/src/staff_project.module';
import { CustomersModule } from 'customers_api/src/customers.module';


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
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
