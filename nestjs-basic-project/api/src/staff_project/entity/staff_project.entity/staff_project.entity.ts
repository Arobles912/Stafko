import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { StaffEntity } from 'src/staff/entity/staff.entity/staff.entity';
import { ProjectsEntity } from 'src/projects/entity/projects.entity/projects.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'staff_project' })
export class StaffProjectEntity {
  @ApiProperty({ description: 'Staff ID', example: 1 })
  @PrimaryColumn()
  staff_id: number;

  @ApiProperty({ description: 'Project ID', example: 1 })
  @PrimaryColumn()
  project_id: number;

  // @ApiProperty({ description: 'Staff entity', type: StaffEntity })
  // @ManyToOne(() => StaffEntity, { nullable: false })
  // @JoinColumn({ name: 'staff_id' })
  // staff: StaffEntity;

  // @ApiProperty({ description: 'Projects entity', type: ProjectsEntity })
  // @ManyToOne(() => ProjectsEntity, { nullable: false })
  // @JoinColumn({ name: 'project_id' })
  // project: ProjectsEntity;
}
