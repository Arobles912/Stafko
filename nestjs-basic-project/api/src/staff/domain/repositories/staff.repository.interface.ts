import { StaffEntity } from "../entities/staff.entity";
import { StaffDto } from "../dto/staff.dto/staff.dto";

export interface IStaffRepository {
  findAll(): Promise<StaffEntity[]>;
  findOne(staff_id: number): Promise<StaffEntity>;
  findOneByUsername(username: string): Promise<StaffEntity>;
  create(staffData: StaffDto): Promise<StaffEntity>;
  update(staff_id: number, staffData: StaffDto): Promise<StaffEntity>;
  remove(staff_id: number): Promise<void>;
}
