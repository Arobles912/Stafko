import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectsEntity } from '../entity/projects.entity/projects.entity';
import { ProjectsDto } from '../dto/projects.dto/projects.dto';


@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(ProjectsEntity)
    private projectsRepository: Repository<ProjectsEntity>,
  ) {}

  async create(projectDto: ProjectsDto): Promise<ProjectsEntity> {
    return this.projectsRepository.save(projectDto);
  }

  async findAll(): Promise<ProjectsEntity[]> {
    return this.projectsRepository.find();
  }

  async findOne(id: number): Promise<ProjectsEntity> {
    return this.projectsRepository.findOne({ where: { project_id: id } });
  }
  
  async update(id: number, projectDto: ProjectsDto): Promise<ProjectsEntity> {
    await this.projectsRepository.update(id, projectDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.projectsRepository.delete(id);
  }
}
