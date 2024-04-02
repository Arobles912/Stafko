import { StaffProjectService } from "./staff_project.service";
import { StaffProjectDto } from "../dto/staff_project.dto/staff_project.dto";
import { StaffProjectEntity } from "../entity/staff_project.entity/staff_project.entity";
export declare class StaffProjectController {
    private readonly staffProjectService;
    constructor(staffProjectService: StaffProjectService);
    create(staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity>;
    findByStaffId(staffId: number): Promise<StaffProjectEntity[]>;
    findByProjectId(projectId: number): Promise<StaffProjectEntity[]>;
    removeByProjectId(projectId: number): Promise<void>;
    findUsersByProjectId(projectId: number): Promise<string[]>;
    findOne(staffId: number, projectId: number): Promise<StaffProjectEntity>;
    findAll(): Promise<StaffProjectEntity[]>;
    update(staffId: number, projectId: number, staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity>;
    remove(staffId: number, projectId: number): Promise<void>;
}
