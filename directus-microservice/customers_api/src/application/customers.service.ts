import { Injectable } from '@nestjs/common';
import { CustomersEntity } from '../domain/entities/customers.entity';
import { CustomersDto } from '../domain/dto/customers/customers.dto';
import { DirectusService } from 'src/shared/directus/directus.service';
import { ICustomersService } from './customers.service.interface';

@Injectable()
export class CustomersService implements ICustomersService {
  constructor(private readonly directusService: DirectusService) {}

  async create(customersDto: CustomersDto): Promise<CustomersEntity> {
    const response = await this.directusService.createItem('customers', customersDto);
    return response.data as CustomersEntity;
  }

  async findAll(): Promise<CustomersEntity[]> {
    const response = await this.directusService.getItems('customers');
    return response.data as CustomersEntity[];
  }

  async findOne(id: number): Promise<CustomersEntity> {
    const response = await this.directusService.getItem('customers', id);
    return response.data as CustomersEntity;
  }

  async update(id: number, customersDto: CustomersDto): Promise<CustomersEntity> {
    const response = await this.directusService.updateItem('customers', id, customersDto);
    return response.data as CustomersEntity;
  }

  async remove(id: number): Promise<void> {
    await this.directusService.deleteItem('customers', id);
  }

  async findByCustomerName(customer_name: string): Promise<CustomersEntity> {
    const response = await this.directusService.getItems('customers');
    const items: CustomersEntity[] = response.data as CustomersEntity[];
    const customerSelected = items.find((customer) => customer.customer_name === customer_name);

    return customerSelected || null;
  }
}
