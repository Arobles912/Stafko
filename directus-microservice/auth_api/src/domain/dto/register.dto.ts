import { Transform } from "class-transformer";
import { IsEmail, IsNotEmpty, IsString} from "class-validator";

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Transform(({ value }) => value.trim())
  password: string;
  
  @IsString()
  @IsNotEmpty()
  role: string;
}
