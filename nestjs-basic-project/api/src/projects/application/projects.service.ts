import { Injectable, Inject } from '@nestjs/common';
import { ProjectsDto } from '../domain/dto/projects.dto/projects.dto';
import { ProjectsEntity } from '../domain/entities/projects.entity';
import { IProjectsRepository } from '../domain/repositories/projects.respository.interface';
import { MulterFile } from 'multer';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';
import { IProjectsService } from './projects.service.interface';

@Injectable()
@ApiTags('Projects')
export class ProjectsService implements IProjectsService {
  constructor(
    @Inject('ProjectsRepository')
    private readonly projectsRepository: IProjectsRepository,
  ) {}

  @ApiOperation({ summary: 'Creates a new project' })
  @ApiBody({ type: ProjectsDto, description: 'Body of the project with all the data fields' })
  @ApiCreatedResponse({ description: 'The created project' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async create(projectDto: ProjectsDto, file: MulterFile): Promise<ProjectsEntity> {
    const project = new ProjectsEntity();
    project.project_name = projectDto.project_name;
    project.project_file = file.buffer;

    return await this.projectsRepository.save(project);
  }
  
  @ApiOperation({ summary: 'Gets all the projects in the database' })
  @ApiOkResponse({ description: 'An array with all the projects', type: [ProjectsEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findAll(): Promise<ProjectsEntity[]> {
    return this.projectsRepository.findAll();
  }

  @ApiOperation({ summary: 'Gets a project specified by the ID' })
  @ApiOkResponse({ description: 'The project specified by the ID', type: ProjectsEntity })
  @ApiNotFoundResponse({ description: 'Project not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findOne(id: number): Promise<ProjectsEntity> {
    return this.projectsRepository.findOne(id);
  }
  
  @ApiOperation({ summary: 'Updates a project specified by the ID' })
  @ApiBody({ type: ProjectsDto, description: 'The fields to update of the specified project' })
  @ApiOkResponse({ description: 'The updated project', type: ProjectsEntity })
  @ApiNotFoundResponse({ description: 'Project not found' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async update(id: number, projectDto: ProjectsDto): Promise<ProjectsEntity> {
    await this.projectsRepository.update(id, projectDto);
    return this.findOne(id);
  }

  @ApiOperation({ summary: 'Deletes the project specified by the ID' })
  @ApiOkResponse({ description: 'Project successfully deleted' })
  @ApiNotFoundResponse({ description: 'Project not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async delete(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }

  @ApiOperation({ summary: 'Gets a project specified by the name' })
  @ApiOkResponse({ description: 'The project specified by the name', type: ProjectsEntity })
  @ApiNotFoundResponse({ description: 'Project not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findByProjectName(project_name: string): Promise<ProjectsEntity> {
    return this.projectsRepository.findByProjectName(project_name);
  }
}
