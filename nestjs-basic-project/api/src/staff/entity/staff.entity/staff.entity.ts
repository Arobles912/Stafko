import { ProjectsEntity } from 'src/projects/entity/projects.entity/projects.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
@Entity({name: 'staff'})
export class StaffEntity {
  @PrimaryGeneratedColumn()
  staff_id: number;

  @Column({ length: 50, nullable: false })
  username: string;

  @Column({ length: 255, nullable: false })
  pass: string;

  @Column({ length: 100, nullable: false })
  email: string;

  @Column({ nullable: true })
  project_id: number;

  @Column({ default: 'Usuario', length: 50 })
  user_role: string;

  @ManyToOne(() => ProjectsEntity, { onDelete: 'SET NULL' })
  @JoinColumn({ name: 'project_id' })
  project: ProjectsEntity;
}
