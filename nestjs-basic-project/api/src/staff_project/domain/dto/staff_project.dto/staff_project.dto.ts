import { IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class StaffProjectDto {
  @ApiProperty({ description: 'Staff ID', example: 1 })
  @IsNotEmpty()
  staff_id: number;

  @ApiProperty({ description: 'Project ID', example: 1 })
  @IsNotEmpty()
  project_id: number;

  @ApiProperty({ description: 'Total hours', example: '00:00:00' })
  @IsOptional()
  total_time?: number;
}
