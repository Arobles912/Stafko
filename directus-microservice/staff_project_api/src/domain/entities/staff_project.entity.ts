import { Entity, ManyToOne, JoinColumn, Column, PrimaryGeneratedColumn } from 'typeorm';
import { StaffEntity } from 'staff_api/src/domain/entities/staff.entity';
import { ProjectsEntity } from 'projects_api/src/domain/entities/projects.entity';
@Entity({ name: 'staff_project' })
export class StaffProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  staff_id: number;

  @Column({ nullable: false })
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
