import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity({ name: 'customers' })
export class CustomersEntity {
  @ApiProperty({ description: 'The unique identifier of the customer' })
  @PrimaryGeneratedColumn()
  customer_id: number;

  @ApiProperty({ description: 'The name of the customer', maxLength: 50 })
  @Column({ length: 50, nullable: false })
  customer_name: string;

  @ApiProperty({ description: 'The city where the customer is located', maxLength: 50 })
  @Column({ length: 50, nullable: true })
  city: string;

  @ApiProperty({ description: 'The country where the customer is located', maxLength: 50 })
  @Column({ length: 50, nullable: false })
  country: string;

  @ApiProperty({ description: 'The phone number of the customer' })
  @Column({ nullable: false })
  phone_number: number;

  @ApiProperty({ description: 'The email address of the customer' })
  @Column({ nullable: false })
  email: string;

  @ApiProperty({ description: 'The website of the customer', maxLength: 255 })
  @Column({ length: 255, nullable: true })
  website: string;

  @ApiProperty({ description: 'The sector to which the customer belongs', maxLength: 50 })
  @Column({ length: 50, nullable: false })
  sector: string;

  @ApiProperty({ description: 'The CIF (Tax Identification Code) of the customer' })
  @Column({ length: 9, nullable: false })
  cif: string;
}
