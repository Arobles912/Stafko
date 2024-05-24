import { Controller, Get, Post, Body, Param, Put, Delete, Patch } from '@nestjs/common';
import { StaffDto } from '../domain/dto/staff.dto/staff.dto';
import { StaffService } from '../application/staff.service';

@Controller('api/staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  async create(@Body() staffDto: StaffDto){
    return this.staffService.create(staffDto);
  }

  @Get()
  async findAll(){
    return this.staffService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number){
    return this.staffService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() staffDto: StaffDto){
    return this.staffService.update(+id, staffDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number){
    return this.staffService.remove(+id);
  }

  @Get('username/:username')
  async findOneByUsername(@Param('username') username: string){
    return this.staffService.findOneByUsername(username);
  }


  @Get('email/:email')
  async findOneByEmail(@Param('email') email: string){
    return this.staffService.findOneByEmail(email);
  }
}
