import { Transform } from "class-transformer";
import {IsString} from "class-validator";

export class LoginDto {
  @IsString()
  email: string;

  @IsString()
  @Transform(({ value }) => value.trim())
  pass: string;
}
