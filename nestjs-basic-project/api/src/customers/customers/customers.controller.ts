import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from "@nestjs/swagger";
import { CustomersService } from "./customers.service";
import { CustomersDto } from "../dto/customers/customers.dto";

@ApiTags("customers")
@Controller("api/customers")
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
  @ApiResponse({ status: 500, description: "Internal server error" })
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
  @ApiResponse({ status: 500, description: "Internal server error" })
  async findAll() {
    return this.customersService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: "Gets a customer specified by the ID" })
  @ApiResponse({
    status: 200,
    description: "The customer specified by the ID",
    type: CustomersDto,
  })
  @ApiResponse({ status: 404, description: "Customer not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async findOne(@Param("id") id: number) {
    return this.customersService.findOne(id);
  }

  @Put(":id")
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
  @ApiResponse({ status: 400, description: "Bad request" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async update(@Param("id") id: number, @Body() customersDto: CustomersDto) {
    return this.customersService.update(id, customersDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: "Deletes the customer specified by the ID" })
  @ApiResponse({ status: 200, description: "Customer successfully deleted" })
  @ApiResponse({ status: 404, description: "Customer not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async remove(@Param("id") id: number) {
    return this.customersService.remove(id);
  }

  @Get("customername/:customer_name")
  @ApiOperation({ summary: "Gets a customer specified by the name" })
  @ApiResponse({
    status: 200,
    description: "The customer specified by the name",
    type: CustomersDto,
  })
  @ApiResponse({ status: 404, description: "Customer not found" })
  @ApiResponse({ status: 500, description: "Internal server error" })
  async findByCustomerName(@Param("customer_name") customer_name: string) {
    return this.customersService.findByCustomerName(customer_name);
  }
}
