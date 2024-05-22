import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersEntity } from './domain/entities/customers.entity';
import { CustomersController } from './infrastructure/customers.controller';
import { CustomersService } from './application/customers.service';
import { CustomersRepository } from './domain/repositories/customers.repository';
import { DirectusService } from 'src/shared/directus/directus.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomersEntity, CustomersRepository])],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    {
      provide: 'CustomersRepository',
      useClass: CustomersRepository,
    },
    DirectusService
  ],
})
export class CustomersModule {}
