import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { StaffDto } from '../domain/dto/staff.dto/staff.dto';
import { StaffService } from '../application/staff.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('api/staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new staff member.' })
  @ApiBody({ type: StaffDto })
  @ApiResponse({ status: 200, description: 'Returns the created staff member.'})
  @ApiResponse({ status: 500, description: 'An error occurred while trying to create the staff member.' })
  async create(@Body() staffDto: StaffDto){
    return this.staffService.create(staffDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all staff members.' })
  @ApiResponse({ status: 200, description: 'Returns an array with all the staff members.'})
  async findAll(){
    return this.staffService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get staff member by ID.' })
  @ApiParam({ name: 'id', description: 'Staff member ID.' })
  @ApiResponse({ status: 200, description: 'Returns the staff member specified by the ID.' })
  @ApiResponse({ status: 404, description: 'Staff not found.' })
  async findOne(@Param('id') id: number){
    return this.staffService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update staff member by ID.' })
  @ApiParam({ name: 'id', description: 'Staff member ID.' })
  @ApiBody({ type: StaffDto })
  @ApiResponse({ status: 200, description: 'Returns the updated staff member specified by the ID.' })
  @ApiResponse({ status: 500, description: 'An error occurred while trying to update the staff member.' })
  async update(@Param('id') id: number, @Body() staffDto: StaffDto){
    return this.staffService.update(+id, staffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete staff member by ID.' })
  @ApiParam({ name: 'id', description: 'Staff member ID.' })
  @ApiResponse({ status: 204, description: 'Deletes the staff member specified by the ID.' })
  @ApiResponse({ status: 500, description: 'An error occurred while trying to delete the staff member.' })
  async remove(@Param('id') id: number){
    return this.staffService.remove(+id);
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Get staff member by username.' })
  @ApiParam({ name: 'username', description: 'Staff member username.' })
  @ApiResponse({ status: 200, description: 'Returns the staff member specified by the username.' })
  
  async findOneByUsername(@Param('username') username: string){
    return this.staffService.findOneByUsername(username);
  }


  @Get('email/:email')
  @ApiOperation({ summary: 'Get staff member by email.' })
  @ApiParam({ name: 'email', description: 'Staff member email.' })
  @ApiResponse({ status: 200, description: 'Returns the staff member specified by the email.' })
  async findOneByEmail(@Param('email') email: string){
    return this.staffService.findOneByEmail(email);
  }
}
