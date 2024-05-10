import { StaffEntity } from '../domain/entities/staff.entity';
import { StaffDto } from '../domain/dto/staff.dto/staff.dto';

export interface IStaffService {
  create(staffDto: StaffDto): Promise<StaffEntity>;
  findAll(): Promise<StaffEntity[]>;
  findOne(id: number): Promise<StaffEntity>;
  update(id: number, staffDto: StaffDto): Promise<StaffEntity>;
  remove(id: number): Promise<void>;
  findOneByUsername(username: string): Promise<StaffEntity>;
}