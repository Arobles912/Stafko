import { Entity, ManyToOne, JoinColumn, PrimaryColumn, Column } from 'typeorm';
import { StaffEntity } from 'src/staff/domain/entities/staff.entity';
import { ProjectsEntity } from 'src/projects/domain/entities/projects.entity';
@Entity({ name: 'staff_project' })
export class StaffProjectEntity {
  @PrimaryColumn()
  staff_id: number;

  @PrimaryColumn()
  project_id: number;

  @Column({ nullable: true })
  total_time: number;

  @ManyToOne(() => StaffEntity, { nullable: false })
  @JoinColumn({ name: 'staff_id' })
  staff: StaffEntity;

  @ManyToOne(() => ProjectsEntity, { nullable: false })
  @JoinColumn({ name: 'project_id' })
  project: ProjectsEntity;
}
