import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'projects' })
export class ProjectsEntity {
  @PrimaryGeneratedColumn()
  project_id: number;

  @Column({ length: 50, nullable: false })
  project_name: string;

  @Column({ length: 3000, nullable: true })
  description: string;

  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creation_date: Date;

  @Column({length: 2000, nullable: true })
  project_file: string;

  @Column({ nullable: true })
  project_owner: number;

  @Column({ nullable: false })
  associated_customer: number;
}