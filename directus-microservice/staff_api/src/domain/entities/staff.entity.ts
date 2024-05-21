import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'staff' })
export class StaffEntity {
  @PrimaryGeneratedColumn()
  staff_id: number;

  @Column({ length: 30, nullable: false })
  username: string;

  @Column({ length: 255, nullable: false })
  pass: string;

  @Column({ length: 50, nullable: false })
  email: string;

}
