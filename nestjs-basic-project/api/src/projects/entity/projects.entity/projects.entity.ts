import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "projects" })
export class ProjectsEntity {
  @PrimaryGeneratedColumn()
  project_id: number;

  @Column({ length: 255, nullable: false })
  project_name: string;

  @Column({ length: 1000, nullable: true })
  description: string;

  @Column({
    type: "timestamp with time zone",
    default: () => "CURRENT_TIMESTAMP",
  })
  creation_date: Date;

  @Column("bytea", { nullable: true })
  project_file: Buffer; 
}
