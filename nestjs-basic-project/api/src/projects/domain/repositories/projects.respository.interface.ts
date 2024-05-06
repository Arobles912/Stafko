import { ProjectsDto } from '../dto/projects.dto/projects.dto';
import { ProjectsEntity } from '../entities/projects.entity';

export interface IProjectsRepository {
  findAll(): Promise<ProjectsEntity[]>;
  findOne(project_id: number): Promise<ProjectsEntity>;
  create(projectDto: ProjectsDto): Promise<ProjectsEntity>;
  update(project_id: number, projectDto: ProjectsDto): Promise<ProjectsEntity>;
  delete(project_id: number): Promise<void>;
}
