import { Inject, Injectable } from '@nestjs/common';
import { StaffProjectDto } from '../domain/dto/staff_project.dto/staff_project.dto';
import { StaffProjectEntity } from '../domain/entities/staff_project.entity';
import { IStaffProjectService } from './staff_project.service.interface';
import { IStaffProjectRepository } from '../domain/repositories/staff_project.repository.interface';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@Injectable()
@ApiTags('StaffProject')
export class StaffProjectService implements IStaffProjectService {
  constructor(
    @Inject('StaffProjectRepository')
    private readonly staffProjectRepository: IStaffProjectRepository,
  ) {}

  @ApiOperation({ summary: 'Creates a relationship between a staff member and a project' })
  @ApiCreatedResponse({ description: 'The created staff project' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async create(staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity> {
    const staffProject = await this.staffProjectRepository.create(staffProjectDto);
    return staffProject;
  }

  @ApiOperation({ summary: 'Gets all staff projects' })
  @ApiOkResponse({ description: 'An array with all the staff projects', type: [StaffProjectEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findAll(): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.findAll();
  }

  @ApiOperation({ summary: 'Gets a staff project by staff ID and project ID' })
  @ApiParam({ name: 'staffId', description: 'Staff ID' })
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  @ApiOkResponse({ description: 'The staff project specified by the staff ID and project ID', type: StaffProjectEntity })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findOne(staffId: number, projectId: number): Promise<StaffProjectEntity> {
    return this.staffProjectRepository.findOne(staffId, projectId);
  }

  @ApiOperation({ summary: 'Gets staff projects by staff ID' })
  @ApiParam({ name: 'staffId', description: 'Staff ID' })
  @ApiOkResponse({ description: 'An array with all the staff projects of the specified staff ID', type: [StaffProjectEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findByStaffId(staffId: number): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.findByStaffId(staffId);
  }

  @ApiOperation({ summary: 'Gets staff projects by project ID' })
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  @ApiOkResponse({ description: 'An array with all the staff projects of the specified project ID', type: [StaffProjectEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findByProjectId(projectId: number): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.findByProjectId(projectId);
  }

  @ApiOperation({ summary: 'Updates a staff project by staff ID and project ID' })
  @ApiParam({ name: 'staffId', description: 'Staff ID' })
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  @ApiCreatedResponse({ description: 'The updated staff project' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async update(staffId: number, projectId: number, staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity> {
    return this.staffProjectRepository.update(staffId, projectId, staffProjectDto);
  }

  @ApiOperation({ summary: 'Removes a staff project by staff ID and project ID' })
  @ApiParam({ name: 'staffId', description: 'Staff ID' })
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  @ApiOkResponse({ description: 'Staff project successfully deleted' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async delete(staffId: number, projectId: number): Promise<void> {
    await this.staffProjectRepository.delete(staffId, projectId);
  }

  @ApiOperation({ summary: 'Removes staff projects by project ID' })
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  @ApiOkResponse({ description: 'Staff projects successfully deleted' })
  @ApiNotFoundResponse({ description: 'No staff projects found for the specified project ID' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async removeByProjectId(projectId: number): Promise<void> {
    await this.staffProjectRepository.removeByProjectId(projectId);
  }

  @ApiOperation({ summary: 'Finds a user from the staff table by staff ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiOkResponse({ description: 'User found'})
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findUserById(userId: number): Promise<{ username: string } | null> {
    return this.staffProjectRepository.findUserById(userId);
  }
}
