import { IsNotEmpty, IsDateString } from 'class-validator';

export class ProjectsDto {
  @IsNotEmpty()
  project_name: string;

  @IsNotEmpty()
  @IsDateString()
  creation_date: Date;
}
