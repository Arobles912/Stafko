import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffProjectEntity } from './domain/entities/staff_project.entity';
import { StaffProjectController } from './infrastructure/staff_project.controller';
import { StaffProjectService } from './application/staff_project.service';
import { StaffProjectRepository } from './domain/repositories/staff_project.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StaffProjectEntity])],
  controllers: [StaffProjectController],
  providers: [
    StaffProjectService,
    {
      provide: 'StaffProjectRepository',
      useClass: StaffProjectRepository,
    },
  ],
  exports: [StaffProjectService],
})
export class StaffProjectModule {}
