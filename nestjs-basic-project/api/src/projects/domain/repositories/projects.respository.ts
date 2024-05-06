import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectsEntity } from "../entities/projects.entity";
import { ProjectsDto } from "../dto/projects.dto/projects.dto";
import { IProjectsRepository } from "./projects.respository.interface";

@Injectable()
export class ProjectsRepository implements IProjectsRepository {
  constructor(
    @InjectRepository(ProjectsEntity)
    private readonly projectsRepository: Repository<ProjectsEntity>
  ) {}

  async findAll(): Promise<ProjectsEntity[]> {
    return await this.projectsRepository.find();
  }

  async findOne(project_id: number): Promise<ProjectsEntity> {
    return await this.findOne(project_id);
}

  async create(projectDto: ProjectsDto): Promise<ProjectsEntity> {
    const {
      project_name,
      description,
      creation_date,
      project_file,
      project_owner,
      associated_customer,
    } = projectDto;
    const project = new ProjectsEntity();
    project.project_name = project_name;
    project.description = description;
    project.creation_date = creation_date;
    project.project_file = project_file;
    project.project_owner = project_owner;
    project.associated_customer = associated_customer;
    return await this.projectsRepository.save(project);
  }

  async update(
    project_id: number,
    projectDto: ProjectsDto
  ): Promise<ProjectsEntity> {
    await this.projectsRepository.update(project_id, projectDto);
    return this.findOne(project_id);
  }

  async delete(project_id: number): Promise<void> {
    await this.projectsRepository.delete(project_id);
  }
}
