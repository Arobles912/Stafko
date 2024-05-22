import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { CustomersService } from '../application/customers.service';
import { CustomersDto } from '../domain/dto/customers/customers.dto';

@Controller('api/customers')
export class CustomersController {
  constructor(private readonly customersService: CustomersService) {}

  @Post()
  async create(@Body() customersDto: CustomersDto) {
    return this.customersService.create(customersDto);
  }

  @Get()
  async findAll() {
    return this.customersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.customersService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() customersDto: CustomersDto) {
    return this.customersService.update(id, customersDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.customersService.remove(id);
  }

  @Get('customername/:customer_name')
  async findByCustomerName(@Param('customer_name') customer_name: string) {
    return this.customersService.findByCustomerName(customer_name);
  }
}
