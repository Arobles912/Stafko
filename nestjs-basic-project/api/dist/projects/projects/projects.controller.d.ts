import { ProjectsService } from './projects.service';
import { ProjectsDto } from '../dto/projects.dto/projects.dto';
import { ProjectsEntity } from '../entity/projects.entity/projects.entity';
export declare class ProjectsController {
    private readonly projectsService;
    constructor(projectsService: ProjectsService);
    create(projectDto: ProjectsDto): Promise<ProjectsEntity>;
    findAll(): Promise<ProjectsEntity[]>;
    findOne(id: string): Promise<ProjectsEntity>;
    update(id: string, projectDto: ProjectsDto): Promise<ProjectsEntity>;
    remove(id: string): Promise<void>;
}
