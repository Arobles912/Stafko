import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffEntity } from './domain/entities/staff.entity';
import { StaffController } from './infrastructure/staff.controller';
import { StaffService } from './application/staff.service';
import { StaffRepository } from './domain/repositories/staff.repository';
import { DirectusService } from 'src/shared/directus/directus.service';

@Module({
  imports: [TypeOrmModule.forFeature([StaffEntity])],
  controllers: [StaffController],
  providers: [
    StaffService,
    {
      provide: 'StaffRepository',
      useClass: StaffRepository,
    },
    DirectusService
  ],
  exports: [StaffService, 'StaffRepository'],
})
export class StaffModule {}

