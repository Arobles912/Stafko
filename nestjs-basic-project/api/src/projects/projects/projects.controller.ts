import { Controller, Get, Post, Body, Param, Put, Delete, Res, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ProjectsDto } from "../dto/projects.dto/projects.dto";
import { ProjectsEntity } from "../entity/projects.entity/projects.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterFile } from "multer";
import { Response } from 'express';

@Controller("api/projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

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
  async findOne(@Param("id") id: string): Promise<ProjectsEntity> {
    return this.projectsService.findOne(+id);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() projectDto: ProjectsDto
  ): Promise<ProjectsEntity> {
    return this.projectsService.update(+id, projectDto);
  }

  @Delete(":id")
  async remove(@Param("id") id: string): Promise<void> {
    return this.projectsService.remove(+id);
  }

  @Get(":id/download")
  async downloadFile(@Param("id") id: string, @Res() res: Response) {
    const project = await this.projectsService.findOne(+id);
    res.send(project.project_file);
  }
}
