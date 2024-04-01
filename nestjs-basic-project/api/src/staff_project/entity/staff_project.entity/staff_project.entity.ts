import { Entity, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { StaffEntity } from 'src/staff/entity/staff.entity/staff.entity';
import { ProjectsEntity } from 'src/projects/entity/projects.entity/projects.entity';
@Entity({ name: 'staff_project' })
export class StaffProjectEntity {
  @PrimaryColumn()
  staff_id: number;

  @PrimaryColumn()
  project_id: number;

  @ManyToOne(() => StaffEntity, { nullable: false })
  @JoinColumn({ name: 'staff_id' })
  staff: StaffEntity;

  @ManyToOne(() => ProjectsEntity, { nullable: false })
  @JoinColumn({ name: 'project_id' })
  project: ProjectsEntity;
}
