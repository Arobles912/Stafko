import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from './entity/staff.entity/staff.entity';
import { StaffController } from './staff/staff.controller';
import { StaffService } from './staff/staff.service';


@Module({
  imports: [TypeOrmModule.forFeature([StaffEntity])],
  controllers: [StaffController],
  providers: [StaffService]
})
export class StaffModule {}
