import { Injectable } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomersEntity } from '../entity/customers.entity/customers.entity';
import { Repository } from 'typeorm';
import { CustomersDto } from '../dto/customers/customers.dto';

@Injectable()
export class CustomersService {
    constructor(
        @InjectRepository(CustomersEntity)
        private customersRepository: Repository<CustomersEntity>,
      ) {}
    
      @ApiOperation({ summary: 'Creates a new customer' })
      @ApiBody({ type: CustomersDto, description: 'Body of the customer with all the data fields' })
      @ApiCreatedResponse({ description: 'The created customer' })
      @ApiBadRequestResponse({ description: 'Bad request' })
      @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    
      async create(customersDto: CustomersDto): Promise<CustomersEntity> {
        return this.customersRepository.save(customersDto);
      }
    
      @ApiOperation({ summary: 'Gets all the customers in the database' })
      @ApiOkResponse({ description: 'An array with all the customers', type: [CustomersEntity] })
      @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    
      async findAll(): Promise<CustomersEntity[]> {
        return this.customersRepository.find();
      }
    
      @ApiOperation({ summary: 'Gets a customer specified by the ID' })
      @ApiOkResponse({ description: 'The customer specified by the ID', type: CustomersEntity })
      @ApiNotFoundResponse({ description: 'Customer not found' })
      @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    
      async findOne(id: number): Promise<CustomersEntity> {
        return this.customersRepository.findOne({ where: { customer_id: id } });
      }
      
      @ApiOperation({ summary: 'Updates a customer specified by the ID' })
      @ApiBody({ type: CustomersDto, description: 'The fields to update of the specified customer' })
      @ApiOkResponse({ description: 'The updated customer', type: CustomersEntity })
      @ApiNotFoundResponse({ description: 'Customer not found' })
      @ApiBadRequestResponse({ description: 'Bad request' })
      @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    
      async update(id: number, projectDto: CustomersDto): Promise<CustomersEntity> {
        await this.customersRepository.update(id, projectDto);
        return this.findOne(id);
      }
    
      @ApiOperation({ summary: 'Deletes the customer specified by the ID' })
      @ApiOkResponse({ description: 'Customer successfully deleted' })
      @ApiNotFoundResponse({ description: 'Customer not found' })
      @ApiInternalServerErrorResponse({ description: 'Internal server error' })
      
      async remove(id: number): Promise<void> {
        await this.customersRepository.delete(id);
      }

      @ApiOperation({ summary: 'Gets a customer specified by the name' })
      @ApiOkResponse({ description: 'The customer specified by the name', type: CustomersEntity })
      @ApiNotFoundResponse({ description: 'Customer not found' })
      @ApiInternalServerErrorResponse({ description: 'Internal server error' })
    
      async findByProjectName(customer_name: string): Promise<CustomersEntity> {
        return this.customersRepository.findOneBy({ customer_name });
      }
}
