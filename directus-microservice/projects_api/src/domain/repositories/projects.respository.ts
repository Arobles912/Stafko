import { Injectable, BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ProjectsEntity } from "../entities/projects.entity";
import { ProjectsDto } from "../dto/projects.dto/projects.dto";
import { IProjectsRepository } from "./projects.respository.interface";
import { MulterFile } from "multer";

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
    return await this.projectsRepository.findOne({ where: { project_id } });
  }

  async create(projectDto: ProjectsDto, file: MulterFile): Promise<ProjectsEntity> {
    if (!file || !file.buffer) {
      throw new BadRequestException('File is required and must be valid');
    }

    const project = this.projectsRepository.create({
      ...projectDto,
      project_file: file.buffer,
    });

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

  async findByProjectName(project_name: string): Promise<ProjectsEntity> {
    return this.projectsRepository.findOne({ where: { project_name } });
  }

  async save(project: ProjectsEntity): Promise<ProjectsEntity> {
    return await this.projectsRepository.save(project);
  }
}
