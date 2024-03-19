import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffDto } from '../dto/staff.dto/staff.dto';
import { StaffEntity } from '../entity/staff.entity/staff.entity';


@Controller('staff')
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
  async findOne(@Param('id') id: string): Promise<StaffEntity> {
    return this.staffService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() staffDto: StaffDto): Promise<StaffEntity> {
    return this.staffService.update(+id, staffDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.staffService.remove(+id);
  }
}
