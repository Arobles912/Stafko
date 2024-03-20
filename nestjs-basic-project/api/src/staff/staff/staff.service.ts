import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffEntity } from '../entity/staff.entity/staff.entity';
import { StaffDto } from '../dto/staff.dto/staff.dto';


@Injectable()
export class StaffService {
  constructor(
    @InjectRepository(StaffEntity)
    private staffRepository: Repository<StaffEntity>,
  ) {}

  async create(staffDto: StaffDto): Promise<StaffEntity> {
    return this.staffRepository.save(staffDto);
  }

  async findAll(): Promise<StaffEntity[]> {
    return this.staffRepository.find();
  }

  async findOne(id: number): Promise<StaffEntity> {
    return this.staffRepository.findOne({ where: { staff_id: id } });
  }
  
  async update(id: number, staffDto: StaffDto): Promise<StaffEntity> {
    await this.staffRepository.update(id, staffDto);
    return this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    await this.staffRepository.delete(id);
  }

  async findOneByUserName(username: string): Promise<StaffEntity> {
    return this.staffRepository.findOneBy({username});
  }
}
