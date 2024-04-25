import { Module } from '@nestjs/common';
import { CustomersController } from './customers/customers.controller';
import { CustomersService } from './customers/customers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomersEntity } from './entity/customers.entity/customers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CustomersEntity])],
  controllers: [CustomersController],
  providers: [CustomersService]
})
export class CustomersModule {}
