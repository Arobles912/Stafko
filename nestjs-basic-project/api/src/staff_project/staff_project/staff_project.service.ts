import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffProjectEntity } from '../entity/staff_project.entity/staff_project.entity';
import { StaffProjectDto } from '../dto/staff_project.dto/staff_project.dto';
import { ApiInternalServerErrorResponse, ApiOkResponse, ApiNotFoundResponse, ApiBadRequestResponse, ApiCreatedResponse, ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@Injectable()
@ApiTags('StaffProject')
export class StaffProjectService {
  constructor(
    @InjectRepository(StaffProjectEntity)
    private staffProjectRepository: Repository<StaffProjectEntity>,
  ) {}

  @ApiOperation({ summary: 'Creates a relationship between a staff member and a project' })
  @ApiCreatedResponse({ description: 'The created staff project' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async create(staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity> {
    const staffProject = this.staffProjectRepository.create(staffProjectDto);
    return this.staffProjectRepository.save(staffProject);
  }

  @ApiOperation({ summary: 'Gets all staff projects' })
  @ApiOkResponse({ description: 'An array with all the staff projects', type: [StaffProjectEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findAll(): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.find();
  }

  @ApiOperation({ summary: 'Gets a staff project by staff ID and project ID' })
  @ApiParam({ name: 'staffId', description: 'Staff ID' })
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  @ApiOkResponse({ description: 'The staff project specified by the staff ID and project ID', type: StaffProjectEntity })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findOne(staffId: number, projectId: number): Promise<StaffProjectEntity> {
    return this.staffProjectRepository.findOne({ where: { staff_id: staffId, project_id: projectId } });
  }

  @ApiOperation({ summary: 'Gets staff projects by staff ID' })
  @ApiParam({ name: 'staffId', description: 'Staff ID' })
  @ApiOkResponse({ description: 'An array with all the staff projects of the specified staff ID', type: [StaffProjectEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findByStaffId(staffId: number): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.find({ where: { staff_id: staffId } });
  }

  @ApiOperation({ summary: 'Gets staff projects by project ID' })
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  @ApiOkResponse({ description: 'An array with all the staff projects of the specified project ID', type: [StaffProjectEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findByProjectId(projectId: number): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.find({ where: { project_id: projectId } });
  }

  @ApiOperation({ summary: 'Updates a staff project by staff ID and project ID' })
  @ApiParam({ name: 'staffId', description: 'Staff ID' })
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  @ApiCreatedResponse({ description: 'The updated staff project' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async update(staffId: number, projectId: number, staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity> {
    await this.staffProjectRepository.update({ staff_id: staffId, project_id: projectId }, staffProjectDto);
    return this.findOne(staffId, projectId);
  }

  @ApiOperation({ summary: 'Removes a staff project by staff ID and project ID' })
  @ApiParam({ name: 'staffId', description: 'Staff ID' })
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  @ApiOkResponse({ description: 'Staff project successfully deleted' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async remove(staffId: number, projectId: number): Promise<void> {
    await this.staffProjectRepository.delete({ staff_id: staffId, project_id: projectId });
  }

  @ApiOperation({ summary: 'Removes staff projects by project ID' })
  @ApiParam({ name: 'projectId', description: 'Project ID' })
  @ApiOkResponse({ description: 'Staff projects successfully deleted' })
  @ApiNotFoundResponse({ description: 'No staff projects found for the specified project ID' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async removeByProjectId(projectId: number): Promise<void> {
    await this.staffProjectRepository.delete({ project_id: projectId });
  }

  @ApiOperation({ summary: 'Finds a user from the staff table by staff ID' })
  @ApiParam({ name: 'userId', description: 'User ID' })
  @ApiOkResponse({ description: 'User found'})
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findUserById(userId: number): Promise<{ username: string } | null> {
    const user = await this.staffProjectRepository.query(`SELECT username FROM staff WHERE staff_id = $1`, [userId]);
    return user[0] || null;
  }
}
