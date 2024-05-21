import { IsNotEmpty, IsOptional } from 'class-validator';

export class StaffProjectDto {
  @IsNotEmpty()
  staff_id: number;

  @IsNotEmpty()
  project_id: number;

  @IsOptional()
  total_time?: number;
}
