import { Injectable, Inject } from '@nestjs/common';
import { StaffEntity } from '../domain/entities/staff.entity';
import { StaffDto } from '../domain/dto/staff.dto/staff.dto';
import { IStaffService } from './staff.service.interface';
import { IStaffRepository } from '../domain/repositories/staff.repository.interface';

@Injectable()
export class StaffService implements IStaffService {
  constructor(
    @Inject('StaffRepository')
    private readonly staffRepository: IStaffRepository
  ) {}

  async create(staffDto: StaffDto): Promise<StaffEntity> {
    return this.staffRepository.create(staffDto);
  }

  async findAll(): Promise<StaffEntity[]> {
    return this.staffRepository.findAll();
  }

  async findOne(id: number): Promise<StaffEntity> {
    return this.staffRepository.findOne(id);
  }

  async update(id: number, staffDto: StaffDto): Promise<StaffEntity> {
    await this.staffRepository.update(id, staffDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.staffRepository.remove(id);
  }

  async findOneByUsername(username: string): Promise<StaffEntity> {
    return this.staffRepository.findOneByUsername(username);
  }
}
