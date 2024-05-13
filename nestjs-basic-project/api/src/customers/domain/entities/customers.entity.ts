import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'customers' })
export class CustomersEntity {
  @PrimaryGeneratedColumn()
  customer_id: number;

  @Column({ length: 50, nullable: false })
  customer_name: string;

  @Column({ length: 50, nullable: true })
  city: string;

  @Column({ length: 50, nullable: false })
  country: string;

  @Column({ nullable: false })
  phone_number: number;

  @Column({ nullable: false })
  email: string;

  @Column({ length: 255, nullable: true })
  website: string;

  @Column({ length: 50, nullable: false })
  sector: string;

  @Column({ length: 9, nullable: false })
  cif: string;
}
