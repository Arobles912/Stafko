import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Res,
  UseInterceptors,
  UploadedFile,
  Inject,
  Patch,
} from '@nestjs/common';
import { ProjectsDto } from '../domain/dto/projects.dto/projects.dto';
import { ProjectsEntity } from '../domain/entities/projects.entity';
import { IProjectsService } from '../application/projects.service.interface';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterFile } from 'multer';
import { Response } from 'express';
import { ProjectsService } from '../application/projects.service';

@Controller('api/projects')
export class ProjectsController {
  constructor(
    @Inject(ProjectsService)
    private readonly projectsService: IProjectsService,
  ) {}

  @Post()
  async create(@Body() projectDto: ProjectsDto) {
    const project = await this.projectsService.create(projectDto);
    return project;
  }

  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.projectsService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: number, @Body() projectDto: ProjectsDto) {
    return this.projectsService.update(+id, projectDto);
  }

  @Get('projectname/:project_name')
  async findByProjectName(@Param('project_name') project_name: string) {
    return this.projectsService.findByProjectName(project_name);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.projectsService.delete(+id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: MulterFile) {
    return this.projectsService.uploadFile(file);
  }

  
  @Get(':id/download')
  async downloadFile(@Param('id') id: number, @Res() res: Response) {
    const project = await this.projectsService.findOne(+id);
    res.send(project.project_file);
  }
}
