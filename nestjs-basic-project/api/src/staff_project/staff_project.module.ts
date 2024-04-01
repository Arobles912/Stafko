import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffProjectController } from './staff_project/staff_project.controller';
import { StaffProjectService } from './staff_project/staff_project.service';
import { StaffProjectEntity } from './entity/staff_project.entity/staff_project.entity';
@Module({
  imports: [TypeOrmModule.forFeature([StaffProjectEntity])],
  controllers: [StaffProjectController],
  providers: [StaffProjectService],
  exports: [StaffProjectService]
})
export class StaffProjectModule {}
