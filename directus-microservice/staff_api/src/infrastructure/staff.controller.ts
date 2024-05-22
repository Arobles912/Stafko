import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { StaffDto } from '../domain/dto/staff.dto/staff.dto';
import { StaffEntity } from '../domain/entities/staff.entity';
import { StaffService } from '../application/staff.service';

@Controller('api/staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async create(@Body() staffDto: StaffDto): Promise<StaffEntity> {
    return this.staffService.create(staffDto);
  }

  @Get()
  async findAll(): Promise<StaffEntity[]> {
    return this.staffService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<StaffEntity> {
    return this.staffService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: number, @Body() staffDto: StaffDto): Promise<StaffEntity> {
    return this.staffService.update(+id, staffDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.staffService.remove(+id);
  }

  @Get('username/:username')
  async findOneByUsername(@Param('username') username: string): Promise<StaffEntity> {
    return this.staffService.findOneByUsername(username);
  }


  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string): Promise<StaffEntity> {
    return this.staffService.findOneByEmail(email);
  }
}
