import { IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CustomersDto {
  @ApiProperty({ description: 'The name of the customer.', example: 'Example Customer' })
  @IsNotEmpty()
  customer_name: string;

  @ApiPropertyOptional({ description: 'The city where the customer is located.', example: 'City' })
  @IsOptional()
  city?: string;

  @ApiProperty({ description: 'The country where the customer is located.', example: 'Country' })
  @IsNotEmpty()
  country: string;

  @ApiProperty({ description: 'The phone number of the customer.', example: 123456789 })
  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: number;

  @ApiProperty({ description: 'The email address of the customer.', example: 'customer@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiPropertyOptional({ description: 'The website of the customer.', example: 'http://www.example.com' })
  @IsUrl()
  @IsOptional()
  website?: string;

  @ApiProperty({ description: 'The sector to which the customer belongs.', example: 'Sector' })
  @IsNotEmpty()
  sector: string;

  @ApiProperty({ description: 'The CIF (Tax Identification Code) of the customer.', example: '12345678Z' })
  @IsNotEmpty()
  cif: string;
}
