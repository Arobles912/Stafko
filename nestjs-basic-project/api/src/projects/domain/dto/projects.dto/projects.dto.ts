import { IsNotEmpty, IsDateString, IsOptional } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class ProjectsDto {
  @ApiProperty({ description: 'The name of the project.', example: 'My Project' })
  @IsNotEmpty()
  project_name: string;

  @ApiPropertyOptional({ description: 'The description of the project.', example: 'This is a sample project.' })
  @IsOptional()
  description?: string;

  @ApiProperty({ description: 'The creation date of the project.', example: '2022-04-01T12:00:00.000Z' })
  @IsNotEmpty()
  @IsDateString()
  creation_date: Date;

  @ApiProperty({ description: 'The file attached to the project.', type: 'string', format: 'binary' })
  @IsNotEmpty()
  project_file: Buffer;

  @ApiProperty({ description: 'The project owner', type: 'number', example: 5 })
  project_owner: number;

  @ApiProperty({ description: 'The customer associated with the project', type: 'number', example: 10 })
  associated_customer: number;
}
