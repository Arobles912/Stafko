import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsEntity } from '../domain/entities/projects.entity/projects.entity';
import { ProjectsDto } from '../domain/dto/projects.dto/projects.dto';
import { MulterFile } from 'multer';
import { ApiTags, ApiOperation, ApiBody, ApiOkResponse, ApiCreatedResponse, ApiBadRequestResponse, ApiInternalServerErrorResponse, ApiNotFoundResponse } from '@nestjs/swagger';

@Injectable()
@ApiTags('Projects')
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private projectsRepository: Repository<ProjectsEntity>,
  ) {}

  @ApiOperation({ summary: 'Creates a new project' })
  @ApiBody({ type: ProjectsDto, description: 'Body of the project with all the data fields' })
  @ApiCreatedResponse({ description: 'The created project' })
  @ApiBadRequestResponse({ description: 'Bad request' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async create(projectDto: ProjectsDto, file: MulterFile): Promise<ProjectsEntity> {
      const project = this.projectsRepository.create({
        ...projectDto,
        project_file: file.buffer,
      });
      return this.projectsRepository.save(project);
  }

  @ApiOperation({ summary: 'Gets all the projects in the database' })
  @ApiOkResponse({ description: 'An array with all the projects', type: [ProjectsEntity] })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findAll(): Promise<ProjectsEntity[]> {
    return this.projectsRepository.find();
  }

  @ApiOperation({ summary: 'Gets a project specified by the ID' })
  @ApiOkResponse({ description: 'The project specified by the ID', type: ProjectsEntity })
  @ApiNotFoundResponse({ description: 'Project not found' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findOne(id: number): Promise<ProjectsEntity> {
    return this.projectsRepository.findOne({ where: { project_id: id } });
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
  
  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }

  async findByProjectName(project_name: string): Promise<ProjectsEntity> {
    return this.projectsRepository.findOneBy({ project_name });
  }
}
