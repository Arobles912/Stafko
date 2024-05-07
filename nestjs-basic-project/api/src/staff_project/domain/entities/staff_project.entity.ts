import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from 'typeorm';
import { StaffEntity } from 'src/staff/domain/entities/staff.entity';
import { ProjectsEntity } from 'src/projects/domain/entities/projects.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'staff_project' })
export class StaffProjectEntity {
  @ApiProperty({ description: 'Staff ID', example: 1 })
  @PrimaryColumn()
  staff_id: number;

  @ApiProperty({ description: 'Project ID', example: 1 })
  @PrimaryColumn()
  project_id: number;

  @ApiProperty({ description: 'Total hours worked on the project.', example: '00:00:00' })
  @Column({ default: '00:00:00' })
  total_hours: string;

  @ApiProperty({ description: 'Staff entity', type: StaffEntity })
  @ManyToOne(() => StaffEntity, { nullable: false })
  @JoinColumn({ name: 'staff_id' })
  staff: StaffEntity;

  @ApiProperty({ description: 'Projects entity', type: ProjectsEntity })
  @ManyToOne(() => ProjectsEntity, { nullable: false })
  @JoinColumn({ name: 'project_id' })
  project: ProjectsEntity;
}
