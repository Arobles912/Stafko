import { StaffProjectDto } from "../dto/staff_project.dto/staff_project.dto";
import { StaffProjectEntity } from "../entities/staff_project.entity";

export interface IStaffProjectRepository {
  findAll(): Promise<StaffProjectEntity[]>;
  findOne(staffId: number, projectId: number): Promise<StaffProjectEntity>;
  create(staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity>;
  update(
    staffId: number,
    projectId: number,
    staffProjectDto: StaffProjectDto,
  ): Promise<StaffProjectEntity>;
  delete(staffId: number, projectId: number): Promise<void>;
  findByStaffId(staffId: number): Promise<StaffProjectEntity[]>;
  findByProjectId(projectId: number): Promise<StaffProjectEntity[]>;
  removeByProjectId(projectId: number): Promise<void>;
  findUserById(userId: number): Promise<{ username: string } | null>;
}