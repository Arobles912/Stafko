import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Inject,
  Patch,
} from '@nestjs/common';
import { StaffProjectService } from '../application/staff_project.service';
import { StaffProjectDto } from '../domain/dto/staff_project.dto/staff_project.dto';
import { StaffProjectEntity } from '../domain/entities/staff_project.entity';

@Controller('api/staffProject')
export class StaffProjectController {
  constructor(private readonly staffProjectService: StaffProjectService) {}

  @Post()
  async create(
    @Body() staffProjectDto: StaffProjectDto,
  ): Promise<StaffProjectEntity> {
    return this.staffProjectService.create(staffProjectDto);
  }

  @Get('staff_id/:staffId')
  async findByStaffId(
    @Param('staffId') staffId: number,
  ): Promise<StaffProjectEntity> {
    return this.staffProjectService.findByStaffId(+staffId);
  }

  @Get('project/:projectId')
  async findByProjectId(@Param('projectId') projectId: number) {
    return this.staffProjectService.findByProjectId(+projectId);
  }

  @Delete('project/:projectId')
  async removeByProjectId(@Param('projectId') projectId: number) {
    return this.staffProjectService.removeByProjectId(+projectId);
  }

  @Get('project/:projectId/users')
  async findUsersByProjectId(@Param('projectId') projectId: number) {
    try {
      const member = await this.staffProjectService.findByProjectId(projectId);

      const user = await this.staffProjectService.findUserById(member.staff_id);

      return user ? [user.username] : [];
    } catch (error) {
      console.error('Error fetching users by project ID:', error.message);
      throw new Error('Failed to fetch users');
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.staffProjectService.findOne(+id);
  }

  @Get(':projectId/:staffId')
  async findStaffProjectByProjectAndStaffId(
    @Param('staffId') staffId: number,
    @Param('projectId') projectId: number,
  ) {
    return this.staffProjectService.findStaffProjectByProjectAndStaffId(
      +staffId,
      +projectId,
    );
  }

  @Get()
  async findAll() {
    return this.staffProjectService.findAll();
  }

  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() staffProjectDto: StaffProjectDto,
  ) {
    return this.staffProjectService.update(+id, staffProjectDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.staffProjectService.delete(+id);
  }
}
