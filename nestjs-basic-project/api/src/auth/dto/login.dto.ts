import { Transform } from "class-transformer";
import {IsString} from "class-validator";
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'Username of the user', example: 'example_user' })
  @IsString()
  username: string;

  @ApiProperty({ description: 'Password of the user', example: 'password123' })
  @IsString()
  @Transform(({ value }) => value.trim())
  pass: string;
}
