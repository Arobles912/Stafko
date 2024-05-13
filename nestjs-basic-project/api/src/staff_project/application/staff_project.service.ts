import { Inject, Injectable } from '@nestjs/common';
import { StaffProjectDto } from '../domain/dto/staff_project.dto/staff_project.dto';
import { StaffProjectEntity } from '../domain/entities/staff_project.entity';
import { IStaffProjectService } from './staff_project.service.interface';
import { IStaffProjectRepository } from '../domain/repositories/staff_project.repository.interface';

@Injectable()
export class StaffProjectService implements IStaffProjectService {
  constructor(
    @Inject('StaffProjectRepository')
    private readonly staffProjectRepository: IStaffProjectRepository,
  ) {}

  async create(staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity> {
    const staffProject = await this.staffProjectRepository.create(staffProjectDto);
    return staffProject;
  }

  async findAll(): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.findAll();
  }

  async findOne(staffId: number, projectId: number): Promise<StaffProjectEntity> {
    return this.staffProjectRepository.findOne(staffId, projectId);
  }

  async findByStaffId(staffId: number): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.findByStaffId(staffId);
  }

  async findByProjectId(projectId: number): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.findByProjectId(projectId);
  }

  async update(staffId: number, projectId: number, staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity> {
    return this.staffProjectRepository.update(staffId, projectId, staffProjectDto);
  }

  async delete(staffId: number, projectId: number): Promise<void> {
    await this.staffProjectRepository.delete(staffId, projectId);
  }

  async removeByProjectId(projectId: number): Promise<void> {
    await this.staffProjectRepository.removeByProjectId(projectId);
  }

  async findUserById(userId: number): Promise<{ username: string } | null> {
    return this.staffProjectRepository.findUserById(userId);
  }
}
