import { Inject, Injectable } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';
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
    
      @ApiOperation({ summary: 'Creates a new customer' })
      @ApiBody({ type: CustomersDto, description: 'Body of the customer with all the data fields' })
      @ApiCreatedResponse({ description: 'The created customer' })
      @ApiBadRequestResponse({ description: 'Bad request' })
      @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    
      async create(customersDto: CustomersDto): Promise<CustomersEntity> {
        return this.customersRepository.create(customersDto);
      }
    
      @ApiOperation({ summary: 'Gets all the customers in the database' })
      @ApiOkResponse({ description: 'An array with all the customers', type: [CustomersEntity] })
      @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    
      async findAll(): Promise<CustomersEntity[]> {
        return this.customersRepository.findAll();
      }
    
      @ApiOperation({ summary: 'Gets a customer specified by the ID' })
      @ApiOkResponse({ description: 'The customer specified by the ID', type: CustomersEntity })
      @ApiNotFoundResponse({ description: 'Customer not found' })
      @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    
      async findOne(id: number): Promise<CustomersEntity> {
        return this.customersRepository.findOne(id);
      }
      
      @ApiOperation({ summary: 'Updates a customer specified by the ID' })
      @ApiBody({ type: CustomersDto, description: 'The fields to update of the specified customer' })
      @ApiOkResponse({ description: 'The updated customer', type: CustomersEntity })
      @ApiNotFoundResponse({ description: 'Customer not found' })
      @ApiBadRequestResponse({ description: 'Bad request' })
      @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    
      async update(id: number, customersDto: CustomersDto): Promise<CustomersEntity> {
        return this.customersRepository.update(id, customersDto);
      }
    
      @ApiOperation({ summary: 'Deletes the customer specified by the ID' })
      @ApiOkResponse({ description: 'Customer successfully deleted' })
      @ApiNotFoundResponse({ description: 'Customer not found' })
      @ApiInternalServerErrorResponse({ description: 'Internal server error' })
      
      async remove(id: number): Promise<void> {
        return this.customersRepository.remove(id);
      }

      @ApiOperation({ summary: 'Gets a customer specified by the name' })
      @ApiOkResponse({ description: 'The customer specified by the name', type: CustomersEntity })
      @ApiNotFoundResponse({ description: 'Customer not found' })
      @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    
      async findByCustomerName(customer_name: string): Promise<CustomersEntity> {
        return this.customersRepository.findByCustomerName(customer_name);
      }
}