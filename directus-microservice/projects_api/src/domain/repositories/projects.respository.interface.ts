import { ProjectsDto } from '../dto/projects.dto/projects.dto';
import { ProjectsEntity } from '../entities/projects.entity';
import { MulterFile } from "multer";

export interface IProjectsRepository {
  findAll(): Promise<ProjectsEntity[]>;
  findOne(project_id: number): Promise<ProjectsEntity>;
  create(projectDto: ProjectsDto, file: MulterFile): Promise<ProjectsEntity>;
  update(project_id: number, projectDto: ProjectsDto): Promise<ProjectsEntity>;
  delete(project_id: number): Promise<void>;
  findByProjectName(project_name: string): Promise<ProjectsEntity>;
  save(project: ProjectsEntity): Promise<ProjectsEntity>;
}
