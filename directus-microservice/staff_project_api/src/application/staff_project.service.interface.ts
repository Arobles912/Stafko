import { StaffProjectEntity } from "../domain/entities/staff_project.entity";
import { StaffProjectDto } from "../domain/dto/staff_project.dto/staff_project.dto";

export interface IStaffProjectService {
  create(staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity>;
  findAll(): Promise<StaffProjectEntity[]>;
  findOne(staffId: number, projectId: number): Promise<StaffProjectEntity>;
  findByStaffId(staffId: number): Promise<StaffProjectEntity[]>;
  findByProjectId(projectId: number): Promise<StaffProjectEntity[]>;
  update(staffId: number, projectId: number, staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity>;
  delete(staffId: number, projectId: number): Promise<void>;
  removeByProjectId(projectId: number): Promise<void>;
  findUserById(userId: number): Promise<{ username: string } | null>;
  findStaffProjectByProjectAndStaffId(projectId: number, staffId: number): Promise<StaffProjectEntity | null>;
}
