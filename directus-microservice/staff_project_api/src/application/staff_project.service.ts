import { Injectable } from '@nestjs/common';
import { StaffProjectDto } from '../domain/dto/staff_project.dto/staff_project.dto';
import { StaffProjectEntity } from '../domain/entities/staff_project.entity';
import { DirectusService } from 'src/shared/directus/directus.service';

@Injectable()
export class StaffProjectService {
  constructor(private readonly directusService: DirectusService) {}

  async create(staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity> {
    const response = await this.directusService.createItem('staff_project', staffProjectDto);
    return response.data as StaffProjectEntity;
  }

  async findAll(): Promise<StaffProjectEntity[]> {
    const response = await this.directusService.getItems('staff_project');
    return response.data as StaffProjectEntity[];
  }

  async findOne(id: number): Promise<StaffProjectEntity> {
    const response = await this.directusService.getItem('staff_project', id);
    return response.data as StaffProjectEntity;
  }

  async findByStaffId(staffId: number): Promise<StaffProjectEntity[]> {
    const response = await this.directusService.getItems('staff_project');
    const items: StaffProjectEntity[] = response.data as StaffProjectEntity[];
    return items.filter(item => item.staff_id === staffId);
  }

  async findStaffProjectByProjectAndStaffId(projectId: number, staffId: number): Promise<StaffProjectEntity | null> {
    const response = await this.directusService.getItems('staff_project');
    const staffProjects: StaffProjectEntity[] = response.data as StaffProjectEntity[];
    const foundStaffProject = staffProjects.find(
      (staffProject) => staffProject.project_id === projectId && staffProject.staff_id === staffId
    );
    return foundStaffProject || null;
  }

  async findByProjectId(projectId: number): Promise<StaffProjectEntity[]> {
    const response = await this.directusService.getItems('staff_project');
    const items: StaffProjectEntity[] = response.data as StaffProjectEntity[];
    return items.filter(item => item.project_id === projectId);
  }

  async update(id: number, staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity> {
    const response = await this.directusService.updateItem('staff_project', id, staffProjectDto);
    return response.data as StaffProjectEntity;
  }

  async delete(id: number): Promise<void> {
    await this.directusService.deleteItem('staff_project', id);
  }

  async removeByProjectId(projectId: number): Promise<void> {
    const response = await this.directusService.getItems('staff_project');
    const items: StaffProjectEntity[] = response.data as StaffProjectEntity[];
    const itemsToDelete = items.filter(item => item.project_id === projectId);
    for (const item of itemsToDelete) {
      await this.directusService.deleteItem('staff_project', item.id);
    }
  }

  async findUserById(userId: number): Promise<{ username: string } | null> {
    const response = await this.directusService.getItem('users', userId);
    return response.data ? { username: response.data.username } : null;
  }
}
