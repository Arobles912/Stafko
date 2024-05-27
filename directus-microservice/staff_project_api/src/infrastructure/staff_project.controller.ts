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
import {
  ApiBody,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('api/staffProject')
export class StaffProjectController {
  constructor(private readonly staffProjectService: StaffProjectService) {}

  @Post()
  @ApiOperation({
    summary: 'Creates a relationship between a staff member and a project',
  })
  @ApiBody({ type: StaffProjectDto, description: 'Staff project data' })
  @ApiResponse({ status: 201, description: 'The created staff project' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async create(@Body() staffProjectDto: StaffProjectDto) {
    return this.staffProjectService.create(staffProjectDto);
  }

  @Get('staff_id/:staffId')
  @ApiOperation({ summary: 'Finds projects by staff ID' })
  @ApiParam({ name: 'staffId', description: 'ID of the staff' })
  @ApiResponse({
    status: 200,
    description: 'Projects associated with the staff',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findByStaffId(
    @Param('staffId') staffId: number,
  ) {
    return this.staffProjectService.findByStaffId(+staffId);
  }

  @Get('project/:projectId')
  @ApiOperation({ summary: 'Finds staff projects by project ID' })
  @ApiParam({ name: 'projectId', description: 'ID of the project' })
  @ApiResponse({
    status: 200,
    description: 'Staff projects associated with the project',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findByProjectId(@Param('projectId') projectId: number) {
    return this.staffProjectService.findByProjectId(+projectId);
  }

  @Delete('project/:projectId')
  @ApiOperation({ summary: 'Removes staff projects by project ID' })
  @ApiParam({ name: 'projectId', description: 'ID of the project' })
  @ApiResponse({
    status: 204,
    description: 'Staff projects removed successfully',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async removeByProjectId(@Param('projectId') projectId: number) {
    return this.staffProjectService.removeByProjectId(+projectId);
  }

  @Get('project/:projectId/users')
  @ApiOperation({ summary: 'Finds users by project ID' })
  @ApiParam({ name: 'projectId', description: 'ID of the project' })
  @ApiResponse({
    status: 200,
    description: 'Returns usernames of users associated with the project',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
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
  @ApiOperation({ summary: 'Finds staff project by ID' })
  @ApiParam({ name: 'staffId', description: 'ID of the staff project' })
  @ApiResponse({ status: 200, description: 'Staff project found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findOne(@Param('id') id: number) {
    return this.staffProjectService.findOne(+id);
  }

  @Get(':projectId/:staffId')
  @ApiOperation({ summary: 'Finds staff project by staff ID and project ID' })
  @ApiParam({ name: 'staffId', description: 'ID of the staff member' })
  @ApiParam({ name: 'projectId', description: 'ID of the project' })
  @ApiResponse({ status: 200, description: 'Staff project found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
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
  @ApiOperation({ summary: 'Find all staff projects' })
  @ApiResponse({ status: 200, description: 'All staff projects found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async findAll() {
    return this.staffProjectService.findAll();
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Updates staff project by ID' })
  @ApiParam({ name: 'staffId', description: 'ID of the staff project' })
  @ApiBody({ type: StaffProjectDto, description: 'Staff project data' })
  @ApiResponse({ status: 200, description: 'Staff project updated' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async update(
    @Param('id') id: number,
    @Body() staffProjectDto: StaffProjectDto,
  ) {
    return this.staffProjectService.update(+id, staffProjectDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Removes staff project by ID' })
  @ApiParam({ name: 'id', description: 'ID of the staff project' })
  @ApiResponse({
    status: 204,
    description: 'Staff project removed successfully',
  })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })
  async delete(@Param('id') id: number) {
    return this.staffProjectService.delete(+id);
  }
}
