import { StaffProjectEntity } from "../domain/entities/staff_project.entity";
import { StaffProjectDto } from "../domain/dto/staff_project.dto/staff_project.dto";

export interface IStaffProjectService {
  create(staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity>;
  findAll(): Promise<StaffProjectEntity[]>;
  findOne(id: number): Promise<StaffProjectEntity>;
  findByStaffId(staffId: number): Promise<StaffProjectEntity | null>;
  findByProjectId(projectId: number): Promise<StaffProjectEntity | null>;
  update(id: number, staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity>;
  delete(id: number): Promise<void>;
  removeByProjectId(projectId: number): Promise<void>;
  findUserById(userId: number): Promise<{ username: string } | null>;
  findStaffProjectByProjectAndStaffId(projectId: number, staffId: number): Promise<StaffProjectEntity | null>;
}
