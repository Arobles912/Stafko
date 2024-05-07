import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffEntity } from '../entities/staff.entity';
import { IStaffRepository } from './staff.repository.interface';
import { StaffDto } from '../dto/staff.dto/staff.dto';

@Injectable()
export class StaffRepository implements IStaffRepository {
  constructor(
    @InjectRepository(StaffEntity)
    private readonly staffRepository: Repository<StaffEntity>,
  ) {}

  async findAll(): Promise<StaffEntity[]> {
    return await this.staffRepository.find();
  }

  async findOne(staff_id: number): Promise<StaffEntity> {
    return await this.staffRepository.findOne({where: {staff_id}});
  }

  async findOneByUsername(username: string): Promise<StaffEntity> {
    return await this.staffRepository.findOne({ where: { username } });
  }

  async create(staffData: StaffDto): Promise<StaffEntity> {
    const staff = this.staffRepository.create(staffData);
    return await this.staffRepository.save(staff);
  }

  async update(staff_id: number, staffData: StaffDto): Promise<StaffEntity> {
    await this.staffRepository.update(staff_id, staffData);
    return this.findOne(staff_id);
  }

  async remove(staff_id: number): Promise<void> {
    await this.staffRepository.delete(staff_id);
  }
}
