import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';

export class ProjectsDto {
  @IsNotEmpty()
  project_name: string;

  @IsOptional()
  description?: string;

  @IsNotEmpty()
  @IsDateString()
  creation_date: Date;

  @IsNotEmpty()
  project_file: Buffer;

  @IsNotEmpty()
  project_owner: number;

  @IsNotEmpty()
  associated_customer: number;
}
