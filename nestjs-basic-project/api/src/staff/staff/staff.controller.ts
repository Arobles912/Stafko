import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffDto } from '../dto/staff.dto/staff.dto';
import { StaffEntity } from '../entity/staff.entity/staff.entity';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('staff')
@Controller('api/staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new staff member.' })
  @ApiBody({ type: StaffDto })
  @ApiResponse({ status: 200, description: 'Returns the created staff member.', type: StaffEntity })
  @ApiResponse({ status: 500, description: 'An error occurred while trying to create the staff member.' })

  async create(@Body() staffDto: StaffDto): Promise<StaffEntity> {
    return this.staffService.create(staffDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all staff members.' })
  @ApiResponse({ status: 200, description: 'Returns an array with all the staff members.'})

  async findAll(): Promise<StaffEntity[]> {
    return this.staffService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get staff member by ID.' })
  @ApiParam({ name: 'id', description: 'Staff member ID.' })
  @ApiResponse({ status: 200, description: 'Returns the staff member specified by the ID.' })
  @ApiResponse({ status: 404, description: 'Staff not found.' })
  
  async findOne(@Param('id') id: string): Promise<StaffEntity> {
    return this.staffService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update staff member by ID.' })
  @ApiParam({ name: 'id', description: 'Staff member ID.' })
  @ApiBody({ type: StaffDto })
  @ApiResponse({ status: 200, description: 'Returns the updated staff member specified by the ID.', type: StaffEntity })
  @ApiResponse({ status: 500, description: 'An error occurred while trying to update the staff member.' })

  async update(@Param('id') id: string, @Body() staffDto: StaffDto): Promise<StaffEntity> {
    return this.staffService.update(+id, staffDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete staff member by ID.' })
  @ApiParam({ name: 'id', description: 'Staff member ID.' })
  @ApiResponse({ status: 204, description: 'Deletes the staff member specified by the ID.' })
  @ApiResponse({ status: 500, description: 'An error occurred while trying to delete the staff member.' })

  async remove(@Param('id') id: string): Promise<void> {
    return this.staffService.remove(+id);
  }

  @Get('username/:username')
  @ApiOperation({ summary: 'Get staff member by username.' })
  @ApiParam({ name: 'username', description: 'Staff member username.' })
  @ApiResponse({ status: 200, description: 'Returns the staff member specified by the username.' })
  
  async findOneByUserName(@Param('username') username: string): Promise<StaffEntity> {
    return this.staffService.findOneByUserName(username);
  }
}
