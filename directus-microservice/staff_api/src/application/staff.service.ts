import { Injectable, Inject } from '@nestjs/common';
import { StaffEntity } from '../domain/entities/staff.entity';
import { StaffDto } from '../domain/dto/staff.dto/staff.dto';
import { DirectusService } from 'src/shared/directus/directus.service';
import { IStaffService } from './staff.service.interface';

@Injectable()
export class StaffService implements IStaffService {
  constructor(private readonly directusService: DirectusService) {}

  async create(staffDto: StaffDto): Promise<StaffEntity> {
    const response = await this.directusService.createItem('staff', staffDto);
    return response.data as StaffEntity;
  }

  async findAll(): Promise<StaffEntity[]> {
    const response = await this.directusService.getItems('staff');
    return response.data as StaffEntity[];
  }

  async findOne(id: number): Promise<StaffEntity> {
    const response = await this.directusService.getItem('staff', id);
    return response.data as StaffEntity;
  }

  async update(id: number, staffDto: StaffDto): Promise<StaffEntity> {
    const response = await this.directusService.updateItem(
      'staff',
      id,
      staffDto,
    );
    return response.data as StaffEntity;
  }

  async remove(id: number): Promise<void> {
    await this.directusService.deleteItem('staff', id);
  }

  async findOneByUsername(username: string): Promise<StaffEntity> {
    const response = await this.directusService.getItems('staff');
    const staffList: StaffEntity[] = response.data as StaffEntity[];

    const staffMember = staffList.find((staff) => staff.username === username);

    return staffMember || null;
  }

  async findOneByEmail(email: string): Promise<StaffEntity> {
    const response = await this.directusService.getItems('staff');
    const staffList: StaffEntity[] = response.data as StaffEntity[];

    const staffMember = staffList.find((staff) => staff.email === email);

    return staffMember || null;
  }
}
