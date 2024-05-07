import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'staff' })
export class StaffEntity {
  @ApiProperty({ description: 'The unique identifier of the staff member' })
  @PrimaryGeneratedColumn()
  staff_id: number;

  @ApiProperty({ description: 'The username of the staff member' })
  @Column({ length: 30, nullable: false })
  username: string;

  @ApiProperty({ description: 'The password of the staff member' })
  @Column({ length: 255, nullable: false })
  pass: string;

  @ApiProperty({ description: 'The email of the staff member' })
  @Column({ length: 50, nullable: false })
  email: string;

  @ApiProperty({ description: 'The role of the staff member' })
  @Column({ default: 'Usuario', length: 50 })
  user_role: string;
}
