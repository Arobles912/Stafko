import { Transform } from "class-transformer";
import { IsEmail, IsString, MinLength } from "class-validator";

export class LoginDto {
  @IsString()
  username: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  pass: string;
}
