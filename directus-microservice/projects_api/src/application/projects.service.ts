import { Injectable } from '@nestjs/common';
import { ProjectsDto } from '../domain/dto/projects.dto/projects.dto';
import { ProjectsEntity } from '../domain/entities/projects.entity';
import { MulterFile } from 'multer';
import { DirectusService } from 'src/shared/directus/directus.service';
import { IProjectsService } from './projects.service.interface';

@Injectable()
export class ProjectsService implements IProjectsService {
  constructor(private readonly directusService: DirectusService) {}

  async uploadFile(file: MulterFile): Promise<any> {
    return this.directusService.uploadFile(file);
  }

  async create(projectDto: ProjectsDto): Promise<ProjectsEntity> {
    const response = await this.directusService.createItem('projects', projectDto);
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
