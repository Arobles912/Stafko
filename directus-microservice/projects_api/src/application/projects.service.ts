import { Injectable, Inject } from '@nestjs/common';
import { ProjectsDto } from '../domain/dto/projects.dto/projects.dto';
import { ProjectsEntity } from '../domain/entities/projects.entity';
import { MulterFile } from 'multer';
import { DirectusService } from 'src/directus/directus.service';

@Injectable()
export class ProjectsService {
  constructor(private readonly directusService: DirectusService) {}

  async create(projectDto: ProjectsDto, file: MulterFile): Promise<ProjectsEntity> {
    const data = {
      project_name: projectDto.project_name,
      project_file: file.buffer,
    };
    const response = await this.directusService.createItem('projects', data);
    return response.data as ProjectsEntity;
  }
  
  async findAll(): Promise<ProjectsEntity[]> {
    const response = await this.directusService.getItems('projects');
    return response.data as ProjectsEntity[];
  }

  async findOne(id: number): Promise<ProjectsEntity> {
    const response = await this.directusService.getItem('projects', id);
    return response.data as ProjectsEntity;
  }

  async update(id: number, projectDto: ProjectsDto): Promise<ProjectsEntity> {
    const response = await this.directusService.updateItem('projects', id, projectDto);
    return response.data as ProjectsEntity;
  }

  async delete(id: number): Promise<void> {
    await this.directusService.deleteItem('projects', id);
  }

  async findByProjectName(project_name: string): Promise<ProjectsEntity> {
    const response = await this.directusService.getItems('projects');
    const projectsList: ProjectsEntity[] = response.data as ProjectsEntity[];

    const projectSelected = projectsList.find((project) => project.project_name === project_name);

    return projectSelected || null;
  }
}