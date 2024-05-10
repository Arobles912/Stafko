import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({ description: 'Username of the user', example: 'example_user' })
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({ description: 'Email address of the user', example: 'example@example.com' })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Password of the user', example: 'password123' })
  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  pass: string;
}
