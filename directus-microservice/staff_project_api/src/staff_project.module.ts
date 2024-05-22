import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffProjectEntity } from './domain/entities/staff_project.entity';
import { StaffProjectController } from './infrastructure/staff_project.controller';
import { StaffProjectService } from './application/staff_project.service';
import { StaffProjectRepository } from './domain/repositories/staff_project.repository';
import { DirectusService } from 'src/shared/directus/directus.service';

@Module({
  imports: [TypeOrmModule.forFeature([StaffProjectEntity])],
  controllers: [StaffProjectController],
  providers: [
    StaffProjectService,
    {
      provide: 'StaffProjectRepository',
      useClass: StaffProjectRepository,
    },
    DirectusService
  ],
  exports: [StaffProjectService],
})
export class StaffProjectModule {}
