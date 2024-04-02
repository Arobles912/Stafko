import { Repository } from 'typeorm';
import { StaffProjectEntity } from '../entity/staff_project.entity/staff_project.entity';
import { StaffProjectDto } from '../dto/staff_project.dto/staff_project.dto';
export declare class StaffProjectService {
    private staffProjectRepository;
    constructor(staffProjectRepository: Repository<StaffProjectEntity>);
    create(staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity>;
    findAll(): Promise<StaffProjectEntity[]>;
    findOne(staffId: number, projectId: number): Promise<StaffProjectEntity>;
    findByStaffId(staffId: number): Promise<StaffProjectEntity[]>;
    findByProjectId(projectId: number): Promise<StaffProjectEntity[]>;
    update(staffId: number, projectId: number, staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity>;
    remove(staffId: number, projectId: number): Promise<void>;
    removeByProjectId(projectId: number): Promise<void>;
    findUserById(userId: number): Promise<{
        username: string;
    } | null>;
}
