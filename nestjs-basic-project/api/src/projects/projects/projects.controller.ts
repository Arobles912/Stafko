import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsDto } from '../dto/projects.dto/projects.dto';
import { ProjectsEntity } from '../entity/projects.entity/projects.entity';


@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  async create(@Body() projectDto: ProjectsDto): Promise<ProjectsEntity> {
    return this.projectsService.create(projectDto);
  }

  @Get()
  async findAll(): Promise<ProjectsEntity[]> {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ProjectsEntity> {
    return this.projectsService.findOne(+id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() projectDto: ProjectsDto): Promise<ProjectsEntity> {
    return this.projectsService.update(+id, projectDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.projectsService.remove(+id);
  }
}
