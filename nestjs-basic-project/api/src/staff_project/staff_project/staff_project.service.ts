import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StaffProjectEntity } from '../entity/staff_project.entity/staff_project.entity';
import { StaffProjectDto } from '../dto/staff_project.dto/staff_project.dto';

@Injectable()
export class StaffProjectService {
  constructor(
    @InjectRepository(StaffProjectEntity)
    private staffProjectRepository: Repository<StaffProjectEntity>,
  ) {}

  async create(staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity> {
    const staffProject = this.staffProjectRepository.create(staffProjectDto);
    return this.staffProjectRepository.save(staffProject);
  }

  async findAll(): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.find();
  }

  async findOne(staffId: number, projectId: number): Promise<StaffProjectEntity> {
    return this.staffProjectRepository.findOne({ where: { staff_id: staffId, project_id: projectId } });
  }

  async findByStaffId(staffId: number): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.find({ where: { staff_id: staffId } });
  }

  async findByProjectId(projectId: number): Promise<StaffProjectEntity[]> {
    return this.staffProjectRepository.find({ where: { project_id: projectId } });
  }
  
  async update(staffId: number, projectId: number, staffProjectDto: StaffProjectDto): Promise<StaffProjectEntity> {
    await this.staffProjectRepository.update({ staff_id: staffId, project_id: projectId }, staffProjectDto);
    return this.findOne(staffId, projectId);
  }

  async remove(staffId: number, projectId: number): Promise<void> {
    await this.staffProjectRepository.delete({ staff_id: staffId, project_id: projectId });
  }

  async findUserById(userId: number): Promise<{ username: string } | null> {
    const user = await this.staffProjectRepository.query(`SELECT username FROM staff WHERE staff_id = $1`, [userId]);
    return user[0] || null;
  }
}
