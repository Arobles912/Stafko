import { Controller, Get, Post, Body, Param, Put, Delete, Res, UseInterceptors, UploadedFile } from "@nestjs/common";
import { ProjectsService } from "./projects.service";
import { ProjectsDto } from "../dto/projects.dto/projects.dto";
import { ProjectsEntity } from "../entity/projects.entity/projects.entity";
import { FileInterceptor } from "@nestjs/platform-express";
import { MulterFile } from "multer";
import { Response } from 'express';
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse } from '@nestjs/swagger';

@ApiTags('projects')
@Controller("api/projects")
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a new project.' })
  @ApiBody({ type: ProjectsDto })
  @UseInterceptors(FileInterceptor("project_file"))
  @ApiResponse({ status: 200, description: 'Returns the created project.', type: ProjectsEntity })
  @ApiResponse({ status: 500, description: 'An error has occurred while trying to create the project.' })
  
  async create(
    @Body() projectDto: ProjectsDto,
    @UploadedFile() file: MulterFile
  ): Promise<ProjectsEntity> {
    return this.projectsService.create(projectDto, file);
  }

  @Get()
  @ApiOperation({ summary: 'Get all projects.' })
  @ApiResponse({ status: 200, description: 'Returns an array with all the projects.'})

  async findAll(): Promise<ProjectsEntity[]> {
    return this.projectsService.findAll();
  }

  @Get(":id")
  @ApiOperation({ summary: 'Get project by ID.' })
  @ApiParam({ name: 'id', description: 'Project ID.' })
  @ApiResponse({ status: 200, description: 'Returns the project specified by the ID.', type: ProjectsEntity })
  @ApiResponse({ status: 404, description: 'Project not found.' })

  async findOne(@Param("id") id: string): Promise<ProjectsEntity> {
    return this.projectsService.findOne(+id);
  }

  @Put(":id")
  @ApiOperation({ summary: 'Update project by ID.' })
  @ApiParam({ name: 'id', description: 'Project ID.' })
  @ApiBody({ type: ProjectsDto })
  @ApiResponse({ status: 200, description: 'Returns the updated project specified by the ID.', type: ProjectsEntity })
  @ApiResponse({ status: 500, description: 'An error has occurred while trying to update the project.' })

  async update(
    @Param("id") id: string,
    @Body() projectDto: ProjectsDto
  ): Promise<ProjectsEntity> {
    return this.projectsService.update(+id, projectDto);
  }

  @Delete(":id")
  @ApiOperation({ summary: 'Delete project by ID.' })
  @ApiParam({ name: 'id', description: 'Project ID.' })
  @ApiResponse({ status: 204, description: 'Deletes the project specified by the ID.' })
  @ApiResponse({ status: 500, description: 'An error has occurred while trying to delete the project.'})

  async remove(@Param("id") id: string): Promise<void> {
    return this.projectsService.remove(+id);
  }

  @Get(":id/download")
  @ApiOperation({ summary: 'Download project file by ID.' })
  @ApiParam({ name: 'id', description: 'Project ID.' })
  @ApiResponse({ status: 200, description: 'Returns the project file.' })
  @ApiResponse({ status: 500, description: 'An error has occurred while trying to download the project file.'})

  async downloadFile(@Param("id") id: string, @Res() res: Response) {
    const project = await this.projectsService.findOne(+id);
    res.send(project.project_file);
  }
}
