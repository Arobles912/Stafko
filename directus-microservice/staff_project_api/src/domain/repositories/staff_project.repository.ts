import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffProjectDto } from '../dto/staff_project.dto/staff_project.dto';
import { StaffProjectEntity } from '../entities/staff_project.entity';
import { IStaffProjectRepository } from './staff_project.repository.interface';

@Injectable()
export class StaffProjectRepository implements IStaffProjectRepository {
  constructor(
    @InjectRepository(StaffProjectEntity)
    private readonly staffProjectRepository: Repository<StaffProjectEntity>,
  ) {}

  async findAll(): Promise<StaffProjectEntity[]> {
    return await this.staffProjectRepository.find();
  }

  async findOne(staffId: number, projectId: number): Promise<StaffProjectEntity> {
    return await this.staffProjectRepository.findOne({ where: { staff_id: staffId, project_id: projectId } });
  }

  async create(staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity> {
    const staffProject = this.staffProjectRepository.create(staffProjectDto);
    return this.staffProjectRepository.save(staffProject);
  }

  async update(
    staffId: number,
    projectId: number,
    staffProjectDto: StaffProjectDto,
  ): Promise<StaffProjectEntity> {
    await this.staffProjectRepository.update({ staff_id: staffId, project_id: projectId }, staffProjectDto);
    return this.findOne(staffId, projectId);
  }

  async delete(staffId: number, projectId: number): Promise<void> {
    await this.staffProjectRepository.delete({ staff_id: staffId, project_id: projectId });
  }

  async findByStaffId(staffId: number): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.find({ where: { staff_id: staffId } });
  }

  async findByProjectId(projectId: number): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.find({ where: { project_id: projectId } });
  }

  async removeByProjectId(projectId: number): Promise<void> {
    await this.staffProjectRepository.delete({ project_id: projectId });
  }

  async findUserById(userId: number): Promise<{ username: string } | null> {
    const user = await this.staffProjectRepository.query(`SELECT username FROM staff WHERE staff_id = $1`, [userId]);
    return user[0] || null;
  }
}