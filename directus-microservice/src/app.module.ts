import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { StaffService } from 'staff_api/src/application/staff.service';
import { ProjectsService } from 'projects_api/src/application/projects.service';
import { StaffProjectService } from 'staff_project_api/src/application/staff_project.service';
import { CustomersService } from 'customers_api/src/application/customers.service';
import { DirectusService } from './directus/directus.service';

@Module({
  imports: [],
  controllers: [AppController],
  providers: [AppService, StaffService, ProjectsService, StaffProjectService, CustomersService, DirectusService],
  exports: [AppService, StaffService, ProjectsService, StaffProjectService, CustomersService, DirectusService]
})
export class AppModule {}
