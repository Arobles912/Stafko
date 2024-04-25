import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'projects' })
export class ProjectsEntity {
  @ApiProperty({ description: 'The unique identifier of the project' })
  @PrimaryGeneratedColumn()
  project_id: number;

  @ApiProperty({ description: 'The name of the project', maxLength: 50 })
  @Column({ length: 50, nullable: false })
  project_name: string;

  @ApiProperty({ description: 'The description of the project', maxLength: 3000 })
  @Column({ length: 3000, nullable: true })
  description: string;

  @ApiProperty({ description: 'The creation date of the project' })
  @Column({
    type: 'timestamp with time zone',
    default: () => 'CURRENT_TIMESTAMP',
  })
  creation_date: Date;

  @ApiProperty({ description: 'The file associated with the project as a byte array' })
  @Column('bytea', { nullable: false })
  project_file: Buffer;

  @ApiProperty({ description: 'The project owner' })
  @Column({ nullable: true })
  project_owner: number;

  @ApiProperty({ description: 'The customer associated with the project' })
  @Column({ nullable: false })
  associated_customer: number;
}
