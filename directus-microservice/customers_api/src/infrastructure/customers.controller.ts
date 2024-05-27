import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
} from '@nestjs/common';
import { CustomersService } from '../application/customers.service';
import { CustomersDto } from '../domain/dto/customers/customers.dto';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  @ApiOperation({ summary: "Creates a new customer" })
  @ApiBody({
    type: CustomersDto,
    description: "Body of the customer with all the data fields",
  })
  @ApiResponse({ status: 201, description: "The created customer" })
  @ApiResponse({ status: 400, description: "Bad request" })
  async create(@Body() customersDto: CustomersDto) {
    return this.customersService.create(customersDto);
  }

  @Get()
  @ApiOperation({ summary: "Gets all the customers in the database" })
  @ApiResponse({
    status: 200,
    description: "An array with all the customers",
    type: [CustomersDto],
  })
  async findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: "Gets a customer specified by the ID" })
  @ApiParam({ name: 'id', description: 'The customer ID.' }) 
  @ApiResponse({
    status: 200,
    description: "The customer specified by the ID",
    type: CustomersDto,
  })
  @ApiResponse({ status: 404, description: "Customer not found" })
  async findOne(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: "Updates a customer specified by the ID" })
  @ApiBody({
    type: CustomersDto,
    description: "The fields to update of the specified customer",
  })
  @ApiResponse({
    status: 200,
    description: "The updated customer",
    type: CustomersDto,
  })
  @ApiResponse({ status: 404, description: "Customer not found" })
  async update(@Param('id') id: number, @Body() customersDto: CustomersDto) {
    return this.customersService.update(id, customersDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: "Deletes the customer specified by the ID" })
  @ApiParam({ name: 'id', description: 'The customer ID.' })
  @ApiResponse({ status: 200, description: "Customer successfully deleted" })
  @ApiResponse({ status: 404, description: "Customer not found" })
  async remove(@Param('id') id: number) {
    return this.customersService.remove(id);
  }

  @Get('customername/:customer_name')
  @ApiOperation({ summary: "Gets a customer specified by the name" })
  @ApiParam({ name: 'customer name', description: 'Customer name.' })
  @ApiResponse({
    status: 200,
    description: "The customer specified by the name",
    type: CustomersDto,
  })
  @ApiResponse({ status: 404, description: "Customer not found" })
  async findByCustomerName(@Param('customer_name') customer_name: string) {
    return this.customersService.findByCustomerName(customer_name);
  }
}
