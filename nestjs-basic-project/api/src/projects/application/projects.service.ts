import { Injectable, Inject } from '@nestjs/common';
import { ProjectsDto } from '../domain/dto/projects.dto/projects.dto';
import { ProjectsEntity } from '../domain/entities/projects.entity';
import { IProjectsRepository } from '../domain/repositories/projects.respository.interface';
import { MulterFile } from 'multer';
import { IProjectsService } from './projects.service.interface';

@Injectable()
export class ProjectsService implements IProjectsService {
  constructor(
    @Inject('ProjectsRepository')
    private readonly projectsRepository: IProjectsRepository,
  ) {}

  async create(projectDto: ProjectsDto, file: MulterFile): Promise<ProjectsEntity> {
    const project = new ProjectsEntity();
    project.project_name = projectDto.project_name;
    project.project_file = file.buffer;

    return await this.projectsRepository.save(project);
  }
  

  async findAll(): Promise<ProjectsEntity[]> {
    return this.projectsRepository.findAll();
  }

  async findOne(id: number): Promise<ProjectsEntity> {
    return this.projectsRepository.findOne(id);
  }
  
  async update(id: number, projectDto: ProjectsDto): Promise<ProjectsEntity> {
    await this.projectsRepository.update(id, projectDto);
    return this.findOne(id);
  }

  async delete(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }

  async findByProjectName(project_name: string): Promise<ProjectsEntity> {
    return this.projectsRepository.findByProjectName(project_name);
  }
}
