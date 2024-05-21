import { Injectable } from '@nestjs/common';
import { StaffProjectDto } from '../domain/dto/staff_project.dto/staff_project.dto';
import { StaffProjectEntity } from '../domain/entities/staff_project.entity';
import { DirectusService } from 'src/directus/directus.service';

@Injectable()
export class StaffProjectService {
  constructor(private readonly directusService: DirectusService) {}

  async create(staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity> {
    const response = await this.directusService.createItem('staff_projects', staffProjectDto);
    return response.data as StaffProjectEntity;
  }

  async findAll(): Promise<StaffProjectEntity[]> {
    const response = await this.directusService.getItems('staff_projects');
    return response.data as StaffProjectEntity[];
  }

  async findOne(id: number): Promise<StaffProjectEntity> {
    const response = await this.directusService.getItem('staff_projects', id);
    return response.data as StaffProjectEntity;
  }

  async findByStaffId(staffId: number): Promise<StaffProjectEntity[]> {
    const response = await this.directusService.getItems('staff_projects');
    const items: StaffProjectEntity[] = response.data as StaffProjectEntity[];
    return items.filter(item => item.staff_id === staffId);
  }

  async findByProjectId(projectId: number): Promise<StaffProjectEntity[]> {
    const response = await this.directusService.getItems('staff_projects');
    const items: StaffProjectEntity[] = response.data as StaffProjectEntity[];
    return items.filter(item => item.project_id === projectId);
  }

  async update(id: number, staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity> {
    const response = await this.directusService.updateItem('staff_projects', id, staffProjectDto);
    return response.data as StaffProjectEntity;
  }

  async delete(id: number): Promise<void> {
    await this.directusService.deleteItem('staff_projects', id);
  }

  async removeByProjectId(projectId: number): Promise<void> {
    const response = await this.directusService.getItems('staff_projects');
    const items: StaffProjectEntity[] = response.data as StaffProjectEntity[];
    const itemsToDelete = items.filter(item => item.project_id === projectId);
    for (const item of itemsToDelete) {
      await this.directusService.deleteItem('staff_projects', item.id);
    }
  }

  async findUserById(userId: number): Promise<{ username: string } | null> {
    const response = await this.directusService.getItem('users', userId);
    return response.data ? { username: response.data.username } : null;
  }
}
