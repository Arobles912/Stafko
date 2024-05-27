import { ProjectsDto } from '../domain/dto/projects.dto/projects.dto';
import { ProjectsEntity } from '../domain/entities/projects.entity';
import { MulterFile } from 'multer';

export interface IProjectsService {
  create(projectDto: ProjectsDto): Promise<ProjectsEntity>;
  findAll(): Promise<ProjectsEntity[]>;
  findOne(id: number): Promise<ProjectsEntity>;
  update(id: number, projectDto: ProjectsDto): Promise<ProjectsEntity>;
  delete(id: number): Promise<void>;
  findByProjectName(project_name: string): Promise<ProjectsEntity>;
  uploadFile(file: MulterFile): Promise<any>;
  downloadFile(fileId: string): Promise<Buffer>;
}
