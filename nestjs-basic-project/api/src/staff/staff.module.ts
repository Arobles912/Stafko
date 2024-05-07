import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from './domain/entities/staff.entity';
import { StaffController } from './infrastructure/staff.controller';
import { StaffService } from './application/staff.service';
import { StaffRepository } from './domain/repositories/staff.repository';

@Module({
  imports: [TypeOrmModule.forFeature([StaffEntity])],
  controllers: [StaffController],
  providers: [
    StaffService,
    {
      provide: 'StaffRepository',
      useClass: StaffRepository,
    },
  ],
  exports: [StaffService, 'StaffRepository'],
})
export class StaffModule {}

