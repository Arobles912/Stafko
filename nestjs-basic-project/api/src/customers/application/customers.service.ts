import { Inject, Injectable } from '@nestjs/common';
import { CustomersEntity } from '../domain/entities/customers.entity';
import { CustomersDto } from '../domain/dto/customers/customers.dto';
import { ICustomersService } from './customers.service.interface';
import { CustomersRepository } from '../domain/repositories/customers.repository';

@Injectable()
export class CustomersService implements ICustomersService {
    constructor(
      @Inject('CustomersRepository')
        private customersRepository: CustomersRepository,
      ) {}
    
      async create(customersDto: CustomersDto): Promise<CustomersEntity> {
        return this.customersRepository.create(customersDto);
      }
    
      async findAll(): Promise<CustomersEntity[]> {
        return this.customersRepository.findAll();
      }
    
      async findOne(id: number): Promise<CustomersEntity> {
        return this.customersRepository.findOne(id);
      }
    
      async update(id: number, customersDto: CustomersDto): Promise<CustomersEntity> {
        return this.customersRepository.update(id, customersDto);
      }
      
      async remove(id: number): Promise<void> {
        return this.customersRepository.remove(id);
      }
    
      async findByCustomerName(customer_name: string): Promise<CustomersEntity> {
        return this.customersRepository.findByCustomerName(customer_name);
      }
}