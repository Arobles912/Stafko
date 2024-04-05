import { IsNotEmpty, IsOptional, IsEmail } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StaffDto {

  @ApiProperty({ description: 'The username of the staff member' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'The password of the staff member' })
  @IsNotEmpty()
  pass: string;

  @ApiProperty({ description: 'The email of the staff member' })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'The role of the staff member', required: false })
  @IsOptional()
  user_role?: string;
}
