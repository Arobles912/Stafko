import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersEntity } from './domain/entities/customers.entity';
import { CustomersController } from './infrastructure/customers.controller';
import { CustomersService } from './application/customers.service';
import { CustomersRepository } from './domain/repositories/customers.repository';

@Module({
  imports: [TypeOrmModule.forFeature([CustomersEntity, CustomersRepository])],
  controllers: [CustomersController],
  providers: [
    CustomersService,
    {
      provide: 'CustomersRepository',
      useClass: CustomersRepository,
    },
  ],
})
export class CustomersModule {}
