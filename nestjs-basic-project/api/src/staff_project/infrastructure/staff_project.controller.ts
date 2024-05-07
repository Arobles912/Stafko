import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  Inject,
} from "@nestjs/common";
import { StaffProjectService } from "../application/staff_project.service";
import { StaffProjectDto } from "../domain/dto/staff_project.dto/staff_project.dto";
import { StaffProjectEntity } from "../domain/entities/staff_project.entity";
import { ApiTags, ApiOperation, ApiParam, ApiBody, ApiResponse, ApiInternalServerErrorResponse } from '@nestjs/swagger';

@ApiTags('Staff Project')
@Controller("api/staffProject")
export class StaffProjectController {
  constructor(
    @Inject('StaffProjectRepository')
    private readonly staffProjectService: StaffProjectService) {}

  @Post()
  @ApiOperation({ summary: 'Creates a relationship between a staff member and a project' })
  @ApiBody({ type: StaffProjectDto, description: 'Staff project data' })
  @ApiResponse({ status: 201, description: 'The created staff project', type: StaffProjectEntity })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async create(
    @Body() staffProjectDto: StaffProjectDto
  ): Promise<StaffProjectEntity> {
    return this.staffProjectService.create(staffProjectDto);
  }

  @Get("staff/:staffId")
  @ApiOperation({ summary: 'Finds projects by staff ID' })
  @ApiParam({ name: 'staffId', description: 'ID of the staff' })
  @ApiResponse({ status: 200, description: 'Projects associated with the staff'})
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findByStaffId(
    @Param("staffId") staffId: number
  ): Promise<StaffProjectEntity[]> {
    return this.staffProjectService.findByStaffId(staffId);
  }

  @Get("project/:projectId")
  @ApiOperation({ summary: 'Finds staff projects by project ID' })
  @ApiParam({ name: 'projectId', description: 'ID of the project' })
  @ApiResponse({ status: 200, description: 'Staff projects associated with the project'})
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findByProjectId(
    @Param("projectId") projectId: number
  ): Promise<StaffProjectEntity[]> {
    return this.staffProjectService.findByProjectId(projectId);
  }

  @Delete("project/:projectId")
  @ApiOperation({ summary: 'Removes staff projects by project ID' })
  @ApiParam({ name: 'projectId', description: 'ID of the project' })
  @ApiResponse({ status: 204, description: 'Staff projects removed successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async removeByProjectId(
    @Param("projectId") projectId: number
  ): Promise<void> {
    return this.staffProjectService.removeByProjectId(+projectId);
  }

  @Get("project/:projectId/users")
  @ApiOperation({ summary: 'Finds users by project ID' })
  @ApiParam({ name: 'projectId', description: 'ID of the project' })
  @ApiResponse({ status: 200, description: 'Returns usernames of users associated with the project' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findUsersByProjectId(
    @Param("projectId") projectId: number
  ): Promise<string[]> {
    try {
      const members = await this.staffProjectService.findByProjectId(projectId);

      const usernames = await Promise.all(
        members.map(async (member) => {
          const user = await this.staffProjectService.findUserById(
            member.staff_id
          );
          return user ? user.username : null;
        })
      );

      return usernames.filter((username) => username !== null);
    } catch (error) {
      console.error("Error fetching users by project ID:", error.message);
      throw new Error("Failed to fetch users");
    }
  }

  @Get(":staffId/:projectId")
  @ApiOperation({ summary: 'Finds staff project by staff ID and project ID' })
  @ApiParam({ name: 'staffId', description: 'ID of the staff member' })
  @ApiParam({ name: 'projectId', description: 'ID of the project' })
  @ApiResponse({ status: 200, description: 'Staff project found',})
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findOne(
    @Param("staffId") staffId: number,
    @Param("projectId") projectId: number
  ): Promise<StaffProjectEntity> {
    return this.staffProjectService.findOne(+staffId, +projectId);
  }

  @Get()
  @ApiOperation({ summary: 'Find all staff projects' })
  @ApiResponse({ status: 200, description: 'All staff projects found'})
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async findAll(): Promise<StaffProjectEntity[]> {
    return this.staffProjectService.findAll();
  }

  @Put(":staffId/:projectId")
  @ApiOperation({ summary: 'Updates staff project by staff ID and project ID' })
  @ApiParam({ name: 'staffId', description: 'ID of the staff' })
  @ApiParam({ name: 'projectId', description: 'ID of the project' })
  @ApiBody({ type: StaffProjectDto, description: 'Staff project data' })
  @ApiResponse({ status: 200, description: 'Staff project updated', type: StaffProjectEntity })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async update(
    @Param("staffId") staffId: number,
    @Param("projectId") projectId: number,
    @Body() staffProjectDto: StaffProjectDto
  ): Promise<StaffProjectEntity> {
    return this.staffProjectService.update(
      +staffId,
      +projectId,
      staffProjectDto
    );
  }

  @Delete(":staffId/:projectId")
  @ApiOperation({ summary: 'Removes staff project by staff ID and project ID' })
  @ApiParam({ name: 'staffId', description: 'ID of the staff' })
  @ApiParam({ name: 'projectId', description: 'ID of the project' })
  @ApiResponse({ status: 204, description: 'Staff project removed successfully' })
  @ApiInternalServerErrorResponse({ description: 'Internal server error' })

  async delete(
    @Param("staffId") staffId: number,
    @Param("projectId") projectId: number
  ): Promise<void> {
    return this.staffProjectService.delete(+staffId, +projectId);
  }
}
