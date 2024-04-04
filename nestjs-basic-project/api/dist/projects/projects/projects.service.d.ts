import { Repository } from 'typeorm';
import { ProjectsEntity } from '../entity/projects.entity/projects.entity';
import { ProjectsDto } from '../dto/projects.dto/projects.dto';
import { MulterFile } from 'multer';
export declare class ProjectsService {
    private projectsRepository;
    constructor(projectsRepository: Repository<ProjectsEntity>);
    create(projectDto: ProjectsDto, file: MulterFile): Promise<ProjectsEntity>;
    findAll(): Promise<ProjectsEntity[]>;
    findOne(id: number): Promise<ProjectsEntity>;
    update(id: number, projectDto: ProjectsDto): Promise<ProjectsEntity>;
    remove(id: number): Promise<void>;
}
