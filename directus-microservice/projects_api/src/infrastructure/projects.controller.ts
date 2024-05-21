import { Controller, Get, Post, Body, Param, Put, Delete, Res, UseInterceptors, UploadedFile, Inject } from "@nestjs/common";
import { ProjectsDto } from "../domain/dto/projects.dto/projects.dto";
import { ProjectsEntity } from "../domain/entities/projects.entity";
import { IProjectsService } from "../application/projects.service.interface";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterFile } from "multer";
import { Response } from 'express';

@Controller("api/projects")
export class ProjectsController {
  constructor(
    @Inject('ProjectsRepository')
    private readonly projectsService: IProjectsService) {}

  @Post()
  @UseInterceptors(FileInterceptor("project_file"))
  async create(
    @Body() projectDto: ProjectsDto,
    @UploadedFile() file: MulterFile
  ): Promise<ProjectsEntity> {
    return this.projectsService.create(projectDto, file);
  }

  @Get()
  async findAll(): Promise<ProjectsEntity[]> {
    return this.projectsService.findAll();
  }

  @Get(":id")
  async findOne(@Param("id") id: number): Promise<ProjectsEntity> {
    return this.projectsService.findOne(id);
  }

  @Put(":id")
  async update(
    @Param("id") id: number,
    @Body() projectDto: ProjectsDto
  ): Promise<ProjectsEntity> {
    return this.projectsService.update(id, projectDto);
  }

  @Get("projectname/:project_name")
  async findByProjectName(@Param("project_name") project_name: string): Promise<ProjectsEntity> {
    return this.projectsService.findByProjectName(project_name);
  }

  @Delete(":id")
  async remove(@Param("id") id: number): Promise<void> {
    return this.projectsService.delete(id);
  }

  @Get(":id/download")
  async downloadFile(@Param("id") id: number, @Res() res: Response) {
    const project = await this.projectsService.findOne(id);
    res.send(project.project_file); 
  }
}
