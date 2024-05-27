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
import {
  ApiOperation,
  ApiParam,
  ApiBody,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('api/projects')
export class ProjectsController {
  constructor(
    @Inject(ProjectsService)
    private readonly projectsService: IProjectsService,
  ) {}

  @ApiOperation({ summary: 'Creates a new project.' })
  @ApiBody({ type: ProjectsDto })
  @UseInterceptors(FileInterceptor("project_file"))
  @ApiResponse({ status: 200, description: 'Returns the created project.' })
  @ApiResponse({ status: 500, description: 'An error has occurred while trying to create the project.' })

  @Post()
  async create(@Body() projectDto: ProjectsDto) {
    const project = await this.projectsService.create(projectDto);
    return project;
  }

  @ApiOperation({ summary: 'Get all projects.' })
  @ApiResponse({ status: 200, description: 'Returns an array with all the projects.'})

  @Get()
  async findAll() {
    return this.projectsService.findAll();
  }

  @ApiOperation({ summary: 'Get project by ID.' })
  @ApiParam({ name: 'id', description: 'Project ID.' })
  @ApiResponse({ status: 200, description: 'Returns the project specified by the ID.' })
  @ApiResponse({ status: 404, description: 'Project not found.' })

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.projectsService.findOne(+id);
  }

  @ApiOperation({ summary: 'Update project by ID.' })
  @ApiParam({ name: 'id', description: 'Project ID.' })
  @ApiBody({ type: ProjectsDto })
  @ApiResponse({ status: 200, description: 'Returns the updated project specified by the ID.'})
  @ApiResponse({ status: 500, description: 'An error has occurred while trying to update the project.' })

  @Patch(':id')
  async update(@Param('id') id: number, @Body() projectDto: ProjectsDto) {
    return this.projectsService.update(+id, projectDto);
  }

  @ApiOperation({ summary: 'Get project by name.' })
  @ApiParam({ name: 'project_name', description: 'Project name.' })
  @ApiResponse({ status: 200, description: 'Returns the project specified by the name.'})
  @ApiResponse({ status: 404, description: 'Project not found.' })

  @Get('projectname/:project_name')
  async findByProjectName(@Param('project_name') project_name: string) {
    return this.projectsService.findByProjectName(project_name);
  }

  @ApiOperation({ summary: 'Delete project by ID.' })
  @ApiParam({ name: 'id', description: 'Project ID.' })
  @ApiResponse({ status: 204, description: 'Deletes the project specified by the ID.' })
  @ApiResponse({ status: 500, description: 'An error has occurred while trying to delete the project.'})

  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.projectsService.delete(+id);
  }

  @ApiOperation({ summary: 'Uploads the project file.' })
  @ApiParam({ name: 'file', description: 'The project file.' })
  @ApiResponse({ status: 200, description: 'Returns the uploaded project file' })
  @ApiResponse({
    status: 500,
    description:
      'An error has occurred while trying to download the project file.',
  })

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: MulterFile) {
    return this.projectsService.uploadFile(file);
  }

  @ApiOperation({ summary: 'Download project file by ID.' })
  @ApiParam({ name: 'id', description: 'Project ID.' })
  @ApiResponse({ status: 200, description: 'Returns the project file.' })
  @ApiResponse({
    status: 500,
    description:
      'An error has occurred while trying to download the project file.',
  })
  @Get(':id/download')
  async downloadFile(@Param('id') id: number, @Res() res: Response) {
    if (isNaN(id)) {
      throw new Error('Invalid ID');
    }
    const project = await this.projectsService.findOne(id);
    console.log('Project found:', project);
    const fileBuffer = await this.projectsService.downloadFile(
      project.project_file,
    );
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${project.project_file}"`,
    );
    res.setHeader('Content-Type', 'application/octet-stream');
    res.send(fileBuffer);
  }
}
