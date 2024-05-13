import { IsNotEmpty, IsEmail, IsPhoneNumber, IsOptional, IsUrl } from 'class-validator';
export class CustomersDto {
  @IsNotEmpty()
  customer_name: string;

  @IsOptional()
  city?: string;

  @IsNotEmpty()
  country: string;

  @IsPhoneNumber()
  @IsNotEmpty()
  phone_number: number;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsUrl()
  @IsOptional()
  website?: string;

  @IsNotEmpty()
  sector: string;

  @IsNotEmpty()
  cif: string;
}
